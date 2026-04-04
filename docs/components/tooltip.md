---
title: Tooltip | Pure-Element
description: Tooltip 组件的文档
---

# Tooltip 文字提示
常用于展示额外的说明信息。

## 基础用法
默认通过 `hover` 触发，可以设置 `content`、`placement` 等属性控制展示内容和位置。

<preview path="../demo/Tooltip/Basic.vue" title="基础用法" description="Tooltip 组件的基础用法"></preview>

## API

### Tooltip Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容（也可以使用 slot） | `string` | - |
| trigger | 触发方式 | `'click' \| 'hover'` | hover |
| placement | 出现位置（Popper Placement） | `Placement` | bottom |
| manual | 是否手动控制显示/隐藏 | `boolean` | false |
| popperOptions | popper.js 配置项 | `Partial<Options>` | - |
| transition | 过渡动画名称 | `string` | fade |
| openDelay | 延迟显示的时间，毫秒 | `number` | 0 |
| closeDelay | 延迟关闭的时间，毫秒 | `number` | 0 |

### Tooltip Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| visible-change | 显隐状态变化时触发 | `(visible: boolean)` |

### Tooltip Exposed Methods

通过 `ref` 获取组件实例，可以调用以下方法：

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| show | 手动显示 tooltip | `() => void` |
| hide | 手动隐藏 tooltip | `() => void` |
