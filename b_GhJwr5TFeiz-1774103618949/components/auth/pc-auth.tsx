"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Heart, 
  Eye, 
  EyeOff, 
  Phone, 
  Lock, 
  User, 
  Mail,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Shield,
  Brain,
  Users,
  BookHeart,
  Activity
} from "lucide-react"

interface PCAuthProps {
  onLogin?: () => void
}

export function PCAuth({ onLogin }: PCAuthProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const features = [
    { icon: Brain, title: "AI智能陪伴", desc: "24小时在线的心理健康助手" },
    { icon: Activity, title: "情绪追踪", desc: "多维度分析你的情绪变化" },
    { icon: BookHeart, title: "心情日记", desc: "记录每一刻的心情故事" },
    { icon: Users, title: "温暖社区", desc: "与同路人分享成长的力量" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        
        {/* Logo & Tagline */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">心灵伴侣</span>
          </div>
          <p className="text-muted-foreground ml-1">AI驱动的心理健康陪伴平台</p>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight mb-6">
            开启你的
            <br />
            <span className="text-primary">心灵成长之旅</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            我们相信，每个人都值得被理解和陪伴。借助AI的力量，我们为你提供专业、温暖、私密的心理健康支持。
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-12">
          <div>
            <div className="text-3xl font-bold text-foreground">50,000+</div>
            <div className="text-sm text-muted-foreground">活跃用户</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">1,000,000+</div>
            <div className="text-sm text-muted-foreground">对话次数</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">98%</div>
            <div className="text-sm text-muted-foreground">好评率</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">心灵伴侣</span>
            </div>
          </div>

          <Card className="border-0 shadow-2xl shadow-primary/5 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">欢迎使用心灵伴侣</CardTitle>
              <CardDescription>登录或创建账号开始你的心理健康之旅</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">登录</TabsTrigger>
                  <TabsTrigger value="register">注册</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label>账号</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="text" 
                        placeholder="手机号/邮箱/用户名" 
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>密码</Label>
                      <button className="text-xs text-primary hover:underline">忘记密码？</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="请输入密码" 
                        className="pl-10 pr-10 h-11"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className="text-sm text-muted-foreground">
                      记住我的登录状态
                    </label>
                  </div>

                  <Button 
                    onClick={onLogin}
                    className="w-full h-11 shadow-lg shadow-primary/25"
                  >
                    登录
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-card text-muted-foreground">或使用以下方式登录</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" className="h-11">
                      <svg className="w-5 h-5 text-[#07C160]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89l-.002-.002zm-2.746 2.96c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" className="h-11">
                      <svg className="w-5 h-5 text-[#1296DB]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.003 2c-5.514 0-9.987 4.473-9.987 9.987 0 4.424 2.865 8.187 6.839 9.503.5.092.683-.217.683-.483 0-.237-.008-.867-.013-1.702-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.203 2.393.1 2.646.64.698 1.028 1.59 1.028 2.682 0 3.841-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.183 22 16.42 22 11.987 22 6.473 17.522 2 12.003 2z"/>
                      </svg>
                    </Button>
                    <Button variant="outline" className="h-11">
                      <Mail className="w-5 h-5 text-[#EA4335]" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>昵称</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="text" 
                          placeholder="你的昵称" 
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>邮箱</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="email" 
                          placeholder="email@example.com" 
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>手机号</Label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="tel" 
                          placeholder="请输入手机号" 
                          className="pl-10 h-11"
                        />
                      </div>
                      <Button variant="outline" className="h-11 px-4 whitespace-nowrap">
                        发送验证码
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>验证码</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="text" 
                        placeholder="请输入6位验证码" 
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>设置密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="6-20位数字、字母或符号" 
                        className="pl-10 pr-10 h-11"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <Checkbox 
                      id="terms-register" 
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      className="mt-0.5"
                    />
                    <label htmlFor="terms-register" className="text-xs text-muted-foreground leading-relaxed">
                      我已阅读并同意
                      <button className="text-primary hover:underline mx-0.5">《用户协议》</button>
                      和
                      <button className="text-primary hover:underline mx-0.5">《隐私政策》</button>
                    </label>
                  </div>

                  <Button 
                    disabled={!agreeTerms}
                    className="w-full h-11 shadow-lg shadow-primary/25"
                  >
                    创建账号
                    <Sparkles className="h-4 w-4 ml-2" />
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            <span>你的隐私安全是我们的首要任务</span>
          </div>
        </div>
      </div>
    </div>
  )
}
