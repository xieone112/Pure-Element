import type { VNode } from 'vue'
export type SelectValue = string | number | object;

export type RenderLabelFunc = (option: SelectOption) => VNode
export type CustomFilterFunc = (value: string) => SelectOption[]
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>

export interface SelectOption {
  label: string;
  value: SelectValue;
  disabled?: boolean;
}
export interface SelectProps {
  modelValue: SelectValue | SelectValue[];
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  renderLabel?: RenderLabelFunc;
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  remote?: boolean;
  remoteMethod?: CustomFilterRemoteFunc;
}
export interface SelectStates {
  inputValue: string;
  selectedOption: SelectOption | null;
  selectedOptions: SelectOption[];
  mouseHover: boolean;
  loading: boolean;
  highlightIndex: number;
}
export interface SelectEmits {
  (e: 'change', value: SelectValue | SelectValue[]): void
  (e: 'update:modelValue', value: SelectValue | SelectValue[]): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void;
}
