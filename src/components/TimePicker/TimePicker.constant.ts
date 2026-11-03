/** 시간 포맷 */
export const TIME_PICKER_FORMAT = Object.freeze({
  HM: 'HH:mm',
  HMS: 'HH:mm:ss'
} as const)

/** size 값 → CSS Module 클래스 키(`size-*`) */
export const TIME_PICKER_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const TIME_PICKER_STATE_CLASS = Object.freeze({
  IS_OPEN: 'is-open',
  IS_DISABLED: 'is-disabled',
  IS_ERROR: 'is-error',
  IS_PLACEHOLDER: 'is-placeholder'
} as const)

export const TIME_PICKER_DEFAULT = Object.freeze({
  FORMAT: TIME_PICKER_FORMAT.HM,
  SIZE: TIME_PICKER_SIZE.MD,
  STEP: 1,
  PLACEHOLDER: '시간을 선택하세요',
  ERROR_TEXT: '시간을 선택해주세요.',
  FALLBACK_HOUR: '09',
  FALLBACK_MIN: '00',
  FALLBACK_SEC: '00'
} as const)
