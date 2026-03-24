package com.qimo.easypalbackend.dto;

import java.util.List;

/**
 * 日记列表/详情返回结构（前端展示用）。
 */
public record DiaryEntryVO(
        Integer id,
        String date,      // yyyy-MM-dd（前端可再转“今天/昨天”展示）
        Integer mood,     // 1-开心 2-平静 3-一般 4-低落 5-焦虑
        Integer weather,  // 1-晴天 2-阴天 3-雨天 4-雪天
        String content,
        Boolean isPrivate,
        Integer likes,
        List<String> imageUrls
) {
}

