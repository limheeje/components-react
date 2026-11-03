/** size 값 → CSS Module 클래스 키(`size-*`) */
export const SEARCH_FIELD_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const SEARCH_FIELD_STATE_CLASS = Object.freeze({
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_LOADING: 'is-loading'
} as const)

export const SEARCH_FIELD_DEFAULT = Object.freeze({
  SIZE: SEARCH_FIELD_SIZE.MD,
  CLEARABLE: true,
  PLACEHOLDER: '검색'
} as const)
