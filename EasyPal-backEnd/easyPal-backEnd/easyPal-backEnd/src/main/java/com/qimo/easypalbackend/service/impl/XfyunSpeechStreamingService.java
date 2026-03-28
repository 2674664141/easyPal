package com.qimo.easypalbackend.service.impl;

import com.qimo.easypalbackend.config.XfyunSpeechProperties;
import com.qimo.easypalbackend.service.SpeechStreamingService;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.WebSocket;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class XfyunSpeechStreamingService implements SpeechStreamingService {

    private final XfyunSpeechProperties properties;
    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final Map<String, UpstreamSession> sessions = new ConcurrentHashMap<>();

    // 注入讯飞语音识别配置
    public XfyunSpeechStreamingService(XfyunSpeechProperties properties) {
        this.properties = properties;
    }

    // 校验配置并建立到讯飞 IAT 的上游 WebSocket，发送首帧开启会话
    @Override
    public void open(String sessionId, ResultListener listener) {
        terminate(sessionId);
        if (!properties.isEnabled()) {
            listener.onError("语音识别未启用，请先在后端配置 easypal.speech.xfyun.enabled=true");
            return;
        }
        if (isBlank(properties.getAppId()) || isBlank(properties.getApiKey()) || isBlank(properties.getApiSecret())) {
            listener.onError("讯飞参数不完整，请检查 app-id/api-key/api-secret");
            return;
        }

        try {
            URI uri = buildSignedUri();
            UpstreamListener upstreamListener = new UpstreamListener(listener);
            CompletableFuture<WebSocket> future = httpClient.newWebSocketBuilder().buildAsync(uri, upstreamListener);
            WebSocket ws = future.join();
            UpstreamSession session = new UpstreamSession(ws, listener);
            sessions.put(sessionId, session);
            session.sendFrame(0, new byte[0]);
        } catch (Exception e) {
            listener.onError("连接讯飞失败：" + e.getMessage());
        }
    }

    // 将客户端一帧 PCM 封装后发给讯飞（status=1 表示中间音频）
    @Override
    public void sendAudio(String sessionId, byte[] audioBytes) {
        UpstreamSession session = sessions.get(sessionId);
        if (session == null || session.closedInput) return;
        if (audioBytes == null || audioBytes.length == 0) return;
        session.sendFrame(1, audioBytes);
    }

    // 标记本端不再发送音频并发送结束帧（status=2）
    @Override
    public void closeInput(String sessionId) {
        UpstreamSession session = sessions.get(sessionId);
        if (session == null || session.closedInput) return;
        session.closedInput = true;
        session.sendFrame(2, new byte[0]);
    }

    // 移除会话并关闭上游 WebSocket 连接
    @Override
    public void terminate(String sessionId) {
        UpstreamSession session = sessions.remove(sessionId);
        if (session == null) return;
        try {
            session.webSocket.sendClose(WebSocket.NORMAL_CLOSURE, "bye");
        } catch (Exception ignore) {
        }
    }

    // 按讯飞文档拼接带鉴权参数的 wss:// 地址
    private URI buildSignedUri() throws Exception {
        String host = properties.getHost();
        String path = properties.getPath();
        String date = DateTimeFormatter.RFC_1123_DATE_TIME.format(ZonedDateTime.now(ZoneOffset.UTC));

        String requestLine = "GET " + path + " HTTP/1.1";
        String signatureOrigin = "host: " + host + "\n" + "date: " + date + "\n" + requestLine;
        String signature = hmacSha256Base64(signatureOrigin, properties.getApiSecret());

        String authorizationOrigin = "api_key=\"" + properties.getApiKey()
                + "\", algorithm=\"hmac-sha256\", headers=\"host date request-line\", signature=\"" + signature + "\"";
        String authorization = Base64.getEncoder().encodeToString(authorizationOrigin.getBytes(StandardCharsets.UTF_8));

        String query = "authorization=" + urlEncode(authorization)
                + "&date=" + urlEncode(date)
                + "&host=" + urlEncode(host);

        return URI.create("wss://" + host + path + "?" + query);
    }

    // 使用 APISecret 对签名字符串做 HmacSHA256 并 Base64 编码
    private static String hmacSha256Base64(String content, String secret) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        return Base64.getEncoder().encodeToString(mac.doFinal(content.getBytes(StandardCharsets.UTF_8)));
    }

    // URL 查询参数编码（UTF-8）
    private static String urlEncode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    // 判断字符串为空或仅空白
    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }

    private final class UpstreamSession {
        private final WebSocket webSocket;
        private final ResultListener listener;
        private volatile boolean closedInput;

        // 绑定上游 WebSocket 与结果回调
        private UpstreamSession(WebSocket webSocket, ResultListener listener) {
            this.webSocket = webSocket;
            this.listener = listener;
        }

        // 按 status 组包 JSON 并 sendText（0 首帧 1 音频 2 结束）
        private void sendFrame(int status, byte[] audioBytes) {
            try {
                String audioBase64 = Base64.getEncoder().encodeToString(audioBytes);
                String payload = "{\"common\":{\"app_id\":\"" + jsonEscape(properties.getAppId()) + "\"},"
                        + "\"business\":{\"language\":\"zh_cn\",\"domain\":\"iat\",\"accent\":\"mandarin\",\"vad_eos\":5000},"
                        + "\"data\":{\"status\":" + status + ",\"format\":\"audio/L16;rate=16000\",\"encoding\":\"raw\","
                        + "\"audio\":\"" + audioBase64 + "\"}}";
                webSocket.sendText(payload, true);
            } catch (Exception e) {
                listener.onError("发送音频帧失败：" + e.getMessage());
            }
        }
    }

    private static final class UpstreamListener implements WebSocket.Listener {
        private final ResultListener listener;
        private static final Pattern CODE_PATTERN = Pattern.compile("\"code\"\\s*:\\s*(\\d+)");
        private static final Pattern STATUS_PATTERN = Pattern.compile("\"status\"\\s*:\\s*(\\d+)");
        private static final Pattern MESSAGE_PATTERN = Pattern.compile("\"message\"\\s*:\\s*\"([^\"]*)\"");
        private static final Pattern WORD_PATTERN = Pattern.compile("\"w\"\\s*:\\s*\"((?:\\\\\"|[^\"])*)\"");

        // 保存识别结果监听器引用
        private UpstreamListener(ResultListener listener) {
            this.listener = listener;
        }

        // 解析讯飞返回的 JSON 文本，区分临时/最终结果并回调
        @Override
        public CompletionStage<?> onText(WebSocket webSocket, CharSequence data, boolean last) {
            try {
                String payload = data.toString();
                int code = parseInt(payload, CODE_PATTERN, -1);
                if (code != 0) {
                    listener.onError(parseString(payload, MESSAGE_PATTERN, "讯飞识别失败"));
                    return CompletableFuture.completedFuture(null);
                }
                String text = parseWords(payload);
                int status = parseInt(payload, STATUS_PATTERN, 1);
                if (!text.isBlank()) {
                    if (status == 2) listener.onFinal(text);
                    else listener.onInterim(text);
                }
            } catch (Exception e) {
                listener.onError("解析识别结果失败：" + e.getMessage());
            }
            return CompletableFuture.completedFuture(null);
        }

        // 讯飞 IAT 主要走文本帧，二进制帧忽略
        @Override
        public CompletionStage<?> onBinary(WebSocket webSocket, ByteBuffer data, boolean last) {
            return CompletableFuture.completedFuture(null);
        }

        // 上游 WebSocket 发生错误时通知业务层
        @Override
        public void onError(WebSocket webSocket, Throwable error) {
            listener.onError("讯飞连接异常：" + error.getMessage());
        }

        // 从 JSON 中抽取所有 "w" 字段拼成识别文本
        private static String parseWords(String payload) {
            StringBuilder sb = new StringBuilder();
            Matcher matcher = WORD_PATTERN.matcher(payload);
            while (matcher.find()) {
                sb.append(unescapeJson(matcher.group(1)));
            }
            return sb.toString();
        }

        // 用正则从 JSON 中解析整型字段
        private static int parseInt(String payload, Pattern pattern, int defaultValue) {
            Matcher matcher = pattern.matcher(payload);
            if (!matcher.find()) return defaultValue;
            try {
                return Integer.parseInt(matcher.group(1));
            } catch (Exception e) {
                return defaultValue;
            }
        }

        // 用正则从 JSON 中解析字符串字段并做简单转义还原
        private static String parseString(String payload, Pattern pattern, String defaultValue) {
            Matcher matcher = pattern.matcher(payload);
            return matcher.find() ? unescapeJson(matcher.group(1)) : defaultValue;
        }
    }

    // 将 JSON 字符串中的 \" \\ 还原为普通字符
    private static String unescapeJson(String s) {
        return s.replace("\\\"", "\"").replace("\\\\", "\\");
    }

    // 将 app_id 等写入 JSON 前做最小转义，避免破坏 JSON 结构
    private static String jsonEscape(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
