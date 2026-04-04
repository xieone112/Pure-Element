---
title: Collapse | Pure-Element
description: Collapse 组件的文档
---

# Collapse 折叠面板
通过折叠面板来收纳、展开内容区域。

## 基础用法
通过 `v-model` 绑定当前展开的面板 `name` 数组，每个面板通过 `name` 标识。

<preview path="../demo/Collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>

## 手风琴模式

设置 `accordion` 后，同一时刻只会展开一个面板。

<preview path="../demo/Collapse/Accordion.vue" title="手风琴模式" description="Collapse accordion 用法"></preview>

## API

### Collapse Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前激活的面板 name 列表 | `Array<string \| number>` | - |
| accordion | 是否开启手风琴模式（单选） | `boolean` | false |

### Collapse Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 折叠面板激活项发生变化时触发 | `(names: Array<string \| number>)` |
| change | 同上，语义化别名 | `(names: Array<string \| number>)` |

### CollapseItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识 | `string \| number` | - |
| title | 面板标题（可用 slot 覆盖） | `string` | - |
| disabled | 是否禁用当前面板 | `boolean` | false |
