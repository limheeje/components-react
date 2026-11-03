/** 상태 modifier 클래스명 (CSS Module 키) */
export const IMAGE_UPLOAD_PREVIEW_STATE_CLASS = Object.freeze({
  IS_DISABLED: 'is-disabled',
  IS_OVER: 'is-over',
  IS_ERROR: 'is-error'
} as const)

export const IMAGE_UPLOAD_PREVIEW_DEFAULT = Object.freeze({
  MAX_COUNT: 8,
  MAX_SIZE: 5 * 1024 * 1024,
  COLS: 4,
  THUMB_SIZE: 88
} as const)
