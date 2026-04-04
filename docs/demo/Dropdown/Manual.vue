<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button/Button.vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import type { menuOption, DropdownInstance } from '@/components/Dropdown/types'

const dropdownRef = ref<DropdownInstance | null>(null)
const options = ref<menuOption[]>([
  { label: '复制链接', key: 'copy' },
  { label: '重命名', key: 'rename' },
  { label: '删除', key: 'delete', divided: true },
])

const handleSelect = (item: menuOption) => {
  console.log('select', item)
}
</script>

<template>
  <Button @click="dropdownRef?.show()">打开菜单</Button>
  <Button plain @click="dropdownRef?.hide()">关闭菜单</Button>

  <Dropdown
    ref="dropdownRef"
    manual
    :hide-after-click="false"
    :menu-options="options"
    @select="handleSelect"
  >
    <Button type="primary">手动控制 Dropdown</Button>
  </Dropdown>
</template>
