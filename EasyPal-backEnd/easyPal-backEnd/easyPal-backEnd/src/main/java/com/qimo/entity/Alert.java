package com.qimo.entity;

/**
 * 预警记录表（alert）实体。
 */
public class Alert {

  /** 预警ID */
  private Integer id;
  /** 学生用户ID */
  private Integer userId;
  /** 负责咨询师ID（counselor 表） */
  private Integer counselorId;
  /** 风险等级：1-低风险 2-中风险 3-高风险 */
  private Integer riskLevel;
  /** 预警类型 */
  private String alertType;
  /** 触发原因详情 */
  private String triggerReason;
  /** 触发时的数据快照（JSON 格式） */
  private String triggerData;
  /** 状态：0-待处理 1-处理中 2-已处理 3-已忽略 */
  private Integer status;
  /** 处理人ID（咨询师，counselor 表） */
  private Integer handledBy;
  /** 处理备注 */
  private String handleNote;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;
  /** 处理时间 */
  private java.sql.Timestamp handledAt;


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


  public Integer getCounselorId() {
    return counselorId;
  }

  public void setCounselorId(Integer counselorId) {
    this.counselorId = counselorId;
  }


  public Integer getRiskLevel() {
    return riskLevel;
  }

  public void setRiskLevel(Integer riskLevel) {
    this.riskLevel = riskLevel;
  }


  public String getAlertType() {
    return alertType;
  }

  public void setAlertType(String alertType) {
    this.alertType = alertType;
  }


  public String getTriggerReason() {
    return triggerReason;
  }

  public void setTriggerReason(String triggerReason) {
    this.triggerReason = triggerReason;
  }


  public String getTriggerData() {
    return triggerData;
  }

  public void setTriggerData(String triggerData) {
    this.triggerData = triggerData;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }


  public Integer getHandledBy() {
    return handledBy;
  }

  public void setHandledBy(Integer handledBy) {
    this.handledBy = handledBy;
  }


  public String getHandleNote() {
    return handleNote;
  }

  public void setHandleNote(String handleNote) {
    this.handleNote = handleNote;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }


  public java.sql.Timestamp getHandledAt() {
    return handledAt;
  }

  public void setHandledAt(java.sql.Timestamp handledAt) {
    this.handledAt = handledAt;
  }

}
