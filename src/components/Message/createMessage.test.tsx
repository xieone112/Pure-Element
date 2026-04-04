import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { createMessage, closeAll } from './method'

function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}
export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}
describe('createMessage', () => {
  test('调用方法应该创建对应的 Message 组件', async () => {
    const instance = createMessage({ message: 'hello', duration: 0 })
    await rAF()
    console.log('html', document.body.innerHTML);
    expect(document.querySelector('.pr-message')).toBeTruthy()
    instance.destroy()
    await rAF()
    console.log('html2', document.body.innerHTML);
    expect(document.querySelector('.pr-message')).toBeFalsy()
  })
  test('多次调用方法应该创建多个实例', async () => {
    createMessage({ message: 'hello world1', duration: 0 })
    createMessage({ message: 'hello world2', duration: 0 })
    await rAF()
    const elements = document.querySelectorAll('.pr-message')
    expect(elements.length).toBe(2)
    closeAll()
    await rAF()
    expect(document.querySelector('.pr-message')).toBeFalsy()
  })
  test('创建多个实例应该设置正确的 offset', async () => {
    createMessage({ message: 'hello world1', duration: 0, offset: 100 })
    createMessage({ message: 'hello world2', duration: 0, offset: 50 })
    await rAF()
    const elements = document.querySelectorAll('.pr-message')
    expect(elements.length).toBe(2)
    const firstElementTop = getTopValue(elements[0]!)
    const secondElementTop = getTopValue(elements[1]!)
    expect(firstElementTop).toBe(100)
    expect(secondElementTop).toBe(150)
  })
})