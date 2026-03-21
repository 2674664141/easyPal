<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  MessageSquare,
  ClipboardList,
  BookOpen,
  Search,
  Bell,
  Phone,
  Video,
  MoreVertical,
  Send,
} from 'lucide-vue-next'
import CounselorDashboardPage from '../components/counselor/CounselorDashboardPage.vue'
import CounselorStudentsPage from '../components/counselor/CounselorStudentsPage.vue'
import CounselorAlertsPage from '../components/counselor/CounselorAlertsPage.vue'
import CounselorTasksPage from '../components/counselor/CounselorTasksPage.vue'
import CounselorResourcesPage from '../components/counselor/CounselorResourcesPage.vue'

type PageKey = 'dashboard' | 'students' | 'alerts' | 'messages' | 'tasks' | 'resources'
const router = useRouter()
const current = ref<PageKey>('dashboard')
const search = ref('')

const navItems: Array<{ id: PageKey; label: string; icon: any; badge?: number }> = [
  { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
  { id: 'students', label: '学生管理', icon: Users },
  { id: 'alerts', label: '危机预警', icon: AlertTriangle, badge: 3 },
  { id: 'messages', label: '咨询留言', icon: MessageSquare, badge: 5 },
  { id: 'tasks', label: '心理任务', icon: ClipboardList },
  { id: 'resources', label: '资源管理', icon: BookOpen },
]

const students = [
  { name: '张三', sid: '2021001001', college: '计算机学院', score: 35, emotion: '焦虑', risk: '高风险', active: '10分钟前' },
  { name: '李四', sid: '2021001002', college: '计算机学院', score: 45, emotion: '低落', risk: '中风险', active: '1小时前' },
  { name: '王五', sid: '2021002001', college: '经济学院', score: 72, emotion: '平静', risk: '低风险', active: '3小时前' },
  { name: '赵六', sid: '2022001001', college: '计算机学院', score: 68, emotion: '开心', risk: '低风险', active: '30分钟前' },
]

const alerts = [
  { name: '张三', reason: '连续7天消极情绪，文本含高危词汇', time: '10分钟前', level: '高风险' },
  { name: '李四', reason: '焦虑情绪占比超过30%', time: '1小时前', level: '中风险' },
  { name: '王五', reason: '深夜活跃频次增加', time: '2小时前', level: '中风险' },
]

const chats = [
  { id: 1, name: '张三', last: '老师，我最近总是睡不着觉，感觉压力很大...', unread: 2 },
  { id: 2, name: '李四', last: '谢谢老师的建议，我会试试的', unread: 0 },
  { id: 3, name: '王五', last: '老师，我想预约一次线下咨询', unread: 1 },
]
const selectedChat = ref(1)

const selectedConversation = computed(() => chats.find((c) => c.id === selectedChat.value))
const logout = () => router.push('/auth')
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <aside class="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div class="h-16 px-4 border-b border-sidebar-border flex items-center gap-3">
        <div class="h-9 w-9 rounded-xl bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-bold">心</div>
        <div>
          <p class="font-bold text-sidebar-foreground leading-none">咨询师工作台</p>
        </div>
      </div>
      <nav class="p-3 space-y-1 flex-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="w-full h-11 rounded-lg px-3 flex items-center gap-3 text-sm transition-colors"
          :class="current === item.id ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'"
          @click="current = item.id"
        >
          <component :is="item.icon" class="h-4 w-4" />
          <span class="flex-1 text-left">{{ item.label }}</span>
          <span v-if="item.badge" class="text-[10px] rounded-full px-1.5 py-0.5" :class="item.id === 'alerts' ? 'bg-destructive text-white' : 'bg-white/30'">{{ item.badge }}</span>
        </button>
      </nav>
      <div class="p-3 border-t border-sidebar-border">
        <div class="h-10 rounded-lg bg-sidebar-accent px-3 flex items-center justify-between text-sm">
          <span>王老师</span>
          <button class="text-muted-foreground hover:text-foreground" @click="logout">退出</button>
        </div>
      </div>
    </aside>

    <div class="flex-1 min-w-0 flex flex-col">
      <header class="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
        <div class="relative w-80">
          <Search class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input v-model="search" class="w-full h-10 rounded-lg bg-muted border border-input pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="搜索学生、预警记录..." />
        </div>
        <div class="flex items-center gap-3">
          <button class="h-9 w-9 rounded-lg border border-border bg-card relative">
            <Bell class="h-4 w-4 mx-auto text-muted-foreground" />
            <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <button class="h-9 px-3 rounded-lg border border-border bg-card text-sm">返回首页</button>
        </div>
      </header>

      <main class="flex-1 overflow-auto bg-muted/30 p-5">
        <template v-if="current === 'dashboard'">
          <CounselorDashboardPage />
        </template>

        <CounselorStudentsPage v-else-if="current === 'students'" />

        <CounselorAlertsPage v-else-if="current === 'alerts'" />

        <template v-else-if="current === 'messages'">
          <h1 class="text-2xl font-bold">咨询留言</h1>
          <p class="text-sm text-muted-foreground mt-1">回复学生的咨询问题，提供心理支持</p>
          <div class="grid grid-cols-3 gap-4 mt-4 h-[calc(100vh-210px)]">
            <div class="rounded-xl bg-card border border-border p-3 overflow-auto">
              <div class="relative mb-3">
                <Search class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input class="w-full h-10 rounded-lg bg-muted border border-input pl-9 pr-3 text-sm" placeholder="搜索对话..." />
              </div>
              <div class="space-y-2">
                <button
                  v-for="chat in chats"
                  :key="chat.id"
                  class="w-full text-left p-3 rounded-lg border"
                  :class="selectedChat === chat.id ? 'bg-primary/10 border-primary/30' : 'border-border hover:bg-muted/50'"
                  @click="selectedChat = chat.id"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-medium text-sm">{{ chat.name }}</span>
                    <span v-if="chat.unread" class="h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">{{ chat.unread }}</span>
                  </div>
                  <p class="text-xs text-muted-foreground mt-1 truncate">{{ chat.last }}</p>
                </button>
              </div>
            </div>
            <div class="col-span-2 rounded-xl bg-card border border-border p-3 flex flex-col">
              <div class="h-12 border-b border-border flex items-center justify-between">
                <p class="font-semibold">{{ selectedConversation?.name }}</p>
                <div class="flex items-center gap-2 text-muted-foreground">
                  <Phone class="h-4 w-4" /><Video class="h-4 w-4" /><MoreVertical class="h-4 w-4" />
                </div>
              </div>
              <div class="flex-1 py-3 space-y-3 overflow-auto">
                <div class="max-w-[70%] bg-muted rounded-2xl rounded-bl-md px-3 py-2 text-sm">老师您好，我最近感觉压力很大，晚上总是睡不着觉。</div>
                <div class="max-w-[70%] ml-auto bg-primary text-primary-foreground rounded-2xl rounded-br-md px-3 py-2 text-sm">你现在同时承受学业和人际压力是很辛苦的，我们先从可执行的小目标开始。</div>
                <div class="max-w-[70%] bg-muted rounded-2xl rounded-bl-md px-3 py-2 text-sm">主要是期末快到了，感觉复习进度慢，很焦虑。</div>
              </div>
              <div class="pt-3 border-t border-border flex gap-2">
                <input class="h-10 flex-1 rounded-lg bg-muted border border-input px-3 text-sm" placeholder="输入消息..." />
                <button class="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Send class="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </template>

        <CounselorTasksPage v-else-if="current === 'tasks'" />

        <CounselorResourcesPage v-else />
      </main>
    </div>
  </div>
</template>
