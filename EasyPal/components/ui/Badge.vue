<template>
  <view class="ep-badge" :class="[variantClass, customClass]">
    <slot />
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'secondary' }, // default | secondary | destructive | outline
  customClass: { type: String, default: '' }
})

const variantClass = computed(() => `ep-badge--${props.variant}`)
</script>

<style lang="scss" scoped>
.ep-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  padding: 6rpx 16rpx;
  border-radius: 12rpx;
  font-size: 22rpx;
  font-weight: 500;

  &.ep-badge--default {
    background: var(--ep-primary, #07c160);
    color: var(--ep-primary-foreground, #fff);
    border: none;
  }
  &.ep-badge--secondary {
    background: var(--ep-secondary, #f0f9f4);
    color: var(--ep-secondary-foreground, #166534);
    border: none;
  }
  &.ep-badge--destructive {
    background: var(--ep-destructive, #dd524d);
    color: var(--ep-destructive-foreground, #fff);
    border: none;
  }
  &.ep-badge--outline {
    background: transparent;
    border: 1rpx solid var(--ep-primary, #07c160);
    color: var(--ep-primary, #07c160);
  }
}
</style>
