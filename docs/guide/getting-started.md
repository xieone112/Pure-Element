---
title: 快速开始 | Pure-Element
description: Pure Element 的安装与基础使用
---

# 快速开始

## 安装

```bash
npm i pure-element
```

## 全量引入

在入口文件中注册插件并引入样式：

```ts
import { createApp } from 'vue'
import PureElement from 'pure-element'
import 'pure-element/dist/index.css'
import App from './App.vue'

createApp(App).use(PureElement).mount('#app')
```

## 按需引入

你可以只引入需要的组件：

```ts
import { createApp } from 'vue'
import { Button, Input } from 'pure-element'
import 'pure-element/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.component(Button.name!, Button)
app.component(Input.name!, Input)
app.mount('#app')
```

## 全局方法

部分能力通过函数调用使用：

```ts
import { createMessage } from 'pure-element'

createMessage({
  type: 'success',
  message: '保存成功',
})
```

更多参数说明请查看全局 API 页面。
