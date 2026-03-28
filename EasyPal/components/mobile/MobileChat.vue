<template>
  <view class="chat">
    <header class="chat__header">
      <view class="chat__header-left">
        <ui-button variant="ghost" size="icon" @click="onBack">
          <ui-icon name="arrow-left" size="md" />
        </ui-button>
        <ui-avatar size="sm" fallback-text="" custom-class="chat__avatar">
          <template #fallback>
            <ui-icon name="sparkles" size="sm" class="chat__avatar-icon" />
          </template>
        </ui-avatar>
        <view class="chat__ai-info">
          <text class="chat__ai-name">小暖</text>
          <view class="chat__ai-tag">
            <view class="chat__dot" />
            <text class="chat__ai-desc">AI心理陪伴助手</text>
          </view>
        </view>
      </view>
      <ui-button variant="ghost" size="icon">
        <ui-icon name="more-vertical" size="md" />
      </ui-button>
    </header>

    <scroll-view
      scroll-y
      class="chat__message-list"
      :scroll-into-view="scrollToId"
      scroll-with-animation
    >
      <view class="chat__date-divider">
        <view class="chat__line" />
        <text class="chat__date-text">今天</text>
        <view class="chat__line" />
      </view>

      <view
        v-for="msg in messages"
        :id="'msg-' + msg.id"
        :key="msg.id"
        class="chat__message-row"
        :class="'chat__message-row--' + msg.type"
      >
        <view v-if="msg.type === 'ai'" class="chat__msg-avatar">
          <ui-avatar size="sm" fallback-text="">
            <template #fallback>
              <ui-icon name="sparkles" size="xs" class="chat__avatar-icon" />
            </template>
          </ui-avatar>
        </view>
        <view class="chat__bubble-wrap">
          <ui-card :custom-class="'chat__bubble chat__bubble--' + msg.type">
            <ui-card-content>
              <text class="chat__bubble-text">{{ msg.content }}</text>
            </ui-card-content>
          </ui-card>
          <view class="chat__meta-row" :class="'chat__meta-row--' + msg.type">
            <text class="chat__time">{{ formatTime(msg.timestamp) }}</text>
            <ui-badge v-if="msg.type === 'ai' && msg.emotion" variant="secondary" custom-class="chat__emotion-tag">
              {{ msg.emotion }}
            </ui-badge>
            <view v-if="msg.type === 'ai'" class="chat__volume-btn">
              <ui-icon name="volume-2" size="xs" />
            </view>
          </view>
        </view>
      </view>

      <view v-if="isTyping" class="chat__message-row chat__message-row--ai">
        <view class="chat__msg-avatar">
          <ui-avatar size="sm" fallback-text="">
            <template #fallback>
              <ui-icon name="sparkles" size="xs" class="chat__avatar-icon" />
            </template>
          </ui-avatar>
        </view>
        <view class="chat__typing-bubble">
          <view class="chat__typing-dot" />
          <view class="chat__typing-dot" />
          <view class="chat__typing-dot" />
        </view>
      </view>

      <view id="msg-end" class="chat__scroll-anchor" />
    </scroll-view>

    <view class="chat__bottom">
      <view v-if="messages.length <= 2" class="chat__quick-replies">
        <scroll-view scroll-x class="chat__quick-scroll" :show-scrollbar="false">
          <ui-button
            v-for="(reply, i) in quickReplies"
            :key="i"
            variant="outline"
            size="sm"
            custom-class="chat__quick-item"
            @click="inputValue = reply"
          >
            <text>{{ reply }}</text>
          </ui-button>
        </scroll-view>
      </view>

      <view class="chat__input-bar">
        <view class="chat__input-row">
          <ui-button variant="ghost" size="icon">
            <ui-icon name="camera" size="md" />
          </ui-button>
          <ui-input
            v-model="inputValue"
            placeholder="说点什么..."
            custom-class="chat__input"
            @confirm="handleSend"
          />
          <ui-button
            variant="ghost"
            size="icon"
            :custom-class="isRecording ? 'chat__mic--recording' : ''"
            @click="toggleRecording"
          >
            <ui-icon name="mic" size="md" />
          </ui-button>
          <view
            class="chat__send-btn"
            :class="{ 'chat__send-btn--active': !!inputValue.trim() }"
            @click="handleSend"
          >
            <ui-icon name="send" size="sm" class="chat__send-icon" />
          </view>
        </view>
        <view v-if="isRecording" class="chat__recording-tip">
          <view class="chat__rec-dot" />
          <text>正在录音...点击停止</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import UiCardContent from '@/components/ui/CardContent.vue'
