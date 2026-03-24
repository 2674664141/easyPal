# 日记图片上传接口

请求头：`Authorization: Bearer <token>`（必须登录）

## 上传

### POST `/api/diary/image/upload`

`multipart/form-data`

- `files`：文件数组（前端选择多张时使用）

返回：

`{ "code": 0, "message": "ok", "data": ["/uploads/diary/2026/03/xxx.jpg", ...] }`

说明：

- 当前先把图片落盘到项目根目录：`./uploads/diary/yyyy/MM/`
- `imageUrl` 返回**相对路径**（以后换阿里云 OSS 时只需改“前端拼 URL 或后端拼 Base URL”的逻辑，不用改数据库字段含义）
- 你可以直接访问：`http://<后端域名>:8080 + imageUrl`

