package com.qimo.easypalbackend.entity;

/**
 * 用户统计表（user_statistics）实体。
 */
public class UserStatistics {

  /** 主键ID */
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 统计日期 */
  private java.sql.Date statDate;
  /** 日记数 */
  private Integer diaryCount;
  /** 平均情绪值 */
  private double moodAvg;
  /** AI 对话数 */
  private Integer aiMessageCount;
  /** 发帖数 */
  private Integer postCount;
  /** 评论数 */
  private Integer commentCount;
  /** 获得点赞数 */
  private Integer likeReceived;
  /** 获得温暖数 */
  private Integer warmthReceived;
  /** 累计签到天数 */
  private Integer checkInDays;
  /** 连续签到天数 */
  private Integer continuousDays;
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


  public java.sql.Date getStatDate() {
    return statDate;
  }

  public void setStatDate(java.sql.Date statDate) {
    this.statDate = statDate;
  }


  public Integer getDiaryCount() {
    return diaryCount;
  }

  public void setDiaryCount(Integer diaryCount) {
    this.diaryCount = diaryCount;
  }


  public double getMoodAvg() {
    return moodAvg;
  }

  public void setMoodAvg(double moodAvg) {
    this.moodAvg = moodAvg;
  }


  public Integer getAiMessageCount() {
    return aiMessageCount;
  }

  public void setAiMessageCount(Integer aiMessageCount) {
    this.aiMessageCount = aiMessageCount;
  }


  public Integer getPostCount() {
    return postCount;
  }

  public void setPostCount(Integer postCount) {
    this.postCount = postCount;
  }


  public Integer getCommentCount() {
    return commentCount;
  }

  public void setCommentCount(Integer commentCount) {
    this.commentCount = commentCount;
  }


  public Integer getLikeReceived() {
    return likeReceived;
  }

  public void setLikeReceived(Integer likeReceived) {
    this.likeReceived = likeReceived;
  }


  public Integer getWarmthReceived() {
    return warmthReceived;
  }

  public void setWarmthReceived(Integer warmthReceived) {
    this.warmthReceived = warmthReceived;
  }


  public Integer getCheckInDays() {
    return checkInDays;
  }

  public void setCheckInDays(Integer checkInDays) {
    this.checkInDays = checkInDays;
  }


  public Integer getContinuousDays() {
    return continuousDays;
  }

  public void setContinuousDays(Integer continuousDays) {
    this.continuousDays = continuousDays;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
