<script setup lang="ts">
import { ref } from 'vue';
import type { AlertProps, AlertEvents } from './types';
import Icon from '../Icon/Icon.vue';

defineOptions({
  name: 'PrAlert',
});

withDefaults(defineProps<AlertProps>(), {
  closable: false,
  effect: 'light',
});

const visible = ref(true);
const emit = defineEmits<AlertEvents>();

const handleClose = () => {
  visible.value = false;
  emit('close');
};
</script>

<template>
  <div
    v-if="visible"
    class="pr-alert"
    :class="[
      type && `pr-alert--${type}`,
      effect && `pr-alert--${effect}`,
      closable && 'is-closable',
    ]"
  >
    <slot>{{ content }}</slot>
    <Icon
      v-if="closable"
      icon="xmark"
      class="pr-alert__close"
      @click="handleClose"
    />
  </div>
</template>

