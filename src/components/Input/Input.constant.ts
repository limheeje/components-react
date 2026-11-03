/** 지원 input type (search 는 브라우저 기본 UI 억제 후 자체 처리) */
export const INPUT_TYPE = Object.freeze({
  TEXT: 'text',
  PASSWORD: 'password',
  NUMBER: 'number',
  EMAIL: 'email',
  TEL: 'tel',
  SEARCH: 'search'
} as const)

/** size 값 → CSS Module 클래스 키(`size-*`) */
export const INPUT_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const INPUT_STATE_CLASS = Object.freeze({
  IS_ERROR: 'is-error',
  IS_DISABLED: 'is-disabled',
  IS_READONLY: 'is-readonly',
  IS_FOCUSED: 'is-focused'
} as const)

export const INPUT_DEFAULT = Object.freeze({
  TYPE: INPUT_TYPE.TEXT,
  SIZE: INPUT_SIZE.MD,
  CLEARABLE: true
} as const)
