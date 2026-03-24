package com.qimo.easypalbackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.qimo.easypalbackend.dto.DiaryEntryVO;
import com.qimo.easypalbackend.dto.DiaryListResponse;
import com.qimo.easypalbackend.dto.DiaryRecordRequest;
import com.qimo.easypalbackend.dto.DiaryWeekStatsVO;
import com.qimo.easypalbackend.entity.Diary;
import com.qimo.easypalbackend.entity.DiaryImage;
import com.qimo.easypalbackend.mapper.DiaryImageMapper;
import com.qimo.easypalbackend.mapper.DiaryMapper;
import com.qimo.easypalbackend.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class DiaryServiceImpl implements DiaryService {

    private static final ZoneId ZONE = ZoneId.of("Asia/Shanghai");

    @Autowired
    private DiaryMapper diaryMapper;
    @Autowired
    private DiaryImageMapper diaryImageMapper;

    // 写/更新日记（按用户 + diaryDate 维度最多一条）
    @Override
    @Transactional
    public Integer recordDiary(long userId, DiaryRecordRequest req) {
        LocalDate date = parseDateOrToday(req.diaryDate());

        java.sql.Date diaryDate = java.sql.Date.valueOf(date);
        Integer uid = (int) userId;

        Timestamp now = new Timestamp(System.currentTimeMillis());

        Diary existing = diaryMapper.selectOne(
                new LambdaQueryWrapper<Diary>()
                        .eq(Diary::getUserId, uid)
                        .eq(Diary::getDiaryDate, diaryDate)
                        .last("LIMIT 1")
        );

        Diary diary = existing == null ? new Diary() : existing;

        diary.setUserId(uid);
        diary.setDiaryDate(diaryDate);
        diary.setContent(req.content());
        diary.setMood(req.mood());
        diary.setWeather(req.weather());
        diary.setIsPublic(Boolean.TRUE.equals(req.isPrivate()) ? 0 : 1);

        // 浏览/点赞/评论初始为 0；更新时不强行覆盖可按需要调整
        if (diary.getViewCount() == null) diary.setViewCount(0);
        if (diary.getLikeCount() == null) diary.setLikeCount(0);
        if (diary.getCommentCount() == null) diary.setCommentCount(0);

        diary.setCreatedAt(diary.getCreatedAt() == null ? now : diary.getCreatedAt());
        diary.setUpdatedAt(now);

        if (existing == null) {
            diaryMapper.insert(diary);
        } else {
            // 直接更新需要走 updateById；这里简化为按主键更新所有字段
            diaryMapper.updateById(diary);
        }

        Integer diaryId = diary.getId();
        if (diaryId == null && existing == null) {
            // MyBatis-Plus AUTO 主键理论上会回填，这里兜底
            throw new IllegalStateException("日记插入失败：未返回主键");
        }

        // 处理图片：删除旧图片，插入新图片
        diaryImageMapper.delete(
                new LambdaQueryWrapper<DiaryImage>().eq(DiaryImage::getDiaryId, diaryId)
        );

        List<String> urls = req.imageUrls() == null ? List.of() : req.imageUrls();
        int sort = 0;
        for (String url : urls) {
            if (url == null || url.isBlank()) continue;
            DiaryImage img = new DiaryImage();
            img.setDiaryId(diaryId);
            img.setImageUrl(url.trim());
            img.setSortOrder(sort++);
            img.setCreatedAt(now);
            diaryImageMapper.insert(img);
        }

        return diaryId;
    }

    // 根据日期查询日记列表
    @Override
    public List<DiaryEntryVO> getDiariesByDate(long userId, LocalDate date) {
        java.sql.Date diaryDate = java.sql.Date.valueOf(date);
        Integer uid = (int) userId;

        List<Diary> list = diaryMapper.selectList(
                new LambdaQueryWrapper<Diary>()
                        .eq(Diary::getUserId, uid)
                        .eq(Diary::getDiaryDate, diaryDate)
                        .orderByDesc(Diary::getId)
        );

        if (list.isEmpty()) return List.of();

        // 取出所有图片并组装
        List<DiaryEntryVO> result = new ArrayList<>();
        for (Diary d : list) {
            List<String> imageUrls = loadImageUrls(d.getId());
            result.add(toEntryVO(d, imageUrls));
        }
        return result;
    }

    // 根据日期区间查询日记列表（含起止）
    @Override
    public List<DiaryEntryVO> getDiariesByDateRange(long userId, LocalDate startDate, LocalDate endDate) {
        LocalDate s = startDate;
        LocalDate e = endDate;
        if (s.isAfter(e)) {
            LocalDate t = s;
            s = e;
            e = t;
        }

        java.sql.Date start = java.sql.Date.valueOf(s);
        java.sql.Date end = java.sql.Date.valueOf(e);
        Integer uid = (int) userId;

        List<Diary> list = diaryMapper.selectList(
                new LambdaQueryWrapper<Diary>()
                        .eq(Diary::getUserId, uid)
                        .between(Diary::getDiaryDate, start, end)
                        .orderByDesc(Diary::getDiaryDate)
                        .orderByDesc(Diary::getId)
        );

        if (list.isEmpty()) return List.of();
        List<DiaryEntryVO> result = new ArrayList<>();
        for (Diary d : list) {
            List<String> imageUrls = loadImageUrls(d.getId());
            result.add(toEntryVO(d, imageUrls));
        }
        return result;
    }

    // 分页拉取日记列表（用于滚动加载）
    @Override
    public DiaryListResponse listDiaries(long userId, int pageNo, int pageSize) {
        Integer uid = (int) userId;
        int safePageSize = Math.max(1, Math.min(50, pageSize));
        int safePageNo = Math.max(1, pageNo);

        int offset = (safePageNo - 1) * safePageSize;

        List<Diary> list = diaryMapper.selectList(
                new LambdaQueryWrapper<Diary>()
                        .eq(Diary::getUserId, uid)
                        .orderByDesc(Diary::getDiaryDate)
                        .orderByDesc(Diary::getId)
                        .last("LIMIT " + safePageSize + " OFFSET " + offset)
        );

        // 简单 hasMore：再查 1 条（下一页第一条是否存在）
        boolean hasMore = !diaryMapper.selectList(
                new LambdaQueryWrapper<Diary>()
                        .eq(Diary::getUserId, uid)
                        .orderByDesc(Diary::getDiaryDate)
                        .orderByDesc(Diary::getId)
                        .last("LIMIT 1 OFFSET " + (offset + safePageSize))
        ).isEmpty();

        List<DiaryEntryVO> entries = new ArrayList<>();
        for (Diary d : list) {
            List<String> imageUrls = loadImageUrls(d.getId());
            entries.add(toEntryVO(d, imageUrls));
        }
        return new DiaryListResponse(entries, hasMore);
    }

    // 红色统计：按周重置
    @Override
    public DiaryWeekStatsVO getWeekStats(long userId, LocalDate today) {
        LocalDate localToday = today == null ? LocalDate.now(ZONE) : today;

        // 周一到周日
        LocalDate weekStart = localToday.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate weekEnd = weekStart.plusDays(6);

        java.sql.Date start = java.sql.Date.valueOf(weekStart);
        java.sql.Date end = java.sql.Date.valueOf(weekEnd);
        Integer uid = (int) userId;

        long total = diaryMapper.selectCount(
                new LambdaQueryWrapper<Diary>()
                        .eq(Diary::getUserId, uid)
                        .between(Diary::getDiaryDate, start, end)
        );

        long positive = diaryMapper.selectCount(
                new LambdaQueryWrapper<Diary>()
                        .eq(Diary::getUserId, uid)
                        .eq(Diary::getMood, 1) // 1 算积极
                        .between(Diary::getDiaryDate, start, end)
        );

        int accumulatedRecords = (int) total;
        int continuousDays = 0;
        for (int i = 0; i < 7; i++) {
            LocalDate d = localToday.minusDays(i);
            if (d.isBefore(weekStart)) break;
            java.sql.Date dd = java.sql.Date.valueOf(d);
            boolean exists = diaryMapper.selectOne(
                    new LambdaQueryWrapper<Diary>()
                            .eq(Diary::getUserId, uid)
                            .eq(Diary::getDiaryDate, dd)
                            .last("LIMIT 1")
            ) != null;
            if (!exists) break;
            continuousDays++;
        }

        int positivePercent;
        if (total <= 0) {
            positivePercent = 0;
        } else {
            positivePercent = (int) ((positive * 100) / total);
        }

        return new DiaryWeekStatsVO(accumulatedRecords, continuousDays, positivePercent);
    }

    private LocalDate parseDateOrToday(String diaryDate) {
        if (diaryDate == null || diaryDate.isBlank()) {
            return LocalDate.now(ZONE);
        }
        return LocalDate.parse(diaryDate.trim());
    }

    private List<String> loadImageUrls(Integer diaryId) {
        if (diaryId == null) return List.of();
        List<DiaryImage> imgs = diaryImageMapper.selectList(
                new LambdaQueryWrapper<DiaryImage>()
                        .eq(DiaryImage::getDiaryId, diaryId)
                        .orderByAsc(DiaryImage::getSortOrder)
        );
        return imgs.stream().map(DiaryImage::getImageUrl).filter(Objects::nonNull).toList();
    }

    private DiaryEntryVO toEntryVO(Diary d, List<String> imageUrls) {
        Boolean isPrivate = d.getIsPublic() == null ? true : d.getIsPublic() == 0;
        return new DiaryEntryVO(
                d.getId(),
                d.getDiaryDate() == null ? null : d.getDiaryDate().toString(),
                d.getMood(),
                d.getWeather(),
                d.getContent(),
                isPrivate,
                d.getLikeCount() == null ? 0 : d.getLikeCount(),
                imageUrls == null ? List.of() : imageUrls
        );
    }
}

