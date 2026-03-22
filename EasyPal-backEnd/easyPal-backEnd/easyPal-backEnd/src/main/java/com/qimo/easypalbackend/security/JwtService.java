package com.qimo.easypalbackend.security;

import com.qimo.easypalbackend.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * 简易 JWT 签发/解析（后续可交给 Spring Security OAuth2 Resource Server）。
 */
@Service
public class JwtService {

    @Autowired
    private JwtProperties props;
    private SecretKey key;

    // 字段注入后再执行：把配置文件里的 secret 转成签名用的密钥
    @PostConstruct
    public void initKey() {
        byte[] bytes = props.secret().getBytes(StandardCharsets.UTF_8);
        if (bytes.length < 32) {
            throw new IllegalStateException("easypal.jwt.secret 长度至少 32 字节（256 bit）");
        }
        this.key = Keys.hmacShaKeyFor(bytes);
    }

    // 签发 JWT：sub=用户 id，附带 phone、nickname，按配置小时数过期
    public String createToken(long userId, String phone, String nickname) {
        long now = System.currentTimeMillis();
        long exp = now + props.expireHours() * 3600_000L;
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("phone", phone)
                .claim("nickname", nickname == null ? "" : nickname)
                .issuedAt(new Date(now))
                .expiration(new Date(exp))
                .signWith(key)
                .compact();
    }

    // 校验签名并解析 Token，得到 Claims（后续鉴权过滤器会用到）
    public Claims parse(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
