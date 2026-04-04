<script setup lang="ts">
import { ref } from 'vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'

const activeNames = ref<Array<string | number>>(['1'])
</script>

<template>
  <Collapse v-model="activeNames">
    <CollapseItem name="1" title="一致性">
      一致性是指用户操作与预期保持一致。
    </CollapseItem>
    <CollapseItem name="2" title="反馈">
      通过界面元素对用户操作做出及时反馈。
    </CollapseItem>
    <CollapseItem name="3" title="效率">
      简化流程，提高操作效率。
    </CollapseItem>
  </Collapse>
</template>
