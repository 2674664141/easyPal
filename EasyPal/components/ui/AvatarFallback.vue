<template>
  <view v-show="showFallback && showFallback.value" class="ep-avatar-fallback">
    <slot />
  </view>
</template>

<script setup>
import { inject } from 'vue'

const showFallback = inject('avatarShowFallback', null)
</script>

<style lang="scss" scoped>
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
</style>
