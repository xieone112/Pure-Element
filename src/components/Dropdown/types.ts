import type { VNode } from "vue";
import type { TooltipProps } from "../Tooltip/types";
export interface DropdownProps extends TooltipProps {
  menuOptions: menuOption[];
  hideAfterClick?: boolean
}
export interface menuOption {
  label: string | VNode;
  key: number | string;
  disabled?: boolean;
  divided?: boolean;
}
export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void;
  (e: 'select', value: menuOption): void;
}
export interface DropdownInstance {
  show: () => void;
  hide: () => void;
}