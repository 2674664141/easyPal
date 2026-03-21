"use client"

import { useState } from "react"
import { 
  Plus,
  Search,
  FileText,
  Music,
  Video,
  BookOpen,
  Eye,
  Heart,
  MoreHorizontal,
  Upload,
  Edit,
  Trash2,
  Download,
  Clock,
  Users
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CounselorResources() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const articles = [
    {
      id: 1,
      title: "如何有效管理考试焦虑",
      description: "本文介绍了几种科学有效的方法来缓解考试前的焦虑情绪...",
      type: "article",
      category: "焦虑管理",
      views: 328,
      likes: 45,
      status: "published",
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      title: "大学生人际关系指南",
      description: "帮助大学生建立健康的社交关系，提升人际交往能力...",
      type: "article",
      category: "人际关系",
      views: 256,
      likes: 38,
      status: "published",
      createdAt: "2024-01-08"
    },
    {
      id: 3,
      title: "睡眠质量改善建议",
      description: "针对大学生常见的睡眠问题，提供实用的改善建议...",
      type: "article",
      category: "睡眠健康",
      views: 189,
      likes: 27,
      status: "draft",
      createdAt: "2024-01-12"
    },
  ]

  const audios = [
    {
      id: 1,
      title: "腹式呼吸放松训练",
      duration: "10:32",
      type: "audio",
      category: "呼吸训练",
      plays: 456,
      likes: 89,
      status: "published"
    },
    {
      id: 2,
      title: "正念冥想入门",
      duration: "15:00",
      type: "audio",
      category: "冥想练习",
      plays: 342,
      likes: 67,
      status: "published"
    },
    {
      id: 3,
      title: "睡前放松音乐",
      duration: "20:00",
      type: "audio",
      category: "放松音乐",
      plays: 528,
      likes: 92,
      status: "published"
    },
  ]

  const resourceStats = {
    totalArticles: 12,
    totalAudios: 8,
    totalViews: 2456,
    totalLikes: 389
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">资源管理</h1>
          <p className="text-muted-foreground mt-1">管理和发布心理健康资源内容</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              发布内容
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>发布新内容</DialogTitle>
              <DialogDescription>
                发布文章或上传音频资源
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>内容类型</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">心理文章</SelectItem>
                    <SelectItem value="audio">放松音频</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>标题</Label>
                <Input placeholder="输入标题" />
              </div>
              <div className="space-y-2">
                <Label>分类</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anxiety">焦虑管理</SelectItem>
                    <SelectItem value="relationship">人际关系</SelectItem>
                    <SelectItem value="sleep">睡眠健康</SelectItem>
                    <SelectItem value="stress">压力管理</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>内容描述</Label>
                <Textarea placeholder="简要描述内容..." />
              </div>
              <div className="space-y-2">
                <Label>上传文件</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">点击或拖拽文件到此处上传</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>取消</Button>
              <Button onClick={() => setIsDialogOpen(false)}>发布</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">文章数量</p>
                <p className="text-2xl font-bold text-foreground mt-1">{resourceStats.totalArticles}</p>
              </div>
              <FileText className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">音频数量</p>
                <p className="text-2xl font-bold text-foreground mt-1">{resourceStats.totalAudios}</p>
              </div>
              <Music className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总浏览量</p>
                <p className="text-2xl font-bold text-foreground mt-1">{resourceStats.totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">获得点赞</p>
                <p className="text-2xl font-bold text-red-500 mt-1">{resourceStats.totalLikes}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索资源..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="published">已发布</SelectItem>
                <SelectItem value="draft">草稿</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                <SelectItem value="anxiety">焦虑管理</SelectItem>
                <SelectItem value="relationship">人际关系</SelectItem>
                <SelectItem value="sleep">睡眠健康</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles" className="gap-2">
            <FileText className="h-4 w-4" />
            心理文章
          </TabsTrigger>
          <TabsTrigger value="audios" className="gap-2">
            <Music className="h-4 w-4" />
            放松音频
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            {articles.map((article) => (
              <Card key={article.id} className="border-border/60">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <Badge variant={article.status === "published" ? "secondary" : "outline"} className="text-[10px]">
                        {article.status === "published" ? "已发布" : "草稿"}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          预览
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px]">{article.category}</Badge>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {article.likes}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audios" className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            {audios.map((audio) => (
              <Card key={audio.id} className="border-border/60">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <Music className="h-4 w-4 text-emerald-500" />
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {audio.duration}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          预览
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          下载
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{audio.title}</h3>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px]">{audio.category}</Badge>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {audio.plays}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {audio.likes}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
