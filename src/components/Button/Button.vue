<script setup lang="ts">
import { ref } from 'vue';
import type {ButtonProps} from './types'
import Icon from '../Icon/Icon.vue'
withDefaults(defineProps<ButtonProps>(),{
  nativeType:'button'
})
defineOptions({
  name:'PrButton'
})
const _ref=ref<HTMLButtonElement>()
defineExpose({
  ref:_ref
})
</script>

<template>
  <button
  ref="_ref"
  class="pr-button"
  :class="{
    [`pr-button--${type}`]:type,
    [`pr-button--${size}`]:size,
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
    'is-disabled':disabled,
    'is-loading':loading
  }"
  :disabled="disabled||loading"
  :autofocus="autofocus"
  :type="nativeType"
  >
  <Icon icon="spinner" spin v-if="loading"></Icon>
  <Icon :icon="icon" v-if="icon"></Icon>
  <span>
    <slot />
  </span>
  </button>
</template>
<style>
</style>