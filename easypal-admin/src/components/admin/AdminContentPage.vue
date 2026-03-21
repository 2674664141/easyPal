<script setup lang="ts">
import { AlertCircle, CheckCircle2, Clock3, Eye, Flag, Search, XCircle } from 'lucide-vue-next'
import { ref } from 'vue'

const activeTab = ref<'pending' | 'reported' | 'approved' | 'rejected'>('pending')

const pendingList = [
  {
    title: '如何应对期末考试焦虑',
    type: '文章',
    author: '王老师（心理咨询师）',
    time: '2024-03-20 10:30',
    preview: '期末考试临近，很多同学都会感到焦虑和压力...',
    category: '压力管理',
    flagged: '',
  },
  {
    title: '深度放松冥想音频',
    type: '音频',
    author: '李老师（心理咨询师）',
    time: '2024-03-20 09:15',
    preview: '15分钟放松引导音频',
    category: '冥想',
    flagged: '',
  },
  {
    title: '建立健康的人际关系',
    type: '文章',
    author: '张老师（心理咨询师）',
    time: '2024-03-19 16:45',
    preview: '人际关系是大学生活中非常重要的一部分...',
    category: '社交技能',
    flagged: '',
  },
  {
    title: '今天心情很低落...',
    type: '帖子',
    author: '匿名用户（学生）',
    time: '2024-03-20 11:20',
    preview: '最近压力很大，感觉什么都做不好...',
    category: '心情',
    flagged: '内容含有敏感词汇',
  },
]

const reportedList = [
  { title: '分享一个减压方法', author: '用户A***3', reason: '疑似广告内容', count: 3, time: '2024-03-20 08:30' },
  { title: '评论内容涉及不当言论', author: '用户B***7', reason: '言语攻击', count: 5, time: '2024-03-19 22:15' },
]
</script>

