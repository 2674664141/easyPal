package com.qimo.easypalbackend.entity;

/**
 * 日记表（diary）实体。
 */
public class Diary {

  /** 日记ID */
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 日记内容 */
  private String content;
  /** 情绪：1-开心 2-平静 3-一般 4-低落 5-焦虑 */
  private Integer mood;
  /** 天气：1-晴天 2-阴天 3-雨天 4-雪天 */
  private Integer weather;
  /** 是否公开：0-仅自己可见 1-公开 */
  private Integer isPublic;
  /** 浏览数 */
  private Integer viewCount;
  /** 点赞数 */
  private Integer likeCount;
  /** 评论数 */
  private Integer commentCount;
  /** 日记对应日期 */
  private java.sql.Date diaryDate;
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


  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


  public Integer getMood() {
    return mood;
  }

  public void setMood(Integer mood) {
    this.mood = mood;
  }


  public Integer getWeather() {
    return weather;
  }

  public void setWeather(Integer weather) {
    this.weather = weather;
  }


  public Integer getIsPublic() {
    return isPublic;
  }

  public void setIsPublic(Integer isPublic) {
    this.isPublic = isPublic;
  }


  public Integer getViewCount() {
    return viewCount;
  }

  public void setViewCount(Integer viewCount) {
    this.viewCount = viewCount;
  }


  public Integer getLikeCount() {
    return likeCount;
  }

  public void setLikeCount(Integer likeCount) {
    this.likeCount = likeCount;
  }


  public Integer getCommentCount() {
    return commentCount;
  }

  public void setCommentCount(Integer commentCount) {
    this.commentCount = commentCount;
  }


  public java.sql.Date getDiaryDate() {
    return diaryDate;
  }

  public void setDiaryDate(java.sql.Date diaryDate) {
    this.diaryDate = diaryDate;
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
