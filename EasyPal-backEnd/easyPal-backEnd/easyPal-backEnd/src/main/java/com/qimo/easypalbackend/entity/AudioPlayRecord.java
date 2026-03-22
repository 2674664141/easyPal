package com.qimo.easypalbackend.entity;

/**
 * 音频播放记录表（audio_play_record）实体。
 */
public class AudioPlayRecord {

  /** 主键ID */
  private Integer id;
  /** 用户ID */
  private Integer userId;
  /** 音频ID */
  private Integer audioId;
  /** 播放时长（秒） */
  private Integer playDuration;
  /** 是否完整听完 */
  private Integer isCompleted;
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


  public Integer getAudioId() {
    return audioId;
  }

  public void setAudioId(Integer audioId) {
    this.audioId = audioId;
  }


  public Integer getPlayDuration() {
    return playDuration;
  }

  public void setPlayDuration(Integer playDuration) {
    this.playDuration = playDuration;
  }


  public Integer getIsCompleted() {
    return isCompleted;
  }

  public void setIsCompleted(Integer isCompleted) {
    this.isCompleted = isCompleted;
  }


  public java.sql.Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(java.sql.Timestamp createdAt) {
    this.createdAt = createdAt;
  }

}
