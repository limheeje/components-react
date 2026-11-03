/** 로딩 표시 타입 → CSS Module 클래스 키(`type-*`) */
export const LOADING_TYPE = Object.freeze({
  SPINNER: 'spinner',
  DOTS: 'dots',
  SKELETON: 'skeleton'
} as const)

/** size 값 → CSS Module 클래스 키(`size-*`) */
export const LOADING_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** color 값 → CSS Module 클래스 키(`color-*`) */
export const LOADING_COLOR = Object.freeze({
  PRIMARY: 'primary',
  NEUTRAL: 'neutral',
  WHITE: 'white'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const LOADING_STATE_CLASS = Object.freeze({
  IS_OVERLAY: 'is-overlay'
} as const)

export const LOADING_DEFAULT = Object.freeze({
  TYPE: LOADING_TYPE.SPINNER,
  SIZE: LOADING_SIZE.MD,
  COLOR: LOADING_COLOR.PRIMARY
} as const)
