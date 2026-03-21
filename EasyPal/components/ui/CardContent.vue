<template>
  <view class="ep-card-content" :class="customClass">
    <slot />
  </view>
</template>

<script setup>
defineProps({
  customClass: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
/* 与原项目 card.tsx CardContent 一致：px-6，底部留白由 Card 的 py 提供 */
.ep-card-content {
  padding: 0 48rpx;

  &:first-child {
    padding-top: 0;
  }
}
</style>
