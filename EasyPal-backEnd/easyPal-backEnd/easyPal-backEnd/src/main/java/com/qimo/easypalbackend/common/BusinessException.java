package com.qimo.easypalbackend.common;

/**
 * 业务异常（由全局处理器转换为 HTTP 响应）。
 */
public class BusinessException extends RuntimeException {

    private final int code;

    // 携带业务错误码与提示信息，供全局异常处理器转成 HTTP + ApiResponse
    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
    }

    // 供 GlobalExceptionHandler 选择 HTTP 状态码
    public int getCode() {
        return code;
    }
}
