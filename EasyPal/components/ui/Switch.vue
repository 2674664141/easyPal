<template>
  <switch
    :checked="checked"
    color="#07c160"
    @change="onChange"
  />
</template>

<script setup>
defineProps({
  checked: { type: Boolean, default: false }
})

const emit = defineEmits(['update:checked', 'change'])

function onChange(e) {
  const v = e.detail?.value ?? false
  emit('update:checked', v)
  emit('change', v)
}
</script>
