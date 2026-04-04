<script setup lang="ts">
import { computed, inject } from 'vue';
import type { CollapseItemProps } from './types';
import { collapseContextKey } from './types';
import Icon from '../Icon/Icon.vue';
defineOptions({
  name:'PrCollapseItem'
})
const props= defineProps<CollapseItemProps>()
const collapseContext=inject(collapseContextKey)
const isActive=computed(()=>collapseContext?.activeNames.value.includes(props.name))
const handleClick=()=>{
  if(props.disabled) return
  collapseContext?.handleItemClick(props.name)
}

const transitionEvents:Record<string,(el:HTMLElement)=>void>={
  beforeEnter(el){
    el.style.height='0px'
    el.style.overflow='hidden'
  },
  enter(el){
    el.style.height=`${el.scrollHeight}px`
  },
  afterEnter(el){
    el.style.height=''
    el.style.overflow=''
  },
  beforeLeave(el){
    el.style.height=`${el.scrollHeight}px`
  },
  leave(el){
    el.style.height='0px'
    el.style.overflow='hidden'
  },
  afterLeave(el){
    el.style.height=''
    el.style.overflow=''
  }
}
</script>
<template>
  <div class="pr-collapse-item"
    :class="{'is-disable':disabled}"
  >
    <div class="pr-collapse-item__header" 
    :class="{'is-active':isActive,'is-disabled':disabled}"
    :id="`item-header-${name}`" 
    @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle"/>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="pr-collapse-item__wrapper" v-show="isActive">
        <div class="pr-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style>
</style>