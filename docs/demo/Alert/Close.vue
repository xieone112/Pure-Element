<script setup lang="ts">
import { ref } from 'vue'
import Alert from '@/components/Alert/Alert.vue'
import Button from '@/components/Button/Button.vue'

const visible = ref(true)

const handleClose = () => {
  visible.value = false
  console.log('alert close')
}

const reset = () => {
  visible.value = true
}
</script>

<template>
  <Alert v-if="visible" type="warning" closable @close="handleClose">
    这是可关闭的提示，关闭后可点击按钮恢复。
  </Alert>

  <Button v-else type="primary" @click="reset">重新显示 Alert</Button>
</template>
