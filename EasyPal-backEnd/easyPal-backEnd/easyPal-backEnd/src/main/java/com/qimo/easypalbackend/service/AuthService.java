package com.qimo.easypalbackend.service;

import com.qimo.easypalbackend.dto.LoginPasswordRequest;
import com.qimo.easypalbackend.dto.LoginResponse;
import com.qimo.easypalbackend.dto.LoginSmsRequest;
import com.qimo.easypalbackend.dto.RegisterRequest;

/**
 * 认证业务接口（登录、注册、验证码等）。
 */
public interface AuthService {

    String SCENE_REGISTER = "register";
    String SCENE_LOGIN_SMS = "login_sms";

    // 发送短信验证码（scene=register | login_sms）
    void sendSms(String phone, String scene);

    // 仅创建账号并绑定角色，不签发 Token，需用户再调登录接口
    void register(RegisterRequest req);

    // 账号（手机/邮箱/昵称）+ 密码登录
    LoginResponse loginPassword(LoginPasswordRequest req);

    // 手机号 + 短信验证码登录
    LoginResponse loginSms(LoginSmsRequest req);
}
