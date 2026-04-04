<script setup lang="ts">
  import type { SelectProps, SelectEmits, SelectOption,SelectStates } from './types'
  import Tooltip from '../Tooltip/Tooltip.vue';
  import Input from '../Input/Input.vue';
  import Icon from '../Icon/Icon.vue';
  import { computed, reactive, ref } from 'vue';
  import type { TooltipInstance } from '../Tooltip/types';
  import type{ InputInstance } from '../Input/types';
  import RenderVnode from '../Common/RenderVnode';
  import { watch } from 'vue';
import { debounce, isFunction } from 'lodash-es';
  defineOptions({
    name: 'PrSelect'
  })

  const popperOptions:any={
    modifiers:[
      {
        name:'offset',
        options:{
          offset:[0,9],
        }
      },
      {
        name: "sameWidth",
        enabled: true,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: ({ state }: { state: any }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        effect: ({ state }: { state: any }) => {
          state.elements.popper.style.width = `${
            state.elements.reference.offsetWidth
          }px`;
        }
      }
    ],
  }


  // 单选模式：根据 value 查找单个选项。
  const findOption=(value:SelectOption['value'])=>{
    const option=props.options.find(option=>option.value===value)
    return option ? option : null
  }

  // 多选模式：根据 value 数组批量查找选项。
  const findOptions=(values:SelectOption['value'][])=>{
    return props.options.filter(option=>values.includes(option.value))
  }

  // 输入框展示值：单选显示一个 label，多选通过 tag 展示，因此输入框文本保持为空。
  const getInputDisplayValue=(single:SelectOption | null)=>{
    if(props.multiple){
      return ''
    }
    return single ? single.label : ''
  }

  const props = withDefaults(defineProps<SelectProps>(),{
    options:()=>[]
  })
  const emits = defineEmits<SelectEmits>()
  const initialOption = props.multiple ? null : findOption(props.modelValue as SelectOption['value'])
  const initialOptions = props.multiple && Array.isArray(props.modelValue)
    ? findOptions(props.modelValue as SelectOption['value'][])
    : []
  const states = reactive<SelectStates>({
    inputValue: getInputDisplayValue(initialOption),
    selectedOption: initialOption,
    selectedOptions: initialOptions,
    mouseHover: false,
    loading: false,
    highlightIndex: -1
  })

  // 保持内部选中状态与父组件 v-model 同步。
  const syncSelectionByModelValue=(modelValue: SelectProps['modelValue'])=>{
    if(props.multiple){
      const values=Array.isArray(modelValue) ? modelValue as SelectOption['value'][] : []
      states.selectedOptions=findOptions(values)
      states.selectedOption=null
    }else{
      const option=findOption(modelValue as SelectOption['value'])
      states.selectedOption=option
      states.selectedOptions=[]
    }
    states.inputValue=getInputDisplayValue(states.selectedOption)
  }

  watch(() => props.modelValue, (newVal) => {
    syncSelectionByModelValue(newVal)
  })

  const tooltipRef=ref<TooltipInstance>()
  const inputRef=ref<InputInstance>()
  const isDropDownShow=ref(false)
  
  const controlDropDown=(show:boolean)=>{
    if(show){
      // 筛选模式下，展开下拉时先清空输入关键字。
      if(props.filterable && (states.selectedOption || states.selectedOptions.length>0)){
        states.inputValue=''
      }
      if(props.filterable){
        onFilter()
      }
      tooltipRef.value?.show()
    }else{
      tooltipRef.value?.hide()
      // 收起下拉时，回填当前已选项的展示文本。
      if(props.filterable){
        states.inputValue=getInputDisplayValue(states.selectedOption)
      }
    }
    isDropDownShow.value=show
    emits('visible-change',show)
    states.highlightIndex=-1
  }
  const toggleDropDown=()=>{
    if(props.disabled)return
    if(isDropDownShow.value){
      controlDropDown(false)
    }else{
      controlDropDown(true)
    }
  }

  const showClearIcon=computed(()=>{
    const hasValue=props.multiple ? states.selectedOptions.length>0 : !!states.selectedOption
    return states.mouseHover && hasValue && props.clearable
  })
  const onClear=()=>{
    states.selectedOption=null
    states.selectedOptions=[]
    states.inputValue=''
    const emptyValue=props.multiple ? [] : ''
    emits('change',emptyValue)
    emits('update:modelValue',emptyValue)
    emits('clear')
  }
  const NOOP=()=>{}

  const removeTag=(option:SelectOption)=>{
    if(props.disabled) return
    const selectedList=states.selectedOptions.filter(item=>item.value!==option.value)
    states.selectedOptions=selectedList
    emits('change',selectedList.map(item=>item.value))
    emits('update:modelValue',selectedList.map(item=>item.value))
  }

  // 统一的选中态判断，单选和多选共用。
  const isOptionSelected=(option:SelectOption)=>{
    if(props.multiple){
      return states.selectedOptions.some(item=>item.value===option.value)
    }
    return option.value===states.selectedOption?.value
  }

  const itemSelect=(e:SelectOption)=>{
    if(props.disabled || e.disabled) return
    if(props.multiple){
      // 多选模式：点击同一项可在“选中/取消选中”之间切换。
      const selectedList=[...states.selectedOptions]
      const currentIndex=selectedList.findIndex(item=>item.value===e.value)
      if(currentIndex>-1){
        selectedList.splice(currentIndex,1)
      }else{
        selectedList.push(e)
      }
      states.selectedOptions=selectedList
      states.selectedOption=null
      emits('change',selectedList.map(item=>item.value))
      emits('update:modelValue',selectedList.map(item=>item.value))
      // 筛选模式保留输入框用于继续输入；非筛选模式展示已选标签文本。
      states.inputValue=props.filterable ? '' : getInputDisplayValue(null)
    }else{
      // 单选模式：更新选中值并关闭下拉。
      states.inputValue=e.label
      states.selectedOption=e
      emits('change',e.value)
      emits('update:modelValue',e.value)
      controlDropDown(false)
    }
    inputRef.value?.ref.focus()
  }

  const filteredOptions=ref(props.options)
  watch(()=>props.options,(newOptions)=>{
    filteredOptions.value=newOptions
    // 远程筛选后 options 可能变化，这里重新映射当前 modelValue。
    syncSelectionByModelValue(props.modelValue)
  })
  const generateFilterOptions= async (searchValue:string)=>{
    if(!props.filterable) return
    if(props.filterMethod && isFunction(props.filterMethod)){
      // 优先级最高：使用用户传入的本地筛选函数。
      filteredOptions.value= props.filterMethod(searchValue)
    }else if(props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
      try{
        states.loading=true
        // 远程模式：remoteMethod 需要返回 Promise<SelectOption[]>。
        filteredOptions.value=await props.remoteMethod(searchValue)
      }catch(e){
        console.error(e)
      }finally{
        states.loading=false
      }
    }else{
      // 默认筛选：按 label.includes 进行匹配。
      filteredOptions.value=props.options.filter(option=>option.label.includes(searchValue))
    }
    states.highlightIndex=-1
  }
  const onFilter=()=>{
    generateFilterOptions(states.inputValue)
  }
  const timeout=computed(()=>props.remote ? 300 : 0)
  const debounceOnFilter=debounce(()=>onFilter(),timeout.value)

  const filteredPlaceholder=computed(()=>{
    if(props.multiple){
      return states.selectedOptions.length > 0 ? '' : props.placeholder
    }
    return (props.filterable && states.selectedOption && isDropDownShow.value)
      ? states.selectedOption.label
      : props.placeholder
  })

  const handleKeyDown=(e:KeyboardEvent)=>{
    // 键盘交互：打开/关闭、选中，以及高亮项上下移动。
    switch(e.key){
      case 'Enter':
        if(!isDropDownShow.value){
          controlDropDown(true)
        }else{
          if(states.highlightIndex>-1 && filteredOptions.value[states.highlightIndex]){
            itemSelect(filteredOptions.value[states.highlightIndex]!)
          }else{
            controlDropDown(false)
          }
        }
        break
      case 'Escape':
        if(isDropDownShow.value){
          controlDropDown(false)
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if(filteredOptions.value.length>0){
          if(states.highlightIndex===-1||states.highlightIndex===0){
            states.highlightIndex=filteredOptions.value.length-1
          }else{
            states.highlightIndex--
          }
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if(filteredOptions.value.length>0){
          if(states.highlightIndex===-1||states.highlightIndex===filteredOptions.value.length-1){
            states.highlightIndex=0
          }else{
            states.highlightIndex++
          }
        }
        break
      case 'Backspace':
        if(props.multiple && props.filterable && states.inputValue === '' && states.selectedOptions.length > 0){
          removeTag(states.selectedOptions[states.selectedOptions.length - 1]!)
        }
        break
    }
  }
</script>

<template>
  <div
    class="pr-select"
    :class="{
      'is-disabled':disabled,
      'is-multiple': multiple
    }"
    @click="toggleDropDown"
    @mouseenter="states.mouseHover=true"
    @mouseleave="states.mouseHover=false"
  >
    <Tooltip
      placement="bottom-start"
      manual
      ref="tooltipRef"
      :popper-options="popperOptions"
      @click-outside="controlDropDown(false)"
    >
      <Input 
        v-model="states.inputValue"
        ref="inputRef"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable||!isDropDownShow"
        @input="debounceOnFilter"
        @keydown="handleKeyDown"
      >
      <template #prefix v-if="multiple && states.selectedOptions.length">
        <div class="pr-select__tags">
          <span class="pr-select__tag" v-for="item in states.selectedOptions" :key="String(item.value)">
            <span class="pr-select__tag-text">{{ item.label }}</span>
            <Icon
              icon="xmark"
              class="pr-select__tag-close"
              @mousedown.prevent="NOOP"
              @click.stop="removeTag(item)"
            />
          </span>
        </div>
      </template>
      <template #suffix>
        <Icon
          icon="circle-xmark"
          v-if="showClearIcon"
          class="pr-select__clear" 
          @mousedown.prevent="NOOP"
          @click.stop="onClear"
        />
        <Icon 
          icon="angle-down" 
          v-else
          :class="{'is-active':isDropDownShow}"
          class="header-angle"
        />
      </template>
      </Input>
      <template #content>
        <div class="pr-select__loading" v-if="states.loading"><Icon icon="spinner" spin/></div>
        <div class="pr-select__nodata" v-else-if="filterable && filteredOptions.length===0">no matching data</div>
        <ul class="pr-select__menu" v-else>
          <template v-for="(item,index) in filteredOptions" :key='index'>
            <li
              class="pr-select__menu-item"
              :class="{
                'is-disabled':item.disabled,
                'is-selected':isOptionSelected(item),
                'is-highlighted':index===states.highlightIndex
                }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label"/>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
