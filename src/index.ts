import type { App, Component } from 'vue'
import Alert from './components/Alert'
import Button from './components/Button'
import Collapse, { CollapseItem } from './components/Collapse'
import Dropdown from './components/Dropdown'
import Form, { FormItem } from './components/Form'
import Icon from './components/Icon'
import Input from './components/Input'
import Message from './components/Message'
import { createMessage, closeAll } from './components/Message/method'
import Select from './components/Select'
import Switch from './components/Switch'
import Tooltip from './components/Tooltip'
import './styles/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const components = [
  Alert,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Input,
  Message,
  Select,
  Switch,
  Tooltip,
] as const

const install = (app: App) => {
  components.forEach((component) => {
    const comp = component as Component & { name?: string }
    if (comp.name) {
      app.component(comp.name, comp)
    }
  })
}

export {
  install,
  createMessage,
  closeAll,
  Alert,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Input,
  Message,
  Select,
  Switch,
  Tooltip,
}

export * from './components/Alert'
export * from './components/Button'
export * from './components/Collapse'
export * from './components/Dropdown'
export * from './components/Form'
export * from './components/Icon'
export * from './components/Input'
export * from './components/Message'
export * from './components/Select'
export * from './components/Switch'
export * from './components/Tooltip'

export default {
  install,
}
