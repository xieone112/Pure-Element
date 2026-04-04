import { h, shallowReactive, render } from "vue";
import type { CreateMessageProps, MessageContext } from "./types";
import MessageConstructor from "./Message.vue";
import useZIndex from "@/hooks/useZIndex";

let seed = 1
const instances: MessageContext[] = shallowReactive([])
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const container = document.createElement('div')
  const destroy = () => {
    render(null, container)
    const index = instances.findIndex(instance => instance.id === id)
    if (index === -1) return
    instances.splice(index, 1)
  }
  const newProps = {
    ...props,
    id,
    zIndex: useZIndex().nextZIndex(),
    onDestroy: destroy
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstChild!)

  const vm = vnode.component!
  //手动调用删除
  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destroy: manualDestroy
  }
  instances.push(instance)

  return instance
}
export const getLastInstance = () => {
  return instances.at(-1)
}
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev!.vm.exposed!.bottomOffset.value
  }
}
export const closeAll = () => {
  instances.forEach(instance => instance.destroy())
}