/** type 값 → CSS Module 클래스 키(`type-*`) */
export const BADGE_TYPE = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
  GHOST: 'ghost',
  PRIMARY_LIGHT: 'primary-light',
  SUCCESS_LIGHT: 'success-light',
  WARNING_LIGHT: 'warning-light',
  DANGER_LIGHT: 'danger-light',
  INFO_LIGHT: 'info-light'
} as const)

/** size 값 → CSS Module 클래스 키(`size-*`) */
export const BADGE_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const BADGE_STATE_CLASS = Object.freeze({
  IS_ROUND: 'is-round',
  IS_DOT: 'is-dot'
} as const)

export const BADGE_DEFAULT = Object.freeze({
  TYPE: BADGE_TYPE.PRIMARY,
  SIZE: BADGE_SIZE.MD
} as const)
