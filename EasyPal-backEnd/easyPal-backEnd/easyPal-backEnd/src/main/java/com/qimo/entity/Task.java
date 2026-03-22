package com.qimo.entity;

/**
 * 任务表（task）实体。
 */
public class Task {

  /** 任务ID */
  private Integer id;
  /** 任务名称 */
  private String name;
  /** 任务描述 */
  private String description;
  /** 任务类型 */
  private String taskType;
  /** 建议完成天数 */
  private Integer durationDays;
  /** 每日目标次数 */
  private Integer targetCount;
  /** 模板ID */
  private Integer templateId;
  /** 创建者ID（咨询师，counselor 表） */
  private Integer createdBy;
  /** 状态：1-进行中 2-已结束 */
  private Integer status;
  /** 开始日期 */
  private java.sql.Date startDate;
  /** 截止日期 */
  private java.sql.Date endDate;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


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


  public String getTaskType() {
    return taskType;
  }

  public void setTaskType(String taskType) {
    this.taskType = taskType;
  }


  public Integer getDurationDays() {
    return durationDays;
  }

  public void setDurationDays(Integer durationDays) {
    this.durationDays = durationDays;
  }


  public Integer getTargetCount() {
    return targetCount;
  }

  public void setTargetCount(Integer targetCount) {
    this.targetCount = targetCount;
  }


  public Integer getTemplateId() {
    return templateId;
  }

  public void setTemplateId(Integer templateId) {
    this.templateId = templateId;
  }


  public Integer getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(Integer createdBy) {
    this.createdBy = createdBy;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }


  public java.sql.Date getStartDate() {
    return startDate;
  }

  public void setStartDate(java.sql.Date startDate) {
    this.startDate = startDate;
  }


  public java.sql.Date getEndDate() {
    return endDate;
  }

  public void setEndDate(java.sql.Date endDate) {
    this.endDate = endDate;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
