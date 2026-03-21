"use client"

import { useState } from "react"
import { MobileApp } from "@/components/mobile/mobile-app"
import { AdminApp } from "@/components/admin/admin-app"
import { CounselorApp } from "@/components/counselor/counselor-app"
import { MobileAuth } from "@/components/auth/mobile-auth"
import { PCAuth } from "@/components/auth/pc-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Monitor, Heart, Shield, MessageCircle, BarChart3, LogIn, UserCog, Stethoscope } from "lucide-react"

export default function Home() {
  const [view, setView] = useState<"landing" | "mobile" | "admin" | "counselor" | "mobile-auth" | "pc-auth">("landing")

  if (view === "mobile-auth") {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="fixed top-4 left-4 z-50">
          <Button variant="outline" size="sm" onClick={() => setView("landing")}>
            返回首页
          </Button>
        </div>
        <div className="flex items-center justify-center min-h-screen py-8">
          <div className="border-8 border-foreground/10 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="w-[390px] h-[844px] overflow-auto">
              <MobileAuth onLogin={() => setView("mobile")} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === "pc-auth") {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 right-4 z-50">
          <Button variant="outline" size="sm" onClick={() => setView("landing")}>
            返回首页
          </Button>
        </div>
        <PCAuth onLogin={() => setView("admin")} />
      </div>
    )
  }

  if (view === "mobile") {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="fixed top-4 left-4 z-50">
          <Button variant="outline" size="sm" onClick={() => setView("landing")}>
            返回首页
          </Button>
        </div>
        <div className="flex items-center justify-center min-h-screen py-8">
          <div className="border-8 border-foreground/10 rounded-[3rem] overflow-hidden shadow-2xl">
            <MobileApp />
          </div>
        </div>
      </div>
    )
  }

  if (view === "admin") {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 right-4 z-50">
          <Button variant="outline" size="sm" onClick={() => setView("landing")}>
            返回首页
          </Button>
        </div>
        <AdminApp />
      </div>
    )
  }

  if (view === "counselor") {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 right-4 z-50">
          <Button variant="outline" size="sm" onClick={() => setView("landing")}>
            返回首页
          </Button>
        </div>
        <CounselorApp />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Heart className="h-4 w-4" />
            AI心理健康陪伴助手
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            心灵伴侣
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            基于多模态AI的大学生心理健康陪伴系统，集成面部表情识别、语音情感分析、文本情感理解，
            为用户提供情绪识别、共情对话、心理疏导及危机预警等服务。
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: MessageCircle,
              title: "共情对话",
              desc: "AI智能对话，理解你的情绪",
            },
            {
              icon: Shield,
              title: "危机预警",
              desc: "多维度风险评估与预警",
            },
            {
              icon: Heart,
              title: "情绪识别",
              desc: "多模态情绪精准识别",
            },
            {
              icon: BarChart3,
              title: "数据分析",
              desc: "可视化情绪趋势分析",
            },
          ].map((feature) => (
            <Card key={feature.title} className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Auth Demo Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">登录注册界面</h2>
          <p className="text-muted-foreground mb-6">查看移动端和PC端的登录注册界面设计</p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setView("mobile-auth")}
              className="gap-2"
            >
              <Smartphone className="h-4 w-4" />
              移动端登录
            </Button>
            <Button 
              size="lg"
              onClick={() => setView("pc-auth")}
              className="gap-2"
            >
              <LogIn className="h-4 w-4" />
              PC端登录
            </Button>
          </div>
        </div>

        {/* Demo Selection */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">功能界面原型演示</h2>
          <p className="text-muted-foreground mb-8">选择查看移动端（学生）或PC端（咨询师/管理员）界面设计</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Mobile Preview */}
          <Card 
            className="border border-border/50 overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 group"
            onClick={() => setView("mobile")}
          >
            <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10 pb-0">
              <div className="flex justify-center">
                <div className="w-40 h-72 border-4 border-foreground/10 rounded-[2rem] bg-background shadow-lg overflow-hidden">
                  <div className="h-full flex flex-col">
                    <div className="h-5 bg-muted flex items-center justify-center">
                      <div className="h-1 w-10 bg-foreground/20 rounded-full" />
                    </div>
                    <div className="flex-1 p-1.5 space-y-1.5">
                      <div className="h-6 bg-primary/20 rounded-lg" />
                      <div className="h-14 bg-muted rounded-lg" />
                      <div className="grid grid-cols-3 gap-1">
                        <div className="h-8 bg-primary/30 rounded-lg" />
                        <div className="h-8 bg-accent/30 rounded-lg" />
                        <div className="h-8 bg-chart-2/30 rounded-lg" />
                      </div>
                      <div className="h-12 bg-muted rounded-lg" />
                    </div>
                    <div className="h-8 bg-card border-t border-border flex items-center justify-around px-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-3 w-3 bg-muted rounded" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">学生端 (UniApp)</CardTitle>
              </div>
              <CardDescription className="text-xs">
                情绪采集、AI对话、心情日记、心理测评、社区互动
              </CardDescription>
              <Button className="mt-3 w-full group-hover:bg-primary/90">
                查看学生端界面
              </Button>
            </CardContent>
          </Card>

          {/* Counselor Preview */}
          <Card 
            className="border border-border/50 overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 group"
            onClick={() => setView("counselor")}
          >
            <CardHeader className="bg-gradient-to-br from-emerald-500/10 to-primary/10 pb-0">
              <div className="flex justify-center">
                <div className="w-56 h-72 border-4 border-foreground/10 rounded-xl bg-background shadow-lg overflow-hidden">
                  <div className="h-full flex">
                    <div className="w-10 bg-emerald-50 border-r border-border p-1.5 space-y-1.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-5 w-5 bg-emerald-200/50 rounded mx-auto" />
                      ))}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="h-7 bg-card border-b border-border" />
                      <div className="flex-1 p-1.5 space-y-1.5">
                        <div className="grid grid-cols-2 gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-8 bg-emerald-100/50 rounded" />
                          ))}
                        </div>
                        <div className="h-16 bg-emerald-500/10 rounded" />
                        <div className="h-12 bg-muted rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Stethoscope className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-base">心理咨询师端</CardTitle>
              </div>
              <CardDescription className="text-xs">
                学生管理、情绪分析、预警处理、咨询留言、任务布置
              </CardDescription>
              <Button className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700">
                进入咨询师工作台
              </Button>
            </CardContent>
          </Card>

          {/* Admin Preview */}
          <Card 
            className="border border-border/50 overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 group"
            onClick={() => setView("admin")}
          >
            <CardHeader className="bg-gradient-to-br from-chart-2/10 to-primary/10 pb-0">
              <div className="flex justify-center">
                <div className="w-56 h-72 border-4 border-foreground/10 rounded-xl bg-background shadow-lg overflow-hidden">
                  <div className="h-full flex">
                    <div className="w-10 bg-sidebar border-r border-border p-1.5 space-y-1.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-5 w-5 bg-muted rounded mx-auto" />
                      ))}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="h-7 bg-card border-b border-border" />
                      <div className="flex-1 p-1.5 space-y-1.5">
                        <div className="grid grid-cols-2 gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-8 bg-muted rounded" />
                          ))}
                        </div>
                        <div className="h-16 bg-primary/10 rounded" />
                        <div className="h-12 bg-muted rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <UserCog className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">系统管理员端</CardTitle>
              </div>
              <CardDescription className="text-xs">
                用户管理、权限管理、数据大盘、内容审核、系统设置
              </CardDescription>
              <Button className="mt-3 w-full group-hover:bg-primary/90">
                进入管理员后台
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 text-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">技术栈</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["UniApp", "Vue3", "Element Plus", "Spring Boot", "PyTorch", "BERT", "CNN", "LSTM", "MySQL", "Redis"].map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-muted rounded-full text-sm text-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
