package com.qimo.entity;

/**
 * 角色表（role）实体。
 */
public class Role {

  /** 角色ID */
  private Integer id;
  /** 角色编码（student/counselor/admin） */
  private String code;
  /** 角色名称 */
  private String name;
  /** 角色描述 */
  private String description;
  /** 角色等级（数值越大权限越高） */
  private Integer level;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
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

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getLevel() {
    return level;
  }

  public void setLevel(Integer level) {
    this.level = level;
  }

  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }
}
