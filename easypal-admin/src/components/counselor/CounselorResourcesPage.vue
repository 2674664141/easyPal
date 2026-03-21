<script setup lang="ts">
import { Eye, FileText, Heart, Music2, Plus, Search, Upload, X } from 'lucide-vue-next'
import { ref } from 'vue'

const showPublish = ref(false)
const activeTab = ref<'articles' | 'audios'>('articles')

const articles = [
  { title: '如何有效缓解考试焦虑', desc: '本文介绍了几种科学有效的方法来缓解考试前的焦虑情绪。', category: '焦虑管理', views: 328, likes: 45, status: '已发布' },
  { title: '大学生人际关系指南', desc: '帮助大学生建立健康的社交关系，提升人际交往能力。', category: '人际关系', views: 256, likes: 38, status: '已发布' },
  { title: '睡眠质量改善建议', desc: '针对大学生常见睡眠问题，提供实用改善建议。', category: '睡眠健康', views: 189, likes: 27, status: '草稿' },
]
</script>

<template>
  <section class="relative">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[34px] leading-none font-bold">资源管理</h1>
        <p class="text-sm text-muted-foreground mt-2">管理和发布心理健康资源内容</p>
      </div>
      <button class="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm inline-flex items-center gap-2" @click="showPublish = true">
        <Plus class="h-4 w-4" />
        发布内容
      </button>
    </div>

    <div class="grid grid-cols-4 gap-4 mt-4">
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div><p class="text-xs text-muted-foreground">文章数量</p><p class="text-4xl font-bold mt-2">12</p></div>
          <FileText class="h-5 w-5 text-primary/60 mt-1" />
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div><p class="text-xs text-muted-foreground">音频数量</p><p class="text-4xl font-bold mt-2">8</p></div>
          <Music2 class="h-5 w-5 text-primary/60 mt-1" />
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div><p class="text-xs text-muted-foreground">总浏览量</p><p class="text-4xl font-bold mt-2">2456</p></div>
          <Eye class="h-5 w-5 text-primary/60 mt-1" />
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div><p class="text-xs text-muted-foreground">获得点赞</p><p class="text-4xl font-bold text-destructive mt-2">389</p></div>
          <Heart class="h-5 w-5 text-destructive/60 mt-1" />
        </div>
      </div>
    </div>

    <div class="mt-4 rounded-2xl border border-border bg-card p-4">
      <div class="flex items-center gap-2">
        <div class="relative flex-1">
          <Search class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input class="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm" placeholder="搜索资源..." />
        </div>
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm">全部状态</button>
        <button class="h-10 px-3 rounded-lg border border-input bg-background text-sm">全部分类</button>
      </div>
    </div>

    <div class="mt-4">
      <div class="h-9 rounded-lg bg-muted p-1 inline-flex gap-1 text-xs">
        <button class="h-7 px-3 rounded-md" :class="activeTab==='articles' ? 'bg-card shadow' : ''" @click="activeTab='articles'">心理文章</button>
        <button class="h-7 px-3 rounded-md" :class="activeTab==='audios' ? 'bg-card shadow' : ''" @click="activeTab='audios'">放松音频</button>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-4" v-if="activeTab==='articles'">
      <div v-for="item in articles" :key="item.title" class="rounded-2xl border border-border bg-card p-4">
        <div class="flex items-center justify-between">
          <div class="h-6 rounded-full px-2 text-[10px] inline-flex items-center" :class="item.status==='已发布' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'">{{ item.status }}</div>
          <button class="text-muted-foreground">...</button>
        </div>
        <h3 class="text-lg font-semibold mt-3">{{ item.title }}</h3>
        <p class="text-sm text-muted-foreground mt-1 line-clamp-2">{{ item.desc }}</p>
        <div class="mt-3 flex items-center justify-between">
          <span class="text-[10px] rounded-full px-2 py-1 bg-muted">{{ item.category }}</span>
          <div class="text-xs text-muted-foreground flex items-center gap-3">
            <span class="inline-flex items-center gap-1"><Eye class="h-3.5 w-3.5" />{{ item.views }}</span>
            <span class="inline-flex items-center gap-1"><Heart class="h-3.5 w-3.5" />{{ item.likes }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-4" v-else>
      <div v-for="item in 3" :key="item" class="rounded-2xl border border-border bg-card p-4">
        <div class="h-6 rounded-full px-2 text-[10px] inline-flex items-center bg-success/20 text-success">已发布</div>
        <h3 class="text-lg font-semibold mt-3">腹式呼吸放松训练</h3>
        <p class="text-sm text-muted-foreground mt-1">10分钟呼吸训练音频</p>
        <div class="mt-3 text-xs text-muted-foreground flex items-center gap-3">
          <span class="inline-flex items-center gap-1"><Eye class="h-3.5 w-3.5" />456</span>
          <span class="inline-flex items-center gap-1"><Heart class="h-3.5 w-3.5" />89</span>
        </div>
      </div>
    </div>

    <div v-if="showPublish" class="fixed inset-0 z-50 bg-black/35 flex items-center justify-center">
      <div class="w-[560px] rounded-2xl border border-border bg-card p-5">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-2xl font-semibold">发布新内容</h3>
            <p class="text-sm text-muted-foreground mt-1">发布文章或上传音频资源</p>
          </div>
          <button class="h-8 w-8 rounded-md border border-input flex items-center justify-center" @click="showPublish = false"><X class="h-4 w-4" /></button>
        </div>

        <div class="mt-4 space-y-3">
          <div>
            <p class="text-sm mb-1">内容类型</p>
            <input class="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" placeholder="请选择类型" />
          </div>
          <div>
            <p class="text-sm mb-1">标题</p>
            <input class="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" placeholder="输入标题" />
          </div>
          <div>
            <p class="text-sm mb-1">分类</p>
            <input class="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" placeholder="选择分类" />
          </div>
          <div>
            <p class="text-sm mb-1">内容描述</p>
            <textarea class="w-full h-20 rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none" placeholder="简要描述内容..."></textarea>
          </div>
          <div>
            <p class="text-sm mb-1">上传文件</p>
            <div class="h-28 rounded-lg border border-dashed border-input bg-muted/30 flex flex-col items-center justify-center text-sm text-muted-foreground">
              <Upload class="h-5 w-5 mb-2" />
              点击或拖拽文件到此处上传
            </div>
          </div>
        </div>

        <div class="mt-5 flex justify-end gap-2">
          <button class="h-9 px-4 rounded-lg border border-input bg-background text-sm" @click="showPublish = false">取消</button>
          <button class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm">发布</button>
        </div>
      </div>
    </div>
  </section>
</template>
