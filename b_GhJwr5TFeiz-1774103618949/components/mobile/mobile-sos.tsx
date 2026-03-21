"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Heart, 
  Shield,
  AlertTriangle,
  Clock,
  MapPin,
  User,
  ChevronRight,
  Headphones,
  BookOpen,
  Wind
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface MobileSOSProps {
  onBack: () => void
}

export function MobileSOS({ onBack }: MobileSOSProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedHotline, setSelectedHotline] = useState<string | null>(null)

  const hotlines = [
    { 
      id: "national", 
      name: "全国心理援助热线", 
      number: "400-161-9995", 
      available: "24小时", 
      desc: "专业心理咨询师在线守护",
      color: "bg-red-500"
    },
    { 
      id: "beijing", 
      name: "北京心理危机研究与干预中心", 
      number: "010-82951332", 
      available: "24小时",
      desc: "专业危机干预支持",
      color: "bg-orange-500"
    },
    { 
      id: "youth", 
      name: "青少年心理热线", 
      number: "12355", 
      available: "8:00-22:00",
      desc: "青年学生专属服务",
      color: "bg-blue-500"
    },
  ]

  const counselors = [
    { 
      id: "zhang", 
      name: "张心怡老师", 
      title: "学校心理咨询中心", 
      status: "在线",
      avatar: "张",
      speciality: "情绪管理、学业压力"
    },
    { 
      id: "liu", 
      name: "刘明远老师", 
      title: "学校心理咨询中心", 
      status: "在线",
      avatar: "刘",
      speciality: "人际关系、焦虑抑郁"
    },
    { 
      id: "wang", 
      name: "王芳老师", 
      title: "学校心理咨询中心", 
      status: "离线",
      avatar: "王",
      speciality: "自我认知、职业规划"
    },
  ]

  const selfHelpTips = [
    {
      id: "breathe",
      icon: Wind,
      title: "深呼吸练习",
      desc: "4-7-8呼吸法，快速平复情绪",
      color: "bg-sky-100 text-sky-600"
    },
    {
      id: "grounding",
      icon: MapPin,
      title: "接地练习",
      desc: "5-4-3-2-1感官觉察法",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      id: "music",
      icon: Headphones,
      title: "舒缓音乐",
      desc: "聆听放松音频",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: "reading",
      icon: BookOpen,
      title: "自助指南",
      desc: "危机应对小贴士",
      color: "bg-amber-100 text-amber-600"
    },
  ]

  const handleCall = (number: string) => {
    setSelectedHotline(number)
    setShowConfirm(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-red-500 text-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <h1 className="text-lg font-bold">紧急求助</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 space-y-5">
        {/* Emergency Notice */}
        <Card className="border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-red-100 shrink-0">
                <Shield className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  你并不孤单，我们一直在这里
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  如果你正在经历困难时刻，请记住寻求帮助是勇敢的表现。
                  以下资源全天候为你提供支持。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Hotlines */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Phone className="h-4 w-4 text-red-500" />
            <h2 className="text-sm font-semibold text-foreground">心理援助热线</h2>
          </div>
          <div className="space-y-2">
            {hotlines.map((hotline) => (
              <Card key={hotline.id} className="border border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className={`w-1.5 h-full min-h-[80px] ${hotline.color}`} />
                    <div className="flex-1 p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{hotline.name}</p>
                          <p className="text-lg font-bold text-red-500 mt-0.5">{hotline.number}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              <Clock className="h-2.5 w-2.5 mr-1" />
                              {hotline.available}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">{hotline.desc}</span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-red-500 hover:bg-red-600 rounded-full gap-1"
                          onClick={() => handleCall(hotline.number)}
                        >
                          <Phone className="h-3 w-3" />
                          拨打
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* School Counselors */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">学校心理咨询师</h2>
            </div>
            <Button variant="link" size="sm" className="text-xs text-primary p-0 h-auto">
              查看全部
            </Button>
          </div>
          <div className="space-y-2">
            {counselors.map((counselor) => (
              <Card key={counselor.id} className="border border-border/50">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {counselor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{counselor.name}</p>
                        <Badge 
                          variant={counselor.status === "在线" ? "default" : "secondary"}
                          className={`text-[10px] px-1.5 py-0 ${
                            counselor.status === "在线" 
                              ? "bg-emerald-500 hover:bg-emerald-500" 
                              : ""
                          }`}
                        >
                          {counselor.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{counselor.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        擅长: {counselor.speciality}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant={counselor.status === "在线" ? "default" : "outline"}
                      disabled={counselor.status !== "在线"}
                      className="rounded-full gap-1"
                    >
                      <MessageCircle className="h-3 w-3" />
                      咨询
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Self-help Resources */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Heart className="h-4 w-4 text-pink-500" />
            <h2 className="text-sm font-semibold text-foreground">自我调节</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {selfHelpTips.map((tip) => (
              <Card 
                key={tip.id} 
                className="border border-border/50 cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <div className={`p-2 rounded-lg ${tip.color}`}>
                      <tip.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{tip.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{tip.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Campus Location */}
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">心理咨询中心</p>
                  <p className="text-xs text-muted-foreground">图书馆A栋 302室</p>
                  <p className="text-[10px] text-muted-foreground">工作时间: 周一至周五 8:30-17:30</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>重要提示：</strong>如果你或他人正处于紧急危险中，请立即拨打 
            <span className="font-bold"> 110 </span>或
            <span className="font-bold"> 120 </span>
            寻求紧急救援。
          </p>
        </div>
      </main>

      {/* Call Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto p-3 rounded-full bg-red-100 w-fit mb-2">
                <Phone className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-lg">确认拨打</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-2xl font-bold text-red-500">{selectedHotline}</p>
              <p className="text-sm text-muted-foreground">
                即将拨打心理援助热线，专业咨询师会耐心倾听你的困扰
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowConfirm(false)}
                >
                  取消
                </Button>
                <Button 
                  className="flex-1 bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    window.location.href = `tel:${selectedHotline?.replace(/-/g, '')}`
                    setShowConfirm(false)
                  }}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  立即拨打
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
