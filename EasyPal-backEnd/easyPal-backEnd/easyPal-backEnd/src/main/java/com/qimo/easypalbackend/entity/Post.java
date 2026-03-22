package com.qimo.easypalbackend.entity;

/**
 * 帖子表（post）实体。
 */
public class Post {

  /** 帖子ID */
  private Integer id;
  /** 发布者ID */
  private Integer userId;
  /** 所属话题ID */
  private Integer topicId;
  /** 帖子内容 */
  private String content;
  /** 图片 URL 列表（JSON 格式） */
  private String images;
  /** 点赞数 */
  private Integer likeCount;
  /** 评论数 */
  private Integer commentCount;
  /** 浏览数 */
  private Integer viewCount;
  /** 是否匿名：0-实名 1-匿名 */
  private Integer isAnonymous;
  /** 状态：0-待审核 1-已发布 2-已删除 3-违规 */
  private Integer status;
  /** 是否置顶 */
  private Integer isTop;
  /** 是否精华 */
  private Integer isEssence;
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


  public Integer getTopicId() {
    return topicId;
  }

  public void setTopicId(Integer topicId) {
    this.topicId = topicId;
  }


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


  public String getImages() {
    return images;
  }

  public void setImages(String images) {
    this.images = images;
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


  public Integer getViewCount() {
    return viewCount;
  }

  public void setViewCount(Integer viewCount) {
    this.viewCount = viewCount;
  }


  public Integer getIsAnonymous() {
    return isAnonymous;
  }

  public void setIsAnonymous(Integer isAnonymous) {
    this.isAnonymous = isAnonymous;
  }


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }


  public Integer getIsTop() {
    return isTop;
  }

  public void setIsTop(Integer isTop) {
    this.isTop = isTop;
  }


  public Integer getIsEssence() {
    return isEssence;
  }

  public void setIsEssence(Integer isEssence) {
    this.isEssence = isEssence;
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
