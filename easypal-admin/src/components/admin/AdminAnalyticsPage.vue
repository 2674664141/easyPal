<script setup lang="ts">
import { BarChart3, Calendar, Download, TrendingUp, Users, MessageSquare, Activity } from 'lucide-vue-next'

const topKeywords = [
  { name: '考试', count: 1234, width: '100%' },
  { name: '论文', count: 987, width: '80%' },
  { name: '失眠', count: 756, width: '62%' },
  { name: '压力', count: 654, width: '54%' },
  { name: '迷茫', count: 543, width: '45%' },
  { name: '孤独', count: 432, width: '35%' },
]

const insightList = [
  { type: '关注', title: '考试压力增加', desc: '近一周“考试”相关关键词增加42%，建议推送考前减压内容', cls: 'bg-warning/15 text-warning-foreground' },
  { type: '建议', title: '深夜活跃用户增多', desc: '21:00-00:00时段活跃用户同比上周增加15%，可强化夜间陪护', cls: 'bg-primary/15 text-primary' },
  { type: '正向', title: '社区互动效果良好', desc: '参与社区互动用户情绪改善率达68%，建议继续推广', cls: 'bg-success/15 text-success' },
  { type: '建议', title: '新用户引导优化', desc: '新用户首周流失率23%，建议优化引导流程与首次对话体验', cls: 'bg-primary/15 text-primary' },
]
</script>

