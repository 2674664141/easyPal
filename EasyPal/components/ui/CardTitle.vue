<template>
  <view class="ep-card-title" :class="customClass">
    <slot />
  </view>
</template>

<script setup>
defineProps({
  customClass: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
.ep-card-title {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--ep-foreground, #333);
  line-height: 1.3;
  display: flex;
  align-items: center;
  gap: 12rpx;
}
</style>
