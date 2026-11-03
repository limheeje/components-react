/** 토스트 타입 → CSS Module 클래스 키(`type-*`) */
export const TOAST_TYPE = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const)

/** 화면 위치 → CSS Module 클래스 키(`pos-*`) */
export const TOAST_POSITION = Object.freeze({
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_LEFT: 'bottom-left'
} as const)

/** 시각 변형 → CSS Module 클래스 키(`variant-*`) */
export const TOAST_VARIANT = Object.freeze({
  FILLED: 'filled',
  LIGHT: 'light'
} as const)

/** 타입별 아이콘 (Icon name 별칭) */
export const TOAST_ICON = Object.freeze({
  success: 'check-circle',
  error: 'close-circle',
  warning: 'warning',
  info: 'info'
} as const)

export const TOAST_DEFAULT = Object.freeze({
  TYPE: TOAST_TYPE.INFO,
  POSITION: TOAST_POSITION.TOP_RIGHT,
  VARIANT: TOAST_VARIANT.FILLED,
  DURATION: 3000,
  MAX_COUNT: 5,
  DISMISSIBLE: true
} as const)
