<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import type { TooltipProps,TooltipEmits,TooltipInstance } from './types';
import { createPopper,  type Instance} from '@popperjs/core';
import useClickOutside from '@/hooks/useClickOutside';
import { debounce } from 'lodash-es';
defineOptions({
  name:'prTooltip'
})
const props=withDefaults(defineProps<TooltipProps>(),{
  placement:'bottom',
  trigger:'hover',
  transition:'fade',
  openDelay:0,
  closeDelay:0
})
const emits= defineEmits<TooltipEmits>()
const isOpen=ref(false)
const triggerNode=ref<HTMLElement>()
const popperNode=ref<HTMLElement>()
const popperContainerNode=ref<HTMLElement>()
let popperInstance:null|Instance=null
const popperOptions=computed(()=>{
  return {
    placement:props.placement,
    modifiers:[
      {
        name:'offset',
        options:{
          offset:[0,9],
        }
      }
    ],
    ...props.popperOptions
  }
})

let openTimes=0
let closeTimes=0

const open=()=>{
    openTimes++
    console.log('openTimes:',openTimes);
    isOpen.value=true
    emits('visible-change',true)
}
const close=()=>{
    closeTimes++
    console.log('closeTimes:',closeTimes);
    isOpen.value=false
    emits('visible-change',false)
  }

const openDebounce=debounce(open,props.openDelay)
const closeDebounce=debounce(close,props.closeDelay)
const openFinal=()=>{
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal=()=>{
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper=()=>{
  if(!isOpen.value){
    openFinal()
  }else{
    closeFinal()
  }
}

useClickOutside(popperContainerNode,()=>{
  if(props.trigger==='click'&&isOpen.value&&!props.manual){
    closeFinal()
  }
  if(isOpen.value){
    emits('click-outside',true)
  }
})

// let events:Record<string,any>=reactive({})
// let outerEvents:Record<string,any>=reactive({})
// const attachEvents=()=>{
//   if(props.trigger==='click'){
//     events['click']=togglePopper
//   }else if(props.trigger==='hover'){
//     events['mouseenter']=open
//     outerEvents['mouseleave']=close
//   }
// }
const events = ref<Record<string, any>>({})
const outerEvents = ref<Record<string, any>>({})
const popperEvents = ref<Record<string, any>>({})

// 统一管理不同触发方式下的事件绑定
const attachEvents = () => {
  if (props.trigger === 'click') {
    // 点击触发：只在触发元素上监听 click，关闭依赖外部点击（useClickOutside）
    events.value = { click: togglePopper }
    outerEvents.value = {}
    popperEvents.value = {}
  } else if (props.trigger === 'hover') {
    // 悬停触发：在触发元素和浮层上都监听 enter/leave，保证移到 content 上不会立刻关闭
    const hoverHandlers = {
      mouseenter: openFinal,
      mouseleave: closeFinal,
    }
    events.value = hoverHandlers
    popperEvents.value = hoverHandlers
    outerEvents.value = {}
  }
}
if(!props.manual){
  attachEvents()
}

watch(isOpen,(newValue)=>{
  if(newValue){
    if(triggerNode.value&&popperNode.value){
      popperInstance=createPopper(triggerNode.value,popperNode.value,popperOptions.value)
    }
  }
  // else{
  //   popperInstance?.destroy()
  // }
},{flush:'post'})
watch(()=>props.trigger,(newTrigger,oldTrigger)=>{
  if(newTrigger!==oldTrigger){
    events.value = {}  
    outerEvents.value = {}  
    popperEvents.value = {}
    attachEvents()
  }
})
watch(()=>props.manual,(isManual)=>{
  if(isManual){
    events.value = {}  
    outerEvents.value = {}  
    popperEvents.value = {}
  }else{
    attachEvents()
  }
})

defineExpose<TooltipInstance>({
  'show':openFinal,
  'hide':closeFinal
})
const destroyPopper = () => {
  popperInstance?.destroy()
}
onUnmounted(()=>destroyPopper)
</script>
<template>
  <div 
    class="pr-tooltip"
    ref="popperContainerNode"
    v-on="outerEvents"
  >
    <div
      class="pr-tooltip__trigger"
      ref="triggerNode"
      v-on="events"
    >
      <slot></slot>
    </div>
    <Transition :name="transition" @after-leave="destroyPopper">
      <div
        class="pr-tooltip__popper"
        ref="popperNode"
        v-if="isOpen"
        v-on="popperEvents"
      >
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>