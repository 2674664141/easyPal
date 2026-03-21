<script setup lang="ts">
import { Calendar, History, Phone, Search, UserRound, MessageSquare, FileText } from 'lucide-vue-next'
import { ref } from 'vue'

const activeTab = ref<'pending' | 'history'>('pending')
const selectedId = ref(1)

const alerts = [
  {
    id: 1,
    name: '张三',
    sid: '2021001001',
    college: '计算机学院',
    level: '高风险',
    reason: '连续7天消极情绪，文本含高危词汇',
    time: '10分钟前',
    details: ['近7天消极情绪占比达到75%', '对话中出现3次高危词汇：绝望、无意义、放弃', '深夜活跃频次增加200%'],
  },
  {
    id: 2,
    name: '李四',
    sid: '2021001002',
    college: '计算机学院',
    level: '中风险',
    reason: '焦虑情绪占比超过30%',
    time: '1小时前',
    details: ['近14天焦虑情绪占比32%', '近期频繁提及考试压力', '睡眠时间不规律'],
  },
  {
    id: 3,
    name: '王五',
    sid: '2021002001',
    college: '经济学院',
    level: '中风险',
    reason: '深夜活跃频次增加',
    time: '2小时前',
    details: ['22:00-02:00活跃增加180%', '近期情绪波动较大', '社交互动减少'],
  },
]

const histories = [
  {
    name: '赵六',
    type: '中风险',
    content: '已与学生进行30分钟电话沟通，了解到因考试压力较大，已给予心理疏导建议。',
    date: '2024-01-14 15:30',
    result: '学生情绪有所缓解',
  },
  {
    name: '钱七',
    type: '低风险',
    content: '安排线下咨询，进行了45分钟深度沟通。',
    date: '2024-01-13 14:00',
    result: '建议开展一对一跟进',
  },
]

const selected = () => alerts.find((a) => a.id === selectedId.value) ?? alerts[0]
</script>

<template>
  <section>
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[34px] leading-none font-bold">危机预警</h1>
        <p class="text-sm text-muted-foreground mt-2">及时处理学生心理预警，保障学生心理健康</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm">全部等级</button>
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm inline-flex items-center gap-2">
          <History class="h-4 w-4" />
          历史记录
        </button>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mt-4">
      <div class="rounded-2xl border border-destructive bg-card p-5"><p class="text-xs text-muted-foreground">高风险预警</p><p class="text-4xl font-bold text-destructive mt-2">1</p></div>
      <div class="rounded-2xl border border-warning bg-card p-5"><p class="text-xs text-muted-foreground">中风险预警</p><p class="text-4xl font-bold text-warning mt-2">2</p></div>
      <div class="rounded-2xl border border-primary bg-card p-5"><p class="text-xs text-muted-foreground">处理中</p><p class="text-4xl font-bold text-primary mt-2">1</p></div>
      <div class="rounded-2xl border border-success bg-card p-5"><p class="text-xs text-muted-foreground">本周已处理</p><p class="text-4xl font-bold text-success mt-2">8</p></div>
    </div>

    <div class="mt-4">
      <div class="h-9 rounded-lg bg-muted p-1 inline-flex gap-1 text-xs">
        <button class="h-7 px-3 rounded-md" :class="activeTab==='pending' ? 'bg-card shadow' : ''" @click="activeTab='pending'">待处理预警 (3)</button>
        <button class="h-7 px-3 rounded-md" :class="activeTab==='history' ? 'bg-card shadow' : ''" @click="activeTab='history'">干预历史</button>
      </div>
    </div>

    <div v-if="activeTab === 'pending'" class="grid grid-cols-3 gap-4 mt-4">
      <div class="rounded-2xl border border-border bg-card p-3">
        <h3 class="text-base font-semibold px-2 mb-2">预警列表</h3>
        <div class="space-y-2">
          <button
            v-for="item in alerts"
            :key="item.id"
            class="w-full p-3 rounded-lg text-left border"
            :class="selectedId===item.id ? 'bg-primary/10 border-primary/30' : 'bg-muted/50 border-border'"
            @click="selectedId = item.id"
          >
            <div class="flex items-start gap-2">
              <div class="h-8 w-8 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center">{{ item.name[0] }}</div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium">{{ item.name }}</p>
                  <span class="text-[10px] rounded-full px-1.5 py-0.5" :class="item.level==='高风险' ? 'bg-destructive text-white' : 'bg-warning/20 text-warning-foreground'">{{ item.level }}</span>
                </div>
                <p class="text-xs text-muted-foreground truncate mt-1">{{ item.reason }}</p>
                <p class="text-[10px] text-muted-foreground mt-1">{{ item.time }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div class="col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
        <div class="h-14 px-4 border-b border-border flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center">{{ selected().name[0] }}</div>
            <div>
              <p class="font-semibold">{{ selected().name }} <span class="text-[10px] rounded-full px-1.5 py-0.5 ml-1" :class="selected().level==='高风险' ? 'bg-destructive text-white' : 'bg-warning/20 text-warning-foreground'">{{ selected().level }}</span></p>
              <p class="text-xs text-muted-foreground">{{ selected().sid }} · {{ selected().college }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="h-8 px-3 rounded-md border border-input bg-background text-xs inline-flex items-center gap-1"><UserRound class="h-3.5 w-3.5" />查看档案</button>
            <button class="h-8 px-3 rounded-md border border-input bg-background text-xs">情绪历史</button>
          </div>
        </div>

        <div class="p-4">
          <h4 class="font-semibold text-sm">预警触发原因</h4>
          <ul class="mt-2 space-y-1">
            <li v-for="d in selected().details" :key="d" class="text-sm text-muted-foreground">• {{ d }}</li>
          </ul>

          <h4 class="font-semibold text-sm mt-5">近7天情绪趋势</h4>
          <div class="h-28 mt-2 flex items-end gap-2">
            <div v-for="i in 7" :key="i" class="flex-1">
              <div class="h-20 bg-primary/60 rounded"></div>
              <p class="text-[10px] text-muted-foreground text-center mt-1">1/{{ i + 8 }}</p>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-2 mt-5">
            <button class="h-10 rounded-lg bg-primary text-primary-foreground text-sm inline-flex items-center justify-center gap-2"><Phone class="h-4 w-4" />电话联系</button>
            <button class="h-10 rounded-lg border border-input text-sm inline-flex items-center justify-center gap-2"><MessageSquare class="h-4 w-4" />发送消息</button>
            <button class="h-10 rounded-lg border border-input text-sm inline-flex items-center justify-center gap-2"><Calendar class="h-4 w-4" />预约咨询</button>
            <button class="h-10 rounded-lg border border-input text-sm inline-flex items-center justify-center gap-2"><FileText class="h-4 w-4" />记录干预</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="mt-4 rounded-2xl border border-border bg-card p-4">
      <h3 class="text-base font-semibold">干预历史记录</h3>
      <p class="text-xs text-muted-foreground mt-1">查看您的历史干预记录和效果</p>
      <div class="mt-3 space-y-3">
        <div v-for="item in histories" :key="item.name" class="rounded-xl bg-muted px-4 py-3 flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] rounded-full px-1.5 py-0.5" :class="item.type==='中风险' ? 'bg-warning/20 text-warning-foreground' : 'bg-success/20 text-success'">{{ item.type }}</span>
              <p class="text-sm font-medium">{{ item.name }}</p>
            </div>
            <p class="text-sm text-muted-foreground mt-1">{{ item.content }}</p>
            <p class="text-xs text-success mt-1">{{ item.result }}</p>
          </div>
          <span class="text-xs text-muted-foreground">{{ item.date }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
