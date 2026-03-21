"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Check,
  X,
  Eye,
  MoreHorizontal,
  FileText,
  Image,
  Music,
  Flag,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

const pendingContent = [
  {
    id: 1,
    type: "article",
    title: "如何应对期末考试焦虑",
    author: "王老师",
    authorRole: "心理咨询师",
    submittedAt: "2024-03-20 10:30",
    preview: "期末考试临近，很多同学都会感到焦虑和压力...",
    category: "压力管理"
  },
  {
    id: 2,
    type: "audio",
    title: "深度放松冥想音频",
    author: "李老师",
    authorRole: "心理咨询师",
    submittedAt: "2024-03-20 09:15",
    duration: "15:30",
    category: "冥想"
  },
  {
    id: 3,
    type: "article",
    title: "建立健康的人际关系",
    author: "张老师",
    authorRole: "心理咨询师",
    submittedAt: "2024-03-19 16:45",
    preview: "人际关系是大学生活中非常重要的一部分...",
    category: "社交技能"
  },
  {
    id: 4,
    type: "post",
    title: "今天心情很低落...",
    author: "匿名用户",
    authorRole: "学生",
    submittedAt: "2024-03-20 11:20",
    preview: "最近压力很大，感觉什么都做不好...",
    flagReason: "内容含有敏感词汇"
  },
]

const reportedContent = [
  {
    id: 1,
    type: "post",
    title: "分享一个减压方法",
    author: "用户A***3",
    reportCount: 3,
    reportReason: "疑似广告内容",
    reportedAt: "2024-03-20 08:30"
  },
  {
    id: 2,
    type: "comment",
    title: "评论内容涉及不当言论",
    author: "用户B***7",
    reportCount: 5,
    reportReason: "言语攻击",
    reportedAt: "2024-03-19 22:15"
  },
]

export function AdminContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContent, setSelectedContent] = useState<typeof pendingContent[0] | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article": return FileText
      case "audio": return Music
      case "image": return Image
      default: return FileText
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "article": return <Badge variant="secondary" className="bg-blue-100 text-blue-700">文章</Badge>
      case "audio": return <Badge variant="secondary" className="bg-purple-100 text-purple-700">音频</Badge>
      case "post": return <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">帖子</Badge>
      case "comment": return <Badge variant="secondary" className="bg-amber-100 text-amber-700">评论</Badge>
      default: return <Badge variant="secondary">其他</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">内容审核</h1>
          <p className="text-muted-foreground">审核咨询师发布的内容和用户举报的内容</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 text-amber-600 border-amber-300">
            <Clock className="h-3 w-3" />
            待审核: {pendingContent.length}
          </Badge>
          <Badge variant="outline" className="gap-1 text-red-600 border-red-300">
            <Flag className="h-3 w-3" />
            被举报: {reportedContent.length}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">待审核</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">已通过</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">已拒绝</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">待处理举报</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="pending">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="pending" className="gap-1">
                  <Clock className="h-4 w-4" />
                  待审核
                  <Badge className="ml-1 bg-amber-500 text-white text-[10px]">{pendingContent.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="reported" className="gap-1">
                  <Flag className="h-4 w-4" />
                  被举报
                  <Badge className="ml-1 bg-red-500 text-white text-[10px]">{reportedContent.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="approved">已通过</TabsTrigger>
                <TabsTrigger value="rejected">已拒绝</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="article">文章</SelectItem>
                    <SelectItem value="audio">音频</SelectItem>
                    <SelectItem value="post">帖子</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="pending" className="space-y-4">
              {pendingContent.map((content) => {
                const TypeIcon = getTypeIcon(content.type)
                return (
                  <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        <TypeIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{content.title}</h3>
                          {getTypeBadge(content.type)}
                          {content.category && (
                            <Badge variant="outline">{content.category}</Badge>
                          )}
                          {content.flagReason && (
                            <Badge variant="destructive" className="text-[10px]">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {content.flagReason}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {content.author} ({content.authorRole})
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {content.submittedAt}
                          </span>
                        </div>
                        {content.preview && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{content.preview}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedContent(content)}>
                        <Eye className="h-4 w-4 mr-1" />
                        预览
                      </Button>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <Check className="h-4 w-4 mr-1" />
                        通过
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => { setSelectedContent(content); setShowRejectDialog(true); }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        拒绝
                      </Button>
                    </div>
                  </div>
                )
              })}
            </TabsContent>

            <TabsContent value="reported" className="space-y-4">
              {reportedContent.map((content) => (
                <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-red-100">
                      <Flag className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{content.title}</h3>
                        {getTypeBadge(content.type)}
                        <Badge variant="destructive" className="text-[10px]">
                          {content.reportCount}次举报
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>作者: {content.author}</span>
                        <span>举报原因: {content.reportReason}</span>
                        <span>{content.reportedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      查看
                    </Button>
                    <Button size="sm" variant="secondary">
                      忽略举报
                    </Button>
                    <Button variant="destructive" size="sm">
                      删除内容
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="approved">
              <div className="text-center py-12 text-muted-foreground">
                已通过的内容列表
              </div>
            </TabsContent>

            <TabsContent value="rejected">
              <div className="text-center py-12 text-muted-foreground">
                已拒绝的内容列表
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>拒绝内容</DialogTitle>
            <DialogDescription>
              请填写拒绝原因，将通知内容作者
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">内容标题</p>
              <p className="text-sm text-muted-foreground">{selectedContent?.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">拒绝原因</p>
              <Textarea
                placeholder="请输入拒绝原因..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>取消</Button>
            <Button variant="destructive" onClick={() => setShowRejectDialog(false)}>确认拒绝</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
