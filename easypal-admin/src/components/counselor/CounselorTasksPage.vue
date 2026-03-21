<script setup lang="ts">
import { Calendar, Plus, Search, X } from 'lucide-vue-next'
import { ref } from 'vue'

const showCreate = ref(false)
const activeTab = ref<'active' | 'done'>('active')

const tasks = [
  {
    title: '每日呼吸放松练习',
    tag: '放松训练',
    desc: '完成10分钟的腹式呼吸训练，帮助缓解焦虑',
    progressText: '8/12人',
    progress: 67,
    deadline: '2024-01-20',
    done: false,
  },
  {
    title: '情绪日记记录',
    tag: '心情记录',
    desc: '每天记录三个让你感到开心的小事',
    progressText: '18/25人',
    progress: 72,
    deadline: '2024-01-25',
    done: false,
  },
  {
    title: '正念冥想',
    tag: '冥想练习',
    desc: '完成5次正念冥想，每次15分钟',
    progressText: '8/8人',
    progress: 100,
    deadline: '2024-01-15',
    done: true,
  },
]

const templates = [
  { name: '呼吸放松训练', period: '7天' },
  { name: '感恩日记', period: '14天' },
  { name: '正念冥想', period: '7天' },
  { name: '运动打卡', period: '14天' },
]
</script>

<template>
  <section class="relative">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[34px] leading-none font-bold">心理任务</h1>
        <p class="text-sm text-muted-foreground mt-2">为学生发布个性化心理训练任务</p>
      </div>
      <button class="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm inline-flex items-center gap-2" @click="showCreate = true">
        <Plus class="h-4 w-4" />
        创建任务
      </button>
    </div>

    <div class="grid grid-cols-4 gap-4 mt-4">
      <div class="rounded-2xl border border-border bg-card p-5"><p class="text-xs text-muted-foreground">进行中任务</p><p class="text-4xl font-bold mt-2">8</p></div>
      <div class="rounded-2xl border border-border bg-card p-5"><p class="text-xs text-muted-foreground">已完成任务</p><p class="text-4xl font-bold text-success mt-2">15</p></div>
      <div class="rounded-2xl border border-border bg-card p-5"><p class="text-xs text-muted-foreground">参与学生</p><p class="text-4xl font-bold mt-2">45</p></div>
      <div class="rounded-2xl border border-border bg-card p-5"><p class="text-xs text-muted-foreground">平均完成率</p><p class="text-4xl font-bold mt-2">72%</p></div>
    </div>

    <div class="mt-4 rounded-2xl border border-border bg-card p-4">
      <div class="flex items-center gap-2">
        <div class="relative flex-1">
          <Search class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input class="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm" placeholder="搜索任务..." />
        </div>
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm">全部状态</button>
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm">全部类型</button>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-4">
      <div class="col-span-2">
        <div class="h-9 rounded-lg bg-muted p-1 inline-flex gap-1 text-xs">
          <button class="h-7 px-3 rounded-md" :class="activeTab==='active' ? 'bg-card shadow' : ''" @click="activeTab='active'">进行中 (3)</button>
          <button class="h-7 px-3 rounded-md" :class="activeTab==='done' ? 'bg-card shadow' : ''" @click="activeTab='done'">已完成 (1)</button>
        </div>

        <div class="mt-3 space-y-3">
          <div
            v-for="item in tasks"
            :key="item.title"
            v-show="(activeTab==='active' && !item.done) || (activeTab==='done' && item.done)"
            class="rounded-2xl border border-border bg-card p-4"
          >
            <div class="flex items-start justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-xl font-semibold">{{ item.title }}</h3>
                  <span class="text-[10px] rounded-full px-1.5 py-0.5 bg-primary/15 text-primary">{{ item.tag }}</span>
                </div>
                <p class="text-sm text-muted-foreground mt-1">{{ item.desc }}</p>
              </div>
              <button class="text-muted-foreground">...</button>
            </div>

            <div class="mt-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">完成进度</span>
                <span>{{ item.progressText }}</span>
              </div>
              <div class="h-2 rounded-full bg-muted mt-2 overflow-hidden">
                <div class="h-full bg-primary rounded-full" :style="{ width: `${item.progress}%` }"></div>
              </div>
              <div class="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span class="inline-flex items-center gap-1"><Calendar class="h-3.5 w-3.5" />截止: {{ item.deadline }}</span>
                <span>共 {{ item.progressText.split('/')[1] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-border bg-card p-4 h-fit">
        <h3 class="text-xl font-semibold">任务模板</h3>
        <p class="text-xs text-muted-foreground mt-1">快速使用预设的任务模板</p>
        <div class="mt-3 space-y-2">
          <div v-for="t in templates" :key="t.name" class="rounded-lg bg-muted px-3 py-2">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium">{{ t.name }}</p>
              <span class="text-xs text-muted-foreground">建议{{ t.period }}</span>
            </div>
          </div>
        </div>
        <button class="mt-3 h-9 w-full rounded-lg border border-input bg-background text-sm inline-flex items-center justify-center gap-1">
          <Plus class="h-4 w-4" />创建模板
        </button>
      </div>
    </div>

    <div v-if="showCreate" class="fixed inset-0 z-50 bg-black/35 flex items-center justify-center">
      <div class="w-[560px] rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-2xl font-semibold">创建心理任务</h3>
            <p class="text-sm text-muted-foreground mt-1">为学生创建个性化的心理训练任务</p>
          </div>
          <button class="h-8 w-8 rounded-md border border-input flex items-center justify-center" @click="showCreate = false"><X class="h-4 w-4" /></button>
        </div>

        <div class="mt-4 space-y-3">
          <div>
            <p class="text-sm mb-1">任务名称</p>
            <input class="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" placeholder="输入任务名称" />
          </div>
          <div>
            <p class="text-sm mb-1">任务描述</p>
            <textarea class="w-full h-20 rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none" placeholder="描述任务内容和目标"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <p class="text-sm mb-1">任务类型</p>
              <input class="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" placeholder="选择类型" />
            </div>
            <div>
              <p class="text-sm mb-1">截止日期</p>
              <input class="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" placeholder="yyyy/mm/dd" />
            </div>
          </div>
          <div>
            <p class="text-sm mb-1">指定学生</p>
            <input class="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" placeholder="全部学生" />
          </div>
        </div>

        <div class="mt-5 flex justify-end gap-2">
          <button class="h-9 px-4 rounded-lg border border-input bg-background text-sm" @click="showCreate = false">取消</button>
          <button class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm">创建任务</button>
        </div>
      </div>
    </div>
  </section>
</template>
