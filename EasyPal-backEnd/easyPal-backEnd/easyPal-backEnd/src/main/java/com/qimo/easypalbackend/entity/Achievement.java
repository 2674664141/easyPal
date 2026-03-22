package com.qimo.easypalbackend.entity;

/**
 * 成就表（achievement）实体。
 */
public class Achievement {

  /** 成就ID */
  private Integer id;
  /** 成就名称 */
  private String name;
  /** 成就描述 */
  private String description;
  /** 成就图标 */
  private String icon;
  /** 条件类型 */
  private String conditionType;
  /** 达成所需数值 */
  private Integer conditionValue;
  /** 奖励经验值 */
  private Integer rewardExp;
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


  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }


  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon;
  }


  public String getConditionType() {
    return conditionType;
  }

  public void setConditionType(String conditionType) {
    this.conditionType = conditionType;
  }


  public Integer getConditionValue() {
    return conditionValue;
  }

  public void setConditionValue(Integer conditionValue) {
    this.conditionValue = conditionValue;
  }


  public Integer getRewardExp() {
    return rewardExp;
  }

  public void setRewardExp(Integer rewardExp) {
    this.rewardExp = rewardExp;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
