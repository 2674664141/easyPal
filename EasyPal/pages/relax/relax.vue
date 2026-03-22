<template>
  <MobileRelax @back="goHome" />
</template>

<script setup>
import MobileRelax from '@/components/mobile/MobileRelax.vue'

function goHome() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
    return
  }
  uni.switchTab({ url: '/pages/index/index' })
}
</script>
