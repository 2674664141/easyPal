<template>
  <MobileCommunity @back="goHome" />
</template>

<script setup>
import MobileCommunity from '@/components/mobile/MobileCommunity.vue'

function goHome() {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

