/** size 값 → CSS Module 클래스 키(`size-*`) */
export const BREADCRUMB_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

export const BREADCRUMB_STATE_CLASS = Object.freeze({
  IS_CURRENT: 'is-current'
} as const)

export const BREADCRUMB_DEFAULT = Object.freeze({
  SIZE: BREADCRUMB_SIZE.MD,
  /** maxItems 축약 시 앞에서 유지할 개수 */
  HEAD_COUNT: 1,
  /** maxItems 축약 시 뒤에서 유지할 개수 */
  TAIL_COUNT: 2
} as const)
