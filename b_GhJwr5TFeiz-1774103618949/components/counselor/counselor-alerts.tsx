"use client"

import { useState } from "react"
import { 
  AlertTriangle, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  FileText,
  ChevronRight,
  Filter,
  TrendingDown,
  Calendar,
  User,
  Activity,
  History
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
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

export function CounselorAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(1)

  const alerts = [
    { 
      id: 1, 
      student: "张三",
      studentId: "2021001001",
      avatar: "张",
      college: "计算机学院",
      level: "high",
      reason: "连续7天消极情绪，文本含高危词汇",
      triggerDetails: [
        "近7天消极情绪占比达到75%",
        "对话中出现3次高危词汇：'绝望'、'无意义'、'放弃'",
        "深夜活跃频次增加200%"
      ],
      time: "2024-01-15 10:23",
      status: "pending",
      emotionHistory: [
        { date: "1/9", score: 55 },
        { date: "1/10", score: 48 },
        { date: "1/11", score: 42 },
        { date: "1/12", score: 35 },
        { date: "1/13", score: 28 },
        { date: "1/14", score: 25 },
        { date: "1/15", score: 22 },
      ]
    },
    { 
      id: 2, 
      student: "李四",
      studentId: "2021001002",
      avatar: "李",
      college: "计算机学院",
      level: "medium",
      reason: "焦虑情绪占比超过30%",
      triggerDetails: [
        "近14天焦虑情绪占比32%",
        "AI对话中频繁提及'考试压力'",
        "睡眠时间不规律"
      ],
      time: "2024-01-15 09:15",
      status: "pending",
      emotionHistory: []
    },
    { 
      id: 3, 
      student: "王五",
      studentId: "2021002001",
      avatar: "王",
      college: "经济学院",
      level: "medium",
      reason: "深夜活跃频次增加",
      triggerDetails: [
        "22:00-02:00时段活跃度增加180%",
        "近期情绪波动较大",
        "社交互动减少"
      ],
      time: "2024-01-15 08:00",
      status: "processing",
      emotionHistory: []
    },
  ]

  const interventionHistory = [
    { 
      id: 1, 
      student: "赵六",
      action: "电话沟通",
      content: "已与学生进行30分钟电话沟通，了解到近期因考试压力较大，已给予心理疏导建议。",
      time: "2024-01-14 15:30",
      result: "学生情绪有所缓解"
    },
    { 
      id: 2, 
      student: "钱七",
      action: "线下咨询",
      content: "安排线下咨询，学生如约前来，进行了45分钟的深度沟通。",
      time: "2024-01-13 14:00",
      result: "建议每周一次跟进"
    },
  ]

  const selectedAlertData = alerts.find(a => a.id === selectedAlert)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">危机预警</h1>
          <p className="text-muted-foreground mt-1">及时处理学生心理预警，保障学生心理健康</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="风险等级" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部等级</SelectItem>
              <SelectItem value="high">高风险</SelectItem>
              <SelectItem value="medium">中风险</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <History className="h-4 w-4 mr-2" />
            历史记录
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-border/60 border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">高风险预警</p>
                <p className="text-2xl font-bold text-destructive mt-1">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">中风险预警</p>
                <p className="text-2xl font-bold text-amber-500 mt-1">2</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">处理中</p>
                <p className="text-2xl font-bold text-primary mt-1">1</p>
              </div>
              <Clock className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">本周已处理</p>
                <p className="text-2xl font-bold text-emerald-500 mt-1">8</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-emerald-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">待处理预警 (3)</TabsTrigger>
          <TabsTrigger value="history">干预历史</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <div className="grid grid-cols-3 gap-6">
            {/* Alert List */}
            <Card className="border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">预警列表</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-3">
                {alerts.map((alert) => (
                  <button
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert.id)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedAlert === alert.id 
                        ? "bg-primary/10 border border-primary/30" 
                        : "bg-muted/50 hover:bg-muted border border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={`${
                          alert.level === "high" ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"
                        }`}>
                          {alert.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{alert.student}</span>
                          <Badge variant={alert.level === "high" ? "destructive" : "secondary"} className="text-[10px]">
                            {alert.level === "high" ? "高风险" : "中风险"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{alert.reason}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                          {alert.status === "processing" && (
                            <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                              处理中
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Alert Detail */}
            <Card className="col-span-2 border-border/60">
              {selectedAlertData ? (
                <>
                  <CardHeader className="pb-3 border-b border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14">
                          <AvatarFallback className={`text-lg ${
                            selectedAlertData.level === "high" ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"
                          }`}>
                            {selectedAlertData.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{selectedAlertData.student}</CardTitle>
                            <Badge variant={selectedAlertData.level === "high" ? "destructive" : "secondary"}>
                              {selectedAlertData.level === "high" ? "高风险预警" : "中风险预警"}
                            </Badge>
                          </div>
                          <CardDescription className="mt-1">
                            {selectedAlertData.studentId} · {selectedAlertData.college}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" />
                          查看档案
                        </Button>
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4 mr-1" />
                          情绪历史
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Trigger Reason */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        预警触发原因
                      </h4>
                      <div className="space-y-2 pl-6">
                        {selectedAlertData.triggerDetails.map((detail, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-destructive mt-2" />
                            <p className="text-sm text-muted-foreground">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Emotion Trend */}
                    {selectedAlertData.emotionHistory.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <TrendingDown className="h-4 w-4 text-destructive" />
                          近7天情绪趋势
                        </h4>
                        <div className="h-32 flex items-end gap-2 pl-6">
                          {selectedAlertData.emotionHistory.map((item, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-1">
                              <div 
                                className={`w-full rounded-t transition-all ${
                                  item.score > 50 ? "bg-emerald-500" : 
                                  item.score > 30 ? "bg-amber-500" : "bg-destructive"
                                }`}
                                style={{ height: `${item.score}%` }}
                              />
                              <span className="text-[10px] text-muted-foreground">{item.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1">
                            <Phone className="h-4 w-4 mr-2" />
                            电话联系
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>记录电话联系</DialogTitle>
                            <DialogDescription>
                              请在电话沟通后记录详细内容
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <Textarea placeholder="请输入电话沟通内容..." className="min-h-32" />
                          </div>
                          <DialogFooter>
                            <Button variant="outline">取消</Button>
                            <Button>保存记录</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        发送消息
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        预约咨询
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        记录干预
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-96 text-muted-foreground">
                  请选择一条预警记录查看详情
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base font-semibold">干预历史记录</CardTitle>
              <CardDescription>查看您的历史干预记录和效果</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {interventionHistory.map((record) => (
                <div key={record.id} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{record.action}</Badge>
                      <span className="font-medium text-foreground">{record.student}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{record.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{record.content}</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-emerald-600">{record.result}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
