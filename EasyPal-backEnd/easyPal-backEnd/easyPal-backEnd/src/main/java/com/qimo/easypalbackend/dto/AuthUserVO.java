package com.qimo.easypalbackend.dto;

/**
 * 登录成功后返回给前端的用户信息（不含密码）。
 */
public record AuthUserVO(long id, String nickname, String phone) {
}
