package com.qimo.entity;

/**
 * 用户表（user）实体。
 */
public class User {

  /** 用户ID */
  private Integer id;
  /** 微信 open_id */
  private String openId;
  /** 昵称 */
  private String nickname;
  /** 手机号 */
  private String phone;
  /** QQ 邮箱/邮箱地址 */
  private String email;
  /** 加密密码 */
  private String password;
  /** 头像 URL */
  private String avatar;
  /** 性别：0-未知 1-男 2-女 */
  private Integer gender;
  /** 生日 */
  private java.sql.Date birthday;
  /** 学院 */
  private String college;
  /** 年级 */
  private String grade;
  /** 学号 */
  private String studentId;
  /** 等级 */
  private Integer level;
  /** 当前等级经验值 */
  private Integer exp;
  /** 累计经验值 */
  private Integer totalExp;
  /** 角色：1-学生 2-咨询师 3-管理员 */
  private Integer role;
  /** 状态：0-禁用 1-正常 */
  private Integer status;
  /** 风险等级：0-低风险 1-中风险 2-高风险 */
  private Integer riskLevel;
  /** 负责的咨询师 ID */
  private Integer counselorId;
  /** 最后活跃时间 */
  private java.sql.Timestamp lastActiveAt;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;
  /** 更新时间 */
  private java.sql.Timestamp updatedAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public String getOpenId() {
    return openId;
  }

  public void setOpenId(String openId) {
    this.openId = openId;
  }


  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }


  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }


  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }


  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }


  public String getAvatar() {
    return avatar;
  }

  public void setAvatar(String avatar) {
    this.avatar = avatar;
  }


  public Integer getGender() {
    return gender;
  }

  public void setGender(Integer gender) {
    this.gender = gender;
  }


  public java.sql.Date getBirthday() {
    return birthday;
  }

  public void setBirthday(java.sql.Date birthday) {
    this.birthday = birthday;
  }


  public String getCollege() {
    return college;
  }

  public void setCollege(String college) {
    this.college = college;
  }


  public String getGrade() {
    return grade;
  }

  public void setGrade(String grade) {
    this.grade = grade;
  }


  public String getStudentId() {
    return studentId;
  }

  public void setStudentId(String studentId) {
    this.studentId = studentId;
  }


  public Integer getLevel() {
    return level;
  }

  public void setLevel(Integer level) {
    this.level = level;
  }


  public Integer getExp() {
    return exp;
  }

  public void setExp(Integer exp) {
    this.exp = exp;
  }


  public Integer getTotalExp() {
    return totalExp;
  }

  public void setTotalExp(Integer totalExp) {
    this.totalExp = totalExp;
  }


  public Integer getRole() {
    return role;
  }

  public void setRole(Integer role) {
    this.role = role;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }


  public Integer getRiskLevel() {
    return riskLevel;
  }

  public void setRiskLevel(Integer riskLevel) {
    this.riskLevel = riskLevel;
  }


  public Integer getCounselorId() {
    return counselorId;
  }

  public void setCounselorId(Integer counselorId) {
    this.counselorId = counselorId;
  }


  public java.sql.Timestamp getLastActiveAt() {
    return lastActiveAt;
  }

  public void setLastActiveAt(java.sql.Timestamp lastActiveAt) {
    this.lastActiveAt = lastActiveAt;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }


  public java.sql.Timestamp getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(java.sql.Timestamp updatedAt) {
    this.updatedAt = updatedAt;
  }

}
