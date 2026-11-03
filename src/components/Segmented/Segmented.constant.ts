/** size 값 → CSS Module 클래스 키(`Size*`). Input 필드와 동일한 높이·타이포. */
export const SEGMENTED_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const SEGMENTED_STATE_CLASS = Object.freeze({
  IS_DISABLED: 'is-disabled'
} as const)

export const SEGMENTED_DEFAULT = Object.freeze({
  SIZE: SEGMENTED_SIZE.MD
} as const)