<template>
  <section>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-[34px] leading-none font-bold">数据分析</h1>
        <p class="text-sm text-muted-foreground mt-2">深入分析用户行为和情绪数据</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm inline-flex items-center gap-2"><Calendar class="h-4 w-4" />最近7天</button>
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm inline-flex items-center gap-2"><Download class="h-4 w-4" />导出报告</button>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mt-4">
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div><p class="text-3xl font-bold">12,847</p><p class="text-sm text-muted-foreground mt-1">总用户数</p><p class="text-xs text-success mt-2">↗ +8.2% 较上周</p></div>
          <div class="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><Users class="h-5 w-5" /></div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div><p class="text-3xl font-bold">156,234</p><p class="text-sm text-muted-foreground mt-1">总对话数</p><p class="text-xs text-success mt-2">↗ +15.3% 较上周</p></div>
          <div class="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><MessageSquare class="h-5 w-5" /></div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div><p class="text-3xl font-bold">2,456</p><p class="text-sm text-muted-foreground mt-1">日均活跃</p><p class="text-xs text-success mt-2">↗ +5.1% 较上周</p></div>
          <div class="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><TrendingUp class="h-5 w-5" /></div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div><p class="text-3xl font-bold">72.5</p><p class="text-sm text-muted-foreground mt-1">平均情绪分</p><p class="text-xs text-success mt-2">↗ +3.2 较上周</p></div>
          <div class="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><BarChart3 class="h-5 w-5" /></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="rounded-2xl border border-border bg-card p-4">
        <h3 class="font-semibold">情绪分布</h3>
        <p class="text-xs text-muted-foreground mt-1">用户情绪类型统计分析</p>
        <div class="mt-3 flex items-center gap-8">
          <div class="relative h-36 w-36 rounded-full bg-[conic-gradient(#22c55e_0_35%,#14b8a6_35%_63%,#f59e0b_63%_81%,#ec4899_81%_93%,#ef4444_93%_100%)]">
            <div class="absolute inset-5 rounded-full bg-card flex flex-col items-center justify-center">
              <p class="text-2xl font-bold">72.5</p>
              <p class="text-xs text-muted-foreground">平均分</p>
            </div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex items-center justify-between gap-12"><span>开心</span><span>35%</span></div>
            <div class="flex items-center justify-between gap-12"><span>平静</span><span>28%</span></div>
            <div class="flex items-center justify-between gap-12"><span>焦虑</span><span>18%</span></div>
            <div class="flex items-center justify-between gap-12"><span>低落</span><span>12%</span></div>
            <div class="flex items-center justify-between gap-12"><span>愤怒</span><span>7%</span></div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-4">
        <h3 class="font-semibold">使用时段分布</h3>
        <p class="text-xs text-muted-foreground mt-1">24小时用户活跃度分析</p>
        <div class="h-48 mt-3 flex items-end gap-2">
          <div class="flex-1 text-center text-xs text-muted-foreground"><div class="h-2 bg-primary rounded mb-1"></div>00:00</div>
          <div class="flex-1 text-center text-xs text-muted-foreground"><div class="h-1 bg-primary rounded mb-1"></div>03:00</div>
          <div class="flex-1 text-center text-xs text-muted-foreground"><div class="h-2 bg-primary rounded mb-1"></div>06:00</div>
          <div class="flex-1 text-center text-xs text-muted-foreground"><div class="h-20 bg-primary rounded mb-1"></div>09:00</div>
          <div class="flex-1 text-center text-xs text-muted-foreground"><div class="h-28 bg-primary rounded mb-1"></div>12:00</div>
          <div class="flex-1 text-center text-xs text-muted-foreground"><div class="h-24 bg-primary rounded mb-1"></div>15:00</div>
          <div class="flex-1 text-center text-xs text-muted-foreground"><div class="h-36 bg-primary rounded mb-1"></div>18:00</div>
          <div class="flex-1 text-center text-xs text-muted-foreground"><div class="h-40 bg-primary rounded mb-1"></div>21:00</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="rounded-2xl border border-border bg-card p-4">
        <h3 class="font-semibold">热门关键词</h3>
        <p class="text-xs text-muted-foreground mt-1">用户对话中出现频率最高的词汇</p>
        <div class="mt-3 space-y-3">
          <div v-for="(k, index) in topKeywords" :key="k.name" class="flex items-center gap-3">
            <span class="w-4 text-xs text-muted-foreground">{{ index + 1 }}</span>
            <div class="flex-1">
              <div class="flex items-center justify-between text-sm"><span>{{ k.name }}</span><span>{{ k.count }}次</span></div>
              <div class="h-2 bg-muted rounded-full mt-1"><div class="h-full bg-primary rounded-full" :style="{ width: k.width }" /></div>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-4">
        <h3 class="font-semibold">AI分析洞察</h3>
        <p class="text-xs text-muted-foreground mt-1">基于数据的智能分析建议</p>
        <div class="mt-3 space-y-2">
          <div v-for="item in insightList" :key="item.title" class="rounded-lg bg-muted p-3">
            <div class="flex items-start gap-2">
              <span class="h-5 px-2 rounded-full text-[10px] inline-flex items-center" :class="item.cls">{{ item.type }}</span>
              <div>
                <p class="text-sm font-medium">{{ item.title }}</p>
                <p class="text-xs text-muted-foreground mt-1">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 rounded-2xl border border-border bg-card p-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-semibold">社区活跃度分析</h3>
          <p class="text-xs text-muted-foreground mt-1">用户社交行为和互动数据</p>
        </div>
        <div class="h-9 rounded-lg bg-muted p-1 flex gap-1 text-xs">
          <button class="h-7 px-3 rounded-md bg-card shadow">发帖</button>
          <button class="h-7 px-3 rounded-md">评论</button>
          <button class="h-7 px-3 rounded-md">点赞</button>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div class="rounded-xl bg-muted/70 p-6 text-center"><p class="text-4xl font-bold">234</p><p class="text-sm text-muted-foreground mt-1">今日发帖</p><p class="text-xs text-success mt-2">+12%</p></div>
        <div class="rounded-xl bg-muted/70 p-6 text-center"><p class="text-4xl font-bold">1,567</p><p class="text-sm text-muted-foreground mt-1">今日评论</p><p class="text-xs text-success mt-2">+8%</p></div>
        <div class="rounded-xl bg-muted/70 p-6 text-center"><p class="text-4xl font-bold">4,892</p><p class="text-sm text-muted-foreground mt-1">今日点赞</p><p class="text-xs text-success mt-2">+15%</p></div>
      </div>
    </div>
  </section>
</template>
