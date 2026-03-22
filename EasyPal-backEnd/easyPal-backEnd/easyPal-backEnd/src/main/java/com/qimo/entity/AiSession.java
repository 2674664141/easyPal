package com.qimo.entity;

/**
 * AI 会话表（ai_session）实体。
 */
public class AiSession {

  /** 会话ID */
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 会话标题 */
  private String title;
  /** 消息总数 */
  private Integer messageCount;
  /** 最后消息时间 */
  private java.sql.Timestamp lastMessageAt;
  /** 状态：1-活跃 0-归档 */
  private Integer status;
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


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }


  public Integer getMessageCount() {
    return messageCount;
  }

  public void setMessageCount(Integer messageCount) {
    this.messageCount = messageCount;
  }


  public java.sql.Timestamp getLastMessageAt() {
    return lastMessageAt;
  }

  public void setLastMessageAt(java.sql.Timestamp lastMessageAt) {
    this.lastMessageAt = lastMessageAt;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
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
