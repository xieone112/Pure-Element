<script setup lang="ts">
import { ref } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import type { TooltipInstance } from '../Tooltip/types';
import type { DropdownInstance, DropdownEmits,DropdownProps,menuOption } from './types';
import RenderVnode from '../Common/RenderVnode';

defineOptions({
  name:'PrDropdown'
})

const props=withDefaults(defineProps<DropdownProps>(),{
  hideAfterClick:true
})
const emits=defineEmits<DropdownEmits>()
const tooltipRef=ref<null|TooltipInstance>(null)

const visibleChange=(e:boolean)=>{
  emits('visible-change',e)
}
const itemClick=(e:menuOption)=>{
  if(e.disabled)return
  if(props.hideAfterClick) tooltipRef.value?.hide()
  emits('select',e)
}
defineExpose<DropdownInstance>({
  'show':()=>tooltipRef.value?.show(),
  'hide':()=>tooltipRef.value?.hide()
})
</script>
<template>
  <div class="pr-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement= "placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      :transition="transition"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
    <slot></slot>
    <template #content>
      <ul class="pr-dropdown__menu">
        <template v-for="item in menuOptions" :key="item.key">
          <li
            v-if="item.divided"
            role="separator"
            class="divided-placeholder"
          ></li>
          <li
            class="pr-dropdown__item"
            :class="{'is-disabled':item.disabled,'is-divided':item.divided}"
            :id="`dropdown-item-${item.key}`"
            @click="itemClick(item)"
          >
            <RenderVnode :vNode="item.label"/>
          </li>
        </template>
      </ul>
    </template>
    </Tooltip>
  </div>
</template>