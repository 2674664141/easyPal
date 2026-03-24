<template>
  <view class="diary">
    <template v-if="isWriting">
      <header class="diary__header">
        <text class="diary__nav-btn" @click="cancelWrite">取消</text>
        <text class="diary__header-title">写日记</text>
        <text
          class="diary__nav-btn"
          :class="{ 'diary__nav-btn--disabled': !canPublish }"
          @click="publishDiary"
        >发布</text>
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

        <!-- 已选择图片预览（图2位置） -->
        <view class="diary__form-section">
          <text class="diary__form-label">添加图片</text>
          <view class="diary__image-grid">
            <view
              v-for="i in 3"
              :key="i"
              class="diary__image-slot"
              @click="chooseAndUploadImages"
            >
              <image
                v-if="diaryImageUrls[i - 1]"
                class="diary__image-preview"
                :src="toImageSrc(diaryImageUrls[i - 1])"
                mode="aspectFill"
              />
            </view>
          </view>
        </view>

        <view class="diary__form-actions">
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
        <ui-button variant="ghost" size="icon" @click="showRangePicker = !showRangePicker">
          <ui-icon name="calendar" size="md" />
        </ui-button>
      </header>

      <view v-if="showRangePicker" class="diary__range-inline">
        <text class="diary__range-title">选择日期区间</text>
        <view class="diary__range-row">
          <text class="diary__range-label">开始日期</text>
          <picker mode="date" :value="rangeStartDate" @change="onStartDateChange">
            <view class="diary__range-picker">{{ rangeStartDate }}</view>
          </picker>
        </view>
        <view class="diary__range-row">
          <text class="diary__range-label">结束日期</text>
          <picker mode="date" :value="rangeEndDate" @change="onEndDateChange">
            <view class="diary__range-picker">{{ rangeEndDate }}</view>
          </picker>
        </view>
        <view class="diary__range-actions">
          <view class="diary__range-btn" @click="resetDateFilter">恢复全部</view>
          <view class="diary__range-btn diary__range-btn--primary" @click="confirmRangeFilter">确定</view>
        </view>
      </view>

      <view class="diary__stats-card">
        <view class="diary__stat-item">
          <text class="diary__stat-num">{{ weekStats.accumulatedRecords }}</text>
          <text class="diary__stat-label">累计记录</text>
        </view>
        <view class="diary__stat-divider" />
        <view class="diary__stat-item">
          <text class="diary__stat-num">{{ weekStats.continuousDays }}</text>
          <text class="diary__stat-label">连续天数</text>
        </view>
        <view class="diary__stat-divider" />
        <view class="diary__stat-item">
          <text class="diary__stat-num diary__stat-num--green">{{ weekStats.positivePercent }}%</text>
          <text class="diary__stat-label">积极情绪</text>
        </view>
      </view>

      <scroll-view scroll-y class="diary__list" @scrolltolower="loadMore">
        <ui-card
          v-for="entry in diaryEntries"
          :key="entry.id"
          custom-class="diary__card"
          @click="openDetail(entry)"
        >
          <view
            v-if="entry.imageUrls && entry.imageUrls.length"
            class="diary__card-bg"
            :style="{ backgroundImage: 'url(' + toImageSrc(entry.imageUrls[0]) + ')' }"
          />
          <view class="diary__card-content">
          <ui-card-header>
            <view class="diary__card-head">
              <view class="diary__meta">
                <text class="diary__date">{{ entry.dateLabel || formatDateLabel(entry.date) }}</text>
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
          </view>
        </ui-card>
      </scroll-view>

      <view class="diary__fab" @click="startNewDiary">
        <text class="diary__fab-icon">+</text>
      </view>
    </template>

    <view class="diary__bottom-placeholder" />
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { API_BASE } from '@/utils/config.js'
import { getWithAuth, postWithAuth } from '@/utils/api.js'
import UiCard from '@/components/ui/Card.vue'
import UiCardHeader from '@/components/ui/CardHeader.vue'
import UiCardContent from '@/components/ui/CardContent.vue'
import UiButton from '@/components/ui/Button.vue'
import UiTextarea from '@/components/ui/Textarea.vue'
import UiIcon from '@/components/ui/Icon.vue'

