package com.qimo.entity;

/**
 * 用户任务表（user_task）实体。
 */
public class UserTask {

  /** 主键ID */
  private Integer id;
  /** 任务ID */
  private Integer taskId;
  /** 用户ID */
  private Integer userId;
  /** 状态：0-进行中 1-已完成 2-已放弃 */
  private Integer status;
  /** 已完成天数 */
  private Integer completedDays;
  /** 开始日期 */
  private java.sql.Date startDate;
  /** 完成时间 */
  private java.sql.Timestamp completedAt;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public Integer getTaskId() {
    return taskId;
  }

  public void setTaskId(Integer taskId) {
    this.taskId = taskId;
  }


  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }


  public Integer getCompletedDays() {
    return completedDays;
  }

  public void setCompletedDays(Integer completedDays) {
    this.completedDays = completedDays;
  }


  public java.sql.Date getStartDate() {
    return startDate;
  }

  public void setStartDate(java.sql.Date startDate) {
    this.startDate = startDate;
  }


  public java.sql.Timestamp getCompletedAt() {
    return completedAt;
  }

  public void setCompletedAt(java.sql.Timestamp completedAt) {
    this.completedAt = completedAt;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
