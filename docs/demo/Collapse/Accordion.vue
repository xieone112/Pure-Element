<script setup lang="ts">
import { ref } from 'vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'

const activeNames = ref<Array<string | number>>(['1'])
</script>

<template>
  <Collapse v-model="activeNames" accordion>
    <CollapseItem name="1" title="一致性">
      手风琴模式下，同一时刻只会展开一个面板。
    </CollapseItem>
    <CollapseItem name="2" title="反馈">
      切换到当前面板时，其他面板会自动收起。
    </CollapseItem>
    <CollapseItem name="3" title="效率" disabled>
      该项已禁用，无法展开。
    </CollapseItem>
  </Collapse>
</template>
