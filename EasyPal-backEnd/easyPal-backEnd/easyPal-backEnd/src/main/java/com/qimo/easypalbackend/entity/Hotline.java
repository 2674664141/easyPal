package com.qimo.easypalbackend.entity;

/**
 * 热线表（hotline）实体。
 */
public class Hotline {

  /** 热线ID */
  private Integer id;
  /** 热线名称 */
  private String name;
  /** 电话号码 */
  private String phone;
  /** 服务说明 */
  private String description;
  /** 服务时间 */
  private String serviceHours;
  /** 服务对象 */
  private String targetGroup;
  /** 排序 */
  private Integer sortOrder;
  /** 状态：0-下架 1-上架 */
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


  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }


  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }


  public String getServiceHours() {
    return serviceHours;
  }

  public void setServiceHours(String serviceHours) {
    this.serviceHours = serviceHours;
  }


  public String getTargetGroup() {
    return targetGroup;
  }

  public void setTargetGroup(String targetGroup) {
    this.targetGroup = targetGroup;
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
