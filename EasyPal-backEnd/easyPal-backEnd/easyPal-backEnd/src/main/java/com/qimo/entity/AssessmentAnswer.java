package com.qimo.entity;

/**
 * 测评答案表（assessment_answer）实体。
 */
public class AssessmentAnswer {

  /** 主键ID */
  private Integer id;
  /** 会话ID */
  private Integer sessionId;
  /** 题目ID */
  private Integer questionId;
  /** 答案值 */
  private String answerValue;
  /** 本题得分 */
  private Integer score;
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


  public Integer getQuestionId() {
    return questionId;
  }

  public void setQuestionId(Integer questionId) {
    this.questionId = questionId;
  }


  public String getAnswerValue() {
    return answerValue;
  }

  public void setAnswerValue(String answerValue) {
    this.answerValue = answerValue;
  }


  public Integer getScore() {
    return score;
  }

  public void setScore(Integer score) {
    this.score = score;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
