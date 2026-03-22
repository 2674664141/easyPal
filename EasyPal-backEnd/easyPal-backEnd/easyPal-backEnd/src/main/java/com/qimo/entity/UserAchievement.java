package com.qimo.entity;

/**
 * 用户成就表（user_achievement）实体。
 */
public class UserAchievement {

  /** 主键ID */
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 成就ID */
  private Integer achievementId;
  /** 获得时间 */
  private java.sql.Timestamp achievedAt;


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


  public Integer getAchievementId() {
    return achievementId;
  }

  public void setAchievementId(Integer achievementId) {
    this.achievementId = achievementId;
  }


  public java.sql.Timestamp getAchievedAt() {
    return achievedAt;
  }

  public void setAchievedAt(java.sql.Timestamp achievedAt) {
    this.achievedAt = achievedAt;
  }

}
