package com.qimo.easypalbackend.service;

import com.qimo.easypalbackend.dto.MoodTodayVO;

public interface MoodService {

    // 今日是否已快速打卡；若已打卡返回 1~5，否则 null
    MoodTodayVO getTodayQuickMood(long userId);

    // 保存或更新「当日」快速打卡（同一用户同一天只保留一条 source=2）
    MoodTodayVO saveTodayQuickMood(long userId, int mood);
}
