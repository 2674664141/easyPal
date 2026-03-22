package com.qimo.easypalbackend.entity;

/**
 * AI 消息表（ai_message）实体。
 */
public class AiMessage {

  /** 主键ID */
  private Integer id;
  /** 会话ID */
  private Integer sessionId;
  /** 角色：1-用户 2-AI助手 */
  private Integer role;
  /** 消息内容 */
  private String content;
  /** AI 分析的情绪标签（JSON 格式） */
  private String emotionAnalysis;
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


  public Integer getRole() {
    return role;
  }

  public void setRole(Integer role) {
    this.role = role;
  }


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


  public String getEmotionAnalysis() {
    return emotionAnalysis;
  }

  public void setEmotionAnalysis(String emotionAnalysis) {
    this.emotionAnalysis = emotionAnalysis;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
