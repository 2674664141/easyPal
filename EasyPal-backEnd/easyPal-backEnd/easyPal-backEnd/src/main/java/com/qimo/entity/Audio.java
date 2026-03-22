package com.qimo.entity;

/**
 * 音频表（audio）实体。
 */
public class Audio {

  /** 音频ID */
  private Integer id;
  /** 音频标题 */
  private String title;
  /** 描述 */
  private String description;
  /** 封面图 */
  private String coverImage;
  /** 音频文件 URL */
  private String audioUrl;
  /** 时长（秒） */
  private Integer duration;
  /** 分类 */
  private String category;
  /** 发布者ID（咨询师，对应 user 表） */
  private Integer authorId;
  /** 发布者名称 */
  private String authorName;
  /** 播放次数 */
  private Integer playCount;
  /** 点赞数 */
  private Integer likeCount;
  /** 状态：0-待审核 1-已发布 2-已拒绝 */
  private Integer status;
  /** 发布时间 */
  private java.sql.Timestamp publishedAt;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }


  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }


  public String getCoverImage() {
    return coverImage;
  }

  public void setCoverImage(String coverImage) {
    this.coverImage = coverImage;
  }


  public String getAudioUrl() {
    return audioUrl;
  }

  public void setAudioUrl(String audioUrl) {
    this.audioUrl = audioUrl;
  }


  public Integer getDuration() {
    return duration;
  }

  public void setDuration(Integer duration) {
    this.duration = duration;
  }


  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }


  public Integer getAuthorId() {
    return authorId;
  }

  public void setAuthorId(Integer authorId) {
    this.authorId = authorId;
  }


  public String getAuthorName() {
    return authorName;
  }

  public void setAuthorName(String authorName) {
    this.authorName = authorName;
  }


  public Integer getPlayCount() {
    return playCount;
  }

  public void setPlayCount(Integer playCount) {
    this.playCount = playCount;
  }


  public Integer getLikeCount() {
    return likeCount;
  }

  public void setLikeCount(Integer likeCount) {
    this.likeCount = likeCount;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }


  public java.sql.Timestamp getPublishedAt() {
    return publishedAt;
  }

  public void setPublishedAt(java.sql.Timestamp publishedAt) {
    this.publishedAt = publishedAt;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
