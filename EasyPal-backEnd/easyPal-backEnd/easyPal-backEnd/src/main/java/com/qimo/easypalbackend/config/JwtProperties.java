package com.qimo.easypalbackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * JWT 配置。
 */
@ConfigurationProperties(prefix = "easypal.jwt")
public record JwtProperties(
        String secret,
        int expireHours
) {
}
