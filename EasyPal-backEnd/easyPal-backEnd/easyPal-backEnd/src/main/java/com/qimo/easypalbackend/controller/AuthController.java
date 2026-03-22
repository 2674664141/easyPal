package com.qimo.easypalbackend.controller;

import com.qimo.easypalbackend.common.ApiResponse;
import com.qimo.easypalbackend.dto.LoginPasswordRequest;
import com.qimo.easypalbackend.dto.LoginResponse;
import com.qimo.easypalbackend.dto.LoginSmsRequest;
import com.qimo.easypalbackend.dto.RegisterRequest;
import com.qimo.easypalbackend.dto.SmsSendRequest;
import com.qimo.easypalbackend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // 自动注入：Spring 会注入 AuthService 的唯一实现类 AuthServiceImpl
    @Autowired
    private AuthService authService;

    // POST /api/auth/sms/send：接收手机号与 scene，转发发送验证码
    @PostMapping("/sms/send")
    public ApiResponse<Void> sendSms(@Valid @RequestBody SmsSendRequest req) {
        authService.sendSms(req.phone(), req.scene());
        return ApiResponse.ok();
    }

    // POST /api/auth/register：仅注册，成功返回 data=null
    @PostMapping("/register")
    public ApiResponse<Void> register(@Valid @RequestBody RegisterRequest req) {
        authService.register(req);
        return ApiResponse.ok();
    }

    // POST /api/auth/login/password：账号+密码，返回 token 与用户信息
    @PostMapping("/login/password")
    public ApiResponse<LoginResponse> loginPassword(@Valid @RequestBody LoginPasswordRequest req) {
        return ApiResponse.ok(authService.loginPassword(req));
    }

    // POST /api/auth/login/sms：手机号+验证码，返回 token 与用户信息
    @PostMapping("/login/sms")
    public ApiResponse<LoginResponse> loginSms(@Valid @RequestBody LoginSmsRequest req) {
        return ApiResponse.ok(authService.loginSms(req));
    }
}
