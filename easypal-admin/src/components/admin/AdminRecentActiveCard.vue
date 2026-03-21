<script setup lang="ts">
const users = [
  { name: '李同学', emotion: '积极', action: '完成AI对话', time: '刚刚' },
  { name: '王同学', emotion: '中性', action: '发布心情日记', time: '23分钟前' },
  { name: '张同学', emotion: '低落', action: '社区互动', time: '10分钟前' },
  { name: '赵同学', emotion: '积极', action: '完成情绪打卡', time: '15分钟前' },
]
</script>

<template>
  <section class="rounded-xl bg-card border border-border p-4">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <span class="text-primary text-sm">◍</span>
        <h3 class="text-base font-semibold">最近活跃</h3>
      </div>
      <button class="text-xs text-muted-foreground hover:text-foreground">查看全部</button>
    </div>
    <div class="space-y-2 mt-3">
      <div v-for="item in users" :key="item.name" class="h-14 rounded-lg bg-muted px-3 flex items-center gap-3">
        <div class="h-8 w-8 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center">{{ item.name[0] }}</div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium">{{ item.name }}</p>
            <span class="text-[10px] rounded-full px-1.5 py-0.5" :class="item.emotion === '积极' ? 'bg-success/20 text-success' : item.emotion === '低落' ? 'bg-destructive/20 text-destructive' : 'bg-primary/15 text-primary'">{{ item.emotion }}</span>
          </div>
          <p class="text-xs text-muted-foreground truncate">{{ item.action }}</p>
        </div>
        <span class="text-xs text-muted-foreground">{{ item.time }}</span>
      </div>
    </div>
  </section>
</template>
