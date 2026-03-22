# 心情快速打卡

需登录：请求头 `Authorization: Bearer <登录返回的 token>`。

## 心情取值 mood（整数）

| 值 | 含义 |
|----|------|
| 1 | 开心 |
| 2 | 平静 |
| 3 | 一般 |
| 4 | 低落 |
| 5 | 焦虑 |

数据表 `mood_record`：`source = 2` 表示首页快速打卡；同一用户同一自然日（Asia/Shanghai）仅一条，重复提交会更新。

## 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/mood/today` | 今日是否已打卡；`data.mood` 为 null 或 1~5 |
| POST | `/api/mood/check-in` | body: `{ "mood": 1 }`，返回当前保存的心情 |

成功：`{ "code": 0, "message": "ok", "data": { "mood": 3 } }`。

未带 Token 或 Token 无效：`401`，body 仍为统一 `ApiResponse` 结构（由全局异常处理）。

## 建表参考

若库中尚无表，可执行：

```sql
CREATE TABLE IF NOT EXISTS `mood_record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `mood` tinyint NOT NULL COMMENT '1开心2平静3一般4低落5焦虑',
  `record_date` date NOT NULL,
  `source` tinyint NOT NULL DEFAULT 2 COMMENT '1日记 2快速打卡',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_date_source` (`user_id`,`record_date`,`source`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
