<template>
  <MobileSOS @back="goHome" />
</template>

<script setup>
import MobileSOS from '@/components/mobile/MobileSOS.vue'

function goHome() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
    return
  }
  uni.switchTab({ url: '/pages/index/index' })
}
</script>
