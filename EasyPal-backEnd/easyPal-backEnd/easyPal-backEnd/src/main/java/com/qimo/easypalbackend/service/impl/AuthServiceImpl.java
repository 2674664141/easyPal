package com.qimo.easypalbackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.qimo.easypalbackend.common.BusinessException;
import com.qimo.easypalbackend.dto.AuthUserVO;
import com.qimo.easypalbackend.dto.LoginPasswordRequest;
import com.qimo.easypalbackend.dto.LoginResponse;
import com.qimo.easypalbackend.dto.LoginSmsRequest;
import com.qimo.easypalbackend.dto.RegisterRequest;
import com.qimo.easypalbackend.entity.Role;
import com.qimo.easypalbackend.entity.User;
import com.qimo.easypalbackend.entity.UserRole;
import com.qimo.easypalbackend.mapper.RoleMapper;
import com.qimo.easypalbackend.mapper.UserMapper;
import com.qimo.easypalbackend.mapper.UserRoleMapper;
import com.qimo.easypalbackend.security.JwtService;
import com.qimo.easypalbackend.service.AuthService;
import com.qimo.easypalbackend.sms.SmsCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private static final String ROLE_STUDENT = "student";

    @Autowired
    private SmsCodeService smsCodeService;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private UserRoleMapper userRoleMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    // 校验 scene 后调用短信服务生成并缓存验证码（开发环境可打日志）
    @Override
    public void sendSms(String phone, String scene) {
        if (!SCENE_REGISTER.equals(scene) && !SCENE_LOGIN_SMS.equals(scene)) {
            throw new BusinessException(400, "scene 只能是 register 或 login_sms");
        }
        smsCodeService.sendCode(phone, scene);
    }

    // 注册：验注册验证码 → 防重复手机号 → BCrypt 加密密码 → 插入 user → 绑定 student 角色（不签发 Token）
    @Override
    @Transactional
    public void register(RegisterRequest req) {
        String nickname = req.nickname().trim();
        String phone = req.phone().trim();
        smsCodeService.verifyAndConsume(phone, SCENE_REGISTER, req.code());

        if (findByPhone(phone).isPresent()) {
            throw new BusinessException(409, "该手机号已注册");
        }

        String encoded = passwordEncoder.encode(req.password());
        Timestamp now = new Timestamp(System.currentTimeMillis());

        User user = new User();
        user.setNickname(nickname);
        user.setPhone(phone);
        user.setPassword(encoded);
        user.setGender(0);
        user.setLevel(1);
        user.setExp(0);
        user.setTotalExp(0);
        user.setStatus(1);
        user.setRiskLevel(0);
        user.setCreatedAt(now);
        user.setUpdatedAt(now);
        userMapper.insert(user);

        Integer userId = user.getId();
        if (userId == null) {
            throw new IllegalStateException("插入用户失败：未返回主键");
        }

        Integer roleId = findRoleIdByCode(ROLE_STUDENT)
                .orElseThrow(() -> new BusinessException(500, "系统未初始化角色 student，请先执行 SQL 初始化 role 表"));

        UserRole ur = new UserRole();
        ur.setUserId(userId);
        ur.setRoleId(roleId);
        ur.setCreatedAt(now);
        userRoleMapper.insert(ur);
    }

    // 账号密码登录：解析账号 → 校验状态 → BCrypt 比对密码 → 更新活跃时间 → 签发 JWT 返回
    @Override
    public LoginResponse loginPassword(LoginPasswordRequest req) {
        User user = resolveByAccount(req.account());
        assertUserActive(user);
        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
            throw new BusinessException(401, "账号或密码错误");
        }
        long uid = user.getId().longValue();
        touchLastActive(uid);
        String token = jwtService.createToken(uid, user.getPhone(), user.getNickname());
        return new LoginResponse(token, toVo(user));
    }

    // 短信登录：验登录验证码 → 按手机号查用户 → 校验状态 → 更新活跃时间 → 签发 JWT 返回
    @Override
    public LoginResponse loginSms(LoginSmsRequest req) {
        String phone = req.phone().trim();
        smsCodeService.verifyAndConsume(phone, SCENE_LOGIN_SMS, req.code());
        User user = findByPhone(phone)
                .orElseThrow(() -> new BusinessException(404, "该手机号尚未注册，请先注册"));
        assertUserActive(user);
        long uid = user.getId().longValue();
        touchLastActive(uid);
        String token = jwtService.createToken(uid, user.getPhone(), user.getNickname());
        return new LoginResponse(token, toVo(user));
    }

    // 按手机号查单个用户（唯一索引场景，LIMIT 1）
    private Optional<User> findByPhone(String phone) {
        User one = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getPhone, phone).last("LIMIT 1")
        );
        return Optional.ofNullable(one);
    }

    // 按邮箱查单个用户；空串直接返回空
    private Optional<User> findByEmail(String email) {
        if (email == null || email.isBlank()) {
            return Optional.empty();
        }
        User one = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getEmail, email.trim()).last("LIMIT 1")
        );
        return Optional.ofNullable(one);
    }

    // 按昵称查全部（昵称可能重复，登录时需特殊处理）
    private List<User> findAllByNickname(String nickname) {
        return userMapper.selectList(new LambdaQueryWrapper<User>().eq(User::getNickname, nickname.trim()));
    }

    // 按角色编码（如 student）查 role 表主键 id
    private Optional<Integer> findRoleIdByCode(String code) {
        Role role = roleMapper.selectOne(
                new LambdaQueryWrapper<Role>().eq(Role::getCode, code).select(Role::getId).last("LIMIT 1")
        );
        return Optional.ofNullable(role).map(Role::getId);
    }

    // 登录成功时更新 user.last_active_at
    private void touchLastActive(long userId) {
        userMapper.update(
                null,
                new LambdaUpdateWrapper<User>()
                        .set(User::getLastActiveAt, new Timestamp(System.currentTimeMillis()))
                        .eq(User::getId, (int) userId)
        );
    }

    // 登录账号解析：11 位手机走手机号；含 @ 走邮箱；否则按昵称查（多条则要求换手机/邮箱）
    private User resolveByAccount(String account) {
        String a = account.trim();
        if (a.matches("^1[3-9]\\d{9}$")) {
            return findByPhone(a)
                    .orElseThrow(() -> new BusinessException(401, "账号或密码错误"));
        }
        if (a.contains("@")) {
            return findByEmail(a)
                    .orElseThrow(() -> new BusinessException(401, "账号或密码错误"));
        }
        List<User> byNick = findAllByNickname(a);
        if (byNick.isEmpty()) {
            throw new BusinessException(401, "账号或密码错误");
        }
        if (byNick.size() > 1) {
            throw new BusinessException(400, "该昵称对应多个账号，请使用手机号或邮箱登录");
        }
        return byNick.get(0);
    }

    // 要求 status=1，否则禁止登录
    private static void assertUserActive(User user) {
        if (user.getStatus() == null || user.getStatus() != 1) {
            throw new BusinessException(403, "账号已被禁用");
        }
    }

    // 脱敏/精简：只把登录后需要展示的用户字段放进 VO
    private static AuthUserVO toVo(User user) {
        return new AuthUserVO(
                user.getId().longValue(),
                user.getNickname(),
                user.getPhone()
        );
    }
}
