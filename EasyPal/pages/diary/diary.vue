<template>
  <MobileDiary @back="goHome" />
</template>

<script setup>
import MobileDiary from '@/components/mobile/MobileDiary.vue'

function goHome() {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

