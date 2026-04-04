<script lang="ts" setup>
  import { provide } from 'vue';
  import type { FormContext, FormInstance, FormItemContext, FormProps, FormValidateFailure } from './types';
  import { formContextKey } from './types';
  import type { ValidateFieldsError } from 'async-validator';

  defineOptions({
    name:'PrForm'
  })
  const props = defineProps<FormProps>()   
  const fields:FormItemContext[]=[] 
  const addField:FormContext['addField']=(field:FormItemContext)=>{
    fields.push(field)
  }
  const removeField:FormContext['removeField']=(field:FormItemContext)=>{
    if(field.prop){
      fields.splice(fields.indexOf(field),1)
    }
  }
  provide(formContextKey,{
    ...props,
    addField,
    removeField
  })
  const validate = async () =>{
    let validationErrors:ValidateFieldsError={}
    for (const field of fields) {
      try{
        await field.validate('')
      }catch(e){
        const error=e as FormValidateFailure
        validationErrors={
          ...validationErrors,
          ...error.fields
        }
      }
    }
    if (Object.keys(validationErrors).length===0) return true
    return Promise.reject(validationErrors)
  }
  const resetFields=(keys:string[]=[])=>{
    const filterArr=keys.length>0 ? fields.filter(field=>keys.includes(field.prop)) : fields
    filterArr.forEach(field=>field.resetField())
  }
  const clearValidate=(keys:string[]=[])=>{
    const filterArr=keys.length>0 ? fields.filter(field=>keys.includes(field.prop)) : fields
    filterArr.forEach(field=>field.clearValidate())
  }
  defineExpose<FormInstance>({
    validate,
    resetFields,
    clearValidate
  })
</script>
<template>
  <form action="" class="pr-form">
    <slot/>
  </form>
</template>