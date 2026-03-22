package com.qimo.easypalbackend.entity;

/**
 * 评论表（comment）实体。
 */
public class Comment {

  /** 评论ID */
  private Integer id;
  /** 帖子ID */
  private Integer postId;
  /** 评论者ID */
  private Integer userId;
  /** 父评论ID */
  private Integer parentId;
  /** 评论内容 */
  private String content;
  /** 点赞数 */
  private Integer likeCount;
  /** 状态：0-待审核 1-正常 2-已删除 */
  private Integer status;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public Integer getPostId() {
    return postId;
  }

  public void setPostId(Integer postId) {
    this.postId = postId;
  }


  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }


  public Integer getParentId() {
    return parentId;
  }

  public void setParentId(Integer parentId) {
    this.parentId = parentId;
  }


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
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


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
