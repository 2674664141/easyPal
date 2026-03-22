package com.qimo.easypalbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginPasswordRequest(
        @NotBlank(message = "账号不能为空")
        @Size(max = 100)
        String account,

        @NotBlank(message = "密码不能为空")
        String password
) {
}
