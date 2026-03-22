package com.qimo.easypalbackend.entity;

/**
 * 用户等级表（user_level）实体。
 */
public class UserLevel {

  /** 等级ID */
  private Integer id;
  /** 等级数字 */
  private Integer level;
  /** 等级名称 */
  private String name;
  /** 所需最小经验值 */
  private Integer minExp;
  /** 所需最大经验值 */
  private Integer maxExp;
  /** 等级图标 */
  private String icon;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public Integer getLevel() {
    return level;
  }

  public void setLevel(Integer level) {
    this.level = level;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public Integer getMinExp() {
    return minExp;
  }

  public void setMinExp(Integer minExp) {
    this.minExp = minExp;
  }


  public Integer getMaxExp() {
    return maxExp;
  }

  public void setMaxExp(Integer maxExp) {
    this.maxExp = maxExp;
  }


  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
