<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import { createMessage } from '@/components/Message/method'

const createMsg = () => {
  createMessage({ message: '这是一条消息' })
}
</script>

<template>
  <Button @click="createMsg">函数创建消息</Button>
</template>
