package com.qimo.easypalbackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "easypal.sms")
public record SmsProperties(
        boolean logCode
) {
}
