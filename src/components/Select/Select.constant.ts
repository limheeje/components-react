/** size 값 → CSS Module 클래스 키(`size-*`) */
export const SELECT_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const SELECT_STATE_CLASS = Object.freeze({
  IS_OPEN: 'is-open',
  IS_ERROR: 'is-error',
  IS_DISABLED: 'is-disabled',
  IS_PLACEHOLDER: 'is-placeholder'
} as const)

export const SELECT_DEFAULT = Object.freeze({
  SIZE: SELECT_SIZE.MD,
  SEARCH_PLACEHOLDER: '검색...',
  EMPTY_TEXT: '결과 없음'
} as const)
