<template>
  <MobileArticles @back="goHome" />
</template>

<script setup>
import MobileArticles from '@/components/mobile/MobileArticles.vue'

function goHome() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
    return
  }
  uni.switchTab({ url: '/pages/index/index' })
}
</script>
