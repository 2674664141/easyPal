"use client"

import { useState } from "react"
import { 
  ArrowLeft,
  Settings,
  ChevronRight,
  BookHeart,
  MessageCircle,
  Heart,
  Award,
  Calendar,
  Bell,
  Moon,
  Shield,
  HelpCircle,
  LogOut,
  Camera,
  Star,
  TrendingUp,
  Flame,
  Target,
  Sparkles,
  Users,
  Edit3
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

interface MobileProfileProps {
  onBack: () => void
}

export function MobileProfile({ onBack }: MobileProfileProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const stats = [
    { label: "连续签到", value: "15天", icon: Flame, color: "text-orange-500" },
    { label: "心情日记", value: "32篇", icon: BookHeart, color: "text-primary" },
    { label: "获得温暖", value: "128", icon: Heart, color: "text-red-500" },
    { label: "成就徽章", value: "8个", icon: Award, color: "text-amber-500" },
  ]

  const achievements = [
    { id: 1, name: "初次相遇", desc: "完成首次AI对话", icon: "🌟", unlocked: true },
    { id: 2, name: "坚持不懈", desc: "连续签到7天", icon: "🔥", unlocked: true },
    { id: 3, name: "倾诉者", desc: "累计对话100次", icon: "💬", unlocked: true },
    { id: 4, name: "暖心达人", desc: "在社区获得50个赞", icon: "💖", unlocked: true },
    { id: 5, name: "情绪管理师", desc: "记录30篇心情日记", icon: "📝", unlocked: true },
    { id: 6, name: "正念修行", desc: "完成10次冥想练习", icon: "🧘", unlocked: false },
  ]

  const menuItems = [
    { 
      group: "数据与记录",
      items: [
        { id: "diary", label: "我的日记", icon: BookHeart, badge: "32篇" },
        { id: "chat", label: "对话记录", icon: MessageCircle, badge: "156次" },
        { id: "collection", label: "我的收藏", icon: Heart },
        { id: "achievement", label: "成就中心", icon: Award, badge: "新" },
      ]
    },
    { 
      group: "设置",
      items: [
        { id: "notification", label: "消息通知", icon: Bell, toggle: true, value: notifications, onChange: setNotifications },
        { id: "dark", label: "深色模式", icon: Moon, toggle: true, value: darkMode, onChange: setDarkMode },
        { id: "privacy", label: "隐私设置", icon: Shield },
        { id: "help", label: "帮助与反馈", icon: HelpCircle },
      ]
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      {/* Header with Gradient Background */}
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 pb-16">
        <header className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-primary-foreground hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-primary-foreground font-semibold">个人中心</span>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        {/* Profile Card */}
        <div className="px-4 pt-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20 ring-4 ring-primary-foreground/30 shadow-xl">
                <AvatarImage src="/placeholder-user.jpg" alt="用户头像" />
                <AvatarFallback className="bg-primary-foreground text-primary text-2xl font-bold">李</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary-foreground shadow-md">
                <Camera className="h-3.5 w-3.5 text-primary" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-primary-foreground">李同学</h1>
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 text-[10px]">
                  Lv.5
                </Badge>
              </div>
              <p className="text-primary-foreground/80 text-sm mb-2">保持好心情，每天都是新的开始</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0 gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  暖心达人
                </Badge>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
                  计算机学院
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Card - overlapping */}
      <div className="px-4 -mt-10 relative z-10">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-2">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <div className={`p-2 rounded-xl bg-muted mb-2`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className="text-base font-bold text-foreground">{stat.value}</span>
                  <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 space-y-4 pb-24">
        {/* Growth Progress */}
        <Card className="border border-border/60 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">成长进度</span>
              </div>
              <span className="text-xs text-muted-foreground">距离下一等级还需 350 经验</span>
            </div>
            <Progress value={65} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Lv.5 暖心达人</span>
              <span>650/1000 EXP</span>
              <span>Lv.6 治愈大师</span>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Showcase */}
        <Card className="border border-border/60 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-semibold text-foreground">成就展示</span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-primary h-auto p-0">
                查看全部
                <ChevronRight className="h-3 w-3 ml-0.5" />
              </Button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                    achievement.unlocked 
                      ? "bg-gradient-to-b from-amber-50 to-orange-50" 
                      : "bg-muted opacity-50"
                  }`}
                >
                  <span className={`text-2xl mb-1 ${!achievement.unlocked && "grayscale"}`}>
                    {achievement.icon}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Groups */}
        {menuItems.map((group) => (
          <Card key={group.group} className="border border-border/60 shadow-sm">
            <CardContent className="p-0">
              <div className="px-4 py-2.5 border-b border-border/50">
                <span className="text-xs font-medium text-muted-foreground">{group.group}</span>
              </div>
              <div className="divide-y divide-border/50">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${
                      !item.toggle ? "hover:bg-muted/50 cursor-pointer" : ""
                    }`}
                    onClick={() => !item.toggle && console.log(`Navigate to ${item.id}`)}
                    role={!item.toggle ? "button" : undefined}
                    tabIndex={!item.toggle ? 0 : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-muted">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <Badge 
                          variant={item.badge === "新" ? "default" : "secondary"} 
                          className={`text-[10px] ${item.badge === "新" ? "bg-red-500" : ""}`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {item.toggle ? (
                        <Switch 
                          checked={item.value} 
                          onCheckedChange={item.onChange}
                        />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          退出登录
        </Button>

        {/* Version Info */}
        <p className="text-center text-xs text-muted-foreground pb-4">
          心灵伴侣 v1.0.0
        </p>
      </main>
    </div>
  )
}
