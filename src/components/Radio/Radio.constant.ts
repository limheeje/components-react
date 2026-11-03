/** size 값 → CSS Module 클래스 키(`size-*`) */
export const RADIO_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const RADIO_STATE_CLASS = Object.freeze({
  IS_CHECKED: 'is-checked',
  IS_DISABLED: 'is-disabled',
  IS_ERROR: 'is-error'
} as const)

export const RADIO_DEFAULT = Object.freeze({
  SIZE: RADIO_SIZE.MD
} as const)
