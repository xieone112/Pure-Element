<script setup lang="ts">
import { ref } from 'vue'
import Select from '@/components/Select/Select.vue'
import type { SelectOption } from '@/components/Select/types'

const test = ref('')
const options: SelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear', disabled: true }
]

const filterMethod = (value: string): SelectOption[] => {
  const keyword = value.trim().toLowerCase()
  if (!keyword) return options
  return options.filter((item) => {
    return item.label.toLowerCase().includes(keyword) || String(item.value).includes(keyword)
  })
}
</script>

<template>
  <Select
    v-model="test"
    filterable
    placeholder="可筛选选择器，请输入关键字"
    :options="options"
    :filter-method="filterMethod"
  />
  <span>{{ test }}</span>
</template>
