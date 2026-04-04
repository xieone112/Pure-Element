import { describe, test, expect, vi, beforeEach } from "vitest";
import Tooltip from "./Tooltip.vue";
import { mount } from "@vue/test-utils";
vi.mock('@popperjs/core')
describe('Tooltip.vue', () => {
  const onVisibleChange = vi.fn()
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('basic tooltip', async () => {
    const wrapper = mount(() =>
      <div>
        <div class='outside'></div>
        <Tooltip content="hello world" trigger="click" onVisible-change={onVisibleChange}>
          <button id='trigger'>Trigger</button>
        </Tooltip>
      </div>
      , {
        attachTo: document.body
      }
    )
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.pr-tooltip__popper').exists()).toBeFalsy()
    //测试点击事件
    console.log('before', wrapper.html());
    triggerArea.trigger('click')
    await vi.runAllTimers()
    console.log('after', wrapper.html());
    expect(wrapper.find('.pr-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.find('.pr-tooltip__popper').text()).toBe('hello world')
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    //第二次点击
    // triggerArea.trigger('click')
    // await vi.runAllTimers()
    // console.log('after2', wrapper.html());
    // expect(wrapper.find('.pr-tooltip__popper').exists()).toBeFalsy()
    // expect(onVisibleChange).toHaveBeenCalledWith(false)
    //点击外侧
    wrapper.get('.outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.pr-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenCalledWith(false)
  })
})