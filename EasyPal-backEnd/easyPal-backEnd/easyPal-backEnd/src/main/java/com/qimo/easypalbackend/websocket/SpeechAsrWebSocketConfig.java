package com.qimo.easypalbackend.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class SpeechAsrWebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private SpeechAsrWebSocketHandler speechAsrWebSocketHandler;

    // 注册语音识别 WebSocket 端点并允许跨域
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(speechAsrWebSocketHandler, "/api/speech/asr/stream")
                .setAllowedOriginPatterns("*");
    }
}
