package com.qimo.entity;

/**
 * 用户角色关联表（user_role）实体。
 */
public class UserRole {

  /** 主键ID */
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 角色ID */
  private Integer roleId;
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

  public Integer getRoleId() {
    return roleId;
  }

  public void setRoleId(Integer roleId) {
    this.roleId = roleId;
  }

  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }
}
