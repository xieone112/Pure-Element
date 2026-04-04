import { onMounted, onBeforeUnmount, isRef, watch, type Ref, unref } from "vue"

export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (value, oldvalue) => {
      oldvalue?.removeEventListener(event, handler)
      value?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}