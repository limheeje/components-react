/** direction 값 → CSS Module 클래스 키(`direction-*`) */
export const TIMELINE_DIRECTION = Object.freeze({
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
} as const)

/** align 값 → CSS Module 클래스 키(`align-*`) */
export const TIMELINE_ALIGN = Object.freeze({
  LEFT: 'left',
  RIGHT: 'right',
  ALTERNATE: 'alternate'
} as const)

/** 항목별 상태 색 → CSS Module 클래스 키(`status-*`) */
export const TIMELINE_STATUS = Object.freeze({
  DEFAULT: 'default',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  PROCESSING: 'processing',
  GRAY: 'gray'
} as const)

/** 타임라인 전체 테마 색 → CSS Module 클래스 키(`color-*`) */
export const TIMELINE_COLOR = Object.freeze({
  PRIMARY: 'primary',
  SUCCESS: 'success',
  GRAY: 'gray'
} as const)

export const TIMELINE_DEFAULT = Object.freeze({
  DIRECTION: TIMELINE_DIRECTION.VERTICAL,
  ALIGN: TIMELINE_ALIGN.LEFT,
  COLOR: TIMELINE_COLOR.PRIMARY
} as const)