import UiButton from '@/components/ui/Button.vue'
import UiAvatar from '@/components/ui/Avatar.vue'
import UiBadge from '@/components/ui/Badge.vue'
import UiInput from '@/components/ui/Input.vue'
import UiIcon from '@/components/ui/Icon.vue'
import { API_BASE } from '@/utils/config.js'

const emit = defineEmits(['back'])

const messages = ref([
  {
    id: 1,
    type: 'ai',
    content: '你好呀！我是你的AI心理陪伴助手小暖。今天感觉怎么样？有什么想和我聊聊的吗？🌸',
    timestamp: new Date(),
    emotion: null
  }
])
const inputValue = ref('')
const isRecording = ref(false)
const isTyping = ref(false)
const scrollToId = ref('')
const asrDraftText = ref('')
const asrFinalText = ref('')

/** 当前环境是否支持「边录边传」流式识别（H5 通常不支持 getRecorderManager） */
let recorderManager = null
let recorderHandlersBound = false
let socketTask = null

function getRecorderManagerSafe() {
  try {
    if (typeof uni === 'undefined' || typeof uni.getRecorderManager !== 'function') {
      return null
    }
    return uni.getRecorderManager()
  } catch {
    return null
  }
}

function isStreamingAsrSupported() {
  const rm = getRecorderManagerSafe()
  return !!(
    rm
    && typeof rm.start === 'function'
    && typeof rm.onFrameRecorded === 'function'
    && typeof rm.stop === 'function'
  )
}

function bindRecorderHandlersOnce() {
  if (recorderHandlersBound || !recorderManager) return
  if (typeof recorderManager.onFrameRecorded !== 'function') return
  recorderHandlersBound = true
  recorderManager.onFrameRecorded((res) => {
    if (!isRecording.value || !socketTask) return
    const buf = res && res.frameBuffer
    if (buf) socketTask.send({ data: buf })
  })
  recorderManager.onError((e) => {
    isRecording.value = false
    uni.showToast({ title: e?.errMsg || '录音失败', icon: 'none' })
    stopStreamingAsr(false)
  })
}

const quickReplies = [
  '我今天有点焦虑',
  '想聊聊学习压力',
  '最近睡眠不太好',
  '心情有些低落'
]

const aiReplies = [
  '我理解你的感受。能具体说说是什么让你有这种感觉吗？我想更好地了解你。',
  '谢谢你愿意和我分享。你的感受是完全正常的，我们一起来看看可以做些什么。',
  '听起来你今天经历了不少。深呼吸一下，我陪着你慢慢聊。'
]

