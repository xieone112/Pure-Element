<script setup lang="ts">
import { ref } from 'vue'
import Select from '@/components/Select/Select.vue'

const test = ref<Array<string | number | object>>([])
const options = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true }
]
</script>

<template>
  <Select
    v-model="test"
    multiple
    clearable
    filterable
    placeholder="多选选择器，请选择"
    :options="options"
  />
  <span>{{ test }}</span>
</template>
