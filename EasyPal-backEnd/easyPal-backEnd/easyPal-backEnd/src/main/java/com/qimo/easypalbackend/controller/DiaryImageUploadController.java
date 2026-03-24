package com.qimo.easypalbackend.controller;

import com.qimo.easypalbackend.common.ApiResponse;
import com.qimo.easypalbackend.security.JwtAuthSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * 日记图片上传（本地 uploads 目录先落盘，返回相对路径，后续替换 OOS 时无需改数据库结构）。
 */
@RestController
@RequestMapping("/api/diary/image")
public class DiaryImageUploadController {

    private static final ZoneId ZONE = ZoneId.of("Asia/Shanghai");

    @Autowired
    private JwtAuthSupport jwtAuthSupport;

    // 允许上传的文件类型（前置校验，真实安全还要看魔数/网关）
    private static boolean isImage(MultipartFile f) {
        if (f == null) return false;
        String ct = f.getContentType();
        return ct != null && ct.toLowerCase().startsWith("image/");
    }

    // POST /api/diary/image/upload
    // form-data: files=多个文件
    @PostMapping("/upload")
    public ApiResponse<List<String>> upload(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam("files") MultipartFile[] files
    ) {
        jwtAuthSupport.requireUserId(authorization); // 鉴权：必须登录

        if (files == null || files.length == 0) {
            return ApiResponse.fail(400, "请上传图片");
        }

        LocalDate today = LocalDate.now(ZONE);
        String yyyy = String.valueOf(today.getYear());
        String mm = String.format("%02d", today.getMonthValue());

        // 项目根目录下 uploads/diary/yyyy/MM/
        Path dir = Paths.get(System.getProperty("user.dir"), "uploads", "diary", yyyy, mm);
        try {
            Files.createDirectories(dir);
        } catch (Exception e) {
            return ApiResponse.fail(500, "创建上传目录失败");
        }

        List<String> relativeUrls = new ArrayList<>();

        for (MultipartFile f : files) {
            if (!isImage(f)) continue;
            String original = f.getOriginalFilename();
            String ext = "";
            if (original != null && original.contains(".")) {
                ext = original.substring(original.lastIndexOf('.'));
            }
            if (ext.isBlank()) ext = ".jpg";

            String fileName = UUID.randomUUID() + ext;
            Path target = dir.resolve(fileName);

            try {
                f.transferTo(target.toFile());
            } catch (Exception e) {
                return ApiResponse.fail(500, "图片保存失败");
            }

            // 返回相对路径（以后替换 OOS，只需改前端/后端拼 URL）
            String rel = "/uploads/diary/" + yyyy + "/" + mm + "/" + fileName;
            relativeUrls.add(rel);
        }

        return ApiResponse.ok(relativeUrls);
    }
}

