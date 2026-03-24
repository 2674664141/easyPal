package com.qimo.easypalbackend.service;

import com.qimo.easypalbackend.dto.DiaryEntryVO;
import com.qimo.easypalbackend.dto.DiaryListResponse;
import com.qimo.easypalbackend.dto.DiaryRecordRequest;
import com.qimo.easypalbackend.dto.DiaryWeekStatsVO;

import java.time.LocalDate;
import java.util.List;

public interface DiaryService {

    // 写/更新日记（按用户 + diaryDate 维度最多一条）
    Integer recordDiary(long userId, DiaryRecordRequest req);

    // 根据日期查询日记列表
    List<DiaryEntryVO> getDiariesByDate(long userId, LocalDate date);

    // 根据日期区间查询日记列表（含起止）
    List<DiaryEntryVO> getDiariesByDateRange(long userId, LocalDate startDate, LocalDate endDate);

    // 分页拉取日记列表（用于滚动加载）
    DiaryListResponse listDiaries(long userId, int pageNo, int pageSize);

    // 红色统计：按周重置
    DiaryWeekStatsVO getWeekStats(long userId, LocalDate today);
}

