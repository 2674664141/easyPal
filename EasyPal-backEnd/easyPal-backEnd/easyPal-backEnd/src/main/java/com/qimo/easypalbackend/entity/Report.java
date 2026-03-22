package com.qimo.easypalbackend.entity;

/**
 * 举报表（report）实体。
 */
public class Report {

  /** 主键ID */
  private Integer id;
  /** 举报人ID */
  private Integer reporterId;
  /** 目标类型：1-帖子 2-评论 3-日记 4-用户 */
  private Integer targetType;
  /** 目标ID */
  private Integer targetId;
  /** 举报原因 */
  private String reason;
  /** 状态：0-待处理 1-已处理 2-驳回 */
  private Integer status;
  /** 处理人ID */
  private Integer handlerId;
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


  public Integer getReporterId() {
    return reporterId;
  }

  public void setReporterId(Integer reporterId) {
    this.reporterId = reporterId;
  }


  public Integer getTargetType() {
    return targetType;
  }

  public void setTargetType(Integer targetType) {
    this.targetType = targetType;
  }


  public Integer getTargetId() {
    return targetId;
  }

  public void setTargetId(Integer targetId) {
    this.targetId = targetId;
  }


  public String getReason() {
    return reason;
  }

  public void setReason(String reason) {
    this.reason = reason;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }


  public Integer getHandlerId() {
    return handlerId;
  }

  public void setHandlerId(Integer handlerId) {
    this.handlerId = handlerId;
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
