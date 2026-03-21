<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LayoutDashboard, Users, Shield, MessageSquare, BarChart3, Search, Bell } from 'lucide-vue-next'

type AdminKey = 'dashboard' | 'users' | 'counselors' | 'content' | 'analytics'
const router = useRouter()
const current = ref<AdminKey>('dashboard')
const q = ref('')

const navItems: Array<{ id: AdminKey; label: string; icon: any }> = [
  { id: 'dashboard', label: '数据大盘', icon: LayoutDashboard },
  { id: 'users', label: '用户管理', icon: Users },
  { id: 'counselors', label: '咨询师管理', icon: Shield },
  { id: 'content', label: '内容审核', icon: MessageSquare },
  { id: 'analytics', label: '统计报表', icon: BarChart3 },
]

const cards = computed(() => [
  { label: '活跃用户', value: '2,847', change: '+12.5%' },
  { label: '今日对话', value: '1,234', change: '+8.2%' },
  { label: '危机预警', value: '3', change: '-2' },
  { label: '平均响应', value: '1.2s', change: '-0.3s' },
])

const logout = () => router.push('/auth')
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <aside class="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div class="h-16 px-4 border-b border-sidebar-border flex items-center font-bold">心灵伴侣 · 管理中心</div>
      <nav class="p-3 space-y-1 flex-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="w-full h-11 rounded-lg px-3 flex items-center gap-3 text-sm transition-colors"
          :class="current === item.id ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'"
          @click="current = item.id"
        >
          <component :is="item.icon" class="h-4 w-4" />
          <span>{{ item.label }}</span>
        </button>
      </nav>
    </aside>

    <div class="flex-1 min-w-0 flex flex-col">
      <header class="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
        <div class="relative w-80">
          <Search class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input v-model="q" class="w-full h-10 rounded-lg bg-muted border border-input pl-9 pr-3 text-sm" placeholder="搜索用户、内容、记录..." />
        </div>
        <div class="flex items-center gap-3">
          <button class="h-9 w-9 rounded-lg border border-border bg-card relative"><Bell class="h-4 w-4 mx-auto text-muted-foreground" /><span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" /></button>
          <button class="h-9 px-3 rounded-lg border border-border text-sm" @click="logout">退出登录</button>
        </div>
      </header>

      <main class="flex-1 overflow-auto bg-muted/30 p-5">
        <template v-if="current === 'dashboard'">
          <h1 class="text-2xl font-bold">系统数据大盘</h1>
          <p class="text-sm text-muted-foreground mt-1">全校学生心理健康状态总览与系统运行监控</p>
          <div class="grid grid-cols-4 gap-4 mt-4">
            <div v-for="c in cards" :key="c.label" class="rounded-xl bg-card border border-border p-5">
              <p class="text-3xl font-bold">{{ c.value }}</p>
              <p class="text-sm text-muted-foreground mt-1">{{ c.label }}</p>
              <p class="text-xs text-muted-foreground mt-2">较昨日 {{ c.change }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="rounded-xl bg-card border border-border p-4">
              <p class="font-semibold mb-2">最新预警</p>
              <div class="space-y-2 text-sm">
                <div class="rounded-lg bg-muted p-3">用户A***3：多次提及负面情绪关键词</div>
                <div class="rounded-lg bg-muted p-3">用户B***7：情绪波动异常</div>
              </div>
            </div>
            <div class="rounded-xl bg-card border border-border p-4">
              <p class="font-semibold mb-2">最近活跃</p>
              <div class="space-y-2 text-sm">
                <div class="rounded-lg bg-muted p-3">李同学：完成AI对话</div>
                <div class="rounded-lg bg-muted p-3">王同学：发布心情日记</div>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="current === 'users'">
          <div class="rounded-xl bg-card border border-border overflow-hidden">
            <div class="h-14 px-4 flex items-center font-semibold">用户管理</div>
            <table class="w-full text-sm">
              <thead class="bg-muted/60"><tr><th class="p-3 text-left">姓名</th><th class="p-3 text-left">学院</th><th class="p-3 text-left">情绪状态</th><th class="p-3 text-left">风险等级</th><th class="p-3 text-left">最后活跃</th></tr></thead>
              <tbody>
                <tr class="border-t border-border"><td class="p-3">李明</td><td class="p-3">计算机学院</td><td class="p-3">积极</td><td class="p-3">低风险</td><td class="p-3 text-muted-foreground">10分钟前</td></tr>
                <tr class="border-t border-border"><td class="p-3">王芳</td><td class="p-3">外国语学院</td><td class="p-3">中性</td><td class="p-3">低风险</td><td class="p-3 text-muted-foreground">30分钟前</td></tr>
              </tbody>
            </table>
          </div>
        </template>

        <template v-else-if="current === 'counselors'">
          <div class="rounded-xl bg-card border border-border p-4">咨询师管理（已按源项目模块预留）</div>
        </template>
        <template v-else-if="current === 'content'">
          <div class="rounded-xl bg-card border border-border p-4">内容审核（已按源项目模块预留）</div>
        </template>
        <template v-else>
          <div class="rounded-xl bg-card border border-border p-4">统计报表（已按源项目模块预留）</div>
        </template>
      </main>
    </div>
  </div>
</template>
