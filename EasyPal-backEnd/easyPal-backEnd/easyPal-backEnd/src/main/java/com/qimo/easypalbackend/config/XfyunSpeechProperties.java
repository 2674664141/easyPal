package com.qimo.easypalbackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "easypal.speech.xfyun")
public class XfyunSpeechProperties {
    private boolean enabled;
    private String appId;
    private String apiKey;
    private String apiSecret;
    private String host = "iat-api.xfyun.cn";
    private String path = "/v2/iat";

    // 是否启用讯飞语音识别
    public boolean isEnabled() {
        return enabled;
    }

    // 设置是否启用讯飞语音识别
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    // 获取讯飞应用 AppID
    public String getAppId() {
        return appId;
    }

    // 设置讯飞应用 AppID
    public void setAppId(String appId) {
        this.appId = appId;
    }

    // 获取讯飞 APIKey
    public String getApiKey() {
        return apiKey;
    }

    // 设置讯飞 APIKey
    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    // 获取讯飞 APISecret
    public String getApiSecret() {
        return apiSecret;
    }

    // 设置讯飞 APISecret
    public void setApiSecret(String apiSecret) {
        this.apiSecret = apiSecret;
    }

    // 获取讯飞听写 WebSocket 域名
    public String getHost() {
        return host;
    }

    // 设置讯飞听写 WebSocket 域名
    public void setHost(String host) {
        this.host = host;
    }

    // 获取讯飞听写 WebSocket 路径
    public String getPath() {
        return path;
    }

    // 设置讯飞听写 WebSocket 路径
    public void setPath(String path) {
        this.path = path;
    }
}
