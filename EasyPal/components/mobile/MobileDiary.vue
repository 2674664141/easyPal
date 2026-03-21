<template>
  <view class="diary">
    <template v-if="isWriting">
      <header class="diary__header">
        <text class="diary__nav-btn" @click="isWriting = false">取消</text>
        <text class="diary__header-title">写日记</text>
        <text class="diary__nav-btn" :class="{ 'diary__nav-btn--disabled': !canPublish }">发布</text>
      </header>
      <scroll-view scroll-y class="diary__write-content">
        <view class="diary__form-section">
          <text class="diary__form-label">今天的心情</text>
          <view class="diary__option-row">
            <view
              v-for="m in moodOptions"
              :key="m.id"
              class="diary__option-chip"
              :class="{ 'diary__option-chip--active': selectedMood === m.id }"
              @click="selectedMood = m.id"
            >
              <ui-icon :name="m.icon" size="sm" class="diary__option-icon" />
              <text>{{ m.label }}</text>
            </view>
          </view>
        </view>
        <view class="diary__form-section">
          <text class="diary__form-label">今天的天气</text>
          <view class="diary__option-row">
            <view
              v-for="w in weatherOptions"
              :key="w.id"
              class="diary__option-chip"
              :class="{ 'diary__option-chip--active': selectedWeather === w.id }"
              @click="selectedWeather = w.id"
            >
              <ui-icon :name="w.icon" size="sm" class="diary__option-icon" />
              <text>{{ w.label }}</text>
            </view>
          </view>
        </view>
        <view class="diary__form-section">
          <text class="diary__form-label">写下今天的心情...</text>
          <ui-textarea
            v-model="diaryContent"
            placeholder="今天发生了什么？你的感受如何？"
            custom-class="diary__textarea"
          />
        </view>
        <view class="diary__form-actions">
          <view class="diary__action-btn">
            <ui-icon name="image" size="sm" />
            <text>添加图片</text>
          </view>
          <view
            class="diary__action-btn"
            :class="{ 'diary__action-btn--active': !isPrivate }"
            @click="isPrivate = !isPrivate"
          >
            <ui-icon :name="isPrivate ? 'lock' : 'unlock'" size="sm" />
            <text>{{ isPrivate ? '仅自己可见' : '分享到社区' }}</text>
          </view>
        </view>
      </scroll-view>
    </template>

    <template v-else>
      <header class="diary__header">
        <view class="diary__header-left">
          <ui-button variant="ghost" size="icon" @click="onBack">
            <ui-icon name="arrow-left" size="md" />
          </ui-button>
          <text class="diary__header-title">心情日记</text>
        </view>
        <ui-button variant="ghost" size="icon">
          <ui-icon name="calendar" size="md" />
        </ui-button>
      </header>

      <view class="diary__stats-card">
        <view class="diary__stat-item">
          <text class="diary__stat-num">28</text>
          <text class="diary__stat-label">累计记录</text>
        </view>
        <view class="diary__stat-divider" />
        <view class="diary__stat-item">
          <text class="diary__stat-num">7</text>
          <text class="diary__stat-label">连续天数</text>
        </view>
        <view class="diary__stat-divider" />
        <view class="diary__stat-item">
          <text class="diary__stat-num diary__stat-num--green">68%</text>
          <text class="diary__stat-label">积极情绪</text>
        </view>
      </view>

      <scroll-view scroll-y class="diary__list">
        <ui-card
          v-for="entry in diaryEntries"
          :key="entry.id"
          custom-class="diary__card"
          @click="openDetail(entry)"
        >
          <ui-card-header>
            <view class="diary__card-head">
              <view class="diary__meta">
                <text class="diary__date">{{ entry.date }}</text>
                <ui-icon :name="getMoodIcon(entry.mood)" size="xs" class="diary__mood-icon" />
                <ui-icon :name="getWeatherIcon(entry.weather)" size="xs" class="diary__weather-icon" />
              </view>
              <view class="diary__card-right">
                <template v-if="entry.isPrivate">
                  <ui-icon name="lock" size="xs" class="diary__lock-icon" />
                </template>
                <template v-else>
                  <ui-icon name="heart" size="xs" class="diary__like-icon" />
                  <text class="diary__like-num">{{ entry.likes }}</text>
                </template>
                <ui-icon name="chevron-right" size="xs" class="diary__arrow" />
              </view>
            </view>
          </ui-card-header>
          <ui-card-content>
            <text class="diary__preview">{{ entry.content }}</text>
          </ui-card-content>
        </ui-card>
      </scroll-view>

      <view class="diary__fab" @click="isWriting = true">
        <text class="diary__fab-icon">+</text>
      </view>
    </template>
    <view class="diary__bottom-placeholder" />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import UiCardHeader from '@/components/ui/CardHeader.vue'
import UiCardContent from '@/components/ui/CardContent.vue'
import UiButton from '@/components/ui/Button.vue'
import UiTextarea from '@/components/ui/Textarea.vue'
import UiIcon from '@/components/ui/Icon.vue'

const emit = defineEmits(['back'])

