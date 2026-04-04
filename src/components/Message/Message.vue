<script lang="ts" setup>
import type { MessageProps } from './types';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';
import { computed, onMounted, ref } from 'vue';
import { getLastBottomOffset } from './method';
import useEventListener from '@/hooks/useEventListener';

defineOptions({
  name:'PrMessage'
})

const props= withDefaults(defineProps<MessageProps>(),{
  type:'info',
  duration:3000,
  offset:20,
  transitionName:'fade-up'
})
const visible=ref(false)

const messageRef=ref<HTMLDivElement>()
//计算偏移高度
//这个div的高度
const height=ref(0)
//上一个实例的最下面的坐标数字，第一个是0
const lastOffset=computed(()=>getLastBottomOffset(props.id))
//这个元素应该使用的top
const topOffset=computed(()=>lastOffset.value+props.offset)
//这个元素为下个元素预留的offset，最低端bottom的值
const bottomOffset=computed(()=>height.value+topOffset.value)
const cssStyle=computed(()=>({
  top:topOffset.value+'px',
  zIndex:props.zIndex
}))

let timer:any
const startTimer=()=>{
  if(props.duration===0)return
  timer=setTimeout(()=>{
    visible.value=false
  },props.duration)
}
const clearTimer=()=>{
  clearTimeout(timer)
}

onMounted(async()=>{
  visible.value=true
  startTimer()
  // await nextTick()
  // height.value=messageRef.value!.getBoundingClientRect().height
})
// watch(visible,(newValue)=>{
//   if(!newValue){
//     props.onDestroy()
//   }
// })

const keydown=(e:Event)=>{
  const event =e as KeyboardEvent
  if(event.code==='Escape'){
    visible.value=false
  }
}
useEventListener(document,'keydown',keydown)

const destroyComponent=()=>{
   props.onDestroy()
}
const updateHeight=()=>{
  height.value = messageRef.value!.getBoundingClientRect().height
}

defineExpose({
  bottomOffset,visible
})

</script>
<template>
  <Transition
    :name="transitionName"
    @enter="updateHeight"
    @afterLeave="destroyComponent"
  >
  <div 
    class="pr-message" 
    :class="{
      [`pr-message--${type}`]:type,
      'is-close':showClose
    }"
    :style="cssStyle"
    role="alert" 
    v-show="visible"
    ref="messageRef"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <div class="pr-message__content">
      <slot><RenderVnode :vNode="message" v-if="message"/></slot>
    </div>
    <div class="pr-messge__close">
      <Icon icon="xmark" v-if="showClose" @click.stop="visible=false"/>
    </div>
  </div>
  </Transition>
</template>
