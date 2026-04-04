import { defineComponent } from "vue";
const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true
    }
  },
  setup(props) {
    return () => props.vNode
  }
})
export default RenderVnode