package com.qimo.easypalbackend.entity;

/**
 * 咨询消息表（consultation_message）实体。
 */
public class ConsultationMessage {

  /** 消息ID */
  private Integer id;
  /** 会话ID */
  private Integer sessionId;
  /** 发送者ID */
  private Integer senderId;
  /** 发送者类型：1-学生 2-咨询师 */
  private Integer senderType;
  /** 消息内容 */
  private String content;
  /** 内容类型：1-文本 2-图片 3-语音 */
  private Integer contentType;
  /** 是否已读 */
  private Integer isRead;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public Integer getSessionId() {
    return sessionId;
  }

  public void setSessionId(Integer sessionId) {
    this.sessionId = sessionId;
  }


  public Integer getSenderId() {
    return senderId;
  }

  public void setSenderId(Integer senderId) {
    this.senderId = senderId;
  }


  public Integer getSenderType() {
    return senderType;
  }

  public void setSenderType(Integer senderType) {
    this.senderType = senderType;
  }


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


  public Integer getContentType() {
    return contentType;
  }

  public void setContentType(Integer contentType) {
    this.contentType = contentType;
  }


  public Integer getIsRead() {
    return isRead;
  }

  public void setIsRead(Integer isRead) {
    this.isRead = isRead;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
