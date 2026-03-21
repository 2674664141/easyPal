"use client"

import { 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Activity,
  Heart,
  Brain
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function CounselorDashboard() {
  const stats = [
    { 
      title: "负责学生", 
      value: "156", 
      change: "+12", 
      trend: "up", 
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      title: "待处理预警", 
      value: "3", 
      change: "-2", 
      trend: "down", 
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    { 
      title: "未读留言", 
      value: "5", 
      change: "+3", 
      trend: "up", 
      icon: MessageSquare,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    { 
      title: "本周干预", 
      value: "12", 
      change: "+4", 
      trend: "up", 
      icon: Heart,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
  ]

  const recentAlerts = [
    { 
      id: 1, 
      student: "张三", 
      avatar: "张",
      level: "high", 
      reason: "连续7天消极情绪，文本含高危词汇",
      time: "10分钟前",
      status: "pending"
    },
    { 
      id: 2, 
      student: "李四", 
      avatar: "李",
      level: "medium", 
      reason: "焦虑情绪占比超过30%",
      time: "1小时前",
      status: "pending"
    },
    { 
      id: 3, 
      student: "王五", 
      avatar: "王",
      level: "medium", 
      reason: "深夜活跃频次增加",
      time: "2小时前",
      status: "processing"
    },
  ]

  const focusStudents = [
    { id: 1, name: "张三", avatar: "张", status: "需关注", emotion: "焦虑", score: 35, trend: "down" },
    { id: 2, name: "李四", avatar: "李", status: "观察中", emotion: "低落", score: 45, trend: "stable" },
    { id: 3, name: "赵六", avatar: "赵", status: "恢复中", emotion: "平静", score: 68, trend: "up" },
    { id: 4, name: "钱七", avatar: "钱", status: "需关注", emotion: "压力", score: 42, trend: "down" },
  ]

  const todayTasks = [
    { id: 1, title: "与张三进行线下咨询", time: "14:00", status: "upcoming" },
    { id: 2, title: "查看李四本周情绪报告", time: "15:30", status: "upcoming" },
    { id: 3, title: "发布压力管理文章", time: "16:00", status: "completed" },
    { id: 4, title: "回复学生咨询留言", time: "17:00", status: "upcoming" },
  ]

  const emotionDistribution = [
    { label: "积极", value: 45, color: "bg-emerald-500" },
    { label: "平静", value: 30, color: "bg-primary" },
    { label: "焦虑", value: 15, color: "bg-amber-500" },
    { label: "低落", value: 10, color: "bg-destructive" },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">早上好，王老师</h1>
          <p className="text-muted-foreground mt-1">今天有3条待处理预警，5条未读留言</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            查看日程
          </Button>
          <Button>
            <Activity className="h-4 w-4 mr-2" />
            情绪分析报告
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up" ? "text-emerald-500" : "text-destructive"
                }`}>
                  {stat.change}
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <Card className="col-span-2 border-border/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">最新预警</CardTitle>
              <CardDescription>需要您及时处理的学生预警</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              查看全部
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={`${
                    alert.level === "high" ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"
                  }`}>
                    {alert.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{alert.student}</span>
                    <Badge variant={alert.level === "high" ? "destructive" : "secondary"} className="text-[10px]">
                      {alert.level === "high" ? "高风险" : "中风险"}
                    </Badge>
                    {alert.status === "processing" && (
                      <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                        处理中
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{alert.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                  <Button size="sm" variant={alert.status === "pending" ? "default" : "outline"}>
                    {alert.status === "pending" ? "立即处理" : "查看详情"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">今日日程</CardTitle>
            <CardDescription>您今天的工作安排</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3">
                <div className={`mt-0.5 p-1 rounded-full ${
                  task.status === "completed" ? "bg-emerald-500/10" : "bg-primary/10"
                }`}>
                  {task.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    task.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"
                  }`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{task.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Focus Students */}
        <Card className="col-span-2 border-border/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">重点关注学生</CardTitle>
              <CardDescription>需要持续关注的学生情绪状态</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              管理关注列表
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {focusStudents.map((student) => (
                <div key={student.id} className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">{student.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{student.name}</span>
                      <Badge variant={
                        student.status === "需关注" ? "destructive" : 
                        student.status === "观察中" ? "secondary" : "outline"
                      } className="text-[10px]">
                        {student.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">主要情绪: {student.emotion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={student.score} className="h-2 flex-1" />
                      <span className="text-xs font-medium text-muted-foreground w-8">{student.score}%</span>
                      {student.trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                      {student.trend === "down" && <TrendingDown className="h-3 w-3 text-destructive" />}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">查看详情</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emotion Distribution */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">学生情绪分布</CardTitle>
            <CardDescription>负责学生整体情绪状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  {emotionDistribution.reduce((acc, item, index) => {
                    const offset = acc.offset
                    const circumference = 2 * Math.PI * 40
                    const strokeDasharray = (item.value / 100) * circumference
                    acc.elements.push(
                      <circle
                        key={item.label}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        strokeWidth="12"
                        className={item.color.replace('bg-', 'stroke-')}
                        strokeDasharray={`${strokeDasharray} ${circumference}`}
                        strokeDashoffset={-offset}
                      />
                    )
                    acc.offset += strokeDasharray
                    return acc
                  }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Brain className="h-6 w-6 text-primary mb-1" />
                  <span className="text-lg font-bold text-foreground">156</span>
                  <span className="text-xs text-muted-foreground">学生</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {emotionDistribution.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