function formatTime(date) {
  const d = date instanceof Date ? date : new Date(date)
  const h = d.getHours()
  const m = d.getMinutes()
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function onBack() {
  emit('back')
}

function asrWsUrl() {
  if (API_BASE.startsWith('https://')) {
    return API_BASE.replace('https://', 'wss://') + '/api/speech/asr/stream'
  }
  return API_BASE.replace('http://', 'ws://') + '/api/speech/asr/stream'
}

function refreshInputFromAsr() {
  inputValue.value = (asrFinalText.value + asrDraftText.value).trim()
}


function handleAsrMessage(raw) {
  let payload = null
  try {
    payload = typeof raw === 'string' ? JSON.parse(raw) : raw
  } catch {
    return
  }
  if (!payload || !payload.type) return
  if (payload.type === 'interim') {
    asrDraftText.value = payload.text || ''
    refreshInputFromAsr()
    return
  }
  if (payload.type === 'final') {
    asrFinalText.value += payload.text || ''
    asrDraftText.value = ''
    refreshInputFromAsr()
    return
  }
  if (payload.type === 'error') {
    uni.showToast({ title: payload.text || '识别异常', icon: 'none' })
    stopStreamingAsr(false)
  }
}

function connectAsrSocket() {
  return new Promise((resolve, reject) => {
    socketTask = uni.connectSocket({ url: asrWsUrl() })
    socketTask.onOpen(() => {
      socketTask.send({ data: JSON.stringify({ type: 'start' }) })
      resolve()
    })
    socketTask.onMessage((event) => {
      handleAsrMessage(event.data)
    })
    socketTask.onError((err) => {
      reject(err)
    })
    socketTask.onClose(() => {
      socketTask = null
    })
  })
}

async function startStreamingAsr() {
  if (!isStreamingAsrSupported()) {
    uni.showToast({
      title: '当前运行环境不支持实时语音（请在 App 真机或微信小程序中试用）',
      icon: 'none',
      duration: 2800
    })
    return
  }
  recorderManager = getRecorderManagerSafe()
  bindRecorderHandlersOnce()
  try {
    asrDraftText.value = ''
    asrFinalText.value = inputValue.value.trim()
    await connectAsrSocket()
    recorderManager.start({
      duration: 10 * 60 * 1000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 96000,
      format: 'PCM',
      frameSize: 5
    })
    isRecording.value = true
  } catch (e) {
    isRecording.value = false
    uni.showToast({ title: e?.errMsg || '实时识别连接失败', icon: 'none' })
    stopStreamingAsr(false)
  }
}

function stopStreamingAsr(showTip = true) {
  if (isRecording.value && recorderManager && typeof recorderManager.stop === 'function') {
    try {
      recorderManager.stop()
    } catch {
      // ignore
    }
  }
  isRecording.value = false
  if (socketTask) {
    socketTask.send({ data: JSON.stringify({ type: 'stop' }) })
    socketTask.close({})
    socketTask = null
  }
  asrDraftText.value = ''
  refreshInputFromAsr()
  if (showTip) uni.showToast({ title: '已停止识别', icon: 'none' })
}

async function toggleRecording() {
  if (isRecording.value) {
    stopStreamingAsr(true)
    return
  }
  await startStreamingAsr()
}

async function handleSend() {
  const text = inputValue.value.trim()
  if (!text) return

  const userMsg = {
    id: messages.value.length + 1,
    type: 'user',
    content: text,
    timestamp: new Date()
  }
  messages.value.push(userMsg)
  inputValue.value = ''
  isTyping.value = true
  nextTick(() => { scrollToId.value = 'msg-end' })

  await new Promise(r => setTimeout(r, 1500))

  const aiMsg = {
    id: messages.value.length + 1,
    type: 'ai',
    content: aiReplies[Math.floor(Math.random() * aiReplies.length)],
    emotion: '共情',
    timestamp: new Date()
  }
  messages.value.push(aiMsg)
  isTyping.value = false
  nextTick(() => { scrollToId.value = 'msg-end' })
}

onBeforeUnmount(() => {
  stopStreamingAsr(false)
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.chat {
  min-height: 100vh;
  background: #F5F9FA;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;

  &__header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx;
    background: #ffffff;
    border-bottom: 1rpx solid rgba(15, 23, 42, 0.06);
  }

  &__header-left {
    display: flex;
    align-items: center;
    gap: 24rpx;
  }

  &__avatar {
    flex-shrink: 0;
  }

  &__avatar :deep(.ep-avatar-fallback) {
    background: #00AB93;
    color: #fff;
  }

  &__avatar-icon {
    color: #fff;
  }

  &__ai-info {
    display: flex;
    flex-direction: column;
    gap: 4rpx;
  }

  &__ai-name {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--ep-foreground);
  }

  &__ai-tag {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }

  &__dot {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background: $ep-primary;
    animation: chat-pulse 1.5s infinite;
  }

  &__ai-desc {
    font-size: 22rpx;
    color: $ep-primary;
  }

  &__message-list {
    flex: 1;
    height: 0;
    padding: 20rpx 22rpx 312rpx;
  }

  &__date-divider {
    display: flex;
    align-items: center;
    gap: 20rpx;
    margin: 8rpx 0 26rpx;
  }

  &__line {
    flex: 1;
    height: 1rpx;
    background: rgba(15, 23, 42, 0.12);
  }

  &__date-text {
    font-size: 24rpx;
    color: rgba(15, 23, 42, 0.55);
    font-weight: 600;
  }

  &__message-row {
    display: flex;
    gap: 14rpx;
    margin-bottom: 22rpx;

    &--user {
      flex-direction: row-reverse;
    }
  }

  &__msg-avatar {
    flex-shrink: 0;
  }

  &__msg-avatar :deep(.ep-avatar-fallback) {
    background: #00AB93;
    color: #fff;
  }

  &__bubble-wrap {
    max-width: 82%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__message-row--user &__bubble-wrap {
    align-items: flex-end;
  }

  &__bubble {
    padding: 0;
    border: 1rpx solid rgba(15, 23, 42, 0.04);
    box-shadow: 0 6rpx 14rpx rgba(15, 23, 42, 0.05);
    max-width: 100%;
    border-radius: 26rpx;

    &--ai {
      background: #fff;
    }

    &--user {
      background: $ep-primary;
      color: var(--ep-primary-foreground);
    }
  }

  &__bubble-text {
    font-size: 28rpx;
    line-height: 1.52;
    color: inherit;
  }

  &__bubble :deep(.ep-card-content) {
    padding: 30rpx 26rpx;
  }

  &__meta-row {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-top: 6rpx;
    padding: 0 8rpx;

    &--user {
      justify-content: flex-end;
    }
  }

  &__time {
    font-size: 20rpx;
    color: rgba(15, 23, 42, 0.58);
  }

  &__emotion-tag {
    font-size: 20rpx;
  }

  &__volume-btn {
    color: var(--ep-muted-foreground);
  }

  &__typing-bubble {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 24rpx 28rpx;
    background: var(--ep-card);
    border-radius: 20rpx;
    box-shadow: $ep-shadow-sm;
  }

  &__typing-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background: var(--ep-muted-foreground);
    animation: chat-bounce 0.6s ease-in-out infinite;

    &:nth-child(2) { animation-delay: 0.1s; }
    &:nth-child(3) { animation-delay: 0.2s; }
  }

  &__scroll-anchor {
    height: 1rpx;
  }

  &__bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    background: transparent;
    border-top: 0;
  }

  &__quick-replies {
    padding: 12rpx 10rpx 14rpx;
    background: transparent;
  }

  &__quick-scroll {
    white-space: nowrap;
  }

  &__quick-item {
    margin-right: 14rpx;
    border-color: #9BDCD5;
    color: #F5F9FA;
    background: #f8fbfb;
    border-radius: 999rpx;
    font-weight: 500;
    padding: 10rpx 20rpx !important;
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  &__quick-item:hover,
  &__quick-item:active {
    background: #DDF2F0;
    color: #000;
    border-color: #9BDCD5;
  }

  &__input-bar {
    margin-top: 8rpx;
    padding: 12rpx 14rpx;
    padding-bottom: calc(14rpx + env(safe-area-inset-bottom));
    background: #fff;
    border-top: 1rpx solid rgba(15, 23, 42, 0.08);
  }

  &__input-row {
    display: flex;
    align-items: center;
    gap: 12rpx;
  }

  &__input {
    flex: 1;
    border-radius: 999rpx !important;
    background: #edf3f4 !important;
    min-height: 74rpx !important;
  }

  :deep(.chat__input.ep-input) {
    border: 2rpx solid transparent !important;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }

  :deep(.chat__input.ep-input:focus) {
    border-color: #66CFC1 !important;
    background: #fff !important;
  }

  &__send-btn {
    width: 74rpx;
    height: 74rpx;
    border-radius: 50%;
    background: #7FD5C9;
    display: flex;
    align-items: center;
    justify-content: center;

    &--active {
      background: #00AB93;
    }
  }

  &__send-icon {
    color: #fff !important;
  }

  &__recording-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    margin-top: 16rpx;
    font-size: 24rpx;
    color: var(--ep-destructive);
  }

  &__rec-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background: var(--ep-destructive);
    animation: chat-pulse 1s infinite;
  }
}

@keyframes chat-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes chat-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8rpx); }
}
</style>
