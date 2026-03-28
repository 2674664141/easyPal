package com.qimo.easypalbackend.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

// 语音识别模块：将 easypal.speech.xfyun 配置绑定为 XfyunSpeechProperties Bean
@Configuration
@EnableConfigurationProperties(XfyunSpeechProperties.class)
public class SpeechAsrConfig {
}
