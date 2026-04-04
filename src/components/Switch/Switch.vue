<script setup lang="ts">
  import { ref, computed, onMounted,watch } from 'vue';
  import type{ SwitchProps,SwitchEmits } from './types';
  defineOptions({
    name:'PrSwitch',
    inheritAttrs:false
  })
  const props= withDefaults(defineProps<SwitchProps>(),{
    activeValue:true,
    inactiveValue:false,
    modelValue: false 
  })
  const emits= defineEmits<SwitchEmits>()
  const innerValue=ref(props.modelValue)
  const checked=computed(()=>innerValue.value===props.activeValue)
  const switchValue=()=>{
    console.log('click',innerValue.value,checked.value)
    if(props.disabled) return
    const newValue=checked.value?props.inactiveValue:props.activeValue
    innerValue.value=newValue!
    emits('change',newValue!)
    emits('update:modelValue',newValue!)
  }
  const input=ref<HTMLInputElement>()
  onMounted(()=>{
    input.value!.checked=checked.value
  })
  watch(checked,(val)=>{
    input.value!.checked=val
  })
  watch(()=>props.modelValue,(val=>{
    innerValue.value=val
  }))
</script>
<template>
  <div 
    class="pr-switch"
    :class="{
      [`pr-switch--${size}`]:size,
      'is-disabled':disabled,
      'is-checked':checked
    }"
    @click="switchValue"
  >
    <input 
      class="pr-switch__input"
      :name="name"
      type="checkbox"
      :disabled="disabled"
      role="switch"
      @keydown.enter="switchValue"
      ref="input"
    >
    <div class="pr-switch__core">
      <div class="pr-switch__core-inner">
        <span class="pr-switch__core-inner-text" v-if="activeText||inactiveText">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="pr-switch__core-action"></div>
    </div>
  </div>
</template>