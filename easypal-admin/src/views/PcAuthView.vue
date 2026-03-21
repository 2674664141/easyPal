<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const activeTab = ref<'login' | 'register'>('login')
const role = ref<'admin' | 'counselor'>('admin')
const showPwd = ref(false)

const loginForm = reactive({ account: '', password: '' })
const registerForm = reactive({ nickname: '', email: '', phone: '', code: '', password: '', agree: false })

const features = [
  { title: 'AI智能陪伴', desc: '24小时在线的心理健康助手' },
  { title: '情绪追踪', desc: '多维度分析你的情绪变化' },
  { title: '心情日记', desc: '记录每一刻的心情故事' },
  { title: '温暖社区', desc: '与同路人分享成长的力量' },
]

const login = () => {
  if (!loginForm.account || !loginForm.password) return message.warning('请填写账号和密码')
  router.push(role.value === 'admin' ? '/admin' : '/counselor')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex">
    <div class="hidden lg:flex lg:w-1/2 xl:w-3/5 p-12 flex-col justify-between relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
      <div class="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div class="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-2"><div class="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold">心</div><span class="text-2xl font-bold">心灵伴侣</span></div>
        <p class="text-muted-foreground ml-1">AI驱动的心理健康陪伴平台</p>
      </div>
      <div class="relative z-10 max-w-lg">
        <h1 class="text-5xl font-bold leading-tight mb-6">开启你的<br /><span class="text-primary">心灵成长之旅</span></h1>
        <p class="text-lg text-muted-foreground leading-relaxed mb-10">我们相信，每个人都值得被理解和陪伴。借助AI的力量，我们为你提供专业、温暖、私密的心理健康支持。</p>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="item in features" :key="item.title" class="p-4 rounded-2xl bg-card/70 border border-border">
            <h3 class="font-semibold text-sm">{{ item.title }}</h3><p class="text-xs text-muted-foreground mt-1">{{ item.desc }}</p>
          </div>
        </div>
      </div>
      <div class="relative z-10 flex gap-12"><div><div class="text-3xl font-bold">50,000+</div><div class="text-sm text-muted-foreground">活跃用户</div></div><div><div class="text-3xl font-bold">1,000,000+</div><div class="text-sm text-muted-foreground">对话次数</div></div><div><div class="text-3xl font-bold">98%</div><div class="text-sm text-muted-foreground">好评率</div></div></div>
    </div>

    <div class="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
      <div class="w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-2xl">
        <h2 class="text-2xl font-bold text-center">欢迎使用心灵伴侣</h2>
        <p class="text-sm text-muted-foreground text-center mt-1">登录或创建账号开始你的心理健康之旅</p>
        <div class="flex justify-center mt-4">
          <div class="h-10 rounded-lg bg-muted p-1 flex">
            <button class="w-28 rounded-md text-sm" :class="role === 'admin' ? 'bg-card shadow' : ''" @click="role='admin'">超级管理员</button>
            <button class="w-28 rounded-md text-sm" :class="role === 'counselor' ? 'bg-card shadow' : ''" @click="role='counselor'">咨询师</button>
          </div>
        </div>
        <div class="mt-5">
          <div class="h-10 rounded-lg bg-muted p-1 flex mb-4">
            <button class="flex-1 rounded-md text-sm" :class="activeTab === 'login' ? 'bg-card shadow' : ''" @click="activeTab='login'">登录</button>
            <button class="flex-1 rounded-md text-sm" :class="activeTab === 'register' ? 'bg-card shadow' : ''" @click="activeTab='register'">注册</button>
          </div>

          <div v-if="activeTab === 'login'" class="space-y-3">
            <input v-model="loginForm.account" class="h-11 w-full rounded-lg border border-input px-3 bg-muted/50" placeholder="手机号/邮箱/用户名" />
            <div class="relative">
              <input v-model="loginForm.password" :type="showPwd ? 'text' : 'password'" class="h-11 w-full rounded-lg border border-input px-3 pr-16 bg-muted/50" placeholder="请输入密码" />
              <button class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground" @click="showPwd = !showPwd">{{ showPwd ? '隐藏' : '显示' }}</button>
            </div>
            <button class="h-11 w-full rounded-lg bg-primary text-primary-foreground font-medium" @click="login">登录</button>
          </div>

          <div v-else class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <input v-model="registerForm.nickname" class="h-11 rounded-lg border border-input px-3 bg-muted/50" placeholder="昵称" />
              <input v-model="registerForm.email" class="h-11 rounded-lg border border-input px-3 bg-muted/50" placeholder="邮箱" />
            </div>
            <div class="grid grid-cols-[1fr_auto] gap-2">
              <input v-model="registerForm.phone" class="h-11 rounded-lg border border-input px-3 bg-muted/50" placeholder="手机号" />
              <button class="h-11 px-3 rounded-lg border border-input text-sm">发送验证码</button>
            </div>
            <input v-model="registerForm.code" class="h-11 w-full rounded-lg border border-input px-3 bg-muted/50" placeholder="验证码" />
            <input v-model="registerForm.password" type="password" class="h-11 w-full rounded-lg border border-input px-3 bg-muted/50" placeholder="设置密码" />
            <button class="h-11 w-full rounded-lg bg-primary text-primary-foreground font-medium">创建账号</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
