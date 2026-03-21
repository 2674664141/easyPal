<template>
  <view class="ep-progress" :class="customClass">
    <view class="ep-progress__track">
      <view
        class="ep-progress__fill"
        :style="{ width: `${Math.min(100, Math.max(0, value))}%` }"
      />
    </view>
  </view>
</template>

<script setup>
defineProps({
  value: { type: Number, default: 0 },
  customClass: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
.ep-progress {
  width: 100%;

  &__track {
    height: 16rpx;
    background: rgba(7, 193, 96, 0.2);
    border-radius: 8rpx;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: var(--ep-primary, #07c160);
    border-radius: 8rpx;
    transition: width 0.3s ease;
  }
}
</style>
