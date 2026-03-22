package com.qimo.easypalbackend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * 情绪记录表（mood_record）实体。
 * <p>心情值 mood：1 开心 2 平静 3 一般 4 低落 5 焦虑；source：1 日记 2 首页快速打卡。</p>
 */
@TableName("mood_record")
public class MoodRecord {

  /** 主键ID */
  @TableId(type = IdType.AUTO)
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 情绪值（1-5） */
  private Integer mood;
  /** 记录日期 */
  private java.sql.Date recordDate;
  /** 来源：1-日记 2-快速打卡 */
  private Integer source;
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


  public Integer getMood() {
    return mood;
  }

  public void setMood(Integer mood) {
    this.mood = mood;
  }


  public java.sql.Date getRecordDate() {
    return recordDate;
  }

  public void setRecordDate(java.sql.Date recordDate) {
    this.recordDate = recordDate;
  }


  public Integer getSource() {
    return source;
  }

  public void setSource(Integer source) {
    this.source = source;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
