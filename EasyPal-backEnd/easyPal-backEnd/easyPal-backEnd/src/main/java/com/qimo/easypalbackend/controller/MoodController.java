package com.qimo.easypalbackend.controller;

import com.qimo.easypalbackend.common.ApiResponse;
import com.qimo.easypalbackend.dto.MoodCheckInRequest;
import com.qimo.easypalbackend.dto.MoodTodayVO;
import com.qimo.easypalbackend.security.JwtAuthSupport;
import com.qimo.easypalbackend.service.MoodService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 心情快速打卡（首页「今天感觉怎么样」）。
 */
@RestController
@RequestMapping("/api/mood")
public class MoodController {

    @Autowired
    private MoodService moodService;
    @Autowired
    private JwtAuthSupport jwtAuthSupport;

    @GetMapping("/today")
    public ApiResponse<MoodTodayVO> today(@RequestHeader(value = "Authorization", required = false) String authorization) {
        long userId = jwtAuthSupport.requireUserId(authorization);
        return ApiResponse.ok(moodService.getTodayQuickMood(userId));
    }

    @PostMapping("/check-in")
    public ApiResponse<MoodTodayVO> checkIn(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody MoodCheckInRequest req
    ) {
        long userId = jwtAuthSupport.requireUserId(authorization);
        return ApiResponse.ok(moodService.saveTodayQuickMood(userId, req.mood()));
    }
}
