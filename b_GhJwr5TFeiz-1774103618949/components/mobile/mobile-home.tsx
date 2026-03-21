"use client"

import { useState } from "react"
import { 
  MessageCircle, 
  BookHeart, 
  Users, 
  Smile, 
  Meh, 
  Frown, 
  Sun, 
  Heart,
  Bell,
  TrendingUp,
  Sparkles,
  Home,
  User,
  CloudSun,
  Angry,
  ClipboardList,
  Headphones,
  BookOpen,
  Phone,
  AlertTriangle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface MobileHomeProps {
  onNavigate: (page: string) => void
}

export function MobileHome({ onNavigate }: MobileHomeProps) {
  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const [greeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "早上好"
    if (hour < 18) return "下午好"
    return "晚上好"
  })

  const moodOptions = [
    { id: "happy", icon: Smile, label: "开心", color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: "calm", icon: CloudSun, label: "平静", color: "text-sky-500", bg: "bg-sky-50" },
    { id: "neutral", icon: Meh, label: "一般", color: "text-amber-500", bg: "bg-amber-50" },
    { id: "sad", icon: Frown, label: "低落", color: "text-blue-500", bg: "bg-blue-50" },
    { id: "anxious", icon: Angry, label: "焦虑", color: "text-red-500", bg: "bg-red-50" },
  ]

  const quickActions = [
    { id: "chat", icon: MessageCircle, label: "AI对话", desc: "与AI助手倾诉", color: "bg-primary" },
    { id: "diary", icon: BookHeart, label: "心情日记", desc: "记录今日心情", color: "bg-accent" },
    { id: "community", icon: Users, label: "温暖社区", desc: "找到同伴支持", color: "bg-chart-2" },
  ]

  const moreActions = [
    { id: "assessment", icon: ClipboardList, label: "心理测评", desc: "科学评估状态", color: "bg-blue-500" },
    { id: "relax", icon: Headphones, label: "放松音频", desc: "冥想与呼吸训练", color: "bg-indigo-500" },
    { id: "articles", icon: BookOpen, label: "心理文章", desc: "阅读专业建议", color: "bg-emerald-500" },
  ]

  const dailyTips = [
    "今天试着对自己说一句鼓励的话",
    "深呼吸三次，感受当下",
    "给身边的人一个微笑",
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src="/placeholder-user.jpg" alt="用户头像" />
              <AvatarFallback className="bg-primary/10 text-primary">李</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">{greeting}</p>
              <p className="font-semibold text-foreground">李同学</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
              2
            </span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 space-y-5 pb-20">
        {/* Mood Check Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              今天感觉怎么样？
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between px-2 py-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setCurrentMood(mood.id)}
                  className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl transition-all ${
                    currentMood === mood.id 
                      ? `${mood.bg} scale-105 shadow-sm` 
                      : "hover:bg-muted"
                  }`}
                >
                  <div className={`p-2 rounded-full ${currentMood === mood.id ? mood.bg : "bg-muted"}`}>
                    <mood.icon className={`h-6 w-6 ${currentMood === mood.id ? mood.color : "text-muted-foreground"}`} />
                  </div>
                  <span className={`text-[11px] font-medium ${currentMood === mood.id ? "text-foreground" : "text-muted-foreground"}`}>
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground px-1">快捷功能</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="flex flex-col items-center p-4 rounded-2xl bg-card shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 border border-border/50"
              >
                <div className={`p-3 rounded-xl ${action.color} mb-2`}>
                  <action.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">{action.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* More Actions */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground px-1">心理资源</h2>
          <div className="grid grid-cols-3 gap-3">
            {moreActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="flex flex-col items-center p-4 rounded-2xl bg-card shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 border border-border/50"
              >
                <div className={`p-3 rounded-xl ${action.color} mb-2`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">{action.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SOS Banner */}
        <Card 
          className="border-0 bg-gradient-to-r from-red-50 to-orange-50 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate("sos")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">紧急求助</p>
                  <p className="text-xs text-muted-foreground">一键联系心理热线/咨询师</p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="destructive" 
                className="rounded-full gap-1 text-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate("sos")
                }}
              >
                <Phone className="h-3 w-3" />
                求助
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Stats */}
        <Card className="border border-border/50 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                本周情绪趋势
              </span>
              <Badge variant="secondary" className="text-xs">
                整体积极
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-20 px-2">
              {["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((day, i) => {
                const heights = [60, 75, 50, 85, 70, 90, 80]
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <div 
                      className="w-6 rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                      style={{ height: `${heights[i]}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground">{day.slice(1)}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Daily Tip */}
        <Card className="border-0 bg-gradient-to-r from-accent/20 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/30">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">今日小贴士</p>
                <p className="text-sm text-muted-foreground">{dailyTips[Math.floor(Math.random() * dailyTips.length)]}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground px-1">最近动态</h2>
          <div className="space-y-2">
            {[
              { title: "完成了今日签到", time: "10分钟前", icon: Sun },
              { title: "写了一篇心情日记", time: "2小时前", icon: BookHeart },
              { title: "在社区收到了3个温暖", time: "昨天", icon: Heart },
            ].map((activity, i) => (
              <Card key={i} className="border border-border/50">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-20">
        <div className="flex justify-around items-center px-2 py-1">
          {[
            { id: "home", icon: Home, label: "首页", active: true },
            { id: "chat", icon: MessageCircle, label: "对话" },
            { id: "diary", icon: BookHeart, label: "日记" },
            { id: "community", icon: Users, label: "社区" },
            { id: "profile", icon: User, label: "我的" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all ${
                item.active 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className={`h-5 w-5 ${item.active ? "stroke-[2.5px]" : ""}`} />
              <span className={`text-[10px] ${item.active ? "font-semibold" : "font-medium"}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
