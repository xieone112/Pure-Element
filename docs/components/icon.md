---
title: Icon | Pure-Element
description: Icon 组件的文档
---

# Icon 图标
对 Font Awesome 图标的轻量封装，用于在页面中展示各种状态、操作图标。

## 基础用法
通过 `icon` 指定图标名，使用 `type` 或 `color` 控制颜色。

<preview path="../demo/Icon/Basic.vue" title="基础用法" description="Icon 组件的基础用法"></preview>

## API

### Icon Attributes

Icon 组件大部分属性与 `@fortawesome/vue-fontawesome` 一致，这里列出 Pure-Element 扩展的部分：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 预设类型，用于统一主题色 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | - |
| color | 自定义颜色 | `string` | - |
| icon | 图标名称或定义 | `object \| string \| string[] \| IconDefinition` | - |

其他属性（如 `size`、`spin` 等）请参考 Font Awesome 官方文档。
