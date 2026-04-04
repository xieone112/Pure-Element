<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button/Button.vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import type { menuOption } from '@/components/Dropdown/types'

const options = ref<menuOption[]>([
  { label: '查看', key: 'view' },
  { label: '编辑', key: 'edit' },
  { label: '删除', key: 'delete', divided: true },
])

const handleSelect = (item: menuOption) => {
  console.log('select', item)
}
</script>

<template>
  <Dropdown :menu-options="options" trigger="click" :close-delay="100" @select="handleSelect">
    <Button type="primary">下拉菜单</Button>
  </Dropdown>
</template>
