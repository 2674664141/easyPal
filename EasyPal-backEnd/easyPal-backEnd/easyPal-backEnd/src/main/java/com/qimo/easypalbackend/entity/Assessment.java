package com.qimo.easypalbackend.entity;

/**
 * 测评量表表（assessment）实体。
 */
public class Assessment {

  /** 量表ID */
  private Integer id;
  /** 量表名称 */
  private String name;
  /** 量表描述 */
  private String description;
  /** 分类 */
  private String category;
  /** 题目数量 */
  private Integer questionCount;
  /** 预计时长（分钟） */
  private Integer estimatedTime;
  /** 封面图 */
  private String coverImage;
  /** 难度：1-简单 2-中等 3-复杂 */
  private Integer difficulty;
  /** 状态：0-下架 1-上架 */
  private Integer status;
  /** 排序 */
  private Integer sortOrder;
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


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }


  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }


  public Integer getQuestionCount() {
    return questionCount;
  }

  public void setQuestionCount(Integer questionCount) {
    this.questionCount = questionCount;
  }


  public Integer getEstimatedTime() {
    return estimatedTime;
  }

  public void setEstimatedTime(Integer estimatedTime) {
    this.estimatedTime = estimatedTime;
  }


  public String getCoverImage() {
    return coverImage;
  }

  public void setCoverImage(String coverImage) {
    this.coverImage = coverImage;
  }


  public Integer getDifficulty() {
    return difficulty;
  }

  public void setDifficulty(Integer difficulty) {
    this.difficulty = difficulty;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
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


  public java.sql.Timestamp getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(java.sql.Timestamp updatedAt) {
    this.updatedAt = updatedAt;
  }

}
