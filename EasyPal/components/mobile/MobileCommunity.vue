<template>
  <view class="community">
    <header class="community__header">
      <view class="community__header-row">
        <ui-button variant="ghost" size="icon" @click="onBack">
          <ui-icon name="arrow-left" size="md" />
        </ui-button>
        <view class="community__search-wrap">
          <ui-icon name="search" size="sm" class="community__search-icon" />
          <ui-input
            v-model="searchKeyword"
            placeholder="搜索话题、内容或用户"
            custom-class="community__search-input"
          />
        </view>
      </view>
      <scroll-view scroll-x class="community__topics" :show-scrollbar="false">
        <view
          v-for="t in topics"
          :key="t.id"
          class="community__topic-tag"
          :class="{ 'community__topic-tag--active': activeTopic === t.id }"
          @click="activeTopic = activeTopic === t.id ? null : t.id"
        >
          <ui-icon :name="t.icon" size="xs" class="community__topic-icon" />
          <text class="community__topic-label">{{ t.label }}</text>
          <view class="community__topic-count">{{ t.count }}</view>
        </view>
      </scroll-view>
      <view class="community__tabs">
        <view
          v-for="tab in tabs"
          :key="tab.id"
          class="community__tab"
          :class="{ 'community__tab--active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <ui-icon :name="tab.icon" size="xs" class="community__tab-icon" />
          <text>{{ tab.label }}</text>
          <view v-if="activeTab === tab.id" class="community__tab-underline" />
        </view>
      </view>
    </header>

    <scroll-view scroll-y class="community__main">
      <view v-if="activeTab === 'hot'" class="community__hot-banner">
        <view class="community__banner-inner">
          <view class="community__banner-icon-wrap">
            <ui-icon name="trending-up" size="md" class="community__banner-icon" />
          </view>
          <view class="community__banner-text">
            <view class="community__banner-title-row">
              <text class="community__banner-title">本周热议话题</text>
              <text class="community__banner-spark">✨</text>
            </view>
            <text class="community__banner-desc">期末季压力管理 · 已有1.2k人参与讨论</text>
          </view>
          <ui-button variant="ghost" size="sm" custom-class="community__banner-btn">参与</ui-button>
        </view>
      </view>

      <view class="community__posts">
        <ui-card v-for="post in posts" :key="post.id" custom-class="community__post-card">
          <ui-card-header>
            <view class="community__post-head">
              <view class="community__post-user">
                <view class="community__post-avatar-wrap">
                  <ui-avatar size="md" :fallback-text="post.author.name.slice(0, 1)" custom-class="community__post-avatar" />
                  <view v-if="post.isHot" class="community__hot-badge">
                    <ui-icon name="flame" size="xs" class="community__hot-badge-icon" />
                  </view>
                </view>
                <view class="community__post-user-info">
                  <view class="community__post-name-row">
                    <text class="community__post-author">{{ post.author.name }}</text>
                    <ui-badge v-if="post.author.badge" variant="secondary" :custom-class="'community__user-badge community__user-badge--' + post.author.badgeClass">
                      {{ post.author.badge }}
                    </ui-badge>
                  </view>
                  <text class="community__post-time">{{ post.time }}</text>
                </view>
              </view>
              <ui-button variant="ghost" size="icon">
                <ui-icon name="more-vertical" size="sm" />
              </ui-button>
            </view>
          </ui-card-header>
          <ui-card-content>
            <view class="community__post-topic">#{{ post.topic }}</view>
            <text class="community__post-content">{{ post.content }}</text>
          </ui-card-content>
          <ui-card-footer>
            <view class="community__footer-left">
              <view
                class="community__action-item"
                :class="{ 'community__action-item--liked': post.isLiked }"
                @click="toggleLike(post)"
              >
                <ui-icon name="heart" size="sm" class="community__action-icon" />
                <text class="community__action-num">{{ post.likes }}</text>
              </view>
              <view class="community__action-item">
                <ui-icon name="message-circle" size="sm" />
                <text class="community__action-num">{{ post.comments }}</text>
              </view>
            </view>
            <view class="community__footer-right">
              <ui-button variant="ghost" size="icon">
                <ui-icon name="bookmark" size="sm" />
              </ui-button>
              <ui-button variant="ghost" size="icon">
                <ui-icon name="share-2" size="sm" />
              </ui-button>
            </view>
          </ui-card-footer>
        </ui-card>
      </view>

      <view v-if="activeTab === 'new'" class="community__empty">
        <ui-icon name="clock" size="lg" class="community__empty-icon" />
        <text class="community__empty-title">暂无最新动态</text>
        <text class="community__empty-desc">刷新查看最新内容</text>
      </view>
      <view v-if="activeTab === 'follow'" class="community__empty">
        <ui-icon name="users" size="lg" class="community__empty-icon" />
        <text class="community__empty-title">还没有关注任何人</text>
        <text class="community__empty-desc">关注感兴趣的用户，获取TA的最新动态</text>
        <ui-button variant="outline" size="sm" custom-class="community__empty-btn">发现更多用户</ui-button>
      </view>
      <view class="community__bottom-placeholder" />
    </scroll-view>

    <view class="community__fab">
      <ui-icon name="send" size="md" class="community__fab-icon" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import UiCardHeader from '@/components/ui/CardHeader.vue'
