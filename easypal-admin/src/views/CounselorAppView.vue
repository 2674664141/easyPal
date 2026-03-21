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
          <h1 class="text-2xl font-bold">早上好，王老师</h1>
          <p class="text-sm text-muted-foreground mt-1">今天有3条待处理预警，5条未读留言</p>
          <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">156</p><p class="text-sm text-muted-foreground mt-1">负责学生</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">3</p><p class="text-sm text-muted-foreground mt-1">待处理预警</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">5</p><p class="text-sm text-muted-foreground mt-1">未读留言</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">12</p><p class="text-sm text-muted-foreground mt-1">本周干预</p></div>
          </div>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="col-span-2 rounded-xl bg-card border border-border p-4">
              <div class="flex items-center justify-between mb-2"><p class="font-semibold">最新预警</p><button class="text-primary text-sm">查看全部</button></div>
              <div class="space-y-2">
                <div v-for="a in alerts" :key="a.name" class="h-16 rounded-lg bg-muted px-3 flex items-center gap-3">
                  <span class="text-xs rounded-full px-2 py-1" :class="a.level === '高风险' ? 'bg-destructive text-white' : 'bg-warning/20 text-warning-foreground'">{{ a.level }}</span>
                  <div class="flex-1">
                    <p class="text-sm font-medium">{{ a.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ a.reason }}</p>
                  </div>
                  <button class="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs">立即处理</button>
                </div>
              </div>
            </div>
            <div class="rounded-xl bg-card border border-border p-4">
              <p class="font-semibold mb-2">今日日程</p>
              <ul class="space-y-3 text-sm">
                <li>14:00 与张三进行线下咨询</li>
                <li>15:30 查看李四本周情绪报告</li>
                <li>17:00 回复学生咨询留言</li>
              </ul>
            </div>
          </div>
        </template>

        <template v-else-if="current === 'students'">
          <h1 class="text-2xl font-bold">学生管理</h1>
          <p class="text-sm text-muted-foreground mt-1">管理和查看您负责的学生信息</p>
          <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">156</p><p class="text-sm text-muted-foreground">总学生数</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold text-warning">12</p><p class="text-sm text-muted-foreground">重点关注</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold text-destructive">3</p><p class="text-sm text-muted-foreground">高风险学生</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold text-success">128</p><p class="text-sm text-muted-foreground">本周活跃</p></div>
          </div>
          <div class="rounded-xl bg-card border border-border mt-4 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-muted/60"><tr><th class="p-3 text-left">学生信息</th><th class="p-3 text-left">学院/学号</th><th class="p-3 text-left">情绪分</th><th class="p-3 text-left">风险</th><th class="p-3 text-left">最近活跃</th></tr></thead>
              <tbody>
                <tr v-for="s in students" :key="s.sid" class="border-t border-border">
                  <td class="p-3 font-medium">{{ s.name }}</td>
                  <td class="p-3 text-muted-foreground">{{ s.college }} / {{ s.sid }}</td>
                  <td class="p-3">{{ s.score }}% · {{ s.emotion }}</td>
                  <td class="p-3"><span class="text-xs rounded-full px-2 py-1" :class="s.risk === '高风险' ? 'bg-destructive text-white' : s.risk === '中风险' ? 'bg-warning/20 text-warning-foreground' : 'bg-success/20 text-success'">{{ s.risk }}</span></td>
                  <td class="p-3 text-muted-foreground">{{ s.active }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <template v-else-if="current === 'alerts'">
          <h1 class="text-2xl font-bold">危机预警</h1>
          <p class="text-sm text-muted-foreground mt-1">及时处理学生心理预警，保障学生心理健康</p>
          <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="rounded-xl bg-card border border-destructive p-5"><p class="text-3xl font-bold text-destructive">1</p><p class="text-sm text-muted-foreground">高风险预警</p></div>
            <div class="rounded-xl bg-card border border-warning p-5"><p class="text-3xl font-bold text-warning">2</p><p class="text-sm text-muted-foreground">中风险预警</p></div>
            <div class="rounded-xl bg-card border border-primary p-5"><p class="text-3xl font-bold text-primary">1</p><p class="text-sm text-muted-foreground">处理中</p></div>
            <div class="rounded-xl bg-card border border-success p-5"><p class="text-3xl font-bold text-success">8</p><p class="text-sm text-muted-foreground">本周已处理</p></div>
          </div>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="rounded-xl bg-card border border-border p-4">
              <p class="font-semibold mb-2">预警列表</p>
              <div class="space-y-2">
                <div v-for="a in alerts" :key="`${a.name}-${a.time}`" class="rounded-lg bg-muted p-3">
                  <p class="font-medium">{{ a.name }} <span class="text-xs ml-2">{{ a.level }}</span></p>
                  <p class="text-xs text-muted-foreground mt-1">{{ a.reason }}</p>
                </div>
              </div>
            </div>
            <div class="col-span-2 rounded-xl bg-card border border-border p-4">
              <p class="font-semibold mb-3">预警详情</p>
              <ul class="list-disc pl-6 text-sm space-y-2">
                <li>近7天消极情绪占比达到75%</li>
                <li>对话中出现高危词汇：绝望、无意义、放弃</li>
                <li>深夜活跃频次增加200%</li>
              </ul>
              <div class="grid grid-cols-4 gap-2 mt-5">
                <button class="h-10 rounded-lg bg-primary text-primary-foreground text-sm flex items-center justify-center gap-2"><Phone class="h-4 w-4" />电话联系</button>
                <button class="h-10 rounded-lg border border-border text-sm">发送消息</button>
                <button class="h-10 rounded-lg border border-border text-sm">预约咨询</button>
                <button class="h-10 rounded-lg border border-border text-sm">记录干预</button>
              </div>
            </div>
          </div>
        </template>

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

        <template v-else-if="current === 'tasks'">
          <h1 class="text-2xl font-bold">心理任务</h1>
          <p class="text-sm text-muted-foreground mt-1">为学生发布个性化心理训练任务</p>
          <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">8</p><p class="text-sm text-muted-foreground">进行中任务</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold text-success">15</p><p class="text-sm text-muted-foreground">已完成任务</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">45</p><p class="text-sm text-muted-foreground">参与学生</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">72%</p><p class="text-sm text-muted-foreground">平均完成率</p></div>
          </div>
          <div class="rounded-xl bg-card border border-border p-4 mt-4">
            <div class="rounded-lg border border-border p-4 mb-3">
              <div class="flex items-center justify-between"><p class="font-semibold">每日呼吸放松练习</p><span class="text-xs text-muted-foreground">8/12人</span></div>
              <div class="h-2 rounded bg-muted mt-3"><div class="h-2 rounded bg-primary w-2/3" /></div>
            </div>
            <div class="rounded-lg border border-border p-4">
              <div class="flex items-center justify-between"><p class="font-semibold">情绪日记记录</p><span class="text-xs text-muted-foreground">18/25人</span></div>
              <div class="h-2 rounded bg-muted mt-3"><div class="h-2 rounded bg-primary w-[72%]" /></div>
            </div>
          </div>
        </template>

        <template v-else>
          <h1 class="text-2xl font-bold">资源管理</h1>
          <p class="text-sm text-muted-foreground mt-1">管理和发布心理健康资源内容</p>
          <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">12</p><p class="text-sm text-muted-foreground">文章数量</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">8</p><p class="text-sm text-muted-foreground">音频数量</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold">2456</p><p class="text-sm text-muted-foreground">总浏览量</p></div>
            <div class="rounded-xl bg-card border border-border p-5"><p class="text-3xl font-bold text-destructive">389</p><p class="text-sm text-muted-foreground">获得点赞</p></div>
          </div>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="rounded-xl bg-card border border-border p-4" v-for="card in 3" :key="card">
              <div class="h-7 w-14 rounded-full bg-success/10 text-success text-xs flex items-center justify-center">已发布</div>
              <p class="font-semibold mt-3">如何有效缓解考试焦虑</p>
              <p class="text-xs text-muted-foreground mt-1">本文介绍了几种科学有效的方法来缓解考试前的焦虑情绪。</p>
              <p class="text-xs text-muted-foreground mt-3">浏览 328 · 点赞 45</p>
            </div>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>
