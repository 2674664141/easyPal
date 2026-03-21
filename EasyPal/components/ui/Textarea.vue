<template>
  <textarea
    class="ep-textarea"
    :class="customClass"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :maxlength="maxlength"
    :auto-height="autoHeight"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  maxlength: { type: [Number, String], default: -1 },
  autoHeight: { type: Boolean, default: false },
  customClass: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur'])

function onInput(e) {
  const v = e.detail?.value ?? e.target?.value ?? ''
  emit('update:modelValue', v)
  emit('input', v)
}
function onFocus(e) { emit('focus', e) }
function onBlur(e) { emit('blur', e) }
</script>

<style lang="scss" scoped>
.ep-textarea {
  width: 100%;
  min-height: 200rpx;
  padding: 24rpx;
  background: #fff;
  border: 1rpx solid var(--ep-border, #e5e5e5);
  border-radius: 16rpx;
  font-size: 28rpx;
  color: var(--ep-foreground, #333);
  box-sizing: border-box;

  &::placeholder {
    color: var(--ep-muted-foreground, #999);
  }
}
</style>
