"use client"

import { useState } from "react"
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  FileText, 
  BookOpen,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  BarChart3,
  ClipboardList
} from "lucide-react"
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
import { CounselorDashboard } from "./counselor-dashboard"
import { CounselorStudents } from "./counselor-students"
import { CounselorAlerts } from "./counselor-alerts"
import { CounselorMessages } from "./counselor-messages"
import { CounselorResources } from "./counselor-resources"
import { CounselorTasks } from "./counselor-tasks"

const navItems = [
  { id: "dashboard", label: "工作台", icon: LayoutDashboard },
  { id: "students", label: "学生管理", icon: Users },
  { id: "alerts", label: "危机预警", icon: AlertTriangle, badge: 3 },
  { id: "messages", label: "咨询留言", icon: MessageSquare, badge: 5 },
  { id: "tasks", label: "心理任务", icon: ClipboardList },
  { id: "resources", label: "资源管理", icon: BookOpen },
]

export function CounselorApp() {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <CounselorDashboard />
      case "students":
        return <CounselorStudents />
      case "alerts":
        return <CounselorAlerts />
      case "messages":
        return <CounselorMessages />
      case "tasks":
        return <CounselorTasks />
      case "resources":
        return <CounselorResources />
      default:
        return <CounselorDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-card border-r border-border flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-border px-4">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">心</span>
              </div>
              <span className="font-bold text-foreground">咨询师工作台</span>
            </div>
          ) : (
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">心</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeNav === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge variant={activeNav === item.id ? "secondary" : "destructive"} className="h-5 px-1.5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-border">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-counselor.jpg" alt="咨询师" />
              <AvatarFallback className="bg-primary/10 text-primary">王</AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">王老师</p>
                <p className="text-xs text-muted-foreground truncate">心理咨询师</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-muted-foreground"
            >
              <LayoutDashboard className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="搜索学生、预警记录..." 
                className="w-80 pl-9 bg-muted/50 border-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-counselor.jpg" alt="咨询师" />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">王</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">王老师</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  个人资料
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  设置
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-muted/30">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
