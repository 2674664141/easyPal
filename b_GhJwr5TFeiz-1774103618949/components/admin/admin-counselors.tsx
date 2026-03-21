"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  MessageSquare,
  AlertTriangle,
  Award,
  Calendar,
  Mail,
  Phone
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const counselors = [
  {
    id: 1,
    name: "王老师",
    avatar: "王",
    title: "高级心理咨询师",
    department: "心理健康中心",
    phone: "138****1234",
    email: "wang@university.edu",
    status: "active",
    assignedStudents: 156,
    handledAlerts: 45,
    publishedArticles: 12,
    joinDate: "2022-09-01",
    lastActive: "10分钟前",
    permissions: ["students", "alerts", "messages", "resources"]
  },
  {
    id: 2,
    name: "李老师",
    avatar: "李",
    title: "心理咨询师",
    department: "学生工作处",
    phone: "139****5678",
    email: "li@university.edu",
    status: "active",
    assignedStudents: 98,
    handledAlerts: 23,
    publishedArticles: 8,
    joinDate: "2023-03-15",
    lastActive: "1小时前",
    permissions: ["students", "alerts", "messages"]
  },
  {
    id: 3,
    name: "张老师",
    avatar: "张",
    title: "心理咨询师",
    department: "心理健康中心",
    phone: "137****9012",
    email: "zhang@university.edu",
    status: "inactive",
    assignedStudents: 0,
    handledAlerts: 0,
    publishedArticles: 0,
    joinDate: "2024-01-10",
    lastActive: "3天前",
    permissions: ["students"]
  },
]

const pendingApplications = [
  {
    id: 1,
    name: "赵老师",
    title: "心理学硕士",
    department: "教育学院",
    phone: "136****3456",
    email: "zhao@university.edu",
    appliedAt: "2024-03-18",
    certificate: "国家二级心理咨询师",
    experience: "3年学校心理咨询经验"
  },
  {
    id: 2,
    name: "钱老师",
    title: "心理学博士",
    department: "心理学院",
    phone: "135****7890",
    email: "qian@university.edu",
    appliedAt: "2024-03-19",
    certificate: "国家一级心理咨询师",
    experience: "5年临床心理咨询经验"
  },
]

export function AdminCounselors() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [selectedCounselor, setSelectedCounselor] = useState<typeof counselors[0] | null>(null)

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge className="bg-emerald-500 text-white">在职</Badge>
    }
    return <Badge variant="secondary">停用</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">咨询师管理</h1>
          <p className="text-muted-foreground">管理心理咨询师账号、审核入驻申请、分配权限</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          添加咨询师
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{counselors.filter(c => c.status === "active").length}</p>
                <p className="text-sm text-muted-foreground">在职咨询师</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingApplications.length}</p>
                <p className="text-sm text-muted-foreground">待审核申请</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <AlertTriangle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{counselors.reduce((acc, c) => acc + c.handledAlerts, 0)}</p>
                <p className="text-sm text-muted-foreground">本月处理预警</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{counselors.reduce((acc, c) => acc + c.publishedArticles, 0)}</p>
                <p className="text-sm text-muted-foreground">发布文章总数</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Counselor Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="list">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="list">咨询师列表</TabsTrigger>
                <TabsTrigger value="applications" className="gap-1">
                  入驻申请
                  {pendingApplications.length > 0 && (
                    <Badge className="ml-1 bg-amber-500 text-white text-[10px]">{pendingApplications.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="allocation">学生分配</TabsTrigger>
              </TabsList>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索咨询师..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <TabsContent value="list">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>咨询师</TableHead>
                    <TableHead>部门/职称</TableHead>
                    <TableHead>负责学生</TableHead>
                    <TableHead>处理预警</TableHead>
                    <TableHead>发布文章</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>最近活跃</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {counselors.map((counselor) => (
                    <TableRow key={counselor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {counselor.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{counselor.name}</p>
                            <p className="text-xs text-muted-foreground">{counselor.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{counselor.department}</p>
                        <p className="text-xs text-muted-foreground">{counselor.title}</p>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{counselor.assignedStudents}</span>
                        <span className="text-muted-foreground">人</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{counselor.handledAlerts}</span>
                        <span className="text-muted-foreground">次</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{counselor.publishedArticles}</span>
                        <span className="text-muted-foreground">篇</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(counselor.status)}</TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{counselor.lastActive}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              查看详情
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSelectedCounselor(counselor); setShowPermissionDialog(true); }}>
                              <Shield className="h-4 w-4 mr-2" />
                              权限设置
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="h-4 w-4 mr-2" />
                              分配学生
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              编辑信息
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {counselor.status === "active" ? "停用账号" : "启用账号"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              {pendingApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-amber-100 text-amber-700">
                        {application.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{application.name}</h3>
                        <Badge variant="outline">{application.title}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{application.department}</span>
                        <span className="flex items-center gap-1">
                          <Award className="h-3.5 w-3.5" />
                          {application.certificate}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{application.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm text-muted-foreground">
                      <p>申请时间</p>
                      <p>{application.appliedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        查看资料
                      </Button>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        通过
                      </Button>
                      <Button variant="destructive" size="sm">
                        <XCircle className="h-4 w-4 mr-1" />
                        拒绝
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="allocation">
              <div className="text-center py-12 text-muted-foreground">
                学生分配管理界面
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Permission Dialog */}
      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>权限设置</DialogTitle>
            <DialogDescription>
              为 {selectedCounselor?.name} 配置系统操作权限
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              {[
                { id: "students", label: "学生管理", desc: "查看和管理负责的学生信息" },
                { id: "alerts", label: "危机预警", desc: "接收和处理学生心理危机预警" },
                { id: "messages", label: "咨询留言", desc: "查看和回复学生咨询留言" },
                { id: "resources", label: "资源发布", desc: "发布心理文章和音频资源" },
                { id: "tasks", label: "任务布置", desc: "为学生布置心理任务" },
              ].map((permission) => (
                <div key={permission.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox 
                    id={permission.id}
                    defaultChecked={selectedCounselor?.permissions.includes(permission.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={permission.id} className="font-medium cursor-pointer">
                      {permission.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{permission.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissionDialog(false)}>取消</Button>
            <Button onClick={() => setShowPermissionDialog(false)}>保存权限</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
