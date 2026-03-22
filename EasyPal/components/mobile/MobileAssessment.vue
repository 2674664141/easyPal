<template>
  <view class="assessment">
    <header class="assessment__header">
      <ui-button variant="ghost" size="icon" @click="onBack">
        <ui-icon name="arrow-left" size="md" />
      </ui-button>
      <text class="assessment__title">心理测评</text>
    </header>

    <scroll-view scroll-y class="assessment__main">
      <ui-card custom-class="assessment__intro-card">
        <ui-card-content>
          <view class="assessment__intro">
            <view class="assessment__intro-icon">
              <ui-icon name="clipboard-list" size="md" />
            </view>
            <view>
              <text class="assessment__intro-title">科学评估你的心理状态</text>
              <text class="assessment__intro-desc">以下量表仅供参考，如有需要请寻求专业帮助。</text>
            </view>
          </view>
        </ui-card-content>
      </ui-card>

      <text class="assessment__section-title">选择测评量表</text>
      <ui-card
        v-for="item in tests"
        :key="item.id"
        custom-class="assessment__item"
      >
        <ui-card-content>
          <view class="assessment__item-row">
            <view class="assessment__item-left">
              <view class="assessment__item-icon" :style="{ background: item.color }">
                <ui-icon :name="item.icon" size="sm" custom-class="assessment__item-icon-svg" />
              </view>
              <view class="assessment__item-text">
                <view class="assessment__item-top">
                  <text class="assessment__item-title">{{ item.title }}</text>
                  <ui-badge v-if="item.completed" variant="secondary" custom-class="assessment__done">已完成</ui-badge>
                </view>
                <text class="assessment__item-desc">{{ item.desc }}</text>
                <view class="assessment__item-meta">
                  <text>{{ item.questions }}题</text>
                  <text>{{ item.time }}</text>
                  <text v-if="item.score">上次得分: {{ item.score }}</text>
                </view>
              </view>
            </view>
            <ui-icon name="chevron-right" size="sm" />
          </view>
        </ui-card-content>
      </ui-card>

      <ui-card custom-class="assessment__record-card">
        <ui-card-content>
          <text class="assessment__record-title">我的测评记录</text>
          <view class="assessment__record-item" v-for="r in records" :key="r.name">
            <view>
              <text class="assessment__record-name">{{ r.name }}</text>
              <text class="assessment__record-date">{{ r.date }}</text>
            </view>
            <view class="assessment__record-right">
              <text class="assessment__record-score">{{ r.score }}分</text>
              <text class="assessment__record-level">{{ r.level }}</text>
            </view>
          </view>
        </ui-card-content>
      </ui-card>
      <view class="assessment__bottom" />
    </scroll-view>
  </view>
</template>

<script setup>
import UiButton from '@/components/ui/Button.vue'
import UiIcon from '@/components/ui/Icon.vue'
import UiCard from '@/components/ui/Card.vue'
import UiCardContent from '@/components/ui/CardContent.vue'
import UiBadge from '@/components/ui/Badge.vue'

const emit = defineEmits(['back'])

const tests = [
  { id: 'phq9', title: '抑郁自评量表 (PHQ-9)', desc: '评估近两周内的抑郁症状', questions: 9, time: '3-5分钟', icon: 'frown', color: '#3b82f6', completed: false },
  { id: 'gad7', title: '焦虑自评量表 (GAD-7)', desc: '评估近两周内的焦虑程度', questions: 7, time: '2-4分钟', icon: 'zap', color: '#f59e0b', completed: true, score: 8 },
  { id: 'psqi', title: '睡眠质量评估 (PSQI)', desc: '评估近一个月的睡眠质量', questions: 10, time: '5-8分钟', icon: 'heart', color: '#6366f1', completed: false },
  { id: 'pss10', title: '压力感知量表 (PSS-10)', desc: '评估你感受到的压力程度', questions: 10, time: '4-6分钟', icon: 'alert-triangle', color: '#e11d48', completed: true, score: 15 }
]

const records = [
  { name: 'GAD-7 焦虑量表', date: '2024-03-18', score: 8, level: '轻度' },
  { name: 'PSS-10 压力量表', date: '2024-03-11', score: 15, level: '中度' }
]

function onBack() {
  emit('back')
}
</script>

<style lang="scss" scoped>
.assessment { min-height: 100vh; background: #f5f9fa; }
.assessment__header { display: flex; align-items: center; gap: 12rpx; padding: 24rpx 28rpx; background: #fff; border-bottom: 1rpx solid #edf2f4; }
.assessment__title { font-size: 34rpx; font-weight: 700; color: #0f172a; }
.assessment__main { height: calc(100vh - 96rpx); padding: 24rpx 28rpx; }
.assessment__intro-card { border: none; background: linear-gradient(135deg, #e9f5f4 0%, #f3f4f1 100%); margin-bottom: 24rpx; }
.assessment__intro { display: flex; gap: 20rpx; align-items: flex-start; }
.assessment__intro-icon { width: 72rpx; height: 72rpx; border-radius: 18rpx; background: rgba(0, 171, 147, 0.14); display: flex; align-items: center; justify-content: center; color: #00ab93; }
.assessment__intro-title { display: block; font-size: 30rpx; font-weight: 600; color: #0f172a; }
.assessment__intro-desc { display: block; margin-top: 8rpx; font-size: 24rpx; color: #64748b; }
.assessment__section-title { display: block; margin: 20rpx 0; font-size: 30rpx; font-weight: 700; color: #0f172a; }
.assessment__item { margin-bottom: 18rpx; }
.assessment__item-row { display: flex; align-items: center; justify-content: space-between; gap: 14rpx; }
.assessment__item-left { display: flex; gap: 18rpx; flex: 1; min-width: 0; }
.assessment__item-icon { width: 74rpx; height: 74rpx; border-radius: 18rpx; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
.assessment__item-icon-svg { color: #fff !important; }
.assessment__item-text { flex: 1; min-width: 0; }
.assessment__item-top { display: flex; align-items: center; gap: 10rpx; }
.assessment__item-title { font-size: 29rpx; font-weight: 700; color: #0f172a; }
.assessment__done { background: #e8faf1 !important; color: #16a34a !important; border: 0 !important; }
.assessment__item-desc { display: block; margin-top: 6rpx; font-size: 24rpx; color: #64748b; }
.assessment__item-meta { margin-top: 8rpx; display: flex; gap: 18rpx; font-size: 22rpx; color: #64748b; }
.assessment__record-card { margin-top: 16rpx; }
.assessment__record-title { display: block; font-size: 30rpx; font-weight: 700; color: #0f172a; margin-bottom: 12rpx; }
.assessment__record-item { display: flex; align-items: center; justify-content: space-between; background: #f1f5f9; border-radius: 16rpx; padding: 18rpx; margin-bottom: 12rpx; }
.assessment__record-name { display: block; font-size: 28rpx; color: #0f172a; font-weight: 600; }
.assessment__record-date { display: block; margin-top: 4rpx; font-size: 22rpx; color: #64748b; }
.assessment__record-right { display: flex; align-items: center; gap: 10rpx; }
.assessment__record-score { font-size: 32rpx; font-weight: 700; color: #0f172a; }
.assessment__record-level { font-size: 22rpx; color: #2563eb; }
.assessment__bottom { height: 40rpx; }
</style>
