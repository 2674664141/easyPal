package com.qimo.easypalbackend.entity;

/**
 * 签到记录表（check_in）实体。
 */
public class CheckIn {

  /** 主键ID */
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 签到日期 */
  private java.sql.Date checkInDate;
  /** 连续签到天数 */
  private Integer continuousDays;
  /** 获得经验值 */
  private Integer rewardExp;
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


  public java.sql.Date getCheckInDate() {
    return checkInDate;
  }

  public void setCheckInDate(java.sql.Date checkInDate) {
    this.checkInDate = checkInDate;
  }


  public Integer getContinuousDays() {
    return continuousDays;
  }

  public void setContinuousDays(Integer continuousDays) {
    this.continuousDays = continuousDays;
  }


  public Integer getRewardExp() {
    return rewardExp;
  }

  public void setRewardExp(Integer rewardExp) {
    this.rewardExp = rewardExp;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
