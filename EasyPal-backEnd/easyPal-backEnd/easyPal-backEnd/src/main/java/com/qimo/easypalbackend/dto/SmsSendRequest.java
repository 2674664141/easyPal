package com.qimo.easypalbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SmsSendRequest(
        @NotBlank(message = "手机号不能为空")
        @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
        String phone,

        /**
         * register：注册；login_sms：手机号验证码登录
         */
        @NotBlank(message = "scene 不能为空")
        @Pattern(regexp = "register|login_sms", message = "scene 只能是 register 或 login_sms")
        String scene
) {
}
