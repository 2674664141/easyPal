<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-vue-next'

const router = useRouter()
const activeTab = ref<'login' | 'register'>('login')
const showPwd = ref(false)
const loginForm = reactive({ account: '', password: '' })
const registerForm = reactive({ nickname: '', email: '', phone: '', code: '', password: '', agree: false })

const goLogin = () => {
  if (!loginForm.account || !loginForm.password) return message.warning('请填写账号和密码')
  router.push('/counselor')
}
const goRegister = () => {
  if (!registerForm.agree) return message.warning('请先同意用户协议与隐私政策')
  message.success('注册成功，请登录')
  activeTab.value = 'login'
}
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <div class="hidden lg:flex lg:w-1/2 bg-[#edf8f7] px-8 py-7 flex-col">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">♡</div>
        <div>
          <p class="text-[30px] font-bold leading-none text-foreground">心灵伴侣</p>
          <p class="text-sm text-muted-foreground mt-1">AI驱动的心理健康陪伴平台</p>
        </div>
      </div>
      <div class="mt-20 max-w-xl">
        <h1 class="text-[64px] leading-[1.05] font-bold text-foreground">开启你的<br /><span class="text-primary">心灵成长之旅</span></h1>
        <p class="text-[22px] leading-relaxed text-muted-foreground mt-8">我们相信，每个人都将被理解和陪伴。借助AI的力量，我们为你提供专业、温暖、私密的心理健康支持。</p>
      </div>
      <div class="mt-12 grid grid-cols-2 gap-4 max-w-[660px]">
        <div class="rounded-2xl bg-white/80 border border-border p-4"><p class="text-lg font-semibold">AI智能陪伴</p><p class="text-sm text-muted-foreground mt-1">24小时在线的心理健康助手</p></div>
        <div class="rounded-2xl bg-white/80 border border-border p-4"><p class="text-lg font-semibold">情绪追踪</p><p class="text-sm text-muted-foreground mt-1">多维度分析你的情绪变化</p></div>
        <div class="rounded-2xl bg-white/80 border border-border p-4"><p class="text-lg font-semibold">心情日记</p><p class="text-sm text-muted-foreground mt-1">记录每一刻的心情故事</p></div>
        <div class="rounded-2xl bg-white/80 border border-border p-4"><p class="text-lg font-semibold">温暖社区</p><p class="text-sm text-muted-foreground mt-1">与同路人分享成长的力量</p></div>
      </div>
      <div class="mt-auto flex gap-10">
        <div><p class="text-5xl font-bold">50,000+</p><p class="text-sm text-muted-foreground mt-1">活跃用户</p></div>
        <div><p class="text-5xl font-bold">1,000,000+</p><p class="text-sm text-muted-foreground mt-1">对话次数</p></div>
        <div><p class="text-5xl font-bold">98%</p><p class="text-sm text-muted-foreground mt-1">好评率</p></div>
      </div>
    </div>

    <div class="w-full lg:w-1/2 bg-[#f8fbfc] relative flex items-center justify-center px-6">
      <button class="absolute right-5 top-5 h-9 px-3 rounded-lg border border-input bg-card text-xs text-muted-foreground">返回首页</button>
      <div class="w-full max-w-[560px] rounded-3xl border border-border bg-card px-8 py-7 shadow-[0_8px_30px_rgba(16,24,40,0.06)]">
        <h2 class="text-[36px] font-bold text-center">欢迎使用心灵伴侣</h2>
        <p class="text-sm text-muted-foreground text-center mt-1">登录或创建账号开始你的心理健康之旅</p>
        <div class="mt-5 h-11 rounded-xl bg-muted p-1 flex">
          <button class="flex-1 rounded-lg text-sm font-medium" :class="activeTab==='login' ? 'bg-card shadow' : ''" @click="activeTab='login'">登录</button>
          <button class="flex-1 rounded-lg text-sm font-medium" :class="activeTab==='register' ? 'bg-card shadow' : ''" @click="activeTab='register'">注册</button>
        </div>
        <div v-if="activeTab==='login'" class="mt-5 space-y-4">
          <div><p class="text-sm mb-1.5">账号</p><div class="relative"><User class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" /><input v-model="loginForm.account" class="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm" placeholder="手机号/邮箱/用户名" /></div></div>
          <div><div class="flex items-center justify-between mb-1.5"><p class="text-sm">密码</p><button class="text-xs text-primary">忘记密码？</button></div><div class="relative"><Lock class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" /><input v-model="loginForm.password" :type="showPwd ? 'text' : 'password'" class="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-9 text-sm" placeholder="请输入密码" /><button class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" @click="showPwd=!showPwd"><EyeOff v-if="showPwd" class="h-4 w-4" /><Eye v-else class="h-4 w-4" /></button></div></div>
          <button class="h-11 w-full rounded-lg bg-primary text-primary-foreground text-sm font-medium" @click="goLogin">登录 →</button>
          <div class="relative py-1"><div class="border-t border-border"></div><span class="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-card px-2 text-xs text-muted-foreground">或使用以下方式登录</span></div>
          <div class="grid grid-cols-3 gap-3"><button class="h-11 rounded-lg border border-input bg-background text-[#07C160]">微信</button><button class="h-11 rounded-lg border border-input bg-background text-[#1296DB]">GitHub</button><button class="h-11 rounded-lg border border-input bg-background text-[#EA4335]">邮箱</button></div>
        </div>
        <div v-else class="mt-5 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div><p class="text-sm mb-1.5">昵称</p><div class="relative"><User class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" /><input v-model="registerForm.nickname" class="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm" placeholder="你的昵称" /></div></div>
            <div><p class="text-sm mb-1.5">邮箱</p><div class="relative"><Mail class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" /><input v-model="registerForm.email" class="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm" placeholder="email@example.com" /></div></div>
          </div>
          <div><p class="text-sm mb-1.5">手机号</p><div class="grid grid-cols-[1fr_auto] gap-2"><div class="relative"><Phone class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" /><input v-model="registerForm.phone" class="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm" placeholder="请输入手机号" /></div><button class="h-11 px-3 rounded-lg border border-input bg-background text-sm">发送验证码</button></div></div>
          <div><p class="text-sm mb-1.5">验证码</p><input v-model="registerForm.code" class="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" placeholder="请输入6位验证码" /></div>
          <div><p class="text-sm mb-1.5">设置密码</p><input v-model="registerForm.password" class="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" placeholder="6-20位数字、字母或符号" type="password" /></div>
          <label class="flex items-start gap-2 text-xs text-muted-foreground"><input v-model="registerForm.agree" type="checkbox" class="mt-0.5" /><span>我已阅读并同意 <span class="text-primary">《用户协议》</span> 和 <span class="text-primary">《隐私政策》</span></span></label>
          <button class="h-11 w-full rounded-lg bg-primary text-primary-foreground text-sm font-medium" @click="goRegister">创建账号 ✨</button>
        </div>
      </div>
    </div>
  </div>
</template>
