/** 열림 모드 */
export const ACCORDION_TYPE = Object.freeze({
  SINGLE: 'single',
  MULTIPLE: 'multiple'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const ACCORDION_STATE_CLASS = Object.freeze({
  IS_OPEN: 'is-open',
  IS_DISABLED: 'is-disabled'
} as const)

export const ACCORDION_DEFAULT = Object.freeze({
  TYPE: ACCORDION_TYPE.SINGLE
} as const)
