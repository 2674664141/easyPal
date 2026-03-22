# 登录注册接口说明

## 技术说明

持久层使用 **MyBatis-Plus**：`UserMapper` / `RoleMapper` / `UserRoleMapper` 继承 `BaseMapper`。业务层按规范拆分：**`AuthService` 接口** + **`AuthServiceImpl`**（`service.impl` 包），实现类中用 `LambdaQueryWrapper` / `LambdaUpdateWrapper` 拼条件（无需手写 XML，复杂 SQL 再补 `mapper/*.xml`）。

## 前置条件

1. MySQL 库 `soulmate` 已建表，且 **`role` 表已初始化**（含 `student` 角色），否则注册会报错。
2. `application.properties` 中配置正确的数据源账号密码。
3. 开发环境验证码：`easypal.sms.log-code=true` 时，验证码会打印在**后端控制台日志**（未接真实短信）。

## 接口列表

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/sms/send` | 发送验证码，body: `{ "phone": "13800138000", "scene": "register" \| "login_sms" }` |
| POST | `/api/auth/register` | 仅注册（不返回 Token），body: `{ "nickname", "phone", "code", "password" }`，密码 6~20 位，BCrypt 入库；成功后需再调登录接口 |
| POST | `/api/auth/login/password` | 账号密码登录，body: `{ "account", "password" }`，账号支持手机号 / 邮箱 / 昵称 |
| POST | `/api/auth/login/sms` | 手机号+验证码登录，body: `{ "phone", "code" }` |

成功时：`{ "code": 0, "message": "ok", "data": ... }`。其中 **`/register` 的 `data` 为 `null`**；`/login/*` 的 `data` 为 `{ "token", "user": { "id", "nickname", "phone" } }`。

## JWT

当前为简易 JWT，后续接入 Spring Security 时可改为同一密钥校验或换发令牌策略。
