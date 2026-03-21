<template>
  <view class="profile">
    <header class="profile__header">
      <view class="profile__header-bar">
        <ui-button variant="ghost" size="icon" custom-class="profile__header-btn" @click="onBack">
          <ui-icon name="arrow-left" size="md" class="profile__header-icon" />
        </ui-button>
        <text class="profile__header-title">个人中心</text>
        <ui-button variant="ghost" size="icon" custom-class="profile__header-btn">
          <ui-icon name="settings" size="md" class="profile__header-icon" />
        </ui-button>
      </view>
      <view class="profile__info">
        <view class="profile__avatar-wrap">
          <ui-avatar size="lg" fallback-text="" custom-class="profile__avatar-main">
            <template #fallback>
              <ui-icon name="user" size="lg" class="profile__avatar-user-icon" />
            </template>
          </ui-avatar>
          <view class="profile__avatar-edit">
            <ui-icon name="camera" size="xs" class="profile__camera-icon" />
          </view>
        </view>
        <view class="profile__user-detail">
          <view class="profile__name-row">
            <text class="profile__user-name">李同学</text>
            <ui-badge variant="secondary" custom-class="profile__level-badge">Lv.5</ui-badge>
          </view>
          <text class="profile__user-sign">保持好心情，每天都是新的开始</text>
          <view class="profile__tags">
            <ui-badge variant="secondary" custom-class="profile__tag">
              <ui-icon name="award" size="xs" class="profile__tag-icon" />
              <text>暖心达人</text>
            </ui-badge>
            <ui-badge variant="secondary" custom-class="profile__tag">计算机学院</ui-badge>
          </view>
        </view>
      </view>
    </header>

    <view class="profile__stats-card">
      <view class="profile__stat-item">
        <view class="profile__stat-icon-wrap">
          <ui-icon name="flame" size="sm" class="profile__stat-icon profile__stat-icon--orange" />
        </view>
        <text class="profile__stat-value">15天</text>
        <text class="profile__stat-label">连续签到</text>
      </view>
      <view class="profile__stat-item">
        <view class="profile__stat-icon-wrap">
          <ui-icon name="book-heart" size="sm" class="profile__stat-icon profile__stat-icon--primary" />
        </view>
        <text class="profile__stat-value">32篇</text>
        <text class="profile__stat-label">心情日记</text>
      </view>
      <view class="profile__stat-item">
        <view class="profile__stat-icon-wrap">
          <ui-icon name="heart" size="sm" class="profile__stat-icon profile__stat-icon--red" />
        </view>
        <text class="profile__stat-value">128</text>
        <text class="profile__stat-label">获得温暖</text>
      </view>
      <view class="profile__stat-item">
        <view class="profile__stat-icon-wrap">
          <ui-icon name="award" size="sm" class="profile__stat-icon profile__stat-icon--amber" />
        </view>
        <text class="profile__stat-value">8个</text>
        <text class="profile__stat-label">成就徽章</text>
      </view>
    </view>

    <scroll-view scroll-y class="profile__main">
      <ui-card custom-class="profile__growth-card">
        <ui-card-content>
          <view class="profile__card-head">
            <view class="profile__card-title-wrap">
              <ui-icon name="target" size="sm" class="profile__card-emoji" />
              <text class="profile__card-title">成长进度</text>
            </view>
            <text class="profile__card-extra">距离下一等级还需350经验</text>
          </view>
          <ui-progress :value="65" custom-class="profile__progress" />
          <view class="profile__progress-labels">
            <text>Lv.5 暖心达人</text>
            <text class="profile__exp">650/1000 EXP</text>
            <text>Lv.6 治愈大师</text>
          </view>
        </ui-card-content>
      </ui-card>

      <ui-card custom-class="profile__achievement-card">
        <ui-card-content>
          <view class="profile__card-head">
            <view class="profile__card-title-wrap">
              <ui-icon name="award" size="sm" class="profile__card-emoji profile__card-emoji--amber" />
              <text class="profile__card-title">成就展示</text>
            </view>
            <text class="profile__card-link">查看全部 ›</text>
          </view>
          <view class="profile__achievement-grid">
            <view
              v-for="a in achievements"
              :key="a.id"
              class="profile__achievement-item"
              :class="{ 'profile__achievement-item--locked': !a.unlocked }"
            >
              <text class="profile__achievement-emoji">{{ a.icon }}</text>
            </view>
          </view>
        </ui-card-content>
      </ui-card>

      <view class="profile__menu-card">
        <view class="profile__menu-group">
          <text class="profile__group-title">数据与记录</text>
          <view class="profile__menu-item">
            <view class="profile__menu-left">
              <view class="profile__menu-icon-wrap">
                <ui-icon name="book-heart" size="sm" />
              </view>
              <text>我的日记</text>
            </view>
            <text class="profile__menu-badge">32篇</text>
            <ui-icon name="chevron-right" size="sm" class="profile__menu-arrow" />
          </view>
          <view class="profile__menu-item">
            <view class="profile__menu-left">
              <view class="profile__menu-icon-wrap">
                <ui-icon name="message-circle" size="sm" />
              </view>
              <text>对话记录</text>
            </view>
            <text class="profile__menu-badge">156次</text>
            <ui-icon name="chevron-right" size="sm" class="profile__menu-arrow" />
          </view>
          <view class="profile__menu-item">
            <view class="profile__menu-left">
              <view class="profile__menu-icon-wrap">
                <ui-icon name="heart" size="sm" />
              </view>
              <text>我的收藏</text>
            </view>
            <ui-icon name="chevron-right" size="sm" class="profile__menu-arrow" />
          </view>
          <view class="profile__menu-item">
            <view class="profile__menu-left">
              <view class="profile__menu-icon-wrap">
                <ui-icon name="award" size="sm" />
              </view>
              <text>成就中心</text>
            </view>
            <ui-badge variant="destructive" custom-class="profile__menu-badge--new">新</ui-badge>
            <ui-icon name="chevron-right" size="sm" class="profile__menu-arrow" />
          </view>
        </view>
        <view class="profile__menu-group">
          <text class="profile__group-title">设置</text>
          <view class="profile__menu-item">
            <view class="profile__menu-left">
              <view class="profile__menu-icon-wrap">
                <ui-icon name="bell" size="sm" />
              </view>
              <text>消息通知</text>
            </view>
            <ui-switch :checked="notifications" @change="(v) => (notifications = v)" />
          </view>
          <view class="profile__menu-item">
            <view class="profile__menu-left">
              <view class="profile__menu-icon-wrap">
                <ui-icon name="settings" size="sm" />
              </view>
              <text>深色模式</text>
            </view>
            <ui-switch :checked="darkMode" @change="(v) => (darkMode = v)" />
          </view>
          <view class="profile__menu-item">
            <view class="profile__menu-left">
              <view class="profile__menu-icon-wrap">
                <ui-icon name="lock" size="sm" />
              </view>
              <text>隐私设置</text>
            </view>
            <ui-icon name="chevron-right" size="sm" class="profile__menu-arrow" />
          </view>
          <view class="profile__menu-item">
            <view class="profile__menu-left">
              <view class="profile__menu-icon-wrap">
                <ui-icon name="message-circle" size="sm" />
              </view>
              <text>帮助与反馈</text>
            </view>
            <ui-icon name="chevron-right" size="sm" class="profile__menu-arrow" />
          </view>
        </view>
      </view>

      <view class="profile__logout-btn" @click="onLogout">
        <ui-icon name="log-out" size="sm" class="profile__logout-icon" />
        <text>退出登录</text>
      </view>
      <text class="profile__version">心灵伴侣 v1.0.0</text>
      <view class="profile__bottom-placeholder" />
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import UiCardContent from '@/components/ui/CardContent.vue'
import UiButton from '@/components/ui/Button.vue'
import UiAvatar from '@/components/ui/Avatar.vue'
import UiBadge from '@/components/ui/Badge.vue'
import UiProgress from '@/components/ui/Progress.vue'
import UiSwitch from '@/components/ui/Switch.vue'
import UiIcon from '@/components/ui/Icon.vue'

