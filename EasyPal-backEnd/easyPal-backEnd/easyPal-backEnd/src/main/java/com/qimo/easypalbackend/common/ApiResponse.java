package com.qimo.easypalbackend.common;

/**
 * 统一 API 响应体。
 */
public record ApiResponse<T>(int code, String message, T data) {

    // 成功且带业务数据（如登录返回 token）
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(0, "ok", data);
    }

    // 成功无数据（如注册成功、发短信成功）
    public static ApiResponse<Void> ok() {
        return new ApiResponse<>(0, "ok", null);
    }
    // 失败：携带错误码与错误信息
    public static <T> ApiResponse<T> fail(int code, String message) {
        return new ApiResponse<>(code, message, null);
    }
}
