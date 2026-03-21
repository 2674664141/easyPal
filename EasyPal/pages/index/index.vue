<template>
  <view class="app-wrap">
    <MobileHome @navigate="handleNavigate" />
  </view>
</template>

<script setup>
import MobileHome from '@/components/mobile/MobileHome.vue'

function handleNavigate(page) {
  if (page === 'chat') {
    uni.navigateTo({ url: '/pages/chat/chat' })
    return
  }

  const map = {
    home: '/pages/index/index',
    diary: '/pages/diary/diary',
    community: '/pages/community/community',
    profile: '/pages/profile/profile'
  }
  const url = map?.[page]
  if (!url) return
  uni.switchTab({ url })
}
</script>

<style lang="scss" scoped>
.app-wrap {
  max-width: 750rpx;
  margin: 0 auto;
  min-height: 100vh;
  background: #f5f5f5;
  position: relative;
}
</style>
