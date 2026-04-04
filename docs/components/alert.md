---
title: Alert | Pure-Element
description: Alert 组件的文档
---

# Alert 警告
用于页面中展示重要的提示信息。

## 基础用法
通过 `type` 指定不同的主题色，使用 `closable` 控制是否可关闭，`effect` 指定浅色或深色主题。

<preview path="../demo/Alert/Basic.vue" title="基础用法" description="Alert 组件的基础用法"></preview>

## 关闭事件

设置 `closable` 后，用户点击关闭图标会触发 `close` 事件。

<preview path="../demo/Alert/Close.vue" title="关闭事件" description="Alert close 事件"></preview>

## API

### Alert Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容（也可以用默认插槽） | `string` | - |
| type | 主题类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | primary |
| effect | 主题风格 | `'light' \| 'dark'` | light |
| closable | 是否可关闭 | `boolean` | false |

### Alert Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭时触发 | - |