const emit = defineEmits(['back'])

const notifications = ref(true)
const darkMode = ref(false)

const achievements = [
  { id: 1, icon: '🌟', unlocked: true },
  { id: 2, icon: '🔥', unlocked: true },
  { id: 3, icon: '💬', unlocked: true },
  { id: 4, icon: '💖', unlocked: true },
  { id: 5, icon: '📝', unlocked: true },
  { id: 6, icon: '🧘', unlocked: false }
]

function onBack() { emit('back') }
function onLogout() {}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.profile {
  min-height: 100vh;
  background: #f5f9fa;
  padding-bottom: 120rpx;

  &__header {
    background: #1EB49F;
    padding: 24rpx 32rpx 88rpx;
    padding-top: calc(24rpx + env(safe-area-inset-top));
  }

  &__header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32rpx;
  }

  &__header-btn :deep(.ep-button) { background: transparent !important; }
  &__header-icon { color: #0f172a !important; }
  &__header-title { font-size: 40rpx; font-weight: 700; color: #0f172a; }

  &__info { display: flex; align-items: center; gap: 32rpx; }

  &__avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }

  &__avatar-edit {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 48rpx;
    height: 48rpx;
    border-radius: 50%;
    background: #f4fffd;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: $ep-shadow-sm;
  }

  &__camera-icon { color: $ep-primary !important; }
  &__avatar-user-icon { color: rgba(15, 23, 42, 0.55); }
  &__avatar-main :deep(.ep-avatar-fallback) {
    background: #ffffff;
  }

  &__user-detail { flex: 1; display: flex; flex-direction: column; gap: 12rpx; }
  &__name-row { display: flex; align-items: center; gap: 16rpx; }
  &__user-name { font-size: 50rpx; font-weight: 800; color: #0f172a; }
  &__level-badge { background: rgba(255, 255, 255, 0.35) !important; border: none; color: rgba(15, 23, 42, 0.75); }
  &__user-sign { font-size: 26rpx; color: rgba(255, 255, 255, 0.95); font-weight: 500; }
  &__tags { display: flex; gap: 16rpx; flex-wrap: wrap; }
  &__tag { background: rgba(255, 255, 255, 0.26) !important; border: none; color: rgba(15, 23, 42, 0.95); }
  &__tag-icon { color: #fbbf24 !important; margin-right: 4rpx; }

  &__stats-card {
    margin: -54rpx 32rpx 0;
    padding: 32rpx;
    background: #fff;
    border-radius: 28rpx;
    border: 1rpx solid rgba(15, 23, 42, 0.05);
    box-shadow: 0 12rpx 30rpx rgba(15, 23, 42, 0.08);
    display: flex;
    justify-content: space-around;
    position: relative;
    z-index: 10;
  }

  &__stat-item { display: flex; flex-direction: column; align-items: center; gap: 12rpx; }
  &__stat-icon-wrap {
    width: 72rpx;
    height: 72rpx;
    border-radius: 20rpx;
    background: #eaf1f3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__stat-icon { color: $ep-primary; }
  &__stat-icon--orange { color: #f97316; }
  &__stat-icon--red { color: var(--ep-destructive); }
  &__stat-icon--amber { color: #f59e0b; }
  &__stat-value { font-size: 32rpx; font-weight: 700; color: var(--ep-foreground); }
  &__stat-label { font-size: 22rpx; color: var(--ep-muted-foreground); }

  &__main { padding: 28rpx; padding-top: 36rpx; min-height: 50vh; }

  &__growth-card, &__achievement-card { margin-bottom: 24rpx; }
  &__growth-card, &__achievement-card, &__menu-card {
    border-radius: 24rpx;
    border: 1rpx solid rgba(15, 23, 42, 0.06);
    background: #fff;
    box-shadow: 0 8rpx 20rpx rgba(15, 23, 42, 0.06);
  }
  &__card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20rpx; }
  &__card-title-wrap { display: flex; align-items: center; gap: 12rpx; }
  &__card-emoji { color: #00AB93; }
  &__card-emoji--amber { color: #f59e0b !important; }
  &__card-title { font-size: 28rpx; font-weight: 600; color: var(--ep-foreground); }
  &__card-extra { font-size: 22rpx; color: var(--ep-muted-foreground); }
  &__card-link { font-size: 24rpx; color: $ep-primary; }
  &__progress { margin-bottom: 16rpx; }
  &__progress :deep(.ep-progress__track) {
    background: #cde9e5;
  }
  &__progress :deep(.ep-progress__fill) {
    background: #00AB93;
  }
  &__progress-labels { display: flex; justify-content: space-between; font-size: 24rpx; color: var(--ep-muted-foreground); }
  &__exp { color: var(--ep-foreground); font-weight: 500; }

  &__achievement-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16rpx;
  }
  &__achievement-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16rpx;
    border-radius: 16rpx;
    background: linear-gradient(180deg, #fef3c7 0%, #fed7aa 100%);
    &--locked { background: var(--ep-muted); opacity: 0.6; }
  }
  &__achievement-emoji { font-size: 48rpx; }
  &__achievement-item--locked &__achievement-emoji { filter: grayscale(1); }

  &__menu-card {
    background: #fff;
    border: 1rpx solid rgba(15, 23, 42, 0.06);
    border-radius: 24rpx;
    overflow: hidden;
    margin-bottom: 24rpx;
    box-shadow: 0 8rpx 20rpx rgba(15, 23, 42, 0.06);
  }
  &__menu-group { padding: 20rpx 32rpx 8rpx; }
  &__group-title { font-size: 24rpx; color: var(--ep-muted-foreground); font-weight: 500; display: block; margin-bottom: 16rpx; }
  &__menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28rpx 0;
    border-top: 1rpx solid rgba(15, 23, 42, 0.08);
    border-bottom: 1rpx solid rgba(15, 23, 42, 0.08);
    &:last-child { border-bottom: none; }
  }
  &__menu-left { display: flex; align-items: center; gap: 24rpx; font-size: 28rpx; color: var(--ep-foreground); }
  &__menu-icon-wrap {
    width: 64rpx;
    height: 64rpx;
    border-radius: 16rpx;
    background: #E7F1F1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__menu-icon-wrap :deep(.ep-icon) {
    color: #B9AC94;
  }
  &__menu-badge {
    font-size: 22rpx;
    color: rgba(15, 23, 42, 0.85);
    min-width: 86rpx;
    text-align: center;
    margin-right: 30rpx;
    margin-left: auto;
  }
  &__menu-badge--new { margin-right: 8rpx; }
  &__menu-arrow { color: var(--ep-muted-foreground); }

  &__logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    height: 96rpx;
    border: 1rpx solid rgba($ep-destructive, 0.4);
    border-radius: 16rpx;
    font-size: 30rpx;
    color: var(--ep-destructive);
    margin-bottom: 24rpx;
  }
  &__logout-icon { color: var(--ep-destructive) !important; }
  &__version { display: block; text-align: center; font-size: 24rpx; color: var(--ep-muted-foreground); margin-bottom: 24rpx; }
  &__bottom-placeholder { height: 40rpx; }
}
</style>
