---
title: Button | Pure-Element
description: Button 组件的文档
---

# Button 按钮
常用的操作按钮。

## 基础用法
使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button组件的基础用法"></preview>

## 原生类型

通过 `native-type` 指定原生 `button` 标签的 type，可用于表单提交与重置。

<preview path="../demo/Button/NativeType.vue" title="原生类型" description="Button native-type 用法"></preview>

## API

### Button Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 按钮尺寸 | `'large' \| 'small'` | - |
| type | 按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | - |
| plain | 是否朴素按钮 | `boolean` | false |
| round | 是否圆角按钮 | `boolean` | false |
| circle | 是否圆形按钮 | `boolean` | false |
| loading | 是否加载中 | `boolean` | false |
| disabled | 是否禁用 | `boolean` | false |
| icon | 图标名称 | `string` | - |
| autofocus | 是否自动聚焦 | `boolean` | false |
| native-type | 原生 type 属性 | `'button' \| 'submit' \| 'reset'` | button |

### Button Exposes

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| ref | 原生按钮节点 | `HTMLButtonElement` |
