package com.qimo.easypalbackend.websocket;

import com.qimo.easypalbackend.service.SpeechStreamingService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.nio.ByteBuffer;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class SpeechAsrWebSocketHandler extends TextWebSocketHandler {

    private final SpeechStreamingService speechStreamingService;
    private final Map<String, StringBuilder> finalTextBySession = new ConcurrentHashMap<>();
    private final Map<String, String> draftTextBySession = new ConcurrentHashMap<>();
    private static final Pattern TYPE_PATTERN = Pattern.compile("\"type\"\\s*:\\s*\"([^\"]+)\"");

    // 注入流式语音识别服务实现
    public SpeechAsrWebSocketHandler(SpeechStreamingService speechStreamingService) {
        this.speechStreamingService = speechStreamingService;
    }

    // 客户端 WebSocket 连上后为该会话初始化本地文本缓存
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        finalTextBySession.put(session.getId(), new StringBuilder());
        draftTextBySession.put(session.getId(), "");
    }

    // 处理 JSON 控制帧：start 打开上游识别，stop 结束本端音频输入
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String type = parseType(message.getPayload());
        String sessionId = session.getId();

        if ("start".equals(type)) {
            speechStreamingService.open(sessionId, new SpeechStreamingService.ResultListener() {
                // 将上游临时结果推送给前端
                @Override
                public void onInterim(String text) {
                    draftTextBySession.put(sessionId, text);
                    sendSafe(session, toClientPayload("interim", text));
                }

                // 将上游最终结果推送给前端并累计到本会话
                @Override
                public void onFinal(String text) {
                    finalTextBySession.computeIfAbsent(sessionId, k -> new StringBuilder()).append(text);
                    draftTextBySession.put(sessionId, "");
                    sendSafe(session, toClientPayload("final", text));
                }

                // 将上游错误信息推送给前端
                @Override
                public void onError(String message) {
                    sendSafe(session, toClientPayload("error", message));
                }
            });
            sendSafe(session, toClientPayload("ready", "asr_started"));
            return;
        }

        if ("stop".equals(type)) {
            speechStreamingService.closeInput(sessionId);
            sendSafe(session, toClientPayload("done", "stopped"));
        }
    }

    // 接收客户端二进制 PCM 帧并转发给上游识别服务
    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
        ByteBuffer buffer = message.getPayload();
        byte[] bytes = new byte[buffer.remaining()];
        buffer.get(bytes);
        speechStreamingService.sendAudio(session.getId(), bytes);
    }

    // 连接关闭时清理会话与上游资源
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        cleanupSession(session.getId());
    }

    // 传输层异常时通知客户端并清理会话
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        sendSafe(session, toClientPayload("error", "连接异常：" + exception.getMessage()));
        cleanupSession(session.getId());
    }

    // 终止上游识别并移除本地缓存
    private void cleanupSession(String sessionId) {
        speechStreamingService.terminate(sessionId);
        finalTextBySession.remove(sessionId);
        draftTextBySession.remove(sessionId);
    }

    // 组装发给前端的单行 JSON：type + text
    private String toClientPayload(String type, String text) {
        return "{\"type\":\"" + jsonEscape(type) + "\",\"text\":\"" + jsonEscape(text == null ? "" : text) + "\"}";
    }

    // 在会话仍打开时安全发送文本消息，忽略发送异常
    private void sendSafe(WebSocketSession session, String payload) {
        if (session == null || !session.isOpen()) return;
        try {
            session.sendMessage(new TextMessage(payload));
        } catch (Exception ignore) {
        }
    }

    // 从客户端 JSON 中解析 type 字段
    private static String parseType(String payload) {
        Matcher matcher = TYPE_PATTERN.matcher(payload);
        return matcher.find() ? matcher.group(1) : "";
    }

    // 写入 JSON 字符串前转义引号与反斜杠
    private static String jsonEscape(String s) {
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
