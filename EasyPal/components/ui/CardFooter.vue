<template>
  <view class="ep-card-footer" :class="customClass">
    <slot />
  </view>
</template>

<script setup>
defineProps({
  customClass: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
.ep-card-footer {
  padding: 20rpx 28rpx 28rpx;
  border-top: 1rpx solid var(--ep-border, #eee);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16rpx;
}
</style>
