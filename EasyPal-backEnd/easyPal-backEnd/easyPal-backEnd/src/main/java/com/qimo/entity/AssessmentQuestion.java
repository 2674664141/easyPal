package com.qimo.entity;

/**
 * 测评题目表（assessment_question）实体。
 */
public class AssessmentQuestion {

  /** 题目ID */
  private Integer id;
  /** 所属量表ID */
  private Integer assessmentId;
  /** 题目内容 */
  private String content;
  /** 题型：1-单选 2-多选 3-评分 */
  private Integer questionType;
  /** 选项列表（JSON 格式） */
  private String options;
  /** 各选项分值映射（JSON 格式） */
  private String scoreRange;
  /** 题目排序 */
  private Integer sortOrder;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public Integer getAssessmentId() {
    return assessmentId;
  }

  public void setAssessmentId(Integer assessmentId) {
    this.assessmentId = assessmentId;
  }


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


  public Integer getQuestionType() {
    return questionType;
  }

  public void setQuestionType(Integer questionType) {
    this.questionType = questionType;
  }


  public String getOptions() {
    return options;
  }

  public void setOptions(String options) {
    this.options = options;
  }


  public String getScoreRange() {
    return scoreRange;
  }

  public void setScoreRange(String scoreRange) {
    this.scoreRange = scoreRange;
  }


  public Integer getSortOrder() {
    return sortOrder;
  }

  public void setSortOrder(Integer sortOrder) {
    this.sortOrder = sortOrder;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
