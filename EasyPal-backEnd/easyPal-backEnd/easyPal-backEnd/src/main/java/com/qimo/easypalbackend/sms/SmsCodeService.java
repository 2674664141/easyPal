package com.qimo.easypalbackend.sms;

import com.qimo.easypalbackend.common.BusinessException;
import com.qimo.easypalbackend.config.SmsProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 短信验证码（内存存储，开发用）。接入真实短信网关后替换发送实现即可。
 */
@Service
public class SmsCodeService {

    private static final Logger log = LoggerFactory.getLogger(SmsCodeService.class);
    private static final long CODE_TTL_MS = 5 * 60_000L;
    private static final long SEND_INTERVAL_MS = 60_000L;

    @Autowired
    private SmsProperties smsProperties;
    private final SecureRandom random = new SecureRandom();

    private record CodeEntry(String code, long expireAt, long lastSendAt) {
    }

    private final Map<String, CodeEntry> store = new ConcurrentHashMap<>();

    // 生成 6 位验证码写入内存，同一手机号+scene 60 秒内不可重复发；可选打日志
    public void sendCode(String phone, String scene) {
        String key = cacheKey(phone, scene);
        long now = Instant.now().toEpochMilli();
        CodeEntry prev = store.get(key);
        if (prev != null && now - prev.lastSendAt() < SEND_INTERVAL_MS) {
            throw new BusinessException(429, "发送过于频繁，请稍后再试");
        }
        String code = String.format("%06d", random.nextInt(1_000_000));
        store.put(key, new CodeEntry(code, now + CODE_TTL_MS, now));
        if (smsProperties.logCode()) {
            log.info("[SMS 模拟] phone={} scene={} code={}", phone, scene, code);
        }
    }

    // 校验验证码是否正确且在有效期内，通过后从缓存删除（一次性）
    public void verifyAndConsume(String phone, String scene, String inputCode) {
        if (inputCode == null || inputCode.isBlank()) {
            throw new BusinessException(400, "请输入验证码");
        }
        String key = cacheKey(phone, scene);
        CodeEntry entry = store.get(key);
        long now = Instant.now().toEpochMilli();
        if (entry == null || now > entry.expireAt()) {
            store.remove(key);
            throw new BusinessException(400, "验证码已失效，请重新获取");
        }
        if (!entry.code().equalsIgnoreCase(inputCode.trim())) {
            throw new BusinessException(400, "验证码错误");
        }
        store.remove(key);
    }

    // 内存 Map 的 key：手机号 + 场景，避免注册码与登录码混用
    private static String cacheKey(String phone, String scene) {
        return phone + ":" + scene;
    }
}
