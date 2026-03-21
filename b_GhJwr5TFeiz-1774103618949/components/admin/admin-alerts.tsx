"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Shield,
  Phone,
  MessageSquare,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Bell,
  CheckCircle,
  XCircle,
  User
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Alert {
  id: string
  user: {
    id: string
    name: string
    school: string
  }
  level: "high" | "medium"
  reason: string
  keywords: string[]
  emotionScore: number
  time: string
  status: "pending" | "processing" | "resolved"
  history: {
    action: string
    time: string
    operator: string
  }[]
}

export function AdminAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)

  const alerts: Alert[] = [
    {
      id: "1",
      user: { id: "u1", name: "用户A***3", school: "计算机学院" },
      level: "high",
      reason: "多次提及极端负面情绪关键词",
      keywords: ["压力大", "撑不下去", "没有意义"],
      emotionScore: 15,
      time: "5分钟前",
      status: "pending",
      history: [],
    },
    {
      id: "2",
      user: { id: "u2", name: "用户B***7", school: "外国语学院" },
      level: "medium",
      reason: "情绪波动异常，连续3天负面情绪",
      keywords: ["失眠", "焦虑", "担心"],
      emotionScore: 35,
      time: "15分钟前",
      status: "processing",
      history: [
        { action: "开始关注", time: "10分钟前", operator: "张老师" },
      ],
    },
    {
      id: "3",
      user: { id: "u3", name: "用户C***2", school: "医学院" },
      level: "medium",
      reason: "长期低落情绪趋势",
      keywords: ["疲惫", "迷茫", "孤独"],
      emotionScore: 42,
      time: "1小时前",
      status: "resolved",
      history: [
        { action: "开始关注", time: "50分钟前", operator: "李老师" },
        { action: "电话回访", time: "30分钟前", operator: "李老师" },
        { action: "标记为已解决", time: "10分钟前", operator: "李老师" },
      ],
    },
  ]

  const stats = [
    { label: "待处理", value: 3, icon: AlertTriangle, color: "text-destructive" },
    { label: "处理中", value: 8, icon: Clock, color: "text-warning" },
    { label: "今日已解决", value: 12, icon: CheckCircle, color: "text-success" },
    { label: "本周总计", value: 47, icon: Shield, color: "text-primary" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-destructive/10 text-destructive border-0">待处理</Badge>
      case "processing":
        return <Badge className="bg-warning/10 text-warning border-0">处理中</Badge>
      case "resolved":
        return <Badge className="bg-success/10 text-success border-0">已解决</Badge>
      default:
        return null
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "high":
        return <Badge className="bg-destructive text-destructive-foreground">高风险</Badge>
      case "medium":
        return <Badge className="bg-warning text-warning-foreground">中风险</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">危机预警</h1>
          <p className="text-muted-foreground">监控并处理用户心理危机预警</p>
        </div>
        <Button variant="outline">
          <Bell className="h-4 w-4 mr-2" />
          预警设置
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-xl bg-muted", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert List */}
      <Card className="border border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>预警列表</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索用户..." className="pl-9 w-[200px]" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="pending">待处理</SelectItem>
                  <SelectItem value="processing">处理中</SelectItem>
                  <SelectItem value="resolved">已解决</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="high" className="text-destructive data-[state=active]:text-destructive">
                高风险 (1)
              </TabsTrigger>
              <TabsTrigger value="medium" className="text-warning data-[state=active]:text-warning">
                中风险 (2)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "p-4 rounded-lg border transition-colors cursor-pointer",
                      alert.level === "high" ? "border-destructive/50 bg-destructive/5" : "border-warning/50 bg-warning/5",
                      "hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={cn(
                            "text-sm",
                            alert.level === "high" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                          )}>
                            {alert.user.name.slice(2, 3)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{alert.user.name}</span>
                            {getLevelBadge(alert.level)}
                            {getStatusBadge(alert.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.user.school}</p>
                          <p className="text-sm text-foreground">{alert.reason}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {alert.keywords.map((keyword, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-muted-foreground">情绪分数:</span>
                          <span className={cn(
                            "font-medium",
                            alert.emotionScore < 30 ? "text-destructive" : "text-warning"
                          )}>
                            {alert.emotionScore}/100
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="high" className="mt-0">
              <div className="space-y-3">
                {alerts.filter(a => a.level === "high").map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-lg border border-destructive/50 bg-destructive/5 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    {/* Same content as above */}
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{alert.user.name}</span>
                      {getLevelBadge(alert.level)}
                      {getStatusBadge(alert.status)}
                    </div>
                    <p className="text-sm text-foreground mt-2">{alert.reason}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="medium" className="mt-0">
              <div className="space-y-3">
                {alerts.filter(a => a.level === "medium").map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-lg border border-warning/50 bg-warning/5 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{alert.user.name}</span>
                      {getLevelBadge(alert.level)}
                      {getStatusBadge(alert.status)}
                    </div>
                    <p className="text-sm text-foreground mt-2">{alert.reason}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Intervention Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              危机干预详情
            </DialogTitle>
            <DialogDescription>
              查看预警详情并进行干预操作
            </DialogDescription>
          </DialogHeader>

          {selectedAlert && (
            <div className="space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedAlert.user.name.slice(2, 3)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{selectedAlert.user.name}</span>
                    {getLevelBadge(selectedAlert.level)}
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedAlert.user.school}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">情绪分数</p>
                  <p className={cn(
                    "text-2xl font-bold",
                    selectedAlert.emotionScore < 30 ? "text-destructive" : "text-warning"
                  )}>
                    {selectedAlert.emotionScore}
                  </p>
                </div>
              </div>

              {/* Alert Details */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">预警原因</p>
                <p className="text-sm text-muted-foreground">{selectedAlert.reason}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedAlert.keywords.map((keyword, i) => (
                    <Badge key={i} variant="secondary">{keyword}</Badge>
                  ))}
                </div>
              </div>

              {/* History */}
              {selectedAlert.history.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">处理记录</p>
                  <div className="space-y-2">
                    {selectedAlert.history.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-foreground">{h.action}</span>
                        <span className="text-muted-foreground">- {h.operator}</span>
                        <span className="text-muted-foreground ml-auto">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">处理备注</p>
                <Textarea placeholder="输入处理备注..." />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelectedAlert(null)}>
              <XCircle className="h-4 w-4 mr-2" />
              关闭
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              查看对话
            </Button>
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              电话回访
            </Button>
            <Button>
              <CheckCircle className="h-4 w-4 mr-2" />
              标记解决
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
