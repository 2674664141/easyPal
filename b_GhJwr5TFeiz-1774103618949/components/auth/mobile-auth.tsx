"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
  Shield
} from "lucide-react"

interface MobileAuthProps {
  onLogin?: () => void
}

export function MobileAuth({ onLogin }: MobileAuthProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"phone" | "account">("phone")
  const [agreeTerms, setAgreeTerms] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex flex-col">
      {/* Header Illustration */}
      <div className="pt-12 pb-6 px-6 text-center">
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
            <Heart className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-accent-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">心灵伴侣</h1>
        <p className="text-muted-foreground text-sm">
          {isLogin ? "欢迎回来，我一直在这里等你" : "开启你的心灵成长之旅"}
        </p>
      </div>

      {/* Auth Form */}
      <div className="flex-1 px-6 pb-8">
        <div className="bg-card rounded-3xl shadow-lg p-6 border border-border">
          {/* Tab Switch */}
          <div className="flex bg-muted rounded-2xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isLogin 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground"
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                !isLogin 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground"
              }`}
            >
              注册
            </button>
          </div>

          {isLogin ? (
            /* Login Form */
            <div className="space-y-5">
              {/* Login Method Toggle */}
              <div className="flex gap-4 mb-2">
                <button
                  onClick={() => setLoginMethod("phone")}
                  className={`flex items-center gap-1.5 text-sm pb-2 border-b-2 transition-colors ${
                    loginMethod === "phone" 
                      ? "border-primary text-primary font-medium" 
                      : "border-transparent text-muted-foreground"
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  手机号登录
                </button>
                <button
                  onClick={() => setLoginMethod("account")}
                  className={`flex items-center gap-1.5 text-sm pb-2 border-b-2 transition-colors ${
                    loginMethod === "account" 
                      ? "border-primary text-primary font-medium" 
                      : "border-transparent text-muted-foreground"
                  }`}
                >
                  <User className="h-4 w-4" />
                  账号登录
                </button>
              </div>

              {loginMethod === "phone" ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">手机号</Label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="tel" 
                        placeholder="请输入手机号" 
                        className="pl-10 h-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">验证码</Label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="text" 
                          placeholder="请输入验证码" 
                          className="pl-10 h-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-primary"
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        className="h-12 px-4 rounded-xl border-primary text-primary hover:bg-primary/5"
                      >
                        获取验证码
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">账号</Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="text" 
                        placeholder="手机号/邮箱/用户名" 
                        className="pl-10 h-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="请输入密码" 
                        className="pl-10 pr-10 h-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-primary"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="text-sm text-primary hover:underline">忘记密码？</button>
                  </div>
                </>
              )}

              <Button 
                onClick={onLogin}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/25"
              >
                登录
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          ) : (
            /* Register Form */
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">昵称</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="给自己取个名字吧" 
                    className="pl-10 h-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">手机号</Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="tel" 
                    placeholder="请输入手机号" 
                    className="pl-10 h-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">验证码</Label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="请输入验证码" 
                      className="pl-10 h-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-primary"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="h-12 px-4 rounded-xl border-primary text-primary hover:bg-primary/5"
                  >
                    获取验证码
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">设置密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="6-20位数字、字母或符号" 
                    className="pl-10 pr-10 h-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-primary"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                  我已阅读并同意
                  <button className="text-primary hover:underline mx-0.5">《用户协议》</button>
                  和
                  <button className="text-primary hover:underline mx-0.5">《隐私政策》</button>
                </label>
              </div>

              <Button 
                disabled={!agreeTerms}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/25 disabled:opacity-50"
              >
                注册
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Social Login */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-4">其他登录方式</p>
            <div className="flex justify-center gap-6">
              <button className="w-12 h-12 rounded-full bg-[#07C160]/10 flex items-center justify-center hover:bg-[#07C160]/20 transition-colors">
                <svg className="w-6 h-6 text-[#07C160]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89l-.002-.002zm-2.746 2.96c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                </svg>
              </button>
              <button className="w-12 h-12 rounded-full bg-[#1296DB]/10 flex items-center justify-center hover:bg-[#1296DB]/20 transition-colors">
                <svg className="w-6 h-6 text-[#1296DB]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.003 2c-5.514 0-9.987 4.473-9.987 9.987 0 4.424 2.865 8.187 6.839 9.503.5.092.683-.217.683-.483 0-.237-.008-.867-.013-1.702-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.203 2.393.1 2.646.64.698 1.028 1.59 1.028 2.682 0 3.841-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.183 22 16.42 22 11.987 22 6.473 17.522 2 12.003 2z"/>
                </svg>
              </button>
              <button className="w-12 h-12 rounded-full bg-[#EA4335]/10 flex items-center justify-center hover:bg-[#EA4335]/20 transition-colors">
                <Mail className="w-6 h-6 text-[#EA4335]" />
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5" />
          <span>你的隐私安全是我们的首要任务</span>
        </div>
      </div>
    </div>
  )
}
