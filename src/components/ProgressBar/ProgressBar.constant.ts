/** color 값 → CSS Module 클래스 키(`color-*`) */
export const PROGRESS_BAR_COLOR = Object.freeze({
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger'
} as const)

/** thickness 값 → CSS Module 클래스 키(`thickness-*`) */
export const PROGRESS_BAR_THICKNESS = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const PROGRESS_BAR_STATE_CLASS = Object.freeze({
  IS_ANIMATED: 'is-animated'
} as const)

export const PROGRESS_BAR_DEFAULT = Object.freeze({
  VALUE: 0,
  COLOR: PROGRESS_BAR_COLOR.PRIMARY,
  THICKNESS: PROGRESS_BAR_THICKNESS.MD
} as const)