const emit = defineEmits(['back'])

const isWriting = ref(false)
const isEditing = ref(false)
const editingDiaryDate = ref(null) // yyyy-MM-dd，编辑/更新用
const selectedMood = ref(null)
const selectedWeather = ref(null)
const diaryContent = ref('')
const isPrivate = ref(true)
const diaryImageUrls = ref([])
const uploading = ref(false)

const weekStats = ref({
  accumulatedRecords: 0,
  continuousDays: 0,
  positivePercent: 0
})

const diaryEntries = ref([])
const pageNo = ref(1)
const pageSize = 10
const hasMore = ref(true)
const loadingList = ref(false)
const isDateFiltering = ref(false)
const showRangePicker = ref(false)
const todayDate = new Date().toISOString().slice(0, 10)
const rangeStartDate = ref(todayDate)
const rangeEndDate = ref(todayDate)

const canPublish = computed(() => !!diaryContent.value.trim() && !!selectedMood.value && !!selectedWeather.value)

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

function getMoodIcon(mood) {
  // 后端 mood：1 开心 2 平静 4 低落
  const map = { 1: 'smile', 2: 'meh', 4: 'frown', 3: 'meh', 5: 'frown' }
  return map[mood] || 'meh'
}

function getWeatherIcon(weather) {
  // 后端 weather：1 晴天 2 阴天 3 雨天 4 雪天
  const map = { 1: 'sun', 2: 'cloud', 3: 'cloud-rain', 4: 'cloud-snow' }
  return map[weather] || 'sun'
}

function onBack() { emit('back') }

function formatDateLabel(dateStr) {
  if (!dateStr) return ''
  // dateStr: yyyy-MM-dd
  const d = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  const diffDays = Math.floor((now - d) / 86400000)
  if (diffDays === 0) return '今天'
  if (diffDays === 1) return '昨天'
  return (d.getMonth() + 1) + '月' + d.getDate() + '日'
}

function toImageSrc(rel) {
  if (!rel) return ''
  if (rel.startsWith('http')) return rel
  if (rel.startsWith('/')) return API_BASE + rel
  return API_BASE + '/' + rel
}

function moodToCode(moodId) {
  // 与后端 Diary 约定：1开心 2平静 4低落（本页面只有3个选项）
  const map = { happy: 1, neutral: 2, sad: 4 }
  return map[moodId]
}

function weatherToCode(weatherId) {
  const map = { sunny: 1, cloudy: 2, rainy: 3 }
  return map[weatherId]
}

async function loadWeekStats() {
  try {
    const data = await getWithAuth('/api/diary/stats/week')
    if (data) weekStats.value = data
  } catch {
    // 未登录时不展示统计
  }
}

async function loadInitialList() {
  pageNo.value = 1
  hasMore.value = true
  isDateFiltering.value = false
  diaryEntries.value = []
  await loadMore(true)
}

async function loadMore(reset = false) {
  // scrolltolower 事件会把 event 作为参数传入，此处只在 reset 真的是布尔 true 时才覆盖列表
  const isReset = reset === true
  if (loadingList.value) return
  if (isDateFiltering.value) return
  if (!isReset && !hasMore.value) return

  if (!uni.getStorageSync('ep_token')) return

  loadingList.value = true
  try {
    const res = await getWithAuth('/api/diary/list?pageNo=' + (pageNo.value) + '&pageSize=' + pageSize)
    const entries = res?.entries || []
    if (isReset) diaryEntries.value = entries
    else diaryEntries.value = diaryEntries.value.concat(entries)
    hasMore.value = !!res?.hasMore
    pageNo.value += 1
  } catch (e) {
    // 忽略错误，避免无限滚动卡死
  } finally {
    loadingList.value = false
  }
}

