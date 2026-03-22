package com.qimo.easypalbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "昵称不能为空")
        @Size(min = 1, max = 50, message = "昵称长度 1~50")
        String nickname,

        @NotBlank(message = "手机号不能为空")
        @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
        String phone,

        @NotBlank(message = "验证码不能为空")
        String code,

        @NotBlank(message = "密码不能为空")
        @Size(min = 6, max = 20, message = "密码长度 6~20")
        String password
) {
}
