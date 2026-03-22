package com.qimo.easypalbackend.security;

import com.qimo.easypalbackend.common.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 从请求头 Authorization: Bearer 中解析当前用户 id（供各业务 Controller 复用）。
 */
@Component
public class JwtAuthSupport {

    @Autowired
    private JwtService jwtService;

    public long requireUserId(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new BusinessException(401, "请先登录");
        }
        String token = authorization.substring(7).trim();
        if (token.isEmpty()) {
            throw new BusinessException(401, "请先登录");
        }
        try {
            return Long.parseLong(jwtService.parse(token).getSubject());
        } catch (Exception e) {
            throw new BusinessException(401, "登录已失效，请重新登录");
        }
    }
}
