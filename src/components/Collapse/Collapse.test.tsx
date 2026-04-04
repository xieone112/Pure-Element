import { describe, test, expect, vi, beforeAll } from 'vitest'
import { mount, VueWrapper, DOMWrapper } from '@vue/test-utils'
// import { h } from 'vue'
import Collapse from './Collapse.vue'
import Item from './CollapseItem.vue'
const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>, disabledContent: DOMWrapper<Element>,
  firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>, disabledHeader: DOMWrapper<Element>


describe('Collapse.vue', () => {
  beforeAll(() => {
    const wrapper = mount(() =>
      <Collapse modelValue={['a']} onChange={onChange}>
        <Item name="a" title="title a">
          content a
        </Item>
        <Item name="b" title="title b">
          content b
        </Item>
        <Item name="c" title="title c" disabled>
          content c
        </Item>
      </Collapse>
      , {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      })
    headers = wrapper.findAll('.pr-collapse-item__header')
    contents = wrapper.findAll('.pr-collapse-item__content')
    firstHeader = headers[0]!
    secondHeader = headers[1]!
    disabledHeader = headers[2]!
    firstContent = contents[0]!
    secondContent = contents[1]!
    disabledContent = contents[2]!
  })
  test('测试基础结构以及对应文本', () => {
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    expect(firstHeader?.text()).toBe('title a')
    expect(secondHeader?.text()).toBe('title b')
    expect(disabledHeader?.text()).toBe('title c')
    expect(firstContent?.isVisible()).toBeTruthy()
    expect(secondContent?.isVisible()).toBeFalsy()
  })
  test('点击标题展开/关闭内容', async () => {
    await firstHeader?.trigger('click')
    expect(firstContent?.isVisible()).toBeFalsy()
    expect(onChange).toHaveBeenCalledWith([])
  })
  test('发送正确的事件', async () => {
    await secondHeader?.trigger('click')
    expect(secondContent?.isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
  test('disabled的内容应该没有反应', async () => {
    onChange.mockClear()
    expect(disabledHeader?.classes()).toContain('is-disabled')
    await disabledHeader?.trigger('click')
    expect(disabledContent?.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })

  test('手风琴模式：同一时间只展开一个', async () => {
    onChange.mockClear()
    const wrapper = mount(() =>
      <Collapse modelValue={['a']} accordion onChange={onChange}>
        <Item name="a" title="title a">
          content a
        </Item>
        <Item name="b" title="title b">
          content b
        </Item>
      </Collapse>
      , {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      })

    const headers = wrapper.findAll('.pr-collapse-item__header')
    const contents = wrapper.findAll('.pr-collapse-item__content')

    const firstHeader = headers[0]!
    const secondHeader = headers[1]!
    const firstContent = contents[0]!
    const secondContent = contents[1]!

    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()

    await secondHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(secondContent.isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenLastCalledWith(['b'])

    await secondHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(secondContent.isVisible()).toBeFalsy()
  })

  test('手风琴模式：初始多个展开时给出警告', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { })

    mount(() =>
      <Collapse modelValue={['a', 'b']} accordion onChange={onChange}>
        <Item name="a" title="title a">
          content a
        </Item>
        <Item name="b" title="title b">
          content b
        </Item>
      </Collapse>
      , {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      })

    expect(warnSpy).toHaveBeenCalledWith('accordion mode should only have one active item')
    warnSpy.mockRestore()
  })
})