---
title: Message | Pure-Element
description: Message 组件的文档
---

# Message 消息
常用于主动操作后的全局反馈提示。

## 基础用法
通过 `createMessage` 函数快速在页面中创建一条消息。

<preview path="../demo/Message/Basic.vue" title="基础用法" description="Message 基础用法"></preview>

## 不同状态
支持 `info`、`success`、`warning`、`danger` 四种状态，并支持同时存在多条消息。

<preview path="../demo/Message/Message.vue" title="不同状态" description="Message 不同状态"></preview>

## API

### Message Options

通过 `createMessage(options)` 传入的参数基于 `MessageProps`，去除了内部管理的字段：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 文本或自定义节点内容 | `string \| VNode` | '' |
| duration | 显示时间，单位毫秒，0 表示不会自动关闭 | `number` | 3000 |
| showClose | 是否显示关闭按钮 | `boolean` | false |
| type | 消息类型 | `'success' \| 'warning' \| 'danger' \| 'info'` | info |
| offset | 距离页面顶部的偏移量 | `number` | 20 |
| transitionName | 过渡动画名称 | `string` | fade |

### Message Methods

从 `@/components/Message/method` 中导出：

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| createMessage | 创建一条消息实例 | `(options: CreateMessageProps) => MessageContext` |
| closeAll | 关闭当前所有消息 | `() => void` |
