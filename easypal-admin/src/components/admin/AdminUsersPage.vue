<script setup lang="ts">
import { Download, Filter, MoreHorizontal, Search } from 'lucide-vue-next'

const list = [
  { name: '李明', id: '计算机学院', mood: '积极', risk: '低风险', chats: 156, diaries: 28, active: '10分钟前' },
  { name: '王芳', id: '外国语学院', mood: '中性', risk: '低风险', chats: 89, diaries: 45, active: '30分钟前' },
  { name: '张伟', id: '经济管理学院', mood: '低落', risk: '高风险', chats: 234, diaries: 12, active: '1小时前' },
  { name: '刘洋', id: '艺术学院', mood: '积极', risk: '低风险', chats: 67, diaries: 56, active: '2小时前' },
  { name: '陈静', id: '医学院', mood: '低落', risk: '中风险', chats: 189, diaries: 34, active: '3小时前' },
  { name: '赵强', id: '机械工程学院', mood: '中性', risk: '低风险', chats: 45, diaries: 23, active: '5小时前' },
]
</script>

<template>
  <section>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-[34px] leading-none font-bold text-foreground">用户管理</h1>
        <p class="text-sm text-muted-foreground mt-2">查看和管理所有用户的情绪数据和使用情况</p>
      </div>
      <button class="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2">
        <Download class="h-4 w-4" />
        导出数据
      </button>
    </div>

    <div class="mt-4 rounded-2xl border border-border bg-card p-4">
      <div class="flex items-center gap-3">
        <div class="relative flex-1">
          <Search class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input class="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm" placeholder="搜索用户姓名、学院..." />
        </div>
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm inline-flex items-center gap-2">
          <Filter class="h-4 w-4 text-muted-foreground" />
          全部等级
        </button>
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm">全部状态</button>
      </div>
    </div>

    <div class="mt-4 rounded-2xl border border-border bg-card overflow-hidden">
      <div class="h-14 px-4 border-b border-border flex items-center font-semibold">用户列表</div>
      <table class="w-full text-sm">
        <thead class="bg-muted/40 text-muted-foreground">
          <tr>
            <th class="py-3 px-4 text-left font-medium">用户信息</th>
            <th class="py-3 px-4 text-left font-medium">情绪状态</th>
            <th class="py-3 px-4 text-left font-medium">风险等级</th>
            <th class="py-3 px-4 text-left font-medium">对话数</th>
            <th class="py-3 px-4 text-left font-medium">日记数</th>
            <th class="py-3 px-4 text-left font-medium">最后活跃</th>
            <th class="py-3 px-4 text-left font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="`${item.name}-${item.active}`" class="border-t border-border">
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center">{{ item.name[0] }}</div>
                <div>
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ item.id }}</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <span class="text-xs rounded-full px-2 py-1" :class="item.mood === '积极' ? 'bg-success/15 text-success' : item.mood === '低落' ? 'bg-destructive/15 text-destructive' : 'bg-primary/15 text-primary'">{{ item.mood }}</span>
            </td>
            <td class="py-3 px-4">
              <span class="text-xs rounded-full px-2 py-1" :class="item.risk === '高风险' ? 'bg-destructive/15 text-destructive' : item.risk === '中风险' ? 'bg-warning/15 text-warning-foreground' : 'bg-success/15 text-success'">{{ item.risk }}</span>
            </td>
            <td class="py-3 px-4">{{ item.chats }}</td>
            <td class="py-3 px-4">{{ item.diaries }}</td>
            <td class="py-3 px-4 text-muted-foreground">{{ item.active }}</td>
            <td class="py-3 px-4"><button class="h-8 w-8 rounded-md border border-border inline-flex items-center justify-center"><MoreHorizontal class="h-4 w-4 text-muted-foreground" /></button></td>
          </tr>
        </tbody>
      </table>

      <div class="h-14 px-4 border-t border-border flex items-center justify-between">
        <p class="text-sm text-muted-foreground">显示 1-6 共 2,847 条</p>
        <div class="flex items-center gap-2 text-sm">
          <button class="h-8 w-8 rounded-md border border-border">‹</button>
          <button class="h-8 w-8 rounded-md bg-primary text-primary-foreground">1</button>
          <button class="h-8 w-8 rounded-md border border-border">2</button>
          <button class="h-8 w-8 rounded-md border border-border">3</button>
          <span class="text-muted-foreground">...</span>
          <button class="h-8 w-10 rounded-md border border-border">475</button>
          <button class="h-8 w-8 rounded-md border border-border">›</button>
        </div>
      </div>
    </div>
  </section>
</template>
