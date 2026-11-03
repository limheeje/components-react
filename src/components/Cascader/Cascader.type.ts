import type {FocusEvent, HTMLAttributes, ReactNode} from 'react'

import type {CASCADER_EXPAND_TRIGGER, CASCADER_SIZE} from '~/components/Cascader/Cascader.constant'

export type CascaderSize = (typeof CASCADER_SIZE)[keyof typeof CASCADER_SIZE]
export type CascaderExpandTrigger = (typeof CASCADER_EXPAND_TRIGGER)[keyof typeof CASCADER_EXPAND_TRIGGER]
export type CascaderValue = string | number
export type CascaderModelValue = CascaderValue | CascaderValue[] | CascaderValue[][]

export interface CascaderOption {
  label?: string
  value?: CascaderValue
  children?: CascaderOption[]
  disabled?: boolean
  leaf?: boolean
  [key: string]: unknown
}

export interface CascaderNode {
  uid: number
  data: CascaderOption
  value: CascaderValue
  label: string
  level: number
  parent: CascaderNode | null
  children: CascaderNode[]
  disabled: boolean
  leaf: boolean
  loaded: boolean
  loading: boolean
  pathValues: CascaderValue[]
  pathLabels: string[]
}

export type CascaderLazyLoad = (node: CascaderNode, resolve: (data?: CascaderOption[]) => void) => void

export interface CascaderConfig {
  expandTrigger?: CascaderExpandTrigger
  multiple?: boolean
  checkStrictly?: boolean
  emitPath?: boolean
  lazy?: boolean
  lazyLoad?: CascaderLazyLoad
  value?: string
  label?: string
  children?: string
  disabled?: string
  leaf?: string
}

export type CascaderFilterMethod = (node: CascaderNode, keyword: string) => boolean
export type CascaderBeforeFilter = (keyword: string) => boolean | Promise<unknown> | void

export interface CascaderPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  options?: CascaderOption[]
  config?: CascaderConfig
  value?: CascaderModelValue
  defaultValue?: CascaderModelValue
  onChange?: (value: CascaderModelValue, nodes: CascaderNode[]) => void
  onExpandChange?: (path: CascaderValue[]) => void
  renderLabel?: (node: CascaderNode) => ReactNode
  renderEmpty?: () => ReactNode
  classNames?: string | string[]
}

export interface CascaderProps extends CascaderPanelProps {
  placeholder?: string
  size?: CascaderSize
  disabled?: boolean
  clearable?: boolean
  showAllLevels?: boolean
  collapseTags?: boolean
  separator?: string
  filterable?: boolean
  filterMethod?: CascaderFilterMethod
  debounce?: number
  beforeFilter?: CascaderBeforeFilter
  error?: boolean | string
  helperText?: ReactNode
  name?: string
  id?: string
  onVisibleChange?: (visible: boolean) => void
  onRemoveTag?: (value: CascaderValue | CascaderValue[]) => void
  onClear?: () => void
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void
}
