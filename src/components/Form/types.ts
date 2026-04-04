/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InjectionKey } from "vue"
import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";

export interface FormItemProps {
  label: string;
  prop?: string;
}

export interface FormRuleItem extends RuleItem {
  trigger?: string;
}
export type FormRules = Record<string, FormRuleItem[]>
export interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
}

export interface ValidateStatusProps {
  states: 'init' | 'success' | 'error';
  errorMsg: string;
  loading: boolean;
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}
export interface FormItemContext {
  prop: string;
  validate: (trigger?: string) => Promise<any>;
  clearValidate: () => void;
  resetField: () => void;
}

export const formContextKey: InjectionKey<FormContext> = Symbol('FormContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('FormItmeContextKey')

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormInstance {
  validate: () => Promise<any>
  resetFields: () => void;
  clearValidate: () => void;
}

export interface FormItemInstance {
  validateStatus: ValidateStatusProps;
  validate: (trigger?: string) => Promise<any>;
  clearValidate: () => void;
  resetField: () => void;
}