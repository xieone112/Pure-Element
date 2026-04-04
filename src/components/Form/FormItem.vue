<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, provide, reactive } from 'vue';
import type { FormItemContext, FormItemProps, FormValidateFailure, ValidateStatusProps, FormItemInstance } from './types';
import { formContextKey, formItemContextKey } from './types';
import { isNil } from 'lodash-es';
import Schema from 'async-validator'

  defineOptions({
    name:'PrFormItem'
  })
  const props = defineProps<FormItemProps>()
  const formContext = inject(formContextKey)

  const validateStatus=reactive<ValidateStatusProps>({
    states:'init',
    errorMsg:'',
    loading:true
  })
  const innerValue=computed(()=>{
    const model=formContext?.model
    if(model&&props.prop&&!isNil(model[props.prop])){
      return model[props.prop]
    }else{
      return null
    }
  }) 
  let initialValue : any = null
  const itemRules=computed(()=>{
    const rules=formContext?.rules
    if(rules&&props.prop&&!isNil(rules[props.prop])){
      return rules[props.prop]
    }else{
      return []
    }
  }) 
  const isRequired=computed(()=>itemRules.value?.some(rule=>rule.required))

  const getTriggeredRules=(trigger?:string)=>{
    const rules=itemRules.value
    if(rules){
      return rules.filter(rule=>{
        if(!rule.trigger||!trigger) return true
        return rule.trigger===trigger
      })
    }else{
      return []
    }
  }

  const validate=async (trigger?:string)=>{
    const triggeredRules=getTriggeredRules(trigger)
    if(triggeredRules.length===0) return true
    
    validateStatus.loading=true
    const modelName=props.prop
    if(modelName){
      const validator = new Schema({
        [modelName]: triggeredRules
      })
      return validator.validate({[modelName]:innerValue.value})
      .then(()=>{
        validateStatus.states='success'
      })
      .catch((e:FormValidateFailure)=>{
        const {errors}=e
        validateStatus.states='error'
        validateStatus.errorMsg=errors && errors.length>0 ? errors[0]?.message || ''  : ''
        return Promise.reject(e)
      }).finally(()=>{
        validateStatus.loading=false
      })
    }
  }

  const clearValidate=()=>{
    validateStatus.states='init'
    validateStatus.errorMsg=''
    validateStatus.loading=false
  }
  const resetField=()=>{
    clearValidate()
    const model=formContext?.model
    if(model&&props.prop&&!isNil(model[props.prop])){
      model[props.prop]=initialValue
    }
  }

  const context:FormItemContext={
    validate,
    prop:props.prop||'',
    clearValidate,
    resetField
  }
  provide(formItemContextKey,context)

  onMounted(()=>{
    if(props.prop){
      formContext?.addField(context)
      initialValue=innerValue.value
    }
  })
  onUnmounted(()=>{
    formContext?.removeField(context)
  })

  defineExpose<FormItemInstance>({
     validateStatus,
     validate,
     clearValidate,
     resetField
  })
</script>
<template>
  <div 
    class="pr-form-item"
    :class="{
      'is-error':validateStatus.states==='error',
      'is-success':validateStatus.states==='success',
      'is-loading':validateStatus.loading,
      'is-required':isRequired
    }"
  >
    <label class="pr-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <div class="pr-form-item__content">
      <slot :validate="validate"/>
      <div 
        class="pr-form-item__error-msg"
        v-if="validateStatus.states==='error'"
      >
      {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>