const isWriting = ref(false)
const selectedMood = ref(null)
const selectedWeather = ref(null)
const diaryContent = ref('')
const isPrivate = ref(true)

const canPublish = computed(() => diaryContent.value.trim() && selectedMood.value)

const moodOptions = [
  { id: 'happy', icon: 'smile', label: '开心' },
  { id: 'neutral', icon: 'meh', label: '平静' },
  { id: 'sad', icon: 'frown', label: '低落' }
]

const weatherOptions = [
  { id: 'sunny', icon: 'sun', label: '晴天' },
  { id: 'cloudy', icon: 'cloud', label: '阴天' },
  { id: 'rainy', icon: 'cloud-rain', label: '雨天' }
]

const diaryEntries = [
  { id: 1, date: '今天', mood: 'happy', weather: 'sunny', content: '今天和室友一起去图书馆学习，效率很高！晚上还一起吃了火锅，感觉生活充满了小确幸。', isPrivate: false, likes: 12 },
  { id: 2, date: '昨天', mood: 'neutral', weather: 'cloudy', content: '普通的一天，上课、作业、自习。虽然有些疲惫，但一切都在正轨上。', isPrivate: true },
  { id: 3, date: '3月12日', mood: 'sad', weather: 'rainy', content: '考试没考好，有点失落。不过想想还有机会补救，给自己打打气吧。', isPrivate: true }
]

function getMoodIcon(mood) {
  const map = { happy: 'smile', neutral: 'meh', sad: 'frown' }
  return map[mood] || 'meh'
}

function getWeatherIcon(weather) {
  const map = { sunny: 'sun', cloudy: 'cloud', rainy: 'cloud-rain' }
  return map[weather] || 'sun'
}

function onBack() { emit('back') }
function openDetail() {}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.diary {
  min-height: 100vh;
  background: #F5F9FA;
  padding-bottom: 120rpx;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx;
    background: var(--ep-card);
    border-bottom: 1rpx solid var(--ep-border);
  }

  &__header-left {
    display: flex;
    align-items: center;
    gap: 24rpx;
  }

  &__header-title {
    font-size: 34rpx;
    font-weight: 600;
    color: var(--ep-foreground);
  }

  &__nav-btn {
    font-size: 28rpx;
    color: $ep-primary;
    &--disabled { color: var(--ep-muted-foreground); }
  }

  &__write-content {
    padding: 32rpx;
    min-height: 60vh;
  }

  &__form-section {
    margin-bottom: 40rpx;
  }

  &__form-label {
    display: block;
    font-size: 28rpx;
    font-weight: 500;
    color: var(--ep-foreground);
    margin-bottom: 20rpx;
  }

  &__option-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
  }

  &__option-chip {
    display: flex;
    align-items: center;
    gap: 12rpx;
    padding: 16rpx 28rpx;
    border: 1rpx solid var(--ep-border);
    border-radius: 40rpx;
    font-size: 26rpx;
    color: var(--ep-muted-foreground);
    &--active {
      background: rgba($ep-primary, 0.1);
      border-color: $ep-primary;
      color: $ep-primary;
    }
  }

  &__option-icon {
    flex-shrink: 0;
  }

  &__textarea {
    min-height: 320rpx;
  }

  &__form-actions {
    display: flex;
    justify-content: space-between;
    padding: 24rpx 0;
  }

  &__action-btn {
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-size: 26rpx;
    color: var(--ep-muted-foreground);
    &--active { color: $ep-primary; }
  }

  &__stats-card {
    margin: 24rpx 32rpx;
    padding: 32rpx;
    background: linear-gradient(135deg, rgba($ep-primary, 0.1) 0%, rgba($ep-accent, 0.1) 100%);
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  &__stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;
  }

  &__stat-num {
    font-size: 48rpx;
    font-weight: 700;
    color: var(--ep-foreground);
    &--green { color: $ep-success; }
  }

  &__stat-label {
    font-size: 24rpx;
    color: var(--ep-muted-foreground);
  }

  &__stat-divider {
    width: 1rpx;
    height: 60rpx;
    background: var(--ep-border);
  }

  &__list {
    padding: 0 32rpx 32rpx;
    min-height: 50vh;
  }

  &__card {
    margin-bottom: 24rpx;
  }

  &__card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 12rpx;
  }

  &__date {
    font-size: 28rpx;
    font-weight: 500;
    color: var(--ep-foreground);
  }

  &__mood-icon, &__weather-icon, &__lock-icon, &__like-icon {
    color: var(--ep-muted-foreground);
  }

  &__like-icon { color: var(--ep-destructive); }

  &__card-right {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }

  &__like-num {
    font-size: 24rpx;
    color: var(--ep-muted-foreground);
  }

  &__arrow {
    color: var(--ep-muted-foreground);
  }

  &__preview {
    font-size: 26rpx;
    color: var(--ep-muted-foreground);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

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

  &__fab-icon {
    font-size: 56rpx;
    color: var(--ep-primary-foreground);
    line-height: 1;
    font-weight: 300;
  }

  &__bottom-placeholder {
    height: 40rpx;
  }
}
</style>
