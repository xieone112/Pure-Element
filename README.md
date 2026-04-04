# Pure-Element

一个基于 **Vue3 + TypeScript + Vite** 开发的轻量级通用组件库，提供基础组件、表单组件与反馈组件，支持组件化复用、按需引入与文档演示。

## 在线预览

📖 文档地址：  
https://xieone112.github.io/Pure-Element/

---

## 项目简介

Pure-Element 是一个基于 Vue3 从 0 到 1 开发的通用组件库项目，主要用于沉淀常用 UI 组件、表单能力与交互逻辑，提升组件复用性与开发效率。

目前已实现：

- 基础组件：Button、Input、Select、Icon
- 反馈组件：Tooltip、Dropdown、Message
- 表单组件：Form、FormItem
- 工程化支持：按需引入、类型约束、单元测试、文档站点部署

---

## 技术栈

- Vue 3
- TypeScript
- Vite
- SCSS
- Vitest
- Vue Test Utils
- async-validator

---

## 已实现组件

- Button
- Input
- Select
- Icon
- Tooltip
- Dropdown
- Message
- Form
- FormItem

## 项目亮点

- 基于 Vue3 Composition API 开发通用组件库
- 利用 `provide/inject` 实现 Form / FormItem 通信
- 结合 `async-validator` 实现统一表单校验
- 通过程序化挂载实现 Message 函数式调用
- 使用 TypeScript 完成类型约束
- 基于 Vite 完成构建与按需引入
- 使用 Vitest 编写单元测试

## 本地运行

```bash
git clone https://github.com/xieone112/Pure-Element.git
cd Pure-Element
pnpm install
pnpm dev
