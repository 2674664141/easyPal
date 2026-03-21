<template>
  <MobileProfile @back="goHome" />
</template>

<script setup>
import MobileProfile from '@/components/mobile/MobileProfile.vue'

function goHome() {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

