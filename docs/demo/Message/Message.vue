<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import { createMessage, closeAll } from '@/components/Message/method'

const createMsg = () => {
  createMessage({ message: 'Info 消息', offset: 10, type: 'info' })
  createMessage({ message: 'Success 消息', offset: 20, type: 'success' })
  createMessage({ message: 'Warning 消息', offset: 30, type: 'warning' })
  createMessage({ message: 'Danger 消息', offset: 40, type: 'danger', duration: 0, showClose: true })
}

const createMany = () => {
  for (let i = 0; i < 5; i++) {
    createMessage({ message: `消息 ${i + 1}`, offset: 10, duration: 0, showClose: true })
  }
}
</script>

<template>
  <Button type="primary" @click="createMsg">四种 Message 类型</Button>
  <Button @click="createMany">创建多个 Message</Button>
  <Button type="danger" @click="closeAll">关闭所有 Message</Button>
</template>
