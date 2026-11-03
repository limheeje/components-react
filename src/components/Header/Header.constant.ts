/** type 값 → CSS Module 클래스 키(`type-*`) */
export const HEADER_TYPE = Object.freeze({
  DEFAULT: 'default',
  PRIMARY: 'primary'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const HEADER_STATE_CLASS = Object.freeze({
  IS_STICKY: 'is-sticky'
} as const)

export const HEADER_DEFAULT = Object.freeze({
  TYPE: HEADER_TYPE.DEFAULT
} as const)
