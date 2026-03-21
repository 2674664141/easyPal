<template>
  <view class="ep-card-header" :class="customClass">
    <slot />
  </view>
</template>

<script setup>
defineProps({
  customClass: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
/* 与原项目 card.tsx CardHeader 一致：px-6 gap-2 */
.ep-card-header {
  padding: 0 48rpx;
  padding-bottom: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
</style>
