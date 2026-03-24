package com.qimo.easypalbackend.dto;

import java.util.List;

/**
 * 日记列表返回（用于滚动加载）。
 */
public record DiaryListResponse(
        List<DiaryEntryVO> entries,
        Boolean hasMore
) {
}

