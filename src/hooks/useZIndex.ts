import { computed, ref } from "vue"

const zIndex = ref(0)
const useZIndex = (initialValue = 2000) => {
  const initailZIndex = ref(initialValue)
  const currentZIndex = computed(() => initailZIndex.value + zIndex.value)
  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }
  return {
    initailZIndex,
    currentZIndex,
    nextZIndex
  }
}
export default useZIndex