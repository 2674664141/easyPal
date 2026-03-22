package com.qimo.entity;

/**
 * 干预记录表（intervention_record）实体。
 */
public class InterventionRecord {

  /** 主键ID */
  private Integer id;
  /** 关联预警ID */
  private Integer alertId;
  /** 学生用户ID */
  private Integer userId;
  /** 咨询师ID（counselor 表） */
  private Integer counselorId;
  /** 干预类型：1-电话联系 2-发送消息 3-预约咨询 4-线下咨询 */
  private Integer interventionType;
  /** 干预内容 */
  private String content;
  /** 干预效果 */
  private String effect;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public Integer getAlertId() {
    return alertId;
  }

  public void setAlertId(Integer alertId) {
    this.alertId = alertId;
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


  public Integer getInterventionType() {
    return interventionType;
  }

  public void setInterventionType(Integer interventionType) {
    this.interventionType = interventionType;
  }


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


  public String getEffect() {
    return effect;
  }

  public void setEffect(String effect) {
    this.effect = effect;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
