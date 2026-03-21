<template>
  <view
    class="ep-button"
    :class="[variantClass, sizeClass, { disabled: disabled }, customClass]"
    @click="onClick"
  >
    <slot />
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'default' }, // default | ghost | outline | secondary | destructive
  size: { type: String, default: 'default' },   // default | sm | lg | icon
  disabled: { type: Boolean, default: false },
  customClass: { type: String, default: '' }
})

const emit = defineEmits(['click'])

const variantClass = computed(() => `ep-button--${props.variant}`)
const sizeClass = computed(() => `ep-button--${props.size}`)

function onClick() {
  if (!props.disabled) emit('click')
}
</script>

<style lang="scss" scoped>
.ep-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  border-radius: 16rpx;
  font-size: 28rpx;
  font-weight: 500;
  transition: opacity 0.2s, background 0.2s;

  &.ep-button--default {
    background: var(--ep-primary, #07c160);
    color: var(--ep-primary-foreground, #fff);
  }

  &.ep-button--ghost {
    background: transparent;
    color: var(--ep-foreground, #333);
    &:active { background: var(--ep-muted, #f5f5f5); }
  }

  &.ep-button--outline {
    background: transparent;
    border: 1rpx solid var(--ep-border, #e5e5e5);
    color: var(--ep-foreground, #333);
    &:active { background: var(--ep-muted, #f5f5f5); }
  }

  &.ep-button--secondary {
    background: var(--ep-secondary, #f0f9f4);
    color: var(--ep-secondary-foreground, #166534);
  }

  &.ep-button--destructive {
    background: var(--ep-destructive, #dd524d);
    color: var(--ep-destructive-foreground, #fff);
  }

  &.ep-button--default {
    padding: 20rpx 32rpx;
  }
  &.ep-button--sm {
    padding: 12rpx 24rpx;
    font-size: 24rpx;
    border-radius: 12rpx;
  }
  &.ep-button--lg {
    padding: 28rpx 40rpx;
    font-size: 30rpx;
    border-radius: 20rpx;
  }
  &.ep-button--icon {
    width: 72rpx;
    height: 72rpx;
    padding: 0;
    border-radius: 50%;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
