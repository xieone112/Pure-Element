---
title: Dropdown | Pure-Element
description: Dropdown 组件的文档
---

# Dropdown 下拉菜单
用于承载多项操作的下拉列表。

## 基础用法
传入 `menuOptions` 作为菜单数据源，通过 `select` 事件获取用户选择的菜单项。

<preview path="../demo/Dropdown/Basic.vue" title="基础用法" description="Dropdown 组件的基础用法"></preview>

## 手动控制

设置 `manual` 后，可通过组件实例的 `show`/`hide` 方法控制显示与隐藏。

<preview path="../demo/Dropdown/Manual.vue" title="手动控制" description="Dropdown manual 与 exposed 方法"></preview>

## API

### Dropdown Attributes

继承 Tooltip 的全部属性，另外支持：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| menuOptions | 下拉菜单选项列表 | `menuOption[]` | [] |
| hideAfterClick | 选择后是否自动收起 | `boolean` | true |

Tooltip 继承属性：`trigger`、`placement`、`manual`、`openDelay`、`closeDelay`、`transition`、`popperOptions`。

`menuOption` 结构：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 文本或自定义节点 | `string \| VNode` | - |
| key | 唯一标识 | `string \| number` | - |
| disabled | 是否禁用 | `boolean` | false |
| divided | 是否展示分割线 | `boolean` | false |

### Dropdown Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| visible-change | 下拉菜单显示状态变化 | `(visible: boolean)` |
| select | 选中菜单项时触发 | `(option: menuOption)` |

### Dropdown Exposes

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| show | 手动显示菜单 | `() => void` |
| hide | 手动隐藏菜单 | `() => void` |
