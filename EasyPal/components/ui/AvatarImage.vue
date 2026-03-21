<template>
  <image
    v-if="src && !showFallback"
    class="ep-avatar-image"
    :src="src"
    mode="aspectFill"
    @error="onError"
  />
  <slot v-else-if="!src" />
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  src: { type: String, default: '' }
})

const showFallback = inject('avatarShowFallback', null)

function onError() {
  if (showFallback) showFallback.value = true
}
</script>

<style lang="scss" scoped>
.ep-avatar-image {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
