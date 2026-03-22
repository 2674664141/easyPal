<template>
  <view class="home">
    <view class="home__top">
      <header class="home__header">
        <view class="home__header-left">
          <view class="home__avatar">
            <image class="home__avatar-img" src="/static/home/head.svg" mode="aspectFit" />
          </view>
          <view class="home__user-info">
            <text class="home__greeting">{{ greeting }}</text>
            <text class="home__username">{{ displayName }}</text>
          </view>
        </view>

        <view class="home__bell-wrap" @click="onNotice">
          <view class="home__bell-btn">
            <ui-icon name="bell" size="md" />
            <view v-if="noticeCount > 0" class="home__badge">{{ noticeCount }}</view>
          </view>
        </view>
      </header>
    </view>

    <scroll-view scroll-y class="home__main" :show-scrollbar="false">
      <!-- 情绪选择卡片 -->
      <ui-card custom-class="home__mood-card">
        <ui-card-header>
          <ui-card-title>
            <ui-icon name="heart" size="sm" class="home__card-icon home__card-icon--primary" />
            <text>今天感觉怎么样？</text>
          </ui-card-title>
        </ui-card-header>
        <ui-card-content>
          <view class="home__mood-options">
            <view
              v-for="mood in moodOptions"
              :key="mood.id"
              class="home__mood-item"
              :class="['home__mood-item--' + mood.id, { 'home__mood-item--active': currentMood === mood.id }]"
              @click="onSelectMood(mood)"
            >
              <view
                class="home__mood-icon-wrap"
                :class="{ 'home__mood-icon-wrap--active': currentMood === mood.id }"
              >
                <ui-icon :name="mood.icon" size="md" :class="'home__mood-icon home__mood-icon--' + mood.id" />
              </view>
              <text class="home__mood-label">{{ mood.label }}</text>
            </view>
          </view>
        </ui-card-content>
      </ui-card>

      <!-- 快捷功能 -->
      <view class="home__section">
        <text class="home__section-title">快捷功能</text>
        <view class="home__quick-grid">
          <view
            v-for="action in quickActions"
            :key="action.id"
            class="home__quick-card"
            @click="onNavigate(action.id)"
          >
            <view class="home__quick-icon" :class="'home__quick-icon--' + action.id">
              <ui-icon :name="action.icon" size="lg" class="home__quick-icon-svg" />
            </view>
            <text class="home__quick-label">{{ action.label }}</text>
            <text class="home__quick-desc">{{ action.desc }}</text>
          </view>
        </view>
      </view>

      <view class="home__section">
        <text class="home__section-title">心理资源</text>
        <view class="home__quick-grid">
          <view
            v-for="action in moreActions"
            :key="action.id"
            class="home__quick-card"
            @click="onNavigate(action.id)"
          >
            <view class="home__quick-icon" :class="'home__quick-icon--' + action.id">
              <ui-icon :name="action.icon" size="lg" class="home__quick-icon-svg" />
            </view>
            <text class="home__quick-label">{{ action.label }}</text>
            <text class="home__quick-desc">{{ action.desc }}</text>
          </view>
        </view>
      </view>

      <ui-card custom-class="home__sos-card" @click="onNavigate('sos')">
        <ui-card-content>
          <view class="home__sos-row">
            <view class="home__sos-left">
              <view class="home__sos-icon">
                <ui-icon name="alert-triangle" size="sm" />
              </view>
              <view>
                <text class="home__sos-title">紧急求助</text>
                <text class="home__sos-desc">一键联系心理热线/咨询师</text>
              </view>
            </view>
            <view class="home__sos-btn">
              <ui-icon name="phone" size="xs" />
              <text>求助</text>
            </view>
          </view>
        </ui-card-content>
      </ui-card>

      <!-- 本周情绪趋势 -->
      <ui-card custom-class="home__chart-card">
        <ui-card-header>
          <ui-card-title class="home__chart-title">
            <ui-icon name="trending-up" size="sm" class="home__card-icon home__card-icon--primary" />
            <text>本周情绪趋势</text>
            <ui-badge variant="outline" custom-class="home__chart-badge">整体积极</ui-badge>
          </ui-card-title>
        </ui-card-header>
        <ui-card-content>
          <view class="home__chart-bars">
            <view v-for="(day, i) in weekDays" :key="day" class="home__chart-item">
              <view
                class="home__chart-bar"
                :style="{ height: trendHeights[i] + '%' }"
              />
              <text class="home__chart-label">{{ day.slice(1) }}</text>
            </view>
          </view>
        </ui-card-content>
      </ui-card>

      <!-- 今日小贴士 -->
      <ui-card custom-class="home__tip-card">
        <ui-card-content>
          <view class="home__tip-inner">
            <view class="home__tip-icon-wrap">
              <ui-icon name="sparkles" size="md" class="home__tip-icon" />
            </view>
            <view class="home__tip-content">
              <text class="home__tip-title">今日小贴士</text>
              <text class="home__tip-text">{{ dailyTip }}</text>
            </view>
          </view>
        </ui-card-content>
      </ui-card>

      <!-- 最近动态 -->
      <view class="home__section">
        <text class="home__section-title">最近动态</text>
        <view class="home__activity-list">
          <ui-card v-for="(item, i) in recentActivities" :key="i" custom-class="home__activity-card">
            <ui-card-content>
              <view class="home__activity-item">
                <view class="home__activity-icon-wrap">
                  <ui-icon :name="item.icon" size="sm" class="home__activity-icon" />
                </view>
                <view class="home__activity-text">
                  <text class="home__activity-title">{{ item.title }}</text>
                  <text class="home__activity-time">{{ item.time }}</text>
                </view>
              </view>
            </ui-card-content>
          </ui-card>
        </view>
      </view>
      <view class="home__bottom-placeholder" />
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue'
import { getWithAuth, postWithAuth } from '@/utils/api.js'
import UiCard from '@/components/ui/Card.vue'
import UiCardHeader from '@/components/ui/CardHeader.vue'
import UiCardTitle from '@/components/ui/CardTitle.vue'
import UiCardContent from '@/components/ui/CardContent.vue'
import UiBadge from '@/components/ui/Badge.vue'
import UiIcon from '@/components/ui/Icon.vue'

