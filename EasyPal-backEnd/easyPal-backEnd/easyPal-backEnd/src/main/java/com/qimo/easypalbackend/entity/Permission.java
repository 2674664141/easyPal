package com.qimo.easypalbackend.entity;

/**
 * 权限表（permission）实体。
 */
public class Permission {

  /** 权限ID */
  private Integer id;
  /** 父权限ID */
  private Integer parentId;
  /** 权限编码（如 diary:read） */
  private String code;
  /** 权限名称 */
  private String name;
  /** 权限类型（menu/button/api） */
  private String type;
  /** 路由路径 */
  private String path;
  /** 图标 */
  private String icon;
  /** 排序 */
  private Integer sortOrder;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getParentId() {
    return parentId;
  }

  public void setParentId(Integer parentId) {
    this.parentId = parentId;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon;
  }

  public Integer getSortOrder() {
    return sortOrder;
  }

  public void setSortOrder(Integer sortOrder) {
    this.sortOrder = sortOrder;
  }

  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }
}
