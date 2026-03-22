package com.qimo.easypalbackend.entity;

/**
 * 咨询会话表（consultation_session）实体。
 */
public class ConsultationSession {

  /** 会话ID */
  private Integer id;
  /** 学生用户ID */
  private Integer userId;
  /** 咨询师ID（counselor 表） */
  private Integer counselorId;
  /** 状态：1-进行中 2-已关闭 */
  private Integer status;
  /** 未读消息数 */
  private Integer unreadCount;
  /** 最后一条消息 */
  private String lastMessage;
  /** 最后消息时间 */
  private java.sql.Timestamp lastMessageAt;
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


  public Integer getCounselorId() {
    return counselorId;
  }

  public void setCounselorId(Integer counselorId) {
    this.counselorId = counselorId;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }


  public Integer getUnreadCount() {
    return unreadCount;
  }

  public void setUnreadCount(Integer unreadCount) {
    this.unreadCount = unreadCount;
  }


  public String getLastMessage() {
    return lastMessage;
  }

  public void setLastMessage(String lastMessage) {
    this.lastMessage = lastMessage;
  }


  public java.sql.Timestamp getLastMessageAt() {
    return lastMessageAt;
  }

  public void setLastMessageAt(java.sql.Timestamp lastMessageAt) {
    this.lastMessageAt = lastMessageAt;
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
