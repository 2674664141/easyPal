package com.qimo.easypalbackend.controller;

import com.qimo.easypalbackend.common.ApiResponse;
import com.qimo.easypalbackend.dto.DiaryEntryVO;
import com.qimo.easypalbackend.dto.DiaryListResponse;
import com.qimo.easypalbackend.dto.DiaryRecordRequest;
import com.qimo.easypalbackend.dto.DiaryWeekStatsVO;
import com.qimo.easypalbackend.security.JwtAuthSupport;
import com.qimo.easypalbackend.service.DiaryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

/**
 * 日记功能（写日记、按日期查询、滚动列表、周统计）。
 */
@RestController
@RequestMapping("/api/diary")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    @Autowired
    private JwtAuthSupport jwtAuthSupport;

    // GET /api/diary/stats/week：红色区域周统计（累计记录/连续天数/积极情绪%）
    @GetMapping("/stats/week")
    public ApiResponse<DiaryWeekStatsVO> weekStats(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        long userId = jwtAuthSupport.requireUserId(authorization);
        return ApiResponse.ok(diaryService.getWeekStats(userId, LocalDate.now()));
    }

    // GET /api/diary/by-date?date=yyyy-MM-dd：根据日期查询日记列表
    @GetMapping("/by-date")
    public ApiResponse<List<DiaryEntryVO>> byDate(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam("date") String date
    ) {
        long userId = jwtAuthSupport.requireUserId(authorization);
        LocalDate d = LocalDate.parse(date.trim());
        return ApiResponse.ok(diaryService.getDiariesByDate(userId, d));
    }

    // GET /api/diary/by-date-range?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd：根据日期区间查询
    @GetMapping("/by-date-range")
    public ApiResponse<List<DiaryEntryVO>> byDateRange(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate
    ) {
        long userId = jwtAuthSupport.requireUserId(authorization);
        LocalDate s = LocalDate.parse(startDate.trim());
        LocalDate e = LocalDate.parse(endDate.trim());
        return ApiResponse.ok(diaryService.getDiariesByDateRange(userId, s, e));
    }

    // GET /api/diary/list?pageNo=1&pageSize=10：滚动加载日记列表（按时间倒序）
    @GetMapping("/list")
    public ApiResponse<DiaryListResponse> list(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize
    ) {
        long userId = jwtAuthSupport.requireUserId(authorization);
        return ApiResponse.ok(diaryService.listDiaries(userId, pageNo, pageSize));
    }

    // POST /api/diary/record：记录日记（根据 diaryDate 进行更新/插入）
    @PostMapping("/record")
    public ApiResponse<Integer> record(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody DiaryRecordRequest req
    ) {
        long userId = jwtAuthSupport.requireUserId(authorization);
        Integer diaryId = diaryService.recordDiary(userId, req);
        return ApiResponse.ok(diaryId);
    }
}

