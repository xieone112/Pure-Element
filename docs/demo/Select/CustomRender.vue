<script setup lang="ts">
  import { ref, h } from 'vue'
  import Select from '@/components/Select/Select.vue'
import type { SelectOption } from '@/components/Select/types'
  const test = ref('')
  const options2 = [
    { label: 'hello', value: '1' },
    { label: 'xyz', value: '2' },
    { label: 'testing', value: '3' },
    { label: 'check', value: '4', disabled: true }
  ]
  const customRender=(option:SelectOption)=>{
    return h('div',{class:'xyz'},[h('b', option.label), h('span', {}, [String(option.value)])])
  }
</script>
<template>
  <Select v-model="test" placeholder="基础选择器,请选择" :options="options2" :render-label="customRender"/>
</template>
<style>
  .pr-select_menu-item, .xyz{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
</style>