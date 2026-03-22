package com.qimo.entity;

/**
 * 测评会话表（assessment_session）实体。
 */
public class AssessmentSession {

  /** 会话ID */
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 量表ID */
  private Integer assessmentId;
  /** 状态：0-进行中 1-已完成 */
  private Integer status;
  /** 开始时间 */
  private java.sql.Timestamp startedAt;
  /** 完成时间 */
  private java.sql.Timestamp completedAt;
  /** 总分 */
  private Integer totalScore;
  /** 结果等级 */
  private String resultLevel;
  /** 结果解读 */
  private String resultSummary;


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


  public Integer getAssessmentId() {
    return assessmentId;
  }

  public void setAssessmentId(Integer assessmentId) {
    this.assessmentId = assessmentId;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }


  public java.sql.Timestamp getStartedAt() {
    return startedAt;
  }

  public void setStartedAt(java.sql.Timestamp startedAt) {
    this.startedAt = startedAt;
  }


  public java.sql.Timestamp getCompletedAt() {
    return completedAt;
  }

  public void setCompletedAt(java.sql.Timestamp completedAt) {
    this.completedAt = completedAt;
  }


  public Integer getTotalScore() {
    return totalScore;
  }

  public void setTotalScore(Integer totalScore) {
    this.totalScore = totalScore;
  }


  public String getResultLevel() {
    return resultLevel;
  }

  public void setResultLevel(String resultLevel) {
    this.resultLevel = resultLevel;
  }


  public String getResultSummary() {
    return resultSummary;
  }

  public void setResultSummary(String resultSummary) {
    this.resultSummary = resultSummary;
  }

}
