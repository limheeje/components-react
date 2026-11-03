/** size 값 → CSS Module 클래스 키(`size-*`) */
export const PAGINATION_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const PAGINATION_STATE_CLASS = Object.freeze({
  IS_ACTIVE: 'is-active',
  IS_DISABLED: 'is-disabled'
} as const)

/** 생략 마커 */
export const PAGINATION_ELLIPSIS = '…'

export const PAGINATION_DEFAULT = Object.freeze({
  SIZE: PAGINATION_SIZE.MD,
  PAGE_SIZE: 10,
  SIBLING_COUNT: 1
} as const)
