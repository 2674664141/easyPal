package com.qimo.entity;

/**
 * 任务完成记录表（task_completion）实体。
 */
public class TaskCompletion {

  /** 主键ID */
  private Integer id;
  /** 用户任务ID */
  private Integer userTaskId;
  /** 完成日期 */
  private java.sql.Date completionDate;
  /** 完成次数 */
  private Integer countValue;
  /** 备注 */
  private String notes;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public Integer getUserTaskId() {
    return userTaskId;
  }

  public void setUserTaskId(Integer userTaskId) {
    this.userTaskId = userTaskId;
  }


  public java.sql.Date getCompletionDate() {
    return completionDate;
  }

  public void setCompletionDate(java.sql.Date completionDate) {
    this.completionDate = completionDate;
  }


  public Integer getCountValue() {
    return countValue;
  }

  public void setCountValue(Integer countValue) {
    this.countValue = countValue;
  }


  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
