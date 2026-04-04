<script setup lang="ts">
import Button from '@/components/Button/Button.vue'

const handleSubmit = () => {
  console.log('submit')
}

const handleReset = () => {
  console.log('reset')
}
</script>

<template>
  <form @submit.prevent="handleSubmit" @reset.prevent="handleReset">
    <Button native-type="submit" type="primary">提交</Button>
    <Button native-type="reset" plain>重置</Button>
    <Button native-type="button" type="info">普通按钮</Button>
  </form>
</template>