const emit = defineEmits(['navigate'])

const noticeCount = ref(2)
const currentMood = ref(null)
const displayName = ref('同学')

function syncUserDisplay() {
  const u = uni.getStorageSync('ep_user')
  if (u && u.nickname) {
    displayName.value = u.nickname
  } else {
    displayName.value = '同学'
  }
}

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return '早上好'
  if (h < 18) return '下午好'
  return '晚上好'
})

const moodOptions = [
  { id: 'happy', icon: 'smile', label: '开心' },
  { id: 'calm', icon: 'cloud-sun', label: '平静' },
  { id: 'neutral', icon: 'meh', label: '一般' },
  { id: 'sad', icon: 'frown', label: '低落' },
  { id: 'anxious', icon: 'angry', label: '焦虑' }
]

// 与后端 mood 1~5 一致：1开心 2平静 3一般 4低落 5焦虑
const MOOD_CODE_BY_ID = {
  happy: 1,
  calm: 2,
  neutral: 3,
  sad: 4,
  anxious: 5
}
const MOOD_ID_BY_CODE = {
  1: 'happy',
  2: 'calm',
  3: 'neutral',
  4: 'sad',
  5: 'anxious'
}

async function loadTodayMood() {
  if (!uni.getStorageSync('ep_token')) {
    currentMood.value = null
    return
  }
  try {
    const data = await getWithAuth('/api/mood/today')
    if (data && data.mood != null) {
      currentMood.value = MOOD_ID_BY_CODE[data.mood] || null
    } else {
      currentMood.value = null
    }
  } catch {
    // 未登录或网络错误时不打断首页
  }
}

