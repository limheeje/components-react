/** variant 값 → CSS Module 클래스 키(`variant-*`)와 1:1 대응 */
export const BUTTON_VARIANT = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
  EMPHASIS: 'emphasis',
  INACTIVE: 'inactive',
  NONE: 'none',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
  PRIMARY_LIGHT: 'primary-light',
  SUCCESS_LIGHT: 'success-light',
  WARNING_LIGHT: 'warning-light',
  DANGER_LIGHT: 'danger-light',
  INFO_LIGHT: 'info-light'
} as const)

/** size 값 → CSS Module 클래스 키(`size-*`)와 1:1 대응 */
export const BUTTON_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const BUTTON_STATE_CLASS = Object.freeze({
  IS_LOADING: 'is-loading',
  IS_ROUND: 'is-round',
  IS_FULL_WIDTH: 'is-full-width'
} as const)

export const BUTTON_DEFAULT = Object.freeze({
  VARIANT: BUTTON_VARIANT.PRIMARY,
  SIZE: BUTTON_SIZE.MD
} as const)
