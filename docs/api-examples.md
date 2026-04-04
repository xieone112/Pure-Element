---
outline: deep
---

# 全局 API

本页汇总 pure-element 的插件入口与全局方法。

## 插件入口

| 名称 | 说明 | 签名 |
| --- | --- | --- |
| install | 将全部组件注册到应用实例 | `(app: App) => void` |

## 消息方法

| 名称 | 说明 | 签名 |
| --- | --- | --- |
| createMessage | 创建一条消息提示 | `(options: CreateMessageProps) => MessageContext` |
| closeAll | 关闭当前所有消息 | `() => void` |

## createMessage 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 消息内容 | `string \| VNode` | '' |
| type | 消息类型 | `'success' \| 'warning' \| 'danger' \| 'info'` | info |
| duration | 显示时长（毫秒），0 表示不自动关闭 | `number` | 3000 |
| showClose | 是否显示关闭按钮 | `boolean` | false |
| offset | 距离顶部偏移 | `number` | 20 |
| transitionName | 过渡动画名称 | `string` | fade |

## 使用示例

```ts
import { createMessage } from 'pure-element'

createMessage({
	type: 'success',
	message: '操作成功',
	duration: 2000,
})
```
