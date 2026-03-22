<template>
  <view class="sos">
    <header class="sos__header">
      <ui-button variant="ghost" size="icon" custom-class="sos__back" @click="onBack">
        <ui-icon name="arrow-left" size="md" />
      </ui-button>
      <text class="sos__title">紧急求助</text>
    </header>

    <scroll-view scroll-y class="sos__main">
      <ui-card custom-class="sos__tip">
        <ui-card-content>
          <text class="sos__tip-title">你并不孤单，我们一直在这里</text>
          <text class="sos__tip-desc">如果你正在经历困难时刻，请记住寻求帮助是勇敢的表现。</text>
        </ui-card-content>
      </ui-card>

      <text class="sos__section">心理援助热线</text>
      <ui-card v-for="h in hotlines" :key="h.id" custom-class="sos__line-item">
        <ui-card-content>
          <view class="sos__line-row">
            <view>
              <text class="sos__line-name">{{ h.name }}</text>
              <text class="sos__line-number">{{ h.number }}</text>
              <text class="sos__line-time">{{ h.time }} · {{ h.desc }}</text>
            </view>
            <view class="sos__line-btn" @click="onCall(h.number)">
              <ui-icon name="phone" size="xs" />
              <text>拨打</text>
            </view>
          </view>
        </ui-card-content>
      </ui-card>

      <text class="sos__section">学校心理咨询师</text>
      <ui-card v-for="c in counselors" :key="c.name" custom-class="sos__counselor">
        <ui-card-content>
          <view class="sos__line-row">
            <view>
              <text class="sos__line-name">{{ c.name }}</text>
              <text class="sos__line-time">{{ c.title }}</text>
              <text class="sos__line-time">擅长: {{ c.goodAt }}</text>
            </view>
            <view class="sos__consult">{{ c.online ? '咨询' : '离线' }}</view>
          </view>
        </ui-card-content>
      </ui-card>

      <view class="sos__warn">重要提示：如果你或他人处于紧急危险中，请立即拨打 110 或 120。</view>
      <view class="sos__bottom" />
    </scroll-view>
  </view>
</template>

<script setup>
import UiButton from '@/components/ui/Button.vue'
import UiIcon from '@/components/ui/Icon.vue'
import UiCard from '@/components/ui/Card.vue'
import UiCardContent from '@/components/ui/CardContent.vue'

const emit = defineEmits(['back'])

const hotlines = [
  { id: 'a', name: '全国心理援助热线', number: '400-161-9995', time: '24小时', desc: '专业心理咨询师在线守护' },
  { id: 'b', name: '北京心理危机研究与干预中心', number: '010-82951332', time: '24小时', desc: '专业危机干预支持' },
  { id: 'c', name: '青少年心理热线', number: '12355', time: '8:00-22:00', desc: '青年学生专属服务' }
]

const counselors = [
  { name: '张心怡老师', title: '学校心理咨询中心', goodAt: '情绪管理、学业压力', online: true },
  { name: '王芳老师', title: '学校心理咨询中心', goodAt: '自我认知、职业规划', online: false }
]

function onBack() {
  emit('back')
}

function onCall(phone) {
  uni.makePhoneCall({ phoneNumber: String(phone).replace(/-/g, '') })
}
</script>

<style lang="scss" scoped>
.sos { min-height: 100vh; background: #fdf2f2; }
.sos__header { display: flex; align-items: center; gap: 12rpx; padding: 24rpx 28rpx; background: #ff1f34; color: #fff; }
.sos__back :deep(.ep-icon) { color: #fff !important; }
.sos__title { font-size: 34rpx; font-weight: 700; }
.sos__main { height: calc(100vh - 96rpx); padding: 24rpx 28rpx; }
.sos__tip { border: none; margin-bottom: 16rpx; }
.sos__tip-title { display: block; font-size: 31rpx; font-weight: 700; color: #0f172a; }
.sos__tip-desc { display: block; margin-top: 10rpx; font-size: 24rpx; color: #64748b; }
.sos__section { display: block; margin: 20rpx 0 12rpx; font-size: 30rpx; font-weight: 700; color: #991b1b; }
.sos__line-item { margin-bottom: 12rpx; border: 1rpx solid #fee2e2; }
.sos__line-row { display: flex; align-items: center; justify-content: space-between; gap: 12rpx; }
.sos__line-name { display: block; font-size: 28rpx; color: #0f172a; }
.sos__line-number { display: block; margin-top: 6rpx; font-size: 44rpx; font-weight: 800; color: #ef4444; }
.sos__line-time { display: block; margin-top: 4rpx; font-size: 22rpx; color: #64748b; }
.sos__line-btn { flex-shrink: 0; border-radius: 999rpx; background: #ef4444; color: #fff; font-size: 24rpx; padding: 10rpx 18rpx; display: flex; align-items: center; gap: 6rpx; }
.sos__counselor { margin-bottom: 12rpx; }
.sos__consult { font-size: 24rpx; color: #0f766e; border: 1rpx solid #99f6e4; background: #f0fdfa; border-radius: 999rpx; padding: 10rpx 16rpx; }
.sos__warn { margin-top: 12rpx; background: #fffbeb; border: 1rpx solid #fde68a; color: #92400e; border-radius: 18rpx; padding: 18rpx; font-size: 24rpx; line-height: 1.5; }
.sos__bottom { height: 40rpx; }
</style>
