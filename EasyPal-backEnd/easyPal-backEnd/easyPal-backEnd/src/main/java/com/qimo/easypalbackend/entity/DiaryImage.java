package com.qimo.easypalbackend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * 日记图片表（diary_image）实体。
 */
@TableName("diary_image")
public class DiaryImage {

  /** 主键ID */
  @TableId(type = IdType.AUTO)
  private Integer id;
  /** 日记ID */
  private Integer diaryId;
  /** 图片 URL */
  private String imageUrl;
  /** 排序顺序 */
  private Integer sortOrder;
  /** 创建时间 */
  private java.sql.Timestamp createdAt;


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }


  public Integer getDiaryId() {
    return diaryId;
  }

  public void setDiaryId(Integer diaryId) {
    this.diaryId = diaryId;
  }


  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
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
