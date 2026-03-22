package com.qimo.easypalbackend.dto;

public record LoginResponse(String token, AuthUserVO user) {
}
