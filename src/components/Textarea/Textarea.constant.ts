/** 상태 modifier 클래스명 (CSS Module 키) */
export const TEXTAREA_STATE_CLASS = Object.freeze({
  IS_ERROR: 'is-error',
  IS_DISABLED: 'is-disabled',
  IS_READONLY: 'is-readonly',
  IS_FOCUSED: 'is-focused',
  IS_NO_RESIZE: 'is-no-resize'
} as const)

export const TEXTAREA_DEFAULT = Object.freeze({
  RESIZE: true,
  ROWS: 3
} as const)
