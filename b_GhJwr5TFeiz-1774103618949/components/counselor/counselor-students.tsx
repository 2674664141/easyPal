"use client"

import { useState } from "react"
import { 
  Search, 
  Filter, 
  Star,
  StarOff,
  Eye,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
  MoreHorizontal,
  Download,
  UserPlus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function CounselorStudents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollege, setSelectedCollege] = useState("all")

  const students = [
    { 
      id: 1, 
      name: "张三", 
      avatar: "张", 
      studentId: "2021001001",
      college: "计算机学院",
      grade: "大三",
      emotionScore: 35,
      mainEmotion: "焦虑",
      riskLevel: "high",
      trend: "down",
      lastActive: "10分钟前",
      isFocused: true,
      chatCount: 45,
      diaryCount: 28
    },
    { 
      id: 2, 
      name: "李四", 
      avatar: "李", 
      studentId: "2021001002",
      college: "计算机学院",
      grade: "大三",
      emotionScore: 45,
      mainEmotion: "低落",
      riskLevel: "medium",
      trend: "stable",
      lastActive: "1小时前",
      isFocused: true,
      chatCount: 32,
      diaryCount: 15
    },
    { 
      id: 3, 
      name: "王五", 
      avatar: "王", 
      studentId: "2021002001",
      college: "经济学院",
      grade: "大二",
      emotionScore: 72,
      mainEmotion: "平静",
      riskLevel: "low",
      trend: "up",
      lastActive: "3小时前",
      isFocused: false,
      chatCount: 18,
      diaryCount: 42
    },
    { 
      id: 4, 
      name: "赵六", 
      avatar: "赵", 
      studentId: "2022001001",
      college: "计算机学院",
      grade: "大二",
      emotionScore: 68,
      mainEmotion: "开心",
      riskLevel: "low",
      trend: "up",
      lastActive: "30分钟前",
      isFocused: false,
      chatCount: 25,
      diaryCount: 36
    },
    { 
      id: 5, 
      name: "钱七", 
      avatar: "钱", 
      studentId: "2020003001",
      college: "文学院",
      grade: "大四",
      emotionScore: 42,
      mainEmotion: "压力",
      riskLevel: "medium",
      trend: "down",
      lastActive: "2小时前",
      isFocused: true,
      chatCount: 56,
      diaryCount: 20
    },
  ]

  const getRiskBadge = (level: string) => {
    switch(level) {
      case "high":
        return <Badge variant="destructive" className="text-[10px]">高风险</Badge>
      case "medium":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 text-[10px]">中风险</Badge>
      default:
        return <Badge variant="secondary" className="text-[10px]">低风险</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.includes(searchQuery) || student.studentId.includes(searchQuery)
    const matchesCollege = selectedCollege === "all" || student.college === selectedCollege
    return matchesSearch && matchesCollege
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">学生管理</h1>
          <p className="text-muted-foreground mt-1">管理和查看您负责的学生信息</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出数据
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            添加学生
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-border/60">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">总学生数</p>
            <p className="text-2xl font-bold text-foreground mt-1">156</p>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">重点关注</p>
            <p className="text-2xl font-bold text-amber-500 mt-1">12</p>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">高风险学生</p>
            <p className="text-2xl font-bold text-destructive mt-1">3</p>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">本周活跃</p>
            <p className="text-2xl font-bold text-emerald-500 mt-1">128</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="搜索学生姓名或学号..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCollege} onValueChange={setSelectedCollege}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="选择学院" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部学院</SelectItem>
                <SelectItem value="计算机学院">计算机学院</SelectItem>
                <SelectItem value="经济学院">经济学院</SelectItem>
                <SelectItem value="文学院">文学院</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="风险等级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部等级</SelectItem>
                <SelectItem value="high">高风险</SelectItem>
                <SelectItem value="medium">中风险</SelectItem>
                <SelectItem value="low">低风险</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">全部学生</TabsTrigger>
          <TabsTrigger value="focused">重点关注</TabsTrigger>
          <TabsTrigger value="risk">风险学生</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card className="border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>学生信息</TableHead>
                  <TableHead>学院/年级</TableHead>
                  <TableHead>情绪状态</TableHead>
                  <TableHead>风险等级</TableHead>
                  <TableHead>趋势</TableHead>
                  <TableHead>最近活跃</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {student.isFocused ? (
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        ) : (
                          <StarOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className={`${
                            student.riskLevel === "high" ? "bg-destructive/10 text-destructive" :
                            student.riskLevel === "medium" ? "bg-amber-500/10 text-amber-600" :
                            "bg-primary/10 text-primary"
                          }`}>
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.studentId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground">{student.college}</p>
                      <p className="text-xs text-muted-foreground">{student.grade}</p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Progress value={student.emotionScore} className="h-2 w-24" />
                          <span className="text-xs font-medium">{student.emotionScore}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">主要情绪: {student.mainEmotion}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getRiskBadge(student.riskLevel)}</TableCell>
                    <TableCell>{getTrendIcon(student.trend)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{student.lastActive}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>查看详细档案</DropdownMenuItem>
                            <DropdownMenuItem>查看情绪历史</DropdownMenuItem>
                            <DropdownMenuItem>发起干预</DropdownMenuItem>
                            <DropdownMenuItem>添加到关注</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="focused" className="mt-4">
          <Card className="border-border/60 p-8 text-center text-muted-foreground">
            重点关注学生列表
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="mt-4">
          <Card className="border-border/60 p-8 text-center text-muted-foreground">
            风险学生列表
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
