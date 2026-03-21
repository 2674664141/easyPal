<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  LayoutDashboard,
  Users,
  Shield,
  MessageSquare,
  BarChart3,
  Search,
  Bell,
  Settings,
  Activity,
  Clock3,
  AlertTriangle,
} from 'lucide-vue-next'
import AdminRiskDistributionCard from '../components/admin/AdminRiskDistributionCard.vue'
import AdminLatestAlertsCard from '../components/admin/AdminLatestAlertsCard.vue'
import AdminRecentActiveCard from '../components/admin/AdminRecentActiveCard.vue'
import AdminUsersPage from '../components/admin/AdminUsersPage.vue'
import AdminCounselorsPage from '../components/admin/AdminCounselorsPage.vue'
import AdminContentPage from '../components/admin/AdminContentPage.vue'
import AdminAnalyticsPage from '../components/admin/AdminAnalyticsPage.vue'

type AdminKey = 'dashboard' | 'users' | 'counselors' | 'content' | 'analytics'
const router = useRouter()
const current = ref<AdminKey>('dashboard')
const q = ref('')

const navItems: Array<{ id: AdminKey; label: string; icon: any; dot?: boolean }> = [
  { id: 'dashboard', label: '数据大盘', icon: LayoutDashboard },
  { id: 'users', label: '用户管理', icon: Users },
  { id: 'counselors', label: '咨询师管理', icon: Shield },
  { id: 'content', label: '内容审核', icon: MessageSquare, dot: true },
  { id: 'analytics', label: '统计报表', icon: BarChart3 },
]

const cards = computed(() => [
  { label: '活跃用户', value: '2,847', change: '+12.5%', icon: Users },
  { label: '今日对话', value: '1,234', change: '+8.2%', icon: MessageSquare },
  { label: '危机预警', value: '3', change: '-2', icon: AlertTriangle },
  { label: '平均响应', value: '1.2s', change: '-0.3s', icon: Clock3 },
])

const logout = () => router.push('/auth')
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <aside class="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div class="h-16 px-4 border-b border-sidebar-border flex items-center font-bold">心灵伴侣 · 管理中心</div>
      <nav class="p-3 space-y-1 pb-20">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="w-full h-11 rounded-lg px-3 flex items-center gap-3 text-sm transition-colors"
          :class="current === item.id ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'"
          @click="current = item.id"
        >
          <component :is="item.icon" class="h-4 w-4" />
          <span class="flex-1 text-left">{{ item.label }}</span>
          <span v-if="item.dot" class="h-2 w-2 rounded-full bg-warning"></span>
        </button>
      </nav>
      <div class="absolute left-0 right-0 bottom-0 p-3 border-t border-sidebar-border bg-sidebar">
        <div class="h-10 rounded-lg bg-sidebar-accent px-3 flex items-center justify-between text-sm">
          <div class="flex items-center gap-2"><div class="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">管</div><span>管理员</span></div>
          <Settings class="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </aside>

    <div class="ml-64 flex-1 min-w-0 flex flex-col">
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
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-3xl font-bold">{{ c.value }}</p>
                  <p class="text-sm text-muted-foreground mt-1">{{ c.label }}</p>
                  <p class="text-xs text-muted-foreground mt-2">较昨日 {{ c.change }}</p>
                </div>
                <div class="h-12 w-12 rounded-xl border border-border/70 bg-muted/70 flex items-center justify-center">
                  <component :is="c.icon" class="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="rounded-xl bg-card border border-border p-4">
              <div class="flex items-center gap-2 mb-2">
                <Activity class="h-4 w-4 text-primary" />
                <h3 class="text-base font-semibold">用户情绪趋势</h3>
              </div>
              <p class="text-xs text-muted-foreground mb-3">过去7天用户整体情绪分布</p>
              <div class="h-44 flex items-end gap-2">
                <div v-for="day in 7" :key="day" class="flex-1">
                  <div class="h-full flex flex-col justify-end gap-[2px]">
                    <div class="bg-destructive/70 h-[12%] rounded-t-sm"></div>
                    <div class="bg-warning/70 h-[18%]"></div>
                    <div class="bg-success/70 h-[70%] rounded-b-sm"></div>
                  </div>
                </div>
              </div>
            </div>
            <AdminRiskDistributionCard />
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <AdminLatestAlertsCard />
            <AdminRecentActiveCard />
          </div>
        </template>

        <AdminUsersPage v-else-if="current === 'users'" />

        <AdminCounselorsPage v-else-if="current === 'counselors'" />
        <AdminContentPage v-else-if="current === 'content'" />
        <AdminAnalyticsPage v-else />
      </main>
    </div>
  </div>
</template>
