<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import Button from './components/Button/Button.vue'
import type { ButtonInstance } from './components/Button/types';
// import type { TooltipInstance } from './components/Tooltip/types';
import Collapse from './components/Collapse/Collapse.vue';
import Item from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import Alert from './components/Alert/Alert.vue';
// import Tooltip from './components/Tooltip/Tooltip.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import { createMessage } from './components/Message/method';
// import type { Options } from '@popperjs/core';
import type { DropdownInstance, menuOption } from './components/Dropdown/types';

const buttonRef=ref<null|ButtonInstance>(null)
const tooltipRef=ref<null|DropdownInstance>(null)
const trigger = ref<any>('hover')
const open=()=>tooltipRef.value?.show()
const close=()=>tooltipRef.value?.hide()
// const options:Partial<Options>={placement:'right'}
  const menuOptions: menuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

const openedValue=ref(['a'])
onMounted(()=>{
  if(buttonRef.value)console.log(buttonRef.value.ref);
  createMessage({message:'hello message',duration:0,showClose:true})
  createMessage({message:'hello message again',duration:0,type:'warning',showClose:true})
  createMessage({message:'hello message three',type:'success'})
  setTimeout(()=>{
    openedValue.value=['a','b']
    // trigger.value='hover'
    // instance.destroy()
  },1000)
})


const inlineConsole=(...args:any)=>{
  console.log(...args);
}
</script>

<template>
  <header>
    <!-- <Tooltip content="hello" :trigger="trigger" ref="tooltipRef" :open-delay="1000" :close-delay="200" :popper-options="options">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>
    </Tooltip> -->
    <Dropdown 
      placement="bottom" 
      :trigger="trigger" 
      :menu-options="menuOptions"
      ref="tooltipRef"
      @visible-change="e=>inlineConsole('visible-change',e)"
      @select="e=>inlineConsole('select',e)"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>
    </Dropdown>
  </header>
  <Icon icon="arrow-right" type="danger" color="green"/>
  <main>
    <Button ref="buttonRef" @click="open">Test Button</Button>
    <Button plain @click="close">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br/><br/>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br/><br/>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br/><br/>
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br/><br/>
    <Button size="large" loading>Loading</Button>
    <Button size="large" icon="arrow-up">Icon</Button><br/><br/>   
  </main>
  
  <hr>
  <Collapse v-model='openedValue' accordion>
      <Item name="a">
        <template #title>
          <h1>Title A</h1>
        </template>
        <h1>headline title</h1>
        <div> this is content a aaa </div>
      </Item>
      <Item name="b" title="Title B">
        <div> this is bbbbb test </div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div> this is cccc test </div>
      </Item>
    </Collapse>
    {{ openedValue }}
    <div style="max-width: 600px">
      <Alert content="Primary alert" type="primary" closable/>
      <Alert content="Success alert" type="success" closable/>
      <Alert content="Info alert" type="info" closable/>
      <Alert content="Warning alert" type="warning" closable/>
      <Alert content="Error alert" type="danger" closable/>
    </div>
    <div style="max-width: 600px">
      <Alert content="Primary alert" type="primary" effect="dark" />
      <Alert content="Success alert" type="success" effect="dark" />
      <Alert content="Info alert" type="info" effect="dark" />
      <Alert content="Warning alert" type="warning" effect="dark" />
      <Alert content="Error alert" type="danger" effect="dark" />
    </div>
</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  border: 1px solid green;
}
.pr-tooltip__popper {
  border: 1px solid red;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
