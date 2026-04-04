import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import Input from "./Input.vue";
import { log } from "console";
import { expect } from "vitest";

describe('Input', () => {
  it('基本使用', () => {
    // 针对动态 class,查看 classes 是否正确
    // 针对 v-if 是否渲染正确的标签以及内容
    // 针对 slots,是否渲染对应的 slots 内容
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'small',
        modelValue: ''
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    log(wrapper.html())
    expect(wrapper.classes()).toContain('pr-input--small')
    expect(wrapper.classes()).toContain('is-prepend')

    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')

    expect(wrapper.find('.pr-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.pr-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.pr-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.pr-input__prefix').text()).toBe('prefix')

    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: ''
      }
    })
    expect(wrapper2.find('.pr-textarea__wrapper').exists()).toBeTruthy()
  })

  it('支持v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: 'test',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    })
    //初始值
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')
    //更新值
    // 注意 setValue 是组合事件会触发 input 以及 change
    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')

    log('the events', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')

    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual(['update'])
    expect(changeEvent![0]).toEqual(['update'])

    //v-model的异步更新
    await wrapper.setProps({ modelValue: 'prop update' })
    expect(input.element.value).toBe('prop update')
  })

  it('支持点击清空字符串', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    //不出现对应的Icon区域
    expect(wrapper.find('.pr-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    expect(wrapper.find('.pr-input__clear').exists()).toBeTruthy()
    await wrapper.get('.pr-input__clear').trigger('click')
    expect(input.element.value).toBe('')

    // 点击值变为空并且消失,特别注意这里不仅仅会触发 clear 事件,对应的 input 以及 change 应该都会被触发
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')

    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  it('支持切换密码显示', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        showPassword: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    expect(wrapper.find('.pr-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    await input.setValue('123')
    const eyeIcon = wrapper.find('.pr-input__password')
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.pr-input__password').attributes('icon')).toBe('eye')
  })
})