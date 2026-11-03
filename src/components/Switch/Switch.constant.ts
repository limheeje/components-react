/** size 값 → CSS Module 클래스 키(`size-*`) */
export const SWITCH_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const SWITCH_STATE_CLASS = Object.freeze({
  IS_CHECKED: 'is-checked',
  IS_DISABLED: 'is-disabled',
  IS_ERROR: 'is-error'
} as const)

export const SWITCH_DEFAULT = Object.freeze({
  SIZE: SWITCH_SIZE.MD
} as const)
