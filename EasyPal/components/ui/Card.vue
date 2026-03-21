<template>
  <view class="ep-card" :class="customClass">
    <slot />
  </view>
</template>

<script setup>
defineProps({
  customClass: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
/* 与原项目 card.tsx 一致：rounded-xl border py-6 shadow-sm flex flex-col gap-6 */
.ep-card {
  background: var(--ep-card, #fff);
  color: var(--ep-card-foreground, #333);
  border-radius: 24rpx;
  border: 1rpx solid var(--ep-border, #e5e5e5);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 48rpx;
  padding: 48rpx 0;

  &.no-border {
    border: none;
  }
  &.no-shadow {
    box-shadow: none;
  }
}
</style>
