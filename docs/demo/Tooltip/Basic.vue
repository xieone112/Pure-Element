<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
</script>

<template>
  <Tooltip content="这是一段提示信息">
    <Button>Hover 显示 Tooltip</Button>
  </Tooltip>

  <Tooltip content="点击触发" trigger="click">
    <Button type="primary">Click 显示 Tooltip</Button>
  </Tooltip>
</template>
