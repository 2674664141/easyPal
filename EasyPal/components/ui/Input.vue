<template>
  <input
    class="ep-input"
    :class="customClass"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :focus="focus"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
    @confirm="onConfirm"
  />
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  focus: { type: Boolean, default: false },
  customClass: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur', 'confirm'])

function onInput(e) {
  const v = e.detail?.value ?? e.target?.value ?? ''
  emit('update:modelValue', v)
  emit('input', v)
}
function onFocus(e) { emit('focus', e) }
function onBlur(e) { emit('blur', e) }
function onConfirm(e) { emit('confirm', e) }
</script>

<style lang="scss" scoped>
.ep-input {
  width: 100%;
  min-height: 72rpx;
  padding: 0 28rpx;
  background: var(--ep-input, #f0f0f0);
  border: 1rpx solid transparent;
  border-radius: 16rpx;
  font-size: 28rpx;
  color: var(--ep-foreground, #333);
  box-sizing: border-box;

  &::placeholder {
    color: var(--ep-muted-foreground, #999);
  }
  &:focus {
    background: #fff;
    border-color: var(--ep-primary, #07c160);
  }
}
</style>
