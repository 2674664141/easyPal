"use client"

import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Heart,
  Menu,
  Stethoscope
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

interface CounselorSidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
  collapsed: boolean
}

export function CounselorSidebar({ currentPage, onNavigate, collapsed }: CounselorSidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "工作台" },
    { id: "students", icon: Users, label: "学生管理", count: 45 },
    { id: "alerts", icon: AlertTriangle, label: "危机预警", count: 3 },
    { id: "messages", icon: MessageSquare, label: "咨询留言", count: 8 },
    { id: "resources", icon: FileText, label: "资源管理" },
  ]

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-xl bg-sidebar-primary flex items-center justify-center shrink-0">
          <Stethoscope className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-bold text-sidebar-foreground truncate">心灵伴侣</h1>
            <p className="text-xs text-muted-foreground truncate">咨询师工作台</p>
          </div>
        )}
      </div>

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
            {!collapsed && <span className="text-sm font-medium truncate flex-1">{item.label}</span>}
            {item.count && !collapsed && (
              <Badge className={cn(
                "text-[10px] px-1.5",
                item.id === "alerts"
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-primary/10 text-primary"
              )}>
                {item.count}
              </Badge>
            )}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
                    张
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">张心怡</p>
                  <p className="text-xs text-muted-foreground truncate">高级心理咨询师</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                个人设置
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

interface CounselorHeaderProps {
  onToggleSidebar: () => void
}

export function CounselorHeader({ onToggleSidebar }: CounselorHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索学生、对话记录..." className="pl-9 w-[300px] bg-muted border-0" />
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
