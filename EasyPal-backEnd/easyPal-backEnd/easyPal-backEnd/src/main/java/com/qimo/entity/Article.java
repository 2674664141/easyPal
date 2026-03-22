package com.qimo.entity;

/**
 * 文章表（article）实体。
 */
public class Article {

  /** 文章ID */
  private Integer id;
  /** 标题 */
  private String title;
  /** 摘要 */
  private String summary;
  /** 文章内容 */
  private String content;
  /** 封面图 */
  private String coverImage;
  /** 分类 */
  private String category;
  /** 作者ID（咨询师，对应 user 表） */
  private Integer authorId;
  /** 作者名称 */
  private String authorName;
  /** 浏览量 */
  private Integer viewCount;
  /** 点赞数 */
  private Integer likeCount;
  /** 是否推荐 */
  private Integer isRecommended;
  /** 状态：0-待审核 1-已发布 2-已拒绝 3-下架 */
  private Integer status;
  /** 发布时间 */
  private java.sql.Timestamp publishedAt;
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


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }


  public String getSummary() {
    return summary;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


  public String getCoverImage() {
    return coverImage;
  }

  public void setCoverImage(String coverImage) {
    this.coverImage = coverImage;
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


  public Integer getIsRecommended() {
    return isRecommended;
  }

  public void setIsRecommended(Integer isRecommended) {
    this.isRecommended = isRecommended;
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


  public java.sql.Timestamp getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(java.sql.Timestamp updatedAt) {
    this.updatedAt = updatedAt;
  }

}
