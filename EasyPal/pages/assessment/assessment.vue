<template>
  <MobileAssessment @back="goHome" />
</template>

<script setup>
import MobileAssessment from '@/components/mobile/MobileAssessment.vue'

function goHome() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
    return
  }
  uni.switchTab({ url: '/pages/index/index' })
}
</script>
