package com.qimo.easypalbackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.qimo.easypalbackend.dto.MoodTodayVO;
import com.qimo.easypalbackend.entity.MoodRecord;
import com.qimo.easypalbackend.mapper.MoodRecordMapper;
import com.qimo.easypalbackend.service.MoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneId;

@Service
public class MoodServiceImpl implements MoodService {

    /** 来源：首页快速打卡（与实体注释一致） */
    public static final int SOURCE_QUICK_CHECK_IN = 2;

    private static final ZoneId ZONE = ZoneId.of("Asia/Shanghai");

    @Autowired
    private MoodRecordMapper moodRecordMapper;

    @Override
    public MoodTodayVO getTodayQuickMood(long userId) {
        MoodRecord row = findTodayQuickRow(userId);
        return new MoodTodayVO(row == null ? null : row.getMood());
    }

    @Override
    @Transactional
    public MoodTodayVO saveTodayQuickMood(long userId, int mood) {
        int uid = (int) userId;
        LocalDate today = LocalDate.now(ZONE);
        java.sql.Date recordDate = java.sql.Date.valueOf(today);
        Timestamp now = new Timestamp(System.currentTimeMillis());

        MoodRecord existing = findTodayQuickRow(userId);
        if (existing != null) {
            existing.setMood(mood);
            existing.setCreatedAt(now);
            moodRecordMapper.updateById(existing);
            return new MoodTodayVO(mood);
        }

        MoodRecord insert = new MoodRecord();
        insert.setUserId(uid);
        insert.setMood(mood);
        insert.setRecordDate(recordDate);
        insert.setSource(SOURCE_QUICK_CHECK_IN);
        insert.setCreatedAt(now);
        moodRecordMapper.insert(insert);
        return new MoodTodayVO(mood);
    }

    private MoodRecord findTodayQuickRow(long userId) {
        LocalDate today = LocalDate.now(ZONE);
        java.sql.Date recordDate = java.sql.Date.valueOf(today);
        return moodRecordMapper.selectOne(
                new LambdaQueryWrapper<MoodRecord>()
                        .eq(MoodRecord::getUserId, (int) userId)
                        .eq(MoodRecord::getRecordDate, recordDate)
                        .eq(MoodRecord::getSource, SOURCE_QUICK_CHECK_IN)
                        .last("LIMIT 1")
        );
    }
}
