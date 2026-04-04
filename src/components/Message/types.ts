import type { ComponentInternalInstance, VNode } from "vue"

export interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'warning' | 'danger' | 'info';
  onDestroy: () => void;
  id: string;
  offset?: number;
  zIndex: number;
  transitionName?: string;
}
export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>

export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance
  props: MessageProps;
  destroy: () => void;
}