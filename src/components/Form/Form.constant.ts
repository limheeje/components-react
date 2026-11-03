/** layout 값 → CSS Module 클래스 키(`layout-*`) */
export const FORM_LAYOUT = Object.freeze({
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  INLINE: 'inline'
} as const)

/** FormActions 정렬 → CSS Module 클래스 키(`align-*`) */
export const FORM_ACTIONS_ALIGN = Object.freeze({
  START: 'start',
  CENTER: 'center',
  END: 'end',
  BETWEEN: 'between'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const FORM_STATE_CLASS = Object.freeze({
  IS_DISABLED: 'is-disabled',
  IS_REQUIRED: 'is-required',
  IS_ERROR: 'is-error'
} as const)

export const FORM_DEFAULT = Object.freeze({
  LAYOUT: FORM_LAYOUT.VERTICAL,
  LABEL_WIDTH: 96,
  ACTIONS_ALIGN: FORM_ACTIONS_ALIGN.END
} as const)
