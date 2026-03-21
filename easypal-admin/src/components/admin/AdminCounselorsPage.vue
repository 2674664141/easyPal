<script setup lang="ts">
import { CircleAlert, Clock3, Eye, MapPin, ShieldAlert, UserRoundPlus, Users, CheckCircle2, XCircle } from 'lucide-vue-next'
import { ref } from 'vue'

const activeTab = ref<'list' | 'applications' | 'allocation'>('list')

const counselors = [
  { name: '王老师', email: 'wang@university.edu', dept: '心理健康中心', title: '高级心理咨询师', students: '156人', alerts: '45次', articles: '12篇', status: '在职', active: '10分钟前' },
  { name: '李老师', email: 'li@university.edu', dept: '学生工作处', title: '心理咨询师', students: '98人', alerts: '23次', articles: '8篇', status: '在职', active: '1小时前' },
  { name: '张老师', email: 'zhang@university.edu', dept: '心理健康中心', title: '心理咨询师', students: '0人', alerts: '0次', articles: '0篇', status: '停用', active: '3天前' },
]

const applications = [
  {
    name: '赵老师',
    title: '心理学硕士',
    dept: '教育学院',
    cert: '国家二级心理咨询师',
    exp: '3年学校心理咨询经验',
    appliedAt: '2024-03-18',
  },
  {
    name: '钱老师',
    title: '心理学博士',
    dept: '心理学院',
    cert: '国家一级心理咨询师',
    exp: '5年临床心理咨询经验',
    appliedAt: '2024-03-19',
  },
]
</script>

<template>
  <section>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-[34px] leading-none font-bold">咨询师管理</h1>
        <p class="text-sm text-muted-foreground mt-2">管理心理咨询师账号、审核入驻申请、分配权限</p>
      </div>
      <button class="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2">
        <UserRoundPlus class="h-4 w-4" />
        添加咨询师
      </button>
    </div>

    <div class="grid grid-cols-4 gap-4 mt-4">
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><Users class="h-5 w-5" /></div>
          <div><p class="text-3xl font-bold leading-none">2</p><p class="text-sm text-muted-foreground mt-1">在职咨询师</p></div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl bg-warning/15 text-warning-foreground flex items-center justify-center"><Clock3 class="h-5 w-5" /></div>
          <div><p class="text-3xl font-bold leading-none">2</p><p class="text-sm text-muted-foreground mt-1">待审核申请</p></div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl bg-success/15 text-success flex items-center justify-center"><ShieldAlert class="h-5 w-5" /></div>
          <div><p class="text-3xl font-bold leading-none">68</p><p class="text-sm text-muted-foreground mt-1">本月处理预警</p></div>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><CircleAlert class="h-5 w-5" /></div>
          <div><p class="text-3xl font-bold leading-none">20</p><p class="text-sm text-muted-foreground mt-1">发布文章总数</p></div>
        </div>
      </div>
    </div>

    <div class="mt-4 rounded-2xl border border-border bg-card p-4">
      <div class="flex items-center justify-between">
        <div class="h-9 rounded-lg bg-muted p-1 flex gap-1">
          <button class="h-7 px-3 rounded-md text-xs" :class="activeTab==='list' ? 'bg-card shadow' : ''" @click="activeTab='list'">咨询师列表</button>
          <button class="h-7 px-3 rounded-md text-xs flex items-center gap-1" :class="activeTab==='applications' ? 'bg-card shadow' : ''" @click="activeTab='applications'">入驻申请 <span class="h-4 min-w-4 px-1 rounded-full bg-warning text-[10px] text-white">2</span></button>
          <button class="h-7 px-3 rounded-md text-xs" :class="activeTab==='allocation' ? 'bg-card shadow' : ''" @click="activeTab='allocation'">学生分配</button>
        </div>
        <input class="h-10 w-56 rounded-lg border border-input bg-background px-3 text-sm" placeholder="搜索咨询师..." />
      </div>

      <div class="mt-4 rounded-xl border border-border overflow-hidden" v-if="activeTab==='list'">
        <table class="w-full text-sm">
          <thead class="bg-muted/40 text-muted-foreground">
            <tr>
              <th class="py-3 px-4 text-left font-medium">咨询师</th>
              <th class="py-3 px-4 text-left font-medium">部门/职称</th>
              <th class="py-3 px-4 text-left font-medium">负责学生</th>
              <th class="py-3 px-4 text-left font-medium">处理预警</th>
              <th class="py-3 px-4 text-left font-medium">发布文章</th>
              <th class="py-3 px-4 text-left font-medium">状态</th>
              <th class="py-3 px-4 text-left font-medium">最近活跃</th>
              <th class="py-3 px-4 text-left font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in counselors" :key="item.name" class="border-t border-border">
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center">{{ item.name[0] }}</div>
                  <div>
                    <p class="font-medium">{{ item.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ item.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <p>{{ item.dept }}</p>
                <p class="text-xs text-muted-foreground">{{ item.title }}</p>
              </td>
              <td class="py-3 px-4">{{ item.students }}</td>
              <td class="py-3 px-4">{{ item.alerts }}</td>
              <td class="py-3 px-4">{{ item.articles }}</td>
              <td class="py-3 px-4">
                <span class="text-xs rounded-full px-2 py-1" :class="item.status==='在职' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'">{{ item.status }}</span>
              </td>
              <td class="py-3 px-4 text-muted-foreground">{{ item.active }}</td>
              <td class="py-3 px-4 text-muted-foreground">...</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="activeTab==='applications'" class="mt-4 rounded-xl border border-border bg-background p-4">
        <div class="space-y-3">
          <div
            v-for="item in applications"
            :key="item.name"
            class="rounded-xl border border-border bg-card px-4 py-3 flex items-center justify-between"
          >
            <div class="flex items-center gap-4 min-w-0">
              <div class="h-10 w-10 rounded-full bg-warning/20 text-warning-foreground text-sm flex items-center justify-center shrink-0">{{ item.name[0] }}</div>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <p class="text-sm font-semibold">{{ item.name }}</p>
                  <span class="text-xs text-muted-foreground">({{ item.title }})</span>
                </div>
                <p class="text-xs text-muted-foreground mt-0.5">{{ item.dept }} <span class="mx-1">•</span> <MapPin class="h-3 w-3 inline-block" /> {{ item.cert }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">{{ item.exp }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4 shrink-0">
              <div class="text-right">
                <p class="text-xs text-muted-foreground">申请时间</p>
                <p class="text-sm text-foreground">{{ item.appliedAt }}</p>
              </div>
              <button class="h-8 px-3 rounded-md border border-input text-xs inline-flex items-center gap-1">
                <Eye class="h-3.5 w-3.5" />
                查看资料
              </button>
              <button class="h-8 px-3 rounded-md bg-success text-success-foreground text-xs inline-flex items-center gap-1">
                <CheckCircle2 class="h-3.5 w-3.5" />
                通过
              </button>
              <button class="h-8 px-3 rounded-md bg-destructive text-destructive-foreground text-xs inline-flex items-center gap-1">
                <XCircle class="h-3.5 w-3.5" />
                拒绝
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mt-4 rounded-xl border border-border p-6 text-sm text-muted-foreground">学生分配管理界面</div>
    </div>
  </section>
</template>
