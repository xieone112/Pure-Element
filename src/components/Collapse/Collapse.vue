<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import type { NameType,CollapseProps,CollapseEmit } from './types';
import { collapseContextKey } from './types';
defineOptions({
  name:'PrCollapse'
})
const props= defineProps<CollapseProps>()
const emits=defineEmits<CollapseEmit>()
const activeNames=ref<NameType[]>(props.modelValue)
watch(()=>props.modelValue,()=>{
  activeNames.value=props.modelValue
  if(props.accordion&&activeNames.value.length>1){
  console.warn('accordion mode should only have one active item')
}
})
if(props.accordion&&activeNames.value.length>1){
  console.warn('accordion mode should only have one active item')
}
const handleItemClick=(item:NameType)=>{
  let _activeNames=[...activeNames.value]
  if(props.accordion){
    _activeNames=[_activeNames[0]===item?'':item]
  }else{
    const index=_activeNames.indexOf(item)
    if(index>-1){
      _activeNames.splice(index,1)
    }else{
      _activeNames.push(item)
    }
  }
  activeNames.value=_activeNames
  emits('update:modelValue',_activeNames)
  emits('change',_activeNames)
}
provide(collapseContextKey,{
  activeNames,
  handleItemClick
})
</script>
<template>
  <div class="pr-collapse">
    <slot></slot>
  </div>
</template>