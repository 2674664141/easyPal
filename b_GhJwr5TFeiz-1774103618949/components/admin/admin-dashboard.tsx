"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  BarChart3,
  MessageSquare,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Heart,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Shield,
  Menu
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
  collapsed: boolean
}

export function AdminSidebar({ currentPage, onNavigate, collapsed }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "数据大盘" },
    { id: "users", icon: Users, label: "用户管理" },
    { id: "counselors", icon: Shield, label: "咨询师管理" },
    { id: "content", icon: MessageSquare, label: "内容审核" },
    { id: "analytics", icon: BarChart3, label: "统计报表" },
    { id: "settings", icon: Settings, label: "系统设置" },
  ]

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0">
          <Heart className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-bold text-sidebar-foreground truncate">心灵伴侣</h1>
            <p className="text-xs text-muted-foreground truncate">系统管理中心</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
              currentPage === item.id
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
            {item.id === "content" && !collapsed && (
              <Badge className="ml-auto bg-amber-500 text-white text-[10px] px-1.5">
                8
              </Badge>
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/admin-avatar.jpg" />
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
                    管
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">管理员</p>
                  <p className="text-xs text-muted-foreground truncate">系统管理员</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                账户设置
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </aside>
  )
}

interface AdminHeaderProps {
  onToggleSidebar: () => void
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="搜索用户、对话记录..." 
              className="pl-9 w-[300px] bg-muted border-0"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
              5
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export function AdminDashboard() {
  const stats = [
    { 
      title: "活跃用户", 
      value: "2,847", 
      change: "+12.5%", 
      trend: "up",
      icon: Users,
      color: "text-primary"
    },
    { 
      title: "今日对话", 
      value: "1,234", 
      change: "+8.2%", 
      trend: "up",
      icon: MessageSquare,
      color: "text-chart-2"
    },
    { 
      title: "危机预警", 
      value: "3", 
      change: "-2", 
      trend: "down",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    { 
      title: "平均响应", 
      value: "1.2s", 
      change: "-0.3s", 
      trend: "down",
      icon: Clock,
      color: "text-accent"
    },
  ]

  const recentAlerts = [
    { id: 1, user: "用户A***3", level: "高", reason: "多次提及负面情绪关键词", time: "5分钟前" },
    { id: 2, user: "用户B***7", level: "中", reason: "情绪波动异常", time: "15分钟前" },
    { id: 3, user: "用户C***2", level: "中", reason: "长期低落情绪趋势", time: "1小时前" },
  ]

  const recentUsers = [
    { id: 1, name: "李同学", emotion: "积极", activity: "完成AI对话", time: "刚刚" },
    { id: 2, name: "王同学", emotion: "中性", activity: "发布心情日记", time: "3分钟前" },
    { id: 3, name: "张同学", emotion: "低落", activity: "社区互动", time: "10分钟前" },
    { id: 4, name: "赵同学", emotion: "积极", activity: "完成情绪打卡", time: "15分钟前" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">系统数据大盘</h1>
        <p className="text-muted-foreground">全校学生心理健康状态总览与系统运行监控</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-primary" />
                )}
                <span className={`text-sm font-medium ${stat.trend === "up" ? "text-success" : "text-primary"}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground">较昨日</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Emotion Trend Chart */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              用户情绪趋势
            </CardTitle>
            <CardDescription>过去7天的用户整体情绪分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2 px-4">
              {["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((day, i) => {
                const positive = [65, 70, 55, 72, 68, 80, 75][i]
                const neutral = [25, 20, 30, 18, 22, 15, 18][i]
                const negative = [10, 10, 15, 10, 10, 5, 7][i]
                
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col gap-0.5" style={{ height: "160px" }}>
                      <div 
                        className="w-full bg-destructive/60 rounded-t"
                        style={{ height: `${negative}%` }}
                      />
                      <div 
                        className="w-full bg-accent/60"
                        style={{ height: `${neutral}%` }}
                      />
                      <div 
                        className="w-full bg-primary/60 rounded-b"
                        style={{ height: `${positive}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-primary/60" />
                <span className="text-xs text-muted-foreground">积极</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-accent/60" />
                <span className="text-xs text-muted-foreground">中性</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-destructive/60" />
                <span className="text-xs text-muted-foreground">消极</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-destructive" />
              危机风险分布
            </CardTitle>
            <CardDescription>当前用户风险等级分布情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { level: "低风险", count: 2650, percent: 93, color: "bg-success" },
                { level: "中风险", count: 180, percent: 6.3, color: "bg-warning" },
                { level: "高风险", count: 17, percent: 0.6, color: "bg-destructive" },
              ].map((item) => (
                <div key={item.level} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.level}</span>
                    <span className="text-sm text-muted-foreground">{item.count}人 ({item.percent}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">本周干预建议</p>
                  <p className="text-xs text-muted-foreground mt-1">17位高风险用户需要关注</p>
                </div>
                <Button size="sm">查看详情</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <Card className="border border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                最新预警
              </CardTitle>
              <Button variant="ghost" size="sm">查看全部</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className={cn(
                    "h-2 w-2 rounded-full shrink-0",
                    alert.level === "高" ? "bg-destructive" : "bg-warning"
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{alert.user}</span>
                      <Badge variant={alert.level === "高" ? "destructive" : "secondary"} className="text-[10px]">
                        {alert.level}风险
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{alert.reason}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="border border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                最近活跃
              </CardTitle>
              <Button variant="ghost" size="sm">查看全部</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {user.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{user.name}</span>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-[10px]",
                          user.emotion === "积极" && "bg-success/10 text-success",
                          user.emotion === "低落" && "bg-destructive/10 text-destructive"
                        )}
                      >
                        {user.emotion}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{user.activity}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{user.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
