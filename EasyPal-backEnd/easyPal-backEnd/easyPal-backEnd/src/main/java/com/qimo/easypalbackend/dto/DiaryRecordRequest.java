package com.qimo.easypalbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * 记录一条日记的请求。
 * diaryDate 默认表示客户端所在时区下的“日期”（若不传，后端用当前日期）。
 */
public record DiaryRecordRequest(
        // 格式建议：yyyy-MM-dd
        String diaryDate,
        @NotNull(message = "请选择情绪")
        Integer mood,
        @NotNull(message = "请选择天气")
        Integer weather,
        @NotNull(message = "isPrivate 必填")
        Boolean isPrivate,
        @NotBlank(message = "内容不能为空")
        @Size(max = 2000, message = "内容过长")
        String content,
        // 上传图片得到的 URL 列表（后续也可以扩展为文件直传/后端存储）
        List<String> imageUrls
) {
}

