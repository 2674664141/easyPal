<template>
  <view class="articles">
    <header class="articles__header">
      <ui-button variant="ghost" size="icon" @click="onBack">
        <ui-icon name="arrow-left" size="md" />
      </ui-button>
      <view class="articles__search">
        <ui-icon name="search" size="sm" />
        <text>搜索文章...</text>
      </view>
    </header>

    <scroll-view scroll-y class="articles__main">
      <scroll-view scroll-x class="articles__tabs" :show-scrollbar="false">
        <view
          v-for="c in categories"
          :key="c.id"
          class="articles__tab"
          :class="{ 'articles__tab--active': activeCategory === c.id }"
          @click="activeCategory = c.id"
        >
          {{ c.label }}
        </view>
      </scroll-view>

      <ui-card custom-class="articles__hero">
        <ui-card-content>
          <text class="articles__hero-tag">编辑推荐</text>
          <text class="articles__hero-title">考前焦虑？这5个方法帮你快速放松</text>
          <text class="articles__hero-desc">面对考试的紧张和焦虑，试试这些经过心理学验证的放松技巧...</text>
          <view class="articles__hero-btn">立即阅读</view>
        </ui-card-content>
      </ui-card>

      <ui-card v-for="item in filteredArticles" :key="item.id" custom-class="articles__item">
        <ui-card-content>
          <view class="articles__item-tags">
            <text class="articles__tag">{{ item.tag }}</text>
            <text v-if="item.recommend" class="articles__recommend">推荐</text>
          </view>
          <text class="articles__item-title">{{ item.title }}</text>
          <text class="articles__item-desc">{{ item.desc }}</text>
          <view class="articles__item-meta">
            <text>{{ item.author }}</text>
            <text>{{ item.time }}</text>
            <text>{{ item.views }}</text>
          </view>
        </ui-card-content>
      </ui-card>
      <view class="articles__bottom" />
    </scroll-view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import UiButton from '@/components/ui/Button.vue'
import UiIcon from '@/components/ui/Icon.vue'
import UiCard from '@/components/ui/Card.vue'
import UiCardContent from '@/components/ui/CardContent.vue'

const emit = defineEmits(['back'])
const activeCategory = ref('all')

const categories = [
  { id: 'all', label: '全部' },
  { id: 'anxiety', label: '焦虑管理' },
  { id: 'emotion', label: '情绪调节' },
  { id: 'sleep', label: '睡眠改善' }
]

const articles = [
  { id: 1, tag: '焦虑管理', title: '考前焦虑？这5个方法帮你快速放松', desc: '面对考试的紧张和焦虑，试试这些经过心理学验证的放松技巧...', author: '张老师', time: '5分钟', views: '3.2k', category: 'anxiety', recommend: true },
  { id: 2, tag: '人际交往', title: '如何在大学建立高质量的社交关系', desc: '大学四年，高质量的人际关系对心理健康至关重要...', author: '李老师', time: '8分钟', views: '2.8k', category: 'emotion', recommend: false },
  { id: 3, tag: '睡眠改善', title: '告别失眠：建立健康的睡眠习惯', desc: '良好的睡眠是心理健康的基石，让我们从今天开始改善...', author: '王老师', time: '6分钟', views: '4.5k', category: 'sleep', recommend: true }
]

const filteredArticles = computed(() => (
  activeCategory.value === 'all' ? articles : articles.filter((i) => i.category === activeCategory.value)
))

function onBack() {
  emit('back')
}
</script>

<style lang="scss" scoped>
.articles { min-height: 100vh; background: #f5f9fa; }
.articles__header { display: flex; align-items: center; gap: 12rpx; padding: 24rpx 28rpx; background: #fff; border-bottom: 1rpx solid #edf2f4; }
.articles__search { flex: 1; height: 72rpx; border-radius: 36rpx; background: #ecf2f4; display: flex; align-items: center; gap: 10rpx; padding: 0 24rpx; color: #64748b; font-size: 26rpx; }
.articles__main { height: calc(100vh - 96rpx); padding: 24rpx 28rpx; }
.articles__tabs { white-space: nowrap; margin-bottom: 16rpx; }
.articles__tab { display: inline-block; margin-right: 12rpx; padding: 12rpx 24rpx; border-radius: 999rpx; background: #eaf1f3; color: #475569; font-size: 26rpx; }
.articles__tab--active { background: #00ab93; color: #fff; }
.articles__hero { border: none; background: linear-gradient(135deg, #e9f5f4 0%, #f3f4f1 100%); margin-bottom: 16rpx; }
.articles__hero-tag { display: block; font-size: 24rpx; color: #64748b; }
.articles__hero-title { display: block; margin-top: 8rpx; font-size: 34rpx; font-weight: 700; color: #0f172a; }
.articles__hero-desc { display: block; margin-top: 10rpx; font-size: 24rpx; color: #64748b; line-height: 1.5; }
.articles__hero-btn { margin-top: 14rpx; font-size: 26rpx; color: #0f766e; font-weight: 600; }
.articles__item { margin-bottom: 14rpx; }
.articles__item-tags { display: flex; gap: 10rpx; margin-bottom: 8rpx; }
.articles__tag { font-size: 20rpx; color: #0f766e; background: #e5f7f4; border-radius: 10rpx; padding: 4rpx 10rpx; }
.articles__recommend { font-size: 20rpx; color: #b45309; background: #fef3c7; border-radius: 10rpx; padding: 4rpx 10rpx; }
.articles__item-title { display: block; font-size: 32rpx; font-weight: 700; color: #0f172a; }
.articles__item-desc { display: block; margin-top: 8rpx; font-size: 24rpx; color: #64748b; line-height: 1.5; }
.articles__item-meta { margin-top: 10rpx; display: flex; gap: 20rpx; font-size: 22rpx; color: #64748b; }
.articles__bottom { height: 40rpx; }
</style>
