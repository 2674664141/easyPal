<script setup lang="ts">
const alerts = [
  { name: '张三', risk: '高风险', desc: '连续7天消极情绪，文本含高危词汇', time: '10分钟前', action: '立即处理', danger: true },
  { name: '李四', risk: '中风险', desc: '焦虑情绪占比超过30%', time: '1小时前', action: '立即处理', danger: false },
  { name: '王五', risk: '中风险', desc: '深夜活跃频次增加', time: '2小时前', action: '查看详情', danger: false },
]

const focusStudents = [
  { name: '张三', status: '需关注', emotion: '主要情绪: 焦虑', percent: 36 },
  { name: '李四', status: '观察中', emotion: '主要情绪: 伤感', percent: 45 },
  { name: '赵六', status: '恢复中', emotion: '主要情绪: 开心', percent: 68 },
  { name: '钱七', status: '需关注', emotion: '主要情绪: 压力', percent: 42 },
]
</script>

<template>
  <section>
    <h1 class="text-[34px] leading-none font-bold">早上好，王老师</h1>
    <p class="text-sm text-muted-foreground mt-2">今天有3条待处理预警，5条未读留言</p>

    <div class="grid grid-cols-4 gap-4 mt-4">
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-3xl font-bold">156</p>
            <p class="text-sm text-muted-foreground mt-1">负责学生</p>
          </div>
          <span class="text-xs text-success font-semibold">+12 ↗</span>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-3xl font-bold">3</p>
            <p class="text-sm text-muted-foreground mt-1">待处理预警</p>
          </div>
          <span class="text-xs text-destructive font-semibold">-2 ↘</span>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-3xl font-bold">5</p>
            <p class="text-sm text-muted-foreground mt-1">未读留言</p>
          </div>
          <span class="text-xs text-success font-semibold">+3 ↗</span>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-3xl font-bold">12</p>
            <p class="text-sm text-muted-foreground mt-1">本周干预</p>
          </div>
          <span class="text-xs text-success font-semibold">+4 ↗</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-4">
      <div class="col-span-2 rounded-2xl border border-border bg-card p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold">最新预警</h3>
            <p class="text-xs text-muted-foreground mt-1">需要您及时处理的学生预警</p>
          </div>
          <button class="text-primary text-sm">查看全部 ↗</button>
        </div>

        <div class="mt-3 space-y-2">
          <div
            v-for="item in alerts"
            :key="item.name"
            class="h-16 rounded-lg bg-muted px-3 flex items-center gap-3"
          >
            <div class="h-9 w-9 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center">{{ item.name[0] }}</div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="text-sm font-medium">{{ item.name }}</p>
                <span class="text-[10px] rounded-full px-1.5 py-0.5" :class="item.danger ? 'bg-destructive text-white' : 'bg-warning/20 text-warning-foreground'">{{ item.risk }}</span>
              </div>
              <p class="text-xs text-muted-foreground truncate">{{ item.desc }}</p>
            </div>
            <span class="text-xs text-muted-foreground">{{ item.time }}</span>
            <button class="h-8 px-3 rounded-md text-xs" :class="item.action === '立即处理' ? 'bg-primary text-primary-foreground' : 'border border-input bg-background'">{{ item.action }}</button>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-border bg-card p-4">
        <h3 class="text-xl font-semibold">今日日程</h3>
        <p class="text-xs text-muted-foreground mt-1">您今天的工作安排</p>
        <ul class="mt-4 space-y-3">
          <li class="text-sm">与张三进行线下咨询<br /><span class="text-xs text-muted-foreground">14:00</span></li>
          <li class="text-sm">查看李四本周情绪报告<br /><span class="text-xs text-muted-foreground">15:30</span></li>
          <li class="text-sm">发布压力管理文章<br /><span class="text-xs text-muted-foreground">16:00</span></li>
          <li class="text-sm">回复学生咨询留言<br /><span class="text-xs text-muted-foreground">17:00</span></li>
        </ul>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-4">
      <div class="col-span-2 rounded-2xl border border-border bg-card p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold">重点关注学生</h3>
            <p class="text-xs text-muted-foreground mt-1">需要持续关注的学生情绪状态</p>
          </div>
          <button class="text-primary text-sm">管理关注列表 ↗</button>
        </div>

        <div class="mt-3 space-y-3">
          <div v-for="item in focusStudents" :key="item.name" class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center">{{ item.name[0] }}</div>
            <div class="w-16 text-sm font-medium">{{ item.name }}</div>
            <span class="text-[10px] rounded-full px-1.5 py-0.5" :class="item.status === '需关注' ? 'bg-destructive text-white' : item.status === '观察中' ? 'bg-warning/20 text-warning-foreground' : 'bg-success/20 text-success'">{{ item.status }}</span>
            <span class="text-xs text-muted-foreground">{{ item.emotion }}</span>
            <div class="flex-1 h-2 rounded-full bg-muted overflow-hidden"><div class="h-full bg-primary" :style="{ width: `${item.percent}%` }"></div></div>
            <span class="text-xs text-muted-foreground w-8">{{ item.percent }}%</span>
            <button class="h-7 px-3 rounded-md border border-input text-xs bg-background">查看详情</button>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-border bg-card p-4">
        <h3 class="text-xl font-semibold">学生情绪分布</h3>
        <p class="text-xs text-muted-foreground mt-1">负责学生整体情绪状态</p>
        <div class="mt-6 text-center">
          <div class="text-4xl">🧠</div>
          <p class="text-3xl font-bold mt-2">156</p>
          <p class="text-xs text-muted-foreground">学生</p>
        </div>
        <div class="mt-5 grid grid-cols-2 gap-y-2 text-sm">
          <div class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-success"></span>积极</div><div class="text-right">45%</div>
          <div class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-primary"></span>平静</div><div class="text-right">30%</div>
          <div class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-warning"></span>焦虑</div><div class="text-right">15%</div>
          <div class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-destructive"></span>低落</div><div class="text-right">10%</div>
        </div>
      </div>
    </div>
  </section>
</template>
