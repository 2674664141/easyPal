package com.qimo.entity;

/**
 * 咨询师表（counselor），关联 user 表。
 */
public class Counselor {

  /** 咨询师ID */
  private Integer id;
  /** 关联 user 表 ID */
  private Integer userId;
  /** 真实姓名 */
  private String realName;
  /** 职称 */
  private String title;
  /** 所属部门 */
  private String department;
  /** 擅长领域 */
  private String expertise;
  /** 资格证书 */
  private String qualification;
  /** 个人简介 */
  private String introduction;
  /** 头像 */
  private String avatar;
  /** 联系电话 */
  private String phone;
  /** 邮箱 */
  private String email;
  /** 状态：0-停用 1-在职 2-待审核 */
  private Integer status;
  /** 在线状态：0-离线 1-在线 */
  private Integer onlineStatus;
  /** 负责学生数 */
  private Integer studentCount;
  /** 处理预警数 */
  private Integer alertHandled;
  /** 发布文章数 */
  private Integer articleCount;
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


  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }


  public String getRealName() {
    return realName;
  }

  public void setRealName(String realName) {
    this.realName = realName;
  }


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }


  public String getDepartment() {
    return department;
  }

  public void setDepartment(String department) {
    this.department = department;
  }


  public String getExpertise() {
    return expertise;
  }

  public void setExpertise(String expertise) {
    this.expertise = expertise;
  }


  public String getQualification() {
    return qualification;
  }

  public void setQualification(String qualification) {
    this.qualification = qualification;
  }


  public String getIntroduction() {
    return introduction;
  }

  public void setIntroduction(String introduction) {
    this.introduction = introduction;
  }


  public String getAvatar() {
    return avatar;
  }

  public void setAvatar(String avatar) {
    this.avatar = avatar;
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


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }


  public Integer getOnlineStatus() {
    return onlineStatus;
  }

  public void setOnlineStatus(Integer onlineStatus) {
    this.onlineStatus = onlineStatus;
  }


  public Integer getStudentCount() {
    return studentCount;
  }

  public void setStudentCount(Integer studentCount) {
    this.studentCount = studentCount;
  }


  public Integer getAlertHandled() {
    return alertHandled;
  }

  public void setAlertHandled(Integer alertHandled) {
    this.alertHandled = alertHandled;
  }


  public Integer getArticleCount() {
    return articleCount;
  }

  public void setArticleCount(Integer articleCount) {
    this.articleCount = articleCount;
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