function onStartDateChange(e) {
  const v = e?.detail?.value
  if (!v) return
  rangeStartDate.value = v
}

function onEndDateChange(e) {
  const v = e?.detail?.value
  if (!v) return
  rangeEndDate.value = v
}

async function confirmRangeFilter() {
  const token = uni.getStorageSync('ep_token')
  if (!token) {
    uni.showToast({ title: '请先登录', icon: 'none' })
    return
  }

  try {
    const list = await getWithAuth('/api/diary/by-date-range?startDate=' + rangeStartDate.value + '&endDate=' + rangeEndDate.value)
    diaryEntries.value = Array.isArray(list) ? list : []
    isDateFiltering.value = true
    hasMore.value = false
  } catch (e2) {
    uni.showToast({ title: e2.message || '查询失败', icon: 'none' })
  }
}

async function resetDateFilter() {
  rangeStartDate.value = todayDate
  rangeEndDate.value = todayDate
  await loadInitialList()
}

function cancelWrite() {
  isWriting.value = false
  isEditing.value = false
  editingDiaryDate.value = null
  diaryContent.value = ''
  selectedMood.value = null
  selectedWeather.value = null
  isPrivate.value = true
  diaryImageUrls.value = []
}

function startNewDiary() {
  isWriting.value = true
  isEditing.value = false
  editingDiaryDate.value = null
  diaryContent.value = ''
  selectedMood.value = null
  selectedWeather.value = null
  isPrivate.value = true
  diaryImageUrls.value = []
}

function openDetail(entry) {
  // 切换到“写日记”，并把当前记录预填到表单，用于编辑
  isWriting.value = true
  isEditing.value = true
  editingDiaryDate.value = entry?.date || null
  selectedMood.value = codeToMoodId(entry?.mood)
  selectedWeather.value = codeToWeatherId(entry?.weather)
  diaryContent.value = entry?.content || ''
  isPrivate.value = entry?.isPrivate ?? true
  diaryImageUrls.value = Array.isArray(entry?.imageUrls) ? entry.imageUrls : []
}

async function chooseAndUploadImages() {
  if (uploading.value) return
  const token = uni.getStorageSync('ep_token')
  if (!token) {
    uni.showToast({ title: '请先登录', icon: 'none' })
    return
  }

  const chooseRes = await new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: resolve,
      fail: reject
    })
  })

  const tempFilePaths = chooseRes.tempFilePaths || []
  if (!tempFilePaths.length) return

  uploading.value = true
  try {
    const urls = []
    for (const p of tempFilePaths) {
      const uploadRes = await new Promise((resolve, reject) => {
        uni.uploadFile({
          url: API_BASE + '/api/diary/image/upload',
          filePath: p,
          name: 'files',
          header: { Authorization: 'Bearer ' + token },
          success: resolve,
          fail: reject
        })
      })

      const body = JSON.parse(uploadRes.data || '{}')
      if (!body || body.code !== 0) {
        throw new Error(body?.message || '上传失败')
      }
      const returned = body.data || []
      urls.push(...returned)
    }
    diaryImageUrls.value = (diaryImageUrls.value || []).concat(urls).slice(0, 3)
  } catch (e) {
    uni.showToast({ title: e.message || '上传失败', icon: 'none' })
  } finally {
    uploading.value = false
  }
}

