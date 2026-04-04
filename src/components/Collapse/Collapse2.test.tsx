import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import Item from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const wrapper = mount(Collapse, {
      props: { modelValue: ['a'] },
      slots: {
        default: <>
          <Item name="a" title="title a">
            content a
          </Item>
          <Item name="b" title="title b">
            content b
          </Item>
          <Item name="c" title="title c" disabled>
            content c
          </Item>
        </>
      },
      global: { stubs: ['Icon'] },
      attachTo: document.body
    })
    const headers = wrapper.findAll('.pr-collapse-item__header')
    const contents = wrapper.findAll('.pr-collapse-item__content')
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    const firstHeader = headers[0]
    const secondHeader = headers[1]
    const disabledHeader = headers[2]
    expect(firstHeader?.text()).toBe('title a')
    expect(secondHeader?.text()).toBe('title b')
    expect(disabledHeader?.text()).toBe('title c')

    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    expect(firstContent?.isVisible()).toBeTruthy()
    expect(secondContent?.isVisible()).toBeFalsy()

    await firstHeader?.trigger('click')
    expect(firstContent?.isVisible()).toBeFalsy()
    await secondHeader?.trigger('click')
    expect(secondContent?.isVisible()).toBeTruthy()

    const changeEvent = wrapper.emitted('change') as any[]
    console.table(changeEvent)
    expect(changeEvent).toHaveLength(2)
    expect(changeEvent[0]).toEqual([[]])
    expect(changeEvent[1]).toEqual([['b']])


    expect(disabledHeader?.classes()).toContain('is-disabled')
    await disabledHeader?.trigger('click')
    expect(disabledContent?.isVisible()).toBeFalsy()
  })
})