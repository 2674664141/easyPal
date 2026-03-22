package com.qimo.entity;

/**
 * 求助记录表（help_request）实体。
 */
public class HelpRequest {

  /** 主键ID */
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 求助类型：1-拨打热线 2-联系咨询师 */
  private Integer requestType;
  /** 热线ID 或 咨询师ID */
  private Integer targetId;
  /** 状态：0-已发起 1-已接通/已响应 2-已完成 */
  private Integer status;
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


  public Integer getRequestType() {
    return requestType;
  }

  public void setRequestType(Integer requestType) {
    this.requestType = requestType;
  }


  public Integer getTargetId() {
    return targetId;
  }

  public void setTargetId(Integer targetId) {
    this.targetId = targetId;
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
