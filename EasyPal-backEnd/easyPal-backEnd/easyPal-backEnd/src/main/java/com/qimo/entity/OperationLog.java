package com.qimo.entity;

/**
 * 操作日志表（operation_log）实体。
 */
public class OperationLog {

  /** 日志ID */
  private Integer id;
  /** 操作人ID */
  private Integer userId;
  /** 用户类型：1-学生 2-咨询师 3-管理员 */
  private Integer userType;
  /** 操作模块 */
  private String module;
  /** 操作类型 */
  private String action;
  /** 目标类型 */
  private String targetType;
  /** 目标ID */
  private Integer targetId;
  /** 旧值快照（JSON 格式） */
  private String oldValue;
  /** 新值快照（JSON 格式） */
  private String newValue;
  /** IP 地址 */
  private String ipAddress;
  /** 设备信息 */
  private String userAgent;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


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


  public Integer getUserType() {
    return userType;
  }

  public void setUserType(Integer userType) {
    this.userType = userType;
  }


  public String getModule() {
    return module;
  }

  public void setModule(String module) {
    this.module = module;
  }


  public String getAction() {
    return action;
  }

  public void setAction(String action) {
    this.action = action;
  }


  public String getTargetType() {
    return targetType;
  }

  public void setTargetType(String targetType) {
    this.targetType = targetType;
  }


  public Integer getTargetId() {
    return targetId;
  }

  public void setTargetId(Integer targetId) {
    this.targetId = targetId;
  }


  public String getOldValue() {
    return oldValue;
  }

  public void setOldValue(String oldValue) {
    this.oldValue = oldValue;
  }


  public String getNewValue() {
    return newValue;
  }

  public void setNewValue(String newValue) {
    this.newValue = newValue;
  }


  public String getIpAddress() {
    return ipAddress;
  }

  public void setIpAddress(String ipAddress) {
    this.ipAddress = ipAddress;
  }


  public String getUserAgent() {
    return userAgent;
  }

  public void setUserAgent(String userAgent) {
    this.userAgent = userAgent;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
