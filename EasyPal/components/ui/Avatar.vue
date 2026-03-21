<template>
  <view class="ep-avatar" :class="[sizeClass, customClass]">
    <image
      v-if="src && !showFallback"
      class="ep-avatar__img"
      :src="src"
      mode="aspectFill"
      @error="showFallback = true"
    />
    <view v-else class="ep-avatar-fallback">
      <slot name="fallback">{{ fallbackText }}</slot>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  fallbackText: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm | md | lg
  customClass: { type: String, default: '' }
})

const showFallback = ref(false)
const sizeClass = computed(() => `ep-avatar--${props.size}`)
</script>

<style lang="scss" scoped>
.ep-avatar {
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ep-muted, #f5f5f5);

  &.ep-avatar--sm {
    width: 64rpx;
    height: 64rpx;
  }
  &.ep-avatar--md {
    width: 80rpx;
    height: 80rpx;
  }
  &.ep-avatar--lg {
    width: 160rpx;
    height: 160rpx;
  }

  .ep-avatar__img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .ep-avatar-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(7, 193, 96, 0.15);
    color: var(--ep-primary, #07c160);
    font-size: 32rpx;
    font-weight: 600;
  }
  &.ep-avatar--lg .ep-avatar-fallback {
    font-size: 64rpx;
  }
}
</style>
