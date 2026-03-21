<template>
  <MobileChat @back="goHome" />
</template>

<script setup>
import MobileChat from '@/components/mobile/MobileChat.vue'

function goHome() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
    return
  }
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

