"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  MessageSquare,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Download
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  avatar: string
  school: string
  emotion: "positive" | "neutral" | "negative"
  riskLevel: "low" | "medium" | "high"
  lastActive: string
  totalChats: number
  diaryCount: number
}

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")

  const users: User[] = [
    { id: "1", name: "李明", avatar: "", school: "计算机学院", emotion: "positive", riskLevel: "low", lastActive: "10分钟前", totalChats: 156, diaryCount: 28 },
    { id: "2", name: "王芳", avatar: "", school: "外国语学院", emotion: "neutral", riskLevel: "low", lastActive: "30分钟前", totalChats: 89, diaryCount: 45 },
    { id: "3", name: "张伟", avatar: "", school: "经济管理学院", emotion: "negative", riskLevel: "high", lastActive: "1小时前", totalChats: 234, diaryCount: 12 },
    { id: "4", name: "刘洋", avatar: "", school: "艺术学院", emotion: "positive", riskLevel: "low", lastActive: "2小时前", totalChats: 67, diaryCount: 56 },
    { id: "5", name: "陈静", avatar: "", school: "医学院", emotion: "negative", riskLevel: "medium", lastActive: "3小时前", totalChats: 189, diaryCount: 34 },
    { id: "6", name: "赵强", avatar: "", school: "机械工程学院", emotion: "neutral", riskLevel: "low", lastActive: "5小时前", totalChats: 45, diaryCount: 23 },
  ]

  const getEmotionBadge = (emotion: string) => {
    switch (emotion) {
      case "positive":
        return <Badge className="bg-success/10 text-success border-0">积极</Badge>
      case "neutral":
        return <Badge className="bg-primary/10 text-primary border-0">中性</Badge>
      case "negative":
        return <Badge className="bg-destructive/10 text-destructive border-0">低落</Badge>
      default:
        return null
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge variant="outline" className="border-success text-success">低风险</Badge>
      case "medium":
        return <Badge variant="outline" className="border-warning text-warning">中风险</Badge>
      case "high":
        return <Badge variant="outline" className="border-destructive text-destructive">高风险</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">用户管理</h1>
          <p className="text-muted-foreground">查看和管理所有用户的情绪数据和使用情况</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          导出数据
        </Button>
      </div>

      {/* Filters */}
      <Card className="border border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索用户名、学院..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="风险等级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部等级</SelectItem>
                <SelectItem value="high">高风险</SelectItem>
                <SelectItem value="medium">中风险</SelectItem>
                <SelectItem value="low">低风险</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="情绪状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="positive">积极</SelectItem>
                <SelectItem value="neutral">中性</SelectItem>
                <SelectItem value="negative">低落</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="text-base">用户列表</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">用户信息</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">情绪状态</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">风险等级</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">对话数</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">日记数</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">最后活跃</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {user.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.school}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getEmotionBadge(user.emotion)}</td>
                    <td className="py-3 px-4">{getRiskBadge(user.riskLevel)}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{user.totalChats}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{user.diaryCount}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.lastActive}</td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            查看对话
                          </DropdownMenuItem>
                          {user.riskLevel !== "low" && (
                            <DropdownMenuItem className="text-destructive">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              发起干预
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">显示 1-6 共 2,847 条</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground">1</Button>
              <Button variant="outline" size="sm" className="h-8 w-8">2</Button>
              <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
              <span className="text-muted-foreground">...</span>
              <Button variant="outline" size="sm" className="h-8 w-8">475</Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
