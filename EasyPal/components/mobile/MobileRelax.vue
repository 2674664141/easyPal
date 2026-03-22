<template>
  <view class="relax">
    <header class="relax__header">
      <ui-button variant="ghost" size="icon" @click="onBack">
        <ui-icon name="arrow-left" size="md" />
      </ui-button>
      <text class="relax__title">放松音频</text>
    </header>

    <scroll-view scroll-y class="relax__main">
      <ui-card custom-class="relax__intro">
        <ui-card-content>
          <view class="relax__intro-row">
            <view class="relax__intro-icon"><ui-icon name="headphones" size="md" /></view>
            <view>
              <text class="relax__intro-title">每日放松推荐</text>
              <text class="relax__intro-desc">适合当前时段的放松内容</text>
            </view>
          </view>
        </ui-card-content>
      </ui-card>

      <scroll-view scroll-x class="relax__tabs" :show-scrollbar="false">
        <view
          v-for="c in categories"
          :key="c.id"
          class="relax__tab"
          :class="{ 'relax__tab--active': activeCategory === c.id }"
          @click="activeCategory = c.id"
        >
          {{ c.label }}
        </view>
      </scroll-view>

      <ui-card v-for="item in filteredTracks" :key="item.id" custom-class="relax__item">
        <ui-card-content>
          <view class="relax__item-row">
            <view class="relax__item-icon" :style="{ background: item.color }">
              <ui-icon :name="item.icon" size="sm" custom-class="relax__item-icon-svg" />
            </view>
            <view class="relax__item-text">
              <text class="relax__item-title">{{ item.title }}</text>
              <text class="relax__item-desc">{{ item.desc }}</text>
              <view class="relax__item-meta">
                <text>{{ item.duration }}</text>
                <text>{{ item.plays }}</text>
              </view>
            </view>
            <view class="relax__item-actions">
              <ui-icon name="heart" size="sm" />
              <ui-icon name="play" size="sm" custom-class="relax__play" />
            </view>
          </view>
        </ui-card-content>
      </ui-card>
      <view class="relax__bottom" />
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
  { id: 'meditation', label: '冥想' },
  { id: 'breathing', label: '呼吸训练' },
  { id: 'nature', label: '自然之声' },
  { id: 'sleep', label: '助眠' }
]

const tracks = [
  { id: 1, title: '3分钟呼吸空间', desc: '快速放松呼吸练习', duration: '3:00', plays: '2.3k', category: 'breathing', icon: 'wind', color: '#0ea5e9' },
  { id: 2, title: '身体扫描冥想', desc: '渐进式肌肉放松引导', duration: '15:00', plays: '5.1k', category: 'meditation', icon: 'moon', color: '#8b5cf6' },
  { id: 3, title: '森林雨声', desc: '沉浸式自然白噪音', duration: '30:00', plays: '8.7k', category: 'nature', icon: 'tree-pine', color: '#22c55e' },
  { id: 4, title: '4-7-8呼吸法', desc: '缓解焦虑的经典呼吸技巧', duration: '5:00', plays: '3.9k', category: 'breathing', icon: 'wind', color: '#3b82f6' }
]

const filteredTracks = computed(() => (
  activeCategory.value === 'all' ? tracks : tracks.filter((i) => i.category === activeCategory.value)
))

function onBack() {
  emit('back')
}
</script>

<style lang="scss" scoped>
.relax { min-height: 100vh; background: #f5f9fa; }
.relax__header { display: flex; align-items: center; gap: 12rpx; padding: 24rpx 28rpx; background: #fff; border-bottom: 1rpx solid #edf2f4; }
.relax__title { font-size: 34rpx; font-weight: 700; color: #0f172a; }
.relax__main { height: calc(100vh - 96rpx); padding: 24rpx 28rpx; }
.relax__intro { border: none; background: linear-gradient(135deg, #ede9fe 0%, #fce7f3 100%); margin-bottom: 20rpx; }
.relax__intro-row { display: flex; align-items: center; gap: 18rpx; }
.relax__intro-icon { width: 72rpx; height: 72rpx; border-radius: 18rpx; background: rgba(99, 102, 241, 0.16); display: flex; align-items: center; justify-content: center; color: #6366f1; }
.relax__intro-title { display: block; font-size: 30rpx; font-weight: 700; color: #0f172a; }
.relax__intro-desc { display: block; margin-top: 8rpx; font-size: 24rpx; color: #64748b; }
.relax__tabs { white-space: nowrap; margin-bottom: 16rpx; }
.relax__tab { display: inline-block; margin-right: 12rpx; padding: 12rpx 24rpx; border-radius: 999rpx; background: #eaf1f3; color: #475569; font-size: 26rpx; }
.relax__tab--active { background: #00ab93; color: #fff; }
.relax__item { margin-bottom: 14rpx; }
.relax__item-row { display: flex; align-items: center; gap: 16rpx; }
.relax__item-icon { width: 72rpx; height: 72rpx; border-radius: 18rpx; color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.relax__item-icon-svg { color: #fff !important; }
.relax__item-text { flex: 1; min-width: 0; }
.relax__item-title { display: block; font-size: 32rpx; color: #0f172a; font-weight: 700; }
.relax__item-desc { display: block; margin-top: 4rpx; font-size: 24rpx; color: #64748b; }
.relax__item-meta { margin-top: 6rpx; display: flex; gap: 18rpx; color: #64748b; font-size: 22rpx; }
.relax__item-actions { display: flex; gap: 14rpx; color: #64748b; }
.relax__play { color: #00ab93 !important; }
.relax__bottom { height: 40rpx; }
</style>
