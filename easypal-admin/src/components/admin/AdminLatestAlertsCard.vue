<script setup lang="ts">
const alerts = [
  { user: '用户A***3', level: '高风险', reason: '多次提及负面情绪关键词', time: '5分钟前' },
  { user: '用户B***7', level: '中风险', reason: '情绪波动异常', time: '16分钟前' },
  { user: '用户C***2', level: '中风险', reason: '长期低落情绪趋势', time: '1小时前' },
]
</script>

<template>
  <section class="rounded-xl bg-card border border-border p-4">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <span class="text-destructive text-sm">△</span>
        <h3 class="text-base font-semibold">最新预警</h3>
      </div>
      <button class="text-xs text-muted-foreground hover:text-foreground">查看全部</button>
    </div>
    <div class="space-y-2 mt-3">
      <div v-for="item in alerts" :key="item.user" class="h-14 rounded-lg bg-muted px-3 flex items-center gap-3">
        <span class="h-2 w-2 rounded-full" :class="item.level === '高风险' ? 'bg-destructive' : 'bg-warning'" />
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium">{{ item.user }}</p>
            <span class="text-[10px] rounded-full px-1.5 py-0.5" :class="item.level === '高风险' ? 'bg-destructive text-white' : 'bg-warning/20 text-warning-foreground'">{{ item.level }}</span>
          </div>
          <p class="text-xs text-muted-foreground truncate">{{ item.reason }}</p>
        </div>
        <span class="text-xs text-muted-foreground">{{ item.time }}</span>
      </div>
    </div>
  </section>
</template>
