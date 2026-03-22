package com.qimo.easypalbackend.entity;

/**
 * 话题表（topic）实体。
 */
public class Topic {

  /** 话题ID */
  private Integer id;
  /** 话题名称 */
  private String name;
  /** 话题图标 */
  private String icon;
  /** 帖子数 */
  private Integer postCount;
  /** 关注数 */
  private Integer followCount;
  /** 排序 */
  private Integer sortOrder;
  /** 状态：0-禁用 1-启用 */
  private Integer status;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon;
  }


  public Integer getPostCount() {
    return postCount;
  }

  public void setPostCount(Integer postCount) {
    this.postCount = postCount;
  }


  public Integer getFollowCount() {
    return followCount;
  }

  public void setFollowCount(Integer followCount) {
    this.followCount = followCount;
  }


  public Integer getSortOrder() {
    return sortOrder;
  }

  public void setSortOrder(Integer sortOrder) {
    this.sortOrder = sortOrder;
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
