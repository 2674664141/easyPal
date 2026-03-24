package com.qimo.easypalbackend.dto;

/**
 * 日记页红色区域统计信息（按“周”重置）。
 */
public record DiaryWeekStatsVO(
        Integer accumulatedRecords,
        Integer continuousDays,
        Integer positivePercent
) {
}

