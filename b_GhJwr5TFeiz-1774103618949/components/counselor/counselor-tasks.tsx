"use client"

import { useState } from "react"
import { 
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  Users,
  Calendar,
  Target,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  BarChart3
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CounselorTasks() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const tasks = [
    {
      id: 1,
      title: "每日呼吸放松练习",
      description: "完成10分钟的腹式呼吸训练，帮助缓解焦虑",
      type: "放松训练",
      assignedTo: 12,
      completed: 8,
      deadline: "2024-01-20",
      status: "active",
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      title: "情绪日记记录",
      description: "每天记录三个让你感到开心的小事",
      type: "心情记录",
      assignedTo: 25,
      completed: 18,
      deadline: "2024-01-25",
      status: "active",
      createdAt: "2024-01-08"
    },
    {
      id: 3,
      title: "正念冥想入门",
      description: "完成5次正念冥想练习，每次15分钟",
      type: "冥想练习",
      assignedTo: 8,
      completed: 8,
      deadline: "2024-01-15",
      status: "completed",
      createdAt: "2024-01-05"
    },
    {
      id: 4,
      title: "社交挑战任务",
      description: "本周主动与3位同学进行一次深度交流",
      type: "社交训练",
      assignedTo: 5,
      completed: 2,
      deadline: "2024-01-22",
      status: "active",
      createdAt: "2024-01-12"
    },
  ]

  const taskTemplates = [
    { id: 1, title: "呼吸放松训练", type: "放松训练", duration: "7天" },
    { id: 2, title: "感恩日记", type: "心情记录", duration: "14天" },
    { id: 3, title: "正念冥想", type: "冥想练习", duration: "7天" },
    { id: 4, title: "运动打卡", type: "身体锻炼", duration: "14天" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">心理任务</h1>
          <p className="text-muted-foreground mt-1">为学生发布个性化心理训练任务</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              创建任务
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>创建心理任务</DialogTitle>
              <DialogDescription>
                为学生创建个性化的心理训练任务
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>任务名称</Label>
                <Input placeholder="输入任务名称" />
              </div>
              <div className="space-y-2">
                <Label>任务描述</Label>
                <Textarea placeholder="描述任务内容和目标" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>任务类型</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relax">放松训练</SelectItem>
                      <SelectItem value="diary">心情记录</SelectItem>
                      <SelectItem value="meditation">冥想练习</SelectItem>
                      <SelectItem value="social">社交训练</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>截止日期</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>指派学生</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择学生" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部关注学生</SelectItem>
                    <SelectItem value="high">高风险学生</SelectItem>
                    <SelectItem value="select">手动选择</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>取消</Button>
              <Button onClick={() => setIsDialogOpen(false)}>创建任务</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">进行中任务</p>
                <p className="text-2xl font-bold text-foreground mt-1">8</p>
              </div>
              <Target className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">已完成任务</p>
                <p className="text-2xl font-bold text-emerald-500 mt-1">15</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-emerald-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">参与学生</p>
                <p className="text-2xl font-bold text-foreground mt-1">45</p>
              </div>
              <Users className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平均完成率</p>
                <p className="text-2xl font-bold text-foreground mt-1">72%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索任务..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="任务状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">进行中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="任务类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="relax">放松训练</SelectItem>
                <SelectItem value="diary">心情记录</SelectItem>
                <SelectItem value="meditation">冥想练习</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Task List */}
        <div className="col-span-2 space-y-4">
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">进行中 (3)</TabsTrigger>
              <TabsTrigger value="completed">已完成 (1)</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-4 space-y-4">
              {tasks.filter(t => t.status === "active").map((task) => (
                <Card key={task.id} className="border-border/60">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{task.title}</h3>
                          <Badge variant="secondary" className="text-[10px]">{task.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
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
                            <Edit className="h-4 w-4 mr-2" />
                            编辑任务
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            复制任务
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            删除任务
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">完成进度</span>
                        <span className="font-medium">{task.completed}/{task.assignedTo} 人</span>
                      </div>
                      <Progress value={(task.completed / task.assignedTo) * 100} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>截止: {task.deadline}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{task.assignedTo} 人参与</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="mt-4 space-y-4">
              {tasks.filter(t => t.status === "completed").map((task) => (
                <Card key={task.id} className="border-border/60 opacity-75">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <h3 className="font-semibold text-foreground">{task.title}</h3>
                          <Badge variant="secondary" className="text-[10px]">{task.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>完成率: 100%</span>
                      <span>参与: {task.assignedTo}人</span>
                      <span>截止: {task.deadline}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Task Templates */}
        <Card className="border-border/60 h-fit">
          <CardHeader>
            <CardTitle className="text-base font-semibold">任务模板</CardTitle>
            <CardDescription>快速使用预设的任务模板</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {taskTemplates.map((template) => (
              <div 
                key={template.id}
                className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-foreground">{template.title}</span>
                  <Badge variant="outline" className="text-[10px]">{template.type}</Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>建议周期: {template.duration}</span>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">
              <Plus className="h-4 w-4 mr-2" />
              创建模板
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
