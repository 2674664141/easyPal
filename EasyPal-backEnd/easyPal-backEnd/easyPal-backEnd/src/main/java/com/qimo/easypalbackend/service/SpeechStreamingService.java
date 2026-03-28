package com.qimo.easypalbackend.service;

public interface SpeechStreamingService {

    interface ResultListener {
        // 收到临时识别结果（边说边出字，内容可能变化）
        void onInterim(String text);

        // 收到当前分句的最终识别结果（稳定片段）
        void onFinal(String text);

        // 识别或连接过程出错
        void onError(String message);
    }

    // 为客户端会话打开上游讯飞连接并开始一次听写会话
    void open(String sessionId, ResultListener listener);

    // 将一帧 PCM 音频转发给上游识别服务
    void sendAudio(String sessionId, byte[] audioBytes);

    // 通知上游本端音频已发完，触发收尾识别
    void closeInput(String sessionId);

    // 关闭并移除会话，释放上游 WebSocket 等资源
    void terminate(String sessionId);
}
