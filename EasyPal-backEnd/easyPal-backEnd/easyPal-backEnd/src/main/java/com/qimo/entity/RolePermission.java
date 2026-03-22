package com.qimo.entity;

/**
 * 角色权限关联表（role_permission）实体。
 */
public class RolePermission {

  /** 主键ID */
  private Integer id;
  /** 角色ID */
  private Integer roleId;
  /** 权限ID */
  private Integer permissionId;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getRoleId() {
    return roleId;
  }

  public void setRoleId(Integer roleId) {
    this.roleId = roleId;
  }

  public Integer getPermissionId() {
    return permissionId;
  }

  public void setPermissionId(Integer permissionId) {
    this.permissionId = permissionId;
  }

  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }
}