import UiCardContent from '@/components/ui/CardContent.vue'
import UiCardFooter from '@/components/ui/CardFooter.vue'
import UiButton from '@/components/ui/Button.vue'
import UiAvatar from '@/components/ui/Avatar.vue'
import UiBadge from '@/components/ui/Badge.vue'
import UiInput from '@/components/ui/Input.vue'
import UiIcon from '@/components/ui/Icon.vue'

const emit = defineEmits(['back'])

const searchKeyword = ref('')
const activeTab = ref('hot')
const activeTopic = ref(null)

const topics = [
  { id: 'stress', label: '学业压力', count: 328, icon: 'book-heart' },
  { id: 'emotion', label: '情绪调节', count: 256, icon: 'message-circle' },
  { id: 'social', label: '人际关系', count: 189, icon: 'users' },
  { id: 'mindful', label: '正念练习', count: 145, icon: 'target' },
  { id: 'growth', label: '自我成长', count: 98, icon: 'trending-up' }
]

const tabs = [
  { id: 'hot', label: '热门', icon: 'flame' },
  { id: 'new', label: '最新', icon: 'clock' },
  { id: 'follow', label: '关注', icon: 'users' }
]

const posts = ref([
  { id: 1, author: { name: '温暖小太阳', badge: '治愈系', badgeClass: 'amber' }, content: '今天终于鼓起勇气和导师谈了论文的困惑，没想到导师很耐心地给我解释，感觉压力小了很多！有时候主动沟通真的很重要，大家有什么困扰也可以试着说出来～', topic: '学业压力', likes: 42, comments: 8, time: '30分钟前', isLiked: false, isHot: true },
  { id: 2, author: { name: '星星点灯', badge: '暖心达人', badgeClass: 'pink' }, content: '分享一个帮助我缓解焦虑的方法：每天睡前写三件让自己感恩的小事，坚持一周后感觉心情平静了很多。推荐给需要的朋友们～', topic: '情绪调节', likes: 89, comments: 15, time: '2小时前', isLiked: true, isHot: false },
  { id: 3, author: { name: '云淡风轻', badge: '互助达人', badgeClass: 'purple' }, content: '刚刚完成了一次正念冥想，感觉整个人都放松下来了。如果你也在经历焦虑，可以试试从5分钟的呼吸练习开始。', topic: '正念练习', likes: 156, comments: 23, time: '4小时前', isLiked: false, isHot: true }
])

function onBack() { emit('back') }