async function publishDiary() {
  if (!canPublish.value) return
  const token = uni.getStorageSync('ep_token')
  if (!token) {
    uni.showToast({ title: '请先登录', icon: 'none' })
    return
  }

  const mood = moodToCode(selectedMood.value)
  const weather = weatherToCode(selectedWeather.value)

  const body = {
    diaryDate: isEditing.value ? editingDiaryDate.value : null, // 编辑时带上原日期；不传则默认今天
    mood,
    weather,
    isPrivate: isPrivate.value,
    content: diaryContent.value,
    imageUrls: diaryImageUrls.value
  }

  try {
    await postWithAuth('/api/diary/record', body)
    uni.showToast({ title: '发布成功', icon: 'success' })
    isWriting.value = false
    isEditing.value = false
    editingDiaryDate.value = null
    diaryContent.value = ''
    selectedMood.value = null
    selectedWeather.value = null
    isPrivate.value = true
    diaryImageUrls.value = []
    await loadWeekStats()
    await loadInitialList()
  } catch (e) {
    uni.showToast({ title: e.message || '发布失败', icon: 'none' })
  }
}

function codeToMoodId(moodCode) {
  // 后端 mood：1开心 2平静 3一般 4低落 5焦虑
  // 本页面仅提供开心/平静/低落三档，所以：3/2 算 neutral，5/4 算 sad
  const map = { 1: 'happy', 2: 'neutral', 3: 'neutral', 4: 'sad', 5: 'sad' }
  return map[moodCode] || null
}

function codeToWeatherId(weatherCode) {
  const map = { 1: 'sunny', 2: 'cloudy', 3: 'rainy' }
  return map[weatherCode] || null
}

onMounted(async () => {
  await loadWeekStats()
  await loadInitialList()
})
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
    color: #000000;
    &--disabled { color: #9ca3af; }
  }

  &__write-content {
    padding: 1.5rem;
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
    gap: 2.0rem;
  }

  &__option-chip {
    display: flex;
    align-items: center;
    gap: 12rpx;
    padding: 16rpx 28rpx;
    border: 1px solid #d1d5db;
    border-radius: 40rpx;
    font-size: 26rpx;
    color: var(--ep-foreground);
    background: #fff;

    .diary__option-icon {
      color: var(--ep-muted-foreground);
    }

    &--active {
      background: #DDF2F0;
      border-color: #3CCBBE;
      color: #3CCBBE;

      .diary__option-icon {
        color: #3CCBBE;
      }
    }
  }

  &__option-icon {
    flex-shrink: 0;
  }

  &__textarea {
    min-height: 320rpx;
  }

  /* 图2：图片预览 3 格宫格 */
  &__image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
    padding: 0 0 24rpx;
  }

  &__image-slot {
    width: 100%;
    aspect-ratio: 1 / 1;
    border: 2rpx dashed rgba(0, 0, 0, 0.12);
    border-radius: 16rpx;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.02);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image-slot:active {
    transform: scale(0.98);
  }

  &__image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    &--active { color: #3CCBBE; }
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
    position: relative;
  }

  &__card-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.18;
    z-index: 0;
    pointer-events: none;
  }

  &__card-content {
    position: relative;
    z-index: 1;
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

  &__range-inline {
    margin: 0 32rpx 20rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: 28rpx 32rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
  }

  &__range-title {
    display: block;
    font-size: 30rpx;
    font-weight: 600;
    color: var(--ep-foreground);
    margin-bottom: 24rpx;
  }

  &__range-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
  }

  &__range-label {
    font-size: 26rpx;
    color: var(--ep-muted-foreground);
  }

  &__range-picker {
    min-width: 250rpx;
    text-align: center;
    border: 1px solid #d1d5db;
    border-radius: 14rpx;
    padding: 14rpx 18rpx;
    color: var(--ep-foreground);
    font-size: 26rpx;
    background: #f8fafb;
  }

  &__range-actions {
    display: flex;
    gap: 20rpx;
    margin-top: 16rpx;
  }

  &__range-btn {
    flex: 1;
    text-align: center;
    border: 1px solid #d1d5db;
    border-radius: 14rpx;
    padding: 16rpx 0;
    font-size: 26rpx;
    color: var(--ep-foreground);
    background: #fff;
  }

  &__range-btn--primary {
    border-color: #3CCBBE;
    color: #3CCBBE;
    background: #DDF2F0;
  }
}
</style>