<template>
  <section>
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[34px] leading-none font-bold">内容审核</h1>
        <p class="text-sm text-muted-foreground mt-2">审核咨询师发布的内容和用户举报的内容</p>
      </div>
      <div class="flex items-center gap-2 pt-1">
        <span class="h-7 rounded-full px-2 text-xs bg-warning/15 text-warning-foreground inline-flex items-center">待审核: 8</span>
        <span class="h-7 rounded-full px-2 text-xs bg-destructive/15 text-destructive inline-flex items-center">举报处理: 2</span>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mt-4">
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl bg-warning/15 text-warning-foreground flex items-center justify-center"><Clock3 class="h-5 w-5" /></div>
          <div><p class="text-3xl font-bold leading-none">8</p><p class="text-sm text-muted-foreground mt-1">待审核</p></div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl bg-success/15 text-success flex items-center justify-center"><CheckCircle2 class="h-5 w-5" /></div>
          <div><p class="text-3xl font-bold leading-none">156</p><p class="text-sm text-muted-foreground mt-1">已通过</p></div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl bg-destructive/15 text-destructive flex items-center justify-center"><XCircle class="h-5 w-5" /></div>
          <div><p class="text-3xl font-bold leading-none">12</p><p class="text-sm text-muted-foreground mt-1">已拒绝</p></div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><Flag class="h-5 w-5" /></div>
          <div><p class="text-3xl font-bold leading-none">2</p><p class="text-sm text-muted-foreground mt-1">举报处理中</p></div>
        </div>
      </div>
    </div>

    <div class="mt-4 rounded-2xl border border-border bg-card p-4">
      <div class="flex items-center justify-between">
        <div class="h-9 rounded-lg bg-muted p-1 flex gap-1">
          <button class="h-7 px-3 rounded-md text-xs flex items-center gap-1" :class="activeTab==='pending' ? 'bg-card shadow' : ''" @click="activeTab='pending'">待审核 <span class="h-4 min-w-4 px-1 rounded-full bg-warning text-[10px] text-white">8</span></button>
          <button class="h-7 px-3 rounded-md text-xs flex items-center gap-1" :class="activeTab==='reported' ? 'bg-card shadow' : ''" @click="activeTab='reported'">被举报 <span class="h-4 min-w-4 px-1 rounded-full bg-destructive text-[10px] text-white">2</span></button>
          <button class="h-7 px-3 rounded-md text-xs" :class="activeTab==='approved' ? 'bg-card shadow' : ''" @click="activeTab='approved'">已通过</button>
          <button class="h-7 px-3 rounded-md text-xs" :class="activeTab==='rejected' ? 'bg-card shadow' : ''" @click="activeTab='rejected'">已拒绝</button>
        </div>
        <div class="flex items-center gap-2">
          <div class="relative">
            <Search class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input class="h-10 w-56 rounded-lg border border-input bg-background pl-9 pr-3 text-sm" placeholder="搜索内容..." />
          </div>
          <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm">全部类型</button>
        </div>
      </div>

      <div class="mt-4 space-y-3" v-if="activeTab==='pending'">
        <div v-for="item in pendingList" :key="item.title" class="rounded-xl border border-border bg-background px-4 py-3 flex items-center justify-between">
          <div class="min-w-0 pr-4">
            <div class="flex items-center gap-2">
              <div class="h-7 w-7 rounded-md bg-muted flex items-center justify-center text-xs">📄</div>
              <p class="text-sm font-semibold">{{ item.title }}</p>
              <span class="text-[10px] rounded-full px-1.5 py-0.5 bg-primary/15 text-primary">{{ item.type }}</span>
              <span class="text-[10px] rounded-full px-1.5 py-0.5 bg-muted text-muted-foreground">{{ item.category }}</span>
              <span v-if="item.flagged" class="text-[10px] rounded-full px-1.5 py-0.5 bg-destructive text-white">{{ item.flagged }}</span>
            </div>
            <p class="text-xs text-muted-foreground mt-1">作者: {{ item.author }}　{{ item.time }}</p>
            <p class="text-xs text-muted-foreground mt-1 truncate">{{ item.preview }}</p>
          </div>
          <div class="shrink-0 flex items-center gap-2">
            <button class="h-8 px-3 rounded-md border border-input text-xs inline-flex items-center gap-1"><Eye class="h-3.5 w-3.5" />预览</button>
            <button class="h-8 px-3 rounded-md bg-success text-success-foreground text-xs">通过</button>
            <button class="h-8 px-3 rounded-md bg-destructive text-destructive-foreground text-xs">拒绝</button>
          </div>
        </div>
      </div>

      <div class="mt-4 space-y-3" v-else-if="activeTab==='reported'">
        <div v-for="item in reportedList" :key="item.title" class="rounded-xl border border-border bg-background px-4 py-3 flex items-center justify-between">
          <div class="min-w-0 pr-4">
            <div class="flex items-center gap-2">
              <div class="h-7 w-7 rounded-md bg-muted flex items-center justify-center text-xs">🚩</div>
              <p class="text-sm font-semibold">{{ item.title }}</p>
              <span class="text-[10px] rounded-full px-1.5 py-0.5 bg-warning/20 text-warning-foreground">{{ item.count }}次举报</span>
              <span class="text-[10px] rounded-full px-1.5 py-0.5 bg-destructive text-white">{{ item.reason }}</span>
            </div>
            <p class="text-xs text-muted-foreground mt-1">作者: {{ item.author }}　{{ item.time }}</p>
          </div>
          <div class="shrink-0 flex items-center gap-2">
            <button class="h-8 px-3 rounded-md border border-input text-xs inline-flex items-center gap-1"><Eye class="h-3.5 w-3.5" />查看</button>
            <button class="h-8 px-3 rounded-md bg-muted text-xs">忽略举报</button>
            <button class="h-8 px-3 rounded-md bg-destructive text-destructive-foreground text-xs">删除内容</button>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab==='approved'" class="mt-4 rounded-xl border border-border p-10 text-center text-sm text-muted-foreground">已通过内容列表</div>
      <div v-else class="mt-4 rounded-xl border border-border p-10 text-center text-sm text-muted-foreground">已拒绝内容列表</div>
    </div>
  </section>
</template>
