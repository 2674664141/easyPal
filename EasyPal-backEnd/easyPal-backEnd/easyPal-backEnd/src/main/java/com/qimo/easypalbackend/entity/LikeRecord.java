package com.qimo.easypalbackend.entity;

/**
 * 点赞表（like_record）实体。
 */
public class LikeRecord {

  /** 主键ID */
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 目标类型：1-帖子 2-评论 3-日记 */
  private Integer targetType;
  /** 目标ID */
  private Integer targetId;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


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


  public Integer getTargetType() {
    return targetType;
  }

  public void setTargetType(Integer targetType) {
    this.targetType = targetType;
  }


  public Integer getTargetId() {
    return targetId;
  }

  public void setTargetId(Integer targetId) {
    this.targetId = targetId;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
