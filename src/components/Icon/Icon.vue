<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IconProps } from './types';
import { omit } from 'lodash-es';
import { computed } from 'vue';
defineOptions({
  name:'PrIcon',
  inheritAttrs:false
})
const props=defineProps<IconProps>()
const filteredProps=computed(()=>omit(props,['type','color']))
const customStyles=computed(()=>props.color?{color:props.color}:{})
</script>
<template>
  <i class="pr-icon" :class="{[`pr-icon-${type}`]:type}" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps"></font-awesome-icon>
  </i>
</template>