async function onSelectMood(mood) {
  const prev = currentMood.value
  currentMood.value = mood.id
  if (!uni.getStorageSync('ep_token')) {
    currentMood.value = prev
    uni.showToast({ title: '请先登录', icon: 'none' })
    return
  }
  const code = MOOD_CODE_BY_ID[mood.id]
  try {
    await postWithAuth('/api/mood/check-in', { mood: code })
    uni.showToast({ title: '已记录心情', icon: 'success' })
  } catch (e) {
    currentMood.value = prev
    uni.showToast({ title: e.message || '保存失败', icon: 'none' })
  }
}

onMounted(() => {
  syncUserDisplay()
  loadTodayMood()
})

// H5 + KeepAlive 场景下从其它页返回首页会触发；小程序端若也缓存页面同样有效
onActivated(() => {
  syncUserDisplay()
  loadTodayMood()
})

const quickActions = [
  { id: 'chat', icon: 'message-circle', label: 'AI对话', desc: '与AI助手倾诉' },
  { id: 'diary', icon: 'book-heart', label: '心情日记', desc: '记录今日心情' },
  { id: 'community', icon: 'users', label: '温暖社区', desc: '找到同伴支持' }
]

const moreActions = [
  { id: 'assessment', icon: 'clipboard-list', label: '心理测评', desc: '科学评估状态' },
  { id: 'relax', icon: 'headphones', label: '放松音频', desc: '冥想与呼吸训练' },
  { id: 'articles', icon: 'book-open', label: '心理文章', desc: '阅读专业建议' }
]

const dailyTips = [
  '今天试着对自己说一句鼓励的话',
  '深呼吸三次，感受当下',
  '给身边的人一个微笑'
]
const dailyTip = ref(dailyTips[Math.floor(Math.random() * dailyTips.length)])

const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const trendHeights = [60, 75, 50, 85, 70, 90, 80]

const recentActivities = [
  { title: '完成了今日签到', time: '10分钟前', icon: 'sun' },
  { title: '写了一篇心情日记', time: '2小时前', icon: 'book-heart' },
  { title: '在社区收到了3个温暖', time: '昨天', icon: 'heart' }
]

