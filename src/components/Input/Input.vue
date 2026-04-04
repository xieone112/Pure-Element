<script setup lang="ts">
  import { computed, ref,useAttrs,watch,nextTick, inject } from 'vue';
  import type { InputEmits, InputProps } from './types';
  import Icon from '../Icon/Icon.vue';
  import { formItemContextKey } from '../Form/types';
  import type { FormItemContext } from '../Form/types';
  defineOptions({
    name:'PrInput',
    inheritAttrs:false
  })

  const formItemContext = inject<FormItemContext | undefined>(formItemContextKey, undefined);
  const runValidation = (trigger?:string) => {
    formItemContext?.validate(trigger).catch(e=>console.log(e.errors));
  }

  const attrs=useAttrs()
  const props= withDefaults(defineProps<InputProps>(), {
    type: 'text',
    autocomplete:'off'
  })
  const emits=defineEmits<InputEmits>()
  const innerValue=ref(props.modelValue)
  watch(()=>props.modelValue,(newValue)=>{
    innerValue.value=newValue
  })
  
  const handleInput=()=>{
    emits('update:modelValue',innerValue.value!)
    emits('input',innerValue.value!)
    runValidation('input')
  }
  const handleChange=()=>{
    emits('change',innerValue.value!)
    runValidation('change')
  }

  const isFocus=ref(false)
  const showClear=computed(()=>
    props.clearable &&
    !props.disabled &&
    !!innerValue.value &&
    isFocus.value
  )
  const handleFocus=(event:FocusEvent)=>{
    isFocus.value=true
    emits('focus',event)
  }
  const handleBlur=(event:FocusEvent)=>{
    isFocus.value=false
    runValidation('blur')
    emits('blur',event)
  }
  const clear=()=>{
    innerValue.value=''
    emits('update:modelValue','')
    emits('clear')
    emits('input','')
    emits('change','')
  }

  const passwordVisible=ref(false)
  const showPasswordArea=computed(()=>
    props.showPassword &&
    !props.disabled &&
    !!innerValue.value
  )
  const togglePassworVisible=()=>{
    passwordVisible.value=!passwordVisible.value
  }
  const inputRef=ref<HTMLInputElement|null>(null)
  defineExpose({
    ref:inputRef
  })
  const keepFocus=async()=>{
    await nextTick()
    inputRef.value?.focus()
  }
  const NOOP=()=>{}
</script>
<template>
  <div 
  class="pr-input"
  :class="{
    [`pr-input--${type}`]:type,
    [`pr-input--${size}`]:size,
    'is-disable':disabled,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
    'is-focus':isFocus
  }"
  >
  <!-- input -->
   <template v-if="type!=='textarea'">
      <!-- prepend slot -->
       <div v-if="$slots.prepend" class="pr-input__prepend">
        <slot name="prepend"></slot>
       </div>
       <div class="pr-input__wrapper">
        <!-- prefix slot -->
         <span v-if="$slots.prefix" class="pr-input__prefix">
          <slot name="prefix"></slot>
         </span>
         <input 
          class="pr-input__inner"
          ref="inputRef"
          v-bind="attrs"
          :type="showPassword?(passwordVisible?'text':'password'):type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
         />
         <!-- suffix slot -->
          <span v-if="$slots.suffix || showClear || showPasswordArea" class="pr-input__suffix" @click="keepFocus">
            <slot name="suffix"></slot>
            <Icon 
              icon="circle-xmark" 
              v-if="showClear" 
              class="pr-input__clear" 
              @click="clear"
              @mousedown.prevent="NOOP"
            />
            <Icon 
              icon="eye" 
              v-if="showPassword && passwordVisible" 
              class="pr-input__password"
              @click="togglePassworVisible"
            />
            <Icon 
              icon="eye-slash" 
              v-if="showPassword && !passwordVisible" 
              class="pr-input__password"
              @click="togglePassworVisible"
            />
          </span>
       </div>
       <!-- append slot -->
       <div v-if="$slots.append" class="pr-input__append">
        <slot name="append"></slot>
       </div>
   </template>
   <!-- textarea -->
    <template v-else>
      <textarea 
        class="pr-textarea__wrapper"
        ref="inputRef"
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >

      </textarea>
    </template>
  </div>
</template>