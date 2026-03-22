package com.qimo.easypalbackend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * 首页快速心情打卡请求。
 * <p>mood：1 开心 2 平静 3 一般 4 低落 5 焦虑。</p>
 */
public record MoodCheckInRequest(
        @NotNull(message = "请选择心情")
        @Min(value = 1, message = "心情取值 1~5")
        @Max(value = 5, message = "心情取值 1~5")
        Integer mood
) {
}
