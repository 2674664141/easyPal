package com.qimo.easypalbackend.entity;

/**
 * 任务模板表（task_template）实体。
 */
public class TaskTemplate {

  /** 模板ID */
  private Integer id;
  /** 模板名称 */
  private String name;
  /** 模板描述 */
  private String description;
  /** 任务类型 */
  private String taskType;
  /** 建议天数 */
  private Integer durationDays;
  /** 每日目标 */
  private Integer targetCount;
  /** 是否系统默认模板 */
  private Integer isDefault;
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


  public Integer getIsDefault() {
    return isDefault;
  }

  public void setIsDefault(Integer isDefault) {
    this.isDefault = isDefault;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