function toggleLike(post) {
  const list = posts.value
  const idx = list.findIndex(p => p.id === post.id)
  if (idx === -1) return
  const next = { ...list[idx], isLiked: !list[idx].isLiked, likes: list[idx].likes + (list[idx].isLiked ? -1 : 1) }
  list.splice(idx, 1, next)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.community {
  min-height: 100vh;
  background: #F0F6F7;
  padding-bottom: 140rpx;

  &__header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #F0F6F7;
    box-shadow: none;
    border-bottom: 1rpx solid rgba(15, 23, 42, 0.08);
  }

  &__header-row {
    display: flex;
    align-items: center;
    gap: 16rpx;
    padding: 18rpx 24rpx 14rpx;
  }

  &__search-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12rpx;
    padding: 0 20rpx;
    height: 66rpx;
    background: #EAF1F3;
    border-radius: 34rpx;
    border: 1rpx solid transparent;
  }

  &__search-icon {
    color: rgba(15, 23, 42, 0.58);
  }

  &__search-input {
    flex: 1;
    min-height: auto;
    padding: 0;
    background: transparent !important;
    border: 0 !important;
  }

  &__topics {
    white-space: nowrap;
    padding: 8rpx 26rpx 14rpx;
  }

  &__topics :deep(::-webkit-scrollbar) {
    width: 0;
    height: 0;
    display: none;
  }

  &__topic-tag {
    display: inline-flex;
    align-items: center;
    gap: 12rpx;
    padding: 14rpx 22rpx;
    margin-right: 14rpx;
    border-radius: 999rpx;
    border: 1rpx solid rgba(15, 23, 42, 0.12);
    background: #f8fbfb;
    font-size: 26rpx;
    color: rgba(15, 23, 42, 0.86);
    &--active {
      background: #eaf5f3;
      color: #00ab93;
      border-color: rgba(0, 171, 147, 0.35);
    }
  }

  &__topic-icon { flex-shrink: 0; }
  &__topic-count {
    min-width: 44rpx;
    height: 38rpx;
    padding: 0 10rpx;
    border-radius: 19rpx;
    background: #dde6e8;
    color: rgba(15, 23, 42, 0.65);
    font-size: 22rpx;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  &__tabs {
    display: flex;
    border-top: 1rpx solid rgba(15, 23, 42, 0.14);
    border-bottom: 1rpx solid rgba(15, 23, 42, 0.14);
    background: #fff;
  }

  &__tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16rpx 0 14rpx;
    font-size: 28rpx;
    color: rgba(15, 23, 42, 0.62);
    position: relative;
    &--active {
      color: #00ab93;
      font-weight: 700;
    }
  }

  &__tab-icon { margin-right: 8rpx; }

  &__tab-underline {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 84rpx;
    height: 4rpx;
    background: #00ab93;
    border-radius: 2rpx;
  }

  &__main {
    height: calc(100vh - 320rpx);
    padding: 24rpx 32rpx;
  }

  &__post-avatar :deep(.ep-avatar-fallback) {
    background: linear-gradient(135deg, #DDF3EF 0%, #EEF6E8 100%);
    color: #00AB93;
  }

  &__hot-banner {
    background: linear-gradient(90deg, #d9f0ed 0%, #f0efe4 100%);
    border-radius: 26rpx;
    padding: 24rpx 26rpx;
    margin-bottom: 24rpx;
    border: 1rpx solid rgba(0, 171, 147, 0.08);
  }

  &__banner-inner {
    display: flex;
    align-items: center;
    gap: 24rpx;
  }

  &__banner-icon-wrap {
    width: 76rpx;
    height: 76rpx;
    border-radius: 20rpx;
    background: rgba(0, 171, 147, 0.14);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__banner-icon { color: #00ab93; }
  &__banner-text { flex: 1; display: flex; flex-direction: column; gap: 8rpx; }
  &__banner-title-row { display: flex; align-items: center; gap: 8rpx; }
  &__banner-title { font-size: 32rpx; font-weight: 700; color: #0f172a; }
  &__banner-spark { font-size: 24rpx; }
  &__banner-desc { font-size: 25rpx; color: rgba(15, 23, 42, 0.65); }
  &__banner-btn {
    border-radius: 20rpx;
    color: #0f172a;
    font-weight: 600;
    padding: 0 8rpx;
  }

  &__posts { display: flex; flex-direction: column; gap: 24rpx; }

  &__post-card { padding: 28rpx; }

  &__post-head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16rpx; }

  &__post-user { display: flex; align-items: center; gap: 20rpx; }

  &__post-avatar-wrap { position: relative; flex-shrink: 0; }
  &__post-avatar { flex-shrink: 0; }

  &__hot-badge {
    position: absolute;
    top: -8rpx;
    right: -8rpx;
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
    background: $ep-accent;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__hot-badge-icon { color: #fff !important; }

  &__post-user-info { display: flex; flex-direction: column; gap: 4rpx; }
  &__post-name-row { display: flex; align-items: center; gap: 12rpx; }
  &__post-author { font-size: 28rpx; font-weight: 600; color: var(--ep-foreground); }
  &__user-badge--amber { background: #fef3c7; color: #b45309; }
  &__user-badge--pink { background: #fce7f3; color: #be185d; }
  &__user-badge--purple { background: #f3e8ff; color: #7c3aed; }
  &__post-time { font-size: 24rpx; color: var(--ep-muted-foreground); }

  &__post-topic { font-size: 24rpx; color: $ep-primary; margin-bottom: 12rpx; }
  &__post-content { font-size: 28rpx; color: var(--ep-foreground); line-height: 1.6; }

  &__footer-left { display: flex; align-items: center; gap: 32rpx; }
  &__action-item {
    display: flex;
    align-items: center;
    gap: 8rpx;
    font-size: 24rpx;
    color: var(--ep-muted-foreground);
    &--liked { color: var(--ep-destructive); }
  }
  &__action-icon { color: inherit; }
  &__action-num { font-size: 24rpx; }
  &__footer-right { display: flex; gap: 8rpx; }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120rpx 48rpx;
    text-align: center;
  }
  &__empty-icon { color: var(--ep-muted-foreground); margin-bottom: 24rpx; }
  &__empty-title { font-size: 30rpx; font-weight: 500; color: var(--ep-foreground); margin-bottom: 12rpx; }
  &__empty-desc { font-size: 26rpx; color: var(--ep-muted-foreground); margin-bottom: 32rpx; }
  &__empty-btn { border-radius: 40rpx; }

  &__bottom-placeholder { height: 40rpx; }

  &__fab {
    position: fixed;
    right: 32rpx;
    bottom: 140rpx;
    width: 112rpx;
    height: 112rpx;
    border-radius: 50%;
    background: $ep-primary;
    box-shadow: 0 8rpx 24rpx rgba($ep-primary, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }
  &__fab-icon { color: #fff !important; }
}
</style>