function onNavigate(page) {
  emit('navigate', page)
}
function onNotice() {}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.home {
  min-height: 100vh;
  background: var(--ep-background, #fff);
  padding-bottom: 120rpx;

  &__top {
    position: sticky;
    top: 0;
    z-index: 10;
    padding: calc(20rpx + env(safe-area-inset-top)) 24rpx 16rpx;
    background: var(--ep-background, #fff);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26rpx 28rpx;
    background: #eef7f5;
    border-radius: 48rpx;
  }

  &__header-left {
    display: flex;
    align-items: center;
    gap: 24rpx;
  }

  &__avatar {
    flex-shrink: 0;
    width: 88rpx;
    height: 88rpx;
    border-radius: 44rpx;
    background: rgba(255, 255, 255, 0.7);
    border: 2rpx solid rgba(7, 193, 96, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__avatar-img {
    width: 64rpx;
    height: 64rpx;
  }

  &__user-info {
    display: flex;
    flex-direction: column;
    gap: 4rpx;
  }

  &__greeting {
    font-size: 24rpx;
    color: var(--ep-muted-foreground);
  }

  &__username {
    font-size: 32rpx;
    font-weight: 600;
    color: var(--ep-foreground);
  }

  &__bell-wrap {
    position: relative;
  }

  &__bell-btn {
    position: relative;
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__badge {
    position: absolute;
    top: -8rpx;
    right: -8rpx;
    min-width: 34rpx;
    height: 34rpx;
    line-height: 34rpx;
    text-align: center;
    font-size: 20rpx;
    color: var(--ep-destructive-foreground);
    background: var(--ep-destructive);
    border-radius: 17rpx;
    padding: 0 8rpx;
    border: 4rpx solid #eef7f5;
  }

  &__main {
    height: calc(100vh - 200rpx);
    padding: 24rpx 32rpx;
  }

  /* 情绪卡片背景：左上 #E9F5F4 到右下 #F3F4F1 */
  &__mood-card {
    border: none;
    background: linear-gradient(135deg, #E9F5F4 0%, #F3F4F1 100%);
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  }

  &__mood-card :deep(.ep-card-header) {
    padding: 0 48rpx 16rpx;
  }

  &__mood-card :deep(.ep-card-content) {
    padding: 16rpx 48rpx 0;
  }

  &__card-icon {
    flex-shrink: 0;
    &--primary { color: $ep-primary; }
  }

  &__mood-options {
    display: flex;
    justify-content: space-between;
    padding: 0 16rpx;
  }

  &__mood-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12rpx;
    padding: 20rpx 8rpx;
    border-radius: 32rpx;
    transition: all 0.2s;

    &--active {
      transform: scale(1.05);
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
    }
  }

  &__mood-icon-wrap {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    background: var(--ep-muted);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 选中态与原项目一致：emerald/sky/amber/blue/red 对应 bg-50 */
  &__mood-item--active &__mood-icon-wrap--happy { background: rgba(16, 185, 129, 0.12); }
  &__mood-item--active &__mood-icon-wrap--calm { background: rgba(14, 165, 233, 0.12); }
  &__mood-item--active &__mood-icon-wrap--neutral { background: rgba(245, 158, 11, 0.12); }
  &__mood-item--active &__mood-icon-wrap--sad { background: rgba(59, 130, 246, 0.12); }
  &__mood-item--active &__mood-icon-wrap--anxious { background: rgba(239, 68, 68, 0.12); }

  /* 选中时整项背景与原项目 mood.bg 一致 */
  &__mood-item--active.home__mood-item--happy { background: rgba(16, 185, 129, 0.08); }
  &__mood-item--active.home__mood-item--calm { background: rgba(14, 165, 233, 0.08); }
  &__mood-item--active.home__mood-item--neutral { background: rgba(245, 158, 11, 0.08); }
  &__mood-item--active.home__mood-item--sad { background: rgba(59, 130, 246, 0.08); }
  &__mood-item--active.home__mood-item--anxious { background: rgba(239, 68, 68, 0.08); }

  &__mood-item--active &__mood-icon--happy { color: #10b981; }
  &__mood-item--active &__mood-icon--calm { color: #0ea5e9; }
  &__mood-item--active &__mood-icon--neutral { color: #f59e0b; }
  &__mood-item--active &__mood-icon--sad { color: #3b82f6; }
  &__mood-item--active &__mood-icon--anxious { color: #ef4444; }

  &__mood-icon {
    color: var(--ep-muted-foreground);
  }

  &__mood-item--active .home__mood-label {
    color: var(--ep-foreground);
  }

  &__mood-label {
    font-size: 22rpx;
    font-weight: 500;
    color: var(--ep-muted-foreground);
  }

  &__section {
    margin-top: 26rpx;
    margin-bottom: 32rpx;
  }

  &__section-title {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--ep-foreground);
    margin-bottom: 20rpx;
    display: block;
    padding-left: 8rpx;
  }

  &__quick-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24rpx;
  }

  /* 与原项目一致：rounded-2xl bg-card shadow-md border border-border/50 */
  &__quick-card {
    background: var(--ep-card);
    border: 1rpx solid rgba(0, 0, 0, 0.06);
    border-radius: 32rpx;
    padding: 32rpx 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  }

  &__quick-icon {
    width: 88rpx;
    height: 88rpx;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16rpx;

    &--chat { background: #00AB93; }
    &--diary { background: #D6A54D; }
    &--community { background: #75B168; }
    &--assessment { background: #3b82f6; }
    &--relax { background: #6366f1; }
    &--articles { background: #10b981; }
  }

  &__quick-icon-svg {
    color: #fff !important;
  }

  &__quick-label {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--ep-foreground);
  }

  &__quick-desc {
    font-size: 20rpx;
    color: var(--ep-muted-foreground);
    margin-top: 8rpx;
  }

  &__sos-card {
    border: 1rpx solid #fecaca;
    background: #fff7ed;
    margin-bottom: 24rpx;
  }

  &__sos-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16rpx;
  }

  &__sos-left {
    display: flex;
    align-items: center;
    gap: 14rpx;
  }

  &__sos-icon {
    width: 64rpx;
    height: 64rpx;
    border-radius: 16rpx;
    background: #fee2e2;
    color: #ef4444;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__sos-title {
    display: block;
    font-size: 30rpx;
    font-weight: 700;
    color: #0f172a;
  }

  &__sos-desc {
    display: block;
    margin-top: 4rpx;
    font-size: 22rpx;
    color: #64748b;
  }

  &__sos-btn {
    flex-shrink: 0;
    border-radius: 999rpx;
    background: #e11d48;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6rpx;
    padding: 12rpx 18rpx;
    font-size: 24rpx;
  }

  /* 与原项目一致：border border-border/50 shadow-md */
  &__chart-card {
    border: 1rpx solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  }

  &__chart-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12rpx;
  }

  /* UiBadge 是 scoped 样式，这里用 deep 强制覆盖 outline 的绿色 */
  :deep(.home__chart-badge) {
    border: 1rpx solid rgba(74, 144, 226, 0.35) !important;
    color: #2F6FB8 !important;
    background: linear-gradient(90deg, #EAF4FF 0%, #EAF4FF 100%) !important;
    padding: 10rpx 18rpx !important;
    border-radius: 999rpx !important;
  }

  &__chart-bars {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 160rpx;
    padding: 0 16rpx;
  }

  &__chart-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;
    flex: 1;
  }

  &__chart-bar {
    width: 32rpx;
    min-height: 20rpx;
    border-radius: 8rpx 8rpx 0 0;
    background: rgba(74, 144, 226, 0.35);
  }

  /* 趋势图标/标题图标统一浅蓝 */
  &__card-icon--primary {
    color: #4A90E2;
  }

  &__chart-label {
    font-size: 20rpx;
    color: var(--ep-muted-foreground);
  }

  /* 与原项目一致：border-0 bg-gradient-to-r from-accent/20 to-primary/10，icon wrap bg-accent/30 */
  &__tip-card {
    margin-top: 24rpx;
    border: none;
    background: linear-gradient(90deg, rgba($ep-accent, 0.2) 0%, rgba($ep-primary, 0.1) 100%);
  }

  &__tip-card :deep(.ep-card-content) {
    padding: 32rpx 48rpx;
  }

  &__tip-inner {
    display: flex;
    align-items: flex-start;
    gap: 24rpx;
  }

  &__tip-icon-wrap {
    width: 72rpx;
    height: 72rpx;
    border-radius: 16rpx;
    background: rgba($ep-accent, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__tip-icon {
    color: var(--ep-accent-foreground);
  }

  &__tip-content {
    flex: 1;
  }

  &__tip-title {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--ep-foreground);
    display: block;
    margin-bottom: 8rpx;
  }

  &__tip-text {
    font-size: 26rpx;
    color: var(--ep-muted-foreground);
  }

  &__activity-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
  }

  &__activity-card {
    padding: 0;
    border: 1rpx solid rgba(0, 0, 0, 0.05);
    border-radius: 28rpx;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.06);
    background: #fff;
  }

  &__activity-card :deep(.ep-card-content) {
    padding: 34rpx 32rpx;
  }

  &__activity-item {
    display: flex;
    align-items: center;
    gap: 20rpx;
    min-height: 92rpx;
  }

  &__activity-icon-wrap {
    width: 72rpx;
    height: 72rpx;
    border-radius: 20rpx;
    background: rgba(0, 171, 146, 0.10);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__activity-icon {
    color: #00AB92;
  }

  &__activity-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4rpx;
  }

  &__activity-title {
    font-size: 28rpx;
    font-weight: 700;
    color: var(--ep-foreground);
    line-height: 1.25;
  }

  &__activity-time {
    font-size: 24rpx;
    color: var(--ep-muted-foreground);
  }

  &__bottom-placeholder {
    height: 40rpx;
  }
}
</style>
