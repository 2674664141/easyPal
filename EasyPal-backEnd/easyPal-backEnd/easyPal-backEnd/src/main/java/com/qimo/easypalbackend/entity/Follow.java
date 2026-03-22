package com.qimo.easypalbackend.entity;

/**
 * 关注表（follow）实体。
 */
public class Follow {

  /** 主键ID */
  private Integer id;
  /** 关注者ID */
  private Integer userId;
  /** 被关注者ID */
  private Integer followUserId;
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


  public Integer getFollowUserId() {
    return followUserId;
  }

  public void setFollowUserId(Integer followUserId) {
    this.followUserId = followUserId;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
