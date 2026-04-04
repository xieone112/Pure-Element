<script setup lang="ts">
import Alert from '@/components/Alert/Alert.vue'
</script>

<template>
  <Alert type="primary" content="这是一条 Primary 提示" />
  <Alert type="success">这是一条 Success 提示</Alert>
  <Alert type="warning" effect="dark">深色 Warning 提示</Alert>
  <Alert type="danger" closable>可关闭的 Danger 提示</Alert>
</template>
