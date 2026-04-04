---
title: Form | Pure-Element
description: Form 组件的文档
---

# Form 表单

表单包含 `输入框`, `单选框`, `下拉选择`, `多选框` 等用户输入的组件。
使用表单，您可以收集、验证和提交数据。

## 典型表单

最基础的表单包括各种输入表单项，比如input、select、radio、checkbox等。

在每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值。

<preview path="../demo/Form/Basic.vue" title="典型表单" description="Form 典型表单"></preview>

## API

### Form Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `Record<string, any>` | - |
| rules | 校验规则对象 | `Record<string, FormRuleItem[]>` | - |

### FormItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | - |
| prop | 对应 model 字段名，用于校验与重置 | `string` | - |

### Form Exposes

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| validate | 校验整个表单 | `() => Promise<any>` |
| resetFields | 重置全部字段 | `() => void` |
| clearValidate | 清除全部校验状态 | `() => void` |

### FormItem Exposes

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| validate | 校验当前字段 | `(trigger?: string) => Promise<any>` |
| clearValidate | 清除当前字段校验状态 | `() => void` |
| resetField | 重置当前字段值与状态 | `() => void` |
