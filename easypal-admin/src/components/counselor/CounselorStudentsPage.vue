<script setup lang="ts">
import { Download, Eye, Filter, MessageSquare, Search, Star, StarOff, TrendingDown, TrendingUp } from 'lucide-vue-next'
import { ref } from 'vue'

const activeTab = ref<'all' | 'focus' | 'risk'>('all')

const students = [
  { name: '张三', sid: '2021001001', college: '计算机学院', grade: '大三', score: 35, emotion: '焦虑', risk: '高风险', trend: 'down', active: '10分钟前', focus: true },
  { name: '李四', sid: '2021001002', college: '计算机学院', grade: '大三', score: 45, emotion: '低落', risk: '中风险', trend: 'flat', active: '1小时前', focus: true },
  { name: '王五', sid: '2021002001', college: '经济学院', grade: '大二', score: 72, emotion: '平静', risk: '低风险', trend: 'up', active: '3小时前', focus: false },
  { name: '赵六', sid: '2022001001', college: '计算机学院', grade: '大二', score: 68, emotion: '开心', risk: '低风险', trend: 'up', active: '30分钟前', focus: false },
  { name: '钱七', sid: '2020003001', college: '文学院', grade: '大四', score: 42, emotion: '压力', risk: '中风险', trend: 'down', active: '2小时前', focus: true },
]
</script>

<template>
  <section>
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[34px] leading-none font-bold">学生管理</h1>
        <p class="text-sm text-muted-foreground mt-2">管理和查看您负责的学生信息</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm inline-flex items-center gap-2">
          <Download class="h-4 w-4" />
          导出数据
        </button>
        <button class="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm">添加学生</button>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mt-4">
      <div class="rounded-2xl border border-border bg-card p-5"><p class="text-xs text-muted-foreground">总学生数</p><p class="text-4xl font-bold mt-2">156</p></div>
      <div class="rounded-2xl border border-border bg-card p-5"><p class="text-xs text-muted-foreground">重点关注</p><p class="text-4xl font-bold text-warning mt-2">12</p></div>
      <div class="rounded-2xl border border-border bg-card p-5"><p class="text-xs text-muted-foreground">高风险学生</p><p class="text-4xl font-bold text-destructive mt-2">3</p></div>
      <div class="rounded-2xl border border-border bg-card p-5"><p class="text-xs text-muted-foreground">本周活跃</p><p class="text-4xl font-bold text-success mt-2">128</p></div>
    </div>

    <div class="mt-4 rounded-2xl border border-border bg-card p-4">
      <div class="flex items-center gap-2">
        <div class="relative flex-1">
          <Search class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input class="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm" placeholder="搜索学生姓名或学号..." />
        </div>
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm">全部学院</button>
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm">全部等级</button>
        <button class="h-10 w-10 rounded-lg border border-input bg-background inline-flex items-center justify-center">
          <Filter class="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>

    <div class="mt-4 rounded-2xl border border-border bg-card overflow-hidden">
      <div class="h-10 px-4 border-b border-border flex items-center gap-2 text-xs">
        <button class="h-6 px-2 rounded-md" :class="activeTab==='all' ? 'bg-muted' : ''" @click="activeTab='all'">全部学生</button>
        <button class="h-6 px-2 rounded-md" :class="activeTab==='focus' ? 'bg-muted' : ''" @click="activeTab='focus'">重点关注</button>
        <button class="h-6 px-2 rounded-md" :class="activeTab==='risk' ? 'bg-muted' : ''" @click="activeTab='risk'">风险学生</button>
      </div>

      <table class="w-full text-sm">
        <thead class="bg-muted/40 text-muted-foreground">
          <tr>
            <th class="py-3 px-4 text-left font-medium w-12"></th>
            <th class="py-3 px-4 text-left font-medium">学生信息</th>
            <th class="py-3 px-4 text-left font-medium">学院/年级</th>
            <th class="py-3 px-4 text-left font-medium">情绪状态</th>
            <th class="py-3 px-4 text-left font-medium">风险等级</th>
            <th class="py-3 px-4 text-left font-medium">趋势</th>
            <th class="py-3 px-4 text-left font-medium">最近活跃</th>
            <th class="py-3 px-4 text-right font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in students"
            :key="item.sid"
            class="border-t border-border"
            v-show="activeTab==='all' || (activeTab==='focus' && item.focus) || (activeTab==='risk' && item.risk !== '低风险')"
          >
            <td class="py-3 px-4">
              <button class="h-7 w-7 rounded-md border border-border flex items-center justify-center">
                <Star v-if="item.focus" class="h-3.5 w-3.5 text-warning fill-warning" />
                <StarOff v-else class="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center">{{ item.name[0] }}</div>
                <div>
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ item.sid }}</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <p>{{ item.college }}</p>
              <p class="text-xs text-muted-foreground">{{ item.grade }}</p>
            </td>
            <td class="py-3 px-4">
              <div class="w-36">
                <div class="h-2 rounded-full bg-muted overflow-hidden"><div class="h-full bg-primary" :style="{ width: `${item.score}%` }"></div></div>
                <p class="text-xs text-muted-foreground mt-1">主要情绪: {{ item.emotion }}</p>
              </div>
            </td>
            <td class="py-3 px-4">
              <span class="text-[10px] rounded-full px-2 py-1" :class="item.risk==='高风险' ? 'bg-destructive text-white' : item.risk==='中风险' ? 'bg-warning/20 text-warning-foreground' : 'bg-success/20 text-success'">{{ item.risk }}</span>
            </td>
            <td class="py-3 px-4">
              <TrendingUp v-if="item.trend==='up'" class="h-4 w-4 text-success" />
              <TrendingDown v-else-if="item.trend==='down'" class="h-4 w-4 text-destructive" />
              <span v-else class="text-muted-foreground">—</span>
            </td>
            <td class="py-3 px-4 text-muted-foreground">{{ item.active }}</td>
            <td class="py-3 px-4">
              <div class="flex items-center justify-end gap-1">
                <button class="h-8 w-8 rounded-md border border-border inline-flex items-center justify-center"><Eye class="h-3.5 w-3.5 text-muted-foreground" /></button>
                <button class="h-8 w-8 rounded-md border border-border inline-flex items-center justify-center"><MessageSquare class="h-3.5 w-3.5 text-muted-foreground" /></button>
                <button class="h-8 w-8 rounded-md border border-border text-muted-foreground">...</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
