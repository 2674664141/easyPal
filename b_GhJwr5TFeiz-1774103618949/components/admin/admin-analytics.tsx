"use client"

import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AdminAnalytics() {
  const emotionDistribution = [
    { emotion: "开心", percent: 35, color: "bg-success" },
    { emotion: "平静", percent: 28, color: "bg-primary" },
    { emotion: "焦虑", percent: 18, color: "bg-warning" },
    { emotion: "低落", percent: 12, color: "bg-chart-4" },
    { emotion: "愤怒", percent: 7, color: "bg-destructive" },
  ]

  const topKeywords = [
    { word: "考试", count: 1234, trend: "up" },
    { word: "论文", count: 987, trend: "up" },
    { word: "失眠", count: 756, trend: "down" },
    { word: "压力", count: 654, trend: "up" },
    { word: "迷茫", count: 543, trend: "down" },
    { word: "孤独", count: 432, trend: "up" },
  ]

  const usageStats = [
    { time: "00:00", users: 120 },
    { time: "03:00", users: 45 },
    { time: "06:00", users: 89 },
    { time: "09:00", users: 456 },
    { time: "12:00", users: 678 },
    { time: "15:00", users: 543 },
    { time: "18:00", users: 789 },
    { time: "21:00", users: 890 },
  ]

  const maxUsers = Math.max(...usageStats.map(s => s.users))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">数据分析</h1>
          <p className="text-muted-foreground">深入分析用户行为和情绪数据</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[130px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">今天</SelectItem>
              <SelectItem value="7d">最近7天</SelectItem>
              <SelectItem value="30d">最近30天</SelectItem>
              <SelectItem value="90d">最近90天</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "总用户数", value: "12,847", change: "+8.2%", trend: "up", icon: Users },
          { title: "总对话数", value: "156,234", change: "+15.3%", trend: "up", icon: MessageSquare },
          { title: "日均活跃", value: "2,456", change: "+5.1%", trend: "up", icon: TrendingUp },
          { title: "平均情绪分", value: "72.5", change: "+3.2", trend: "up", icon: BarChart3 },
        ].map((stat) => (
          <Card key={stat.title} className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-success" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-destructive" />
                )}
                <span className="text-sm font-medium text-success">{stat.change}</span>
                <span className="text-sm text-muted-foreground">较上周</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Emotion Distribution */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>情绪分布</CardTitle>
            <CardDescription>用户情绪类型统计分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              {/* Donut Chart Placeholder */}
              <div className="relative h-40 w-40 shrink-0">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  {emotionDistribution.reduce((acc, item, i) => {
                    const prevOffset = acc.offset
                    const circumference = 2 * Math.PI * 35
                    const strokeDasharray = `${(item.percent / 100) * circumference} ${circumference}`
                    const colors = ["#10b981", "#0ea5e9", "#f59e0b", "#ec4899", "#ef4444"]
                    
                    acc.elements.push(
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke={colors[i]}
                        strokeWidth="20"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={-prevOffset}
                        className="transition-all duration-500"
                      />
                    )
                    
                    acc.offset += (item.percent / 100) * circumference
                    return acc
                  }, { offset: 0, elements: [] as React.ReactNode[] }).elements}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-foreground">72.5</span>
                  <span className="text-xs text-muted-foreground">平均分</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-3">
                {emotionDistribution.map((item) => (
                  <div key={item.emotion} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded ${item.color}`} />
                      <span className="text-sm text-foreground">{item.emotion}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Timeline */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>使用时段分布</CardTitle>
            <CardDescription>24小时用户活跃度分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2">
              {usageStats.map((stat) => (
                <div key={stat.time} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{stat.users}</span>
                  <div 
                    className="w-full bg-primary/80 rounded-t hover:bg-primary transition-colors"
                    style={{ height: `${(stat.users / maxUsers) * 150}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{stat.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keywords and Insights */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Keywords */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>热门关键词</CardTitle>
            <CardDescription>用户对话中出现频率最高的词汇</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topKeywords.map((keyword, i) => (
                <div key={keyword.word} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground w-6">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{keyword.word}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">{keyword.count}次</span>
                        {keyword.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 text-destructive" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-success" />
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(keyword.count / topKeywords[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>AI分析洞察</CardTitle>
            <CardDescription>基于数据的智能分析建议</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "考试季压力增加",
                  desc: '近一周"考试"相关关键词增加42%，建议增加考前减压内容推送',
                  type: "warning",
                },
                {
                  title: "深夜活跃用户增多",
                  desc: "21:00-00:00时段活跃用户比上周增加15%，可能存在睡眠问题",
                  type: "info",
                },
                {
                  title: "社区互动效果良好",
                  desc: "参与社区互动的用户情绪改善率达68%，建议继续推广",
                  type: "success",
                },
                {
                  title: "新用户引导优化",
                  desc: "新用户首周流失率23%，建议优化引导流程和首次对话体验",
                  type: "info",
                },
              ].map((insight, i) => (
                <div key={i} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Badge 
                      variant="secondary"
                      className={
                        insight.type === "warning" 
                          ? "bg-warning/10 text-warning" 
                          : insight.type === "success"
                          ? "bg-success/10 text-success"
                          : "bg-primary/10 text-primary"
                      }
                    >
                      {insight.type === "warning" ? "关注" : insight.type === "success" ? "正向" : "建议"}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-foreground">{insight.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{insight.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Activity Analysis */}
      <Card className="border border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>社区活跃度分析</CardTitle>
              <CardDescription>用户社交行为和互动数据</CardDescription>
            </div>
            <Tabs defaultValue="posts">
              <TabsList>
                <TabsTrigger value="posts">发帖</TabsTrigger>
                <TabsTrigger value="comments">评论</TabsTrigger>
                <TabsTrigger value="likes">点赞</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "今日发帖", value: "234", change: "+12%" },
              { label: "今日评论", value: "1,567", change: "+8%" },
              { label: "今日点赞", value: "4,892", change: "+15%" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                <Badge variant="secondary" className="mt-2 bg-success/10 text-success">
                  {stat.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
