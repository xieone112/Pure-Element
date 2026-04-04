---
title: Select | Pure-Element
description: Select 组件的文档
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

`v-model`（`modelValue`）支持 `string | number | object`。

## 基础用法

适用广泛的基础单选 v-model 的值为当前被选中的 option 的 value 属性值。

<preview path="../demo/Select/Basic.vue" title="基础选择器" description="Select 基础选择器"></preview>

## 可清空

设置 `clearable` 后，鼠标移入且当前有选中项时，会显示清空图标。

<preview path="../demo/Select/Clear.vue" title="可清空选择器" description="Select clearable 用法"></preview>

## 多选

设置 `multiple` 后，`v-model` 的值变为数组，可选择多个选项。

<preview path="../demo/Select/Multiple.vue" title="多选选择器" description="Select multiple 用法"></preview>

## 自定义模板

你可以自定义如何来渲染每一个选项,使用`renderLabel`属性,它接受一个回调函数,返回 vNode 类型。

<preview path="../demo/Select/CustomRender.vue" title="自定义模板" description="Select"></preview>

## 可筛选选项

设置 `filterable` 后，输入框会变为可输入状态，组件会根据输入内容筛选选项。

- 默认筛选：按 `label.includes(关键词)` 进行过滤。
- 自定义筛选：可通过 `filterMethod` 传入函数，函数参数是当前输入值，返回筛选后的选项数组。

<preview path="../demo/Select/Filterable.vue" title="可筛选选项" description="Select filterable 与 filterMethod 用法"></preview>

## 远程搜索

输入关键字以从远程服务器中查找数据。

服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将 `filterable` 和 `remote` 设置为true，同时传入一个`remote-method`。 remote-method 为一个返回 Promise 的Function，类型为 `(value: string) => Promise<SelectOption[]>` 。

<preview path="../demo/Select/Remote.vue" title="筛选选项" description="Select 筛选选项"></preview>

## API

### Select Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值，单选为值，多选为数组 | `SelectValue \| SelectValue[]` | - |
| options | 选项列表 | `SelectOption[]` | [] |
| placeholder | 占位文案 | `string` | 请选择 |
| disabled | 是否禁用 | `boolean` | false |
| clearable | 是否可清空 | `boolean` | false |
| multiple | 是否多选 | `boolean` | false |
| renderLabel | 自定义选项渲染 | `(option: SelectOption) => VNode` | - |
| filterable | 是否可筛选 | `boolean` | false |
| filterMethod | 自定义本地筛选方法 | `(value: string) => SelectOption[]` | - |
| remote | 是否启用远程搜索 | `boolean` | false |
| remoteMethod | 自定义远程搜索方法 | `(value: string) => Promise<SelectOption[]>` | - |

`SelectOption` 结构：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 显示文本 | `string` | - |
| value | 选项值 | `string \| number \| object` | - |
| disabled | 是否禁用 | `boolean` | false |

### Select Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值变更时触发 | `(value: SelectValue \| SelectValue[]) => void` |
| change | 选中项变更时触发 | `(value: SelectValue \| SelectValue[]) => void` |
| visible-change | 下拉面板显隐变化时触发 | `(visible: boolean) => void` |
| clear | 点击清空时触发 | `() => void` |




