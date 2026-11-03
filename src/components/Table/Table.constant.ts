/** 셀 정렬 */
export const TABLE_ALIGN = Object.freeze({
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right'
} as const)

/** 정렬 방향 (1클릭 asc → 2클릭 desc → 3클릭 해제) */
export const TABLE_SORT_DIRECTION = Object.freeze({
  ASC: 'asc',
  DESC: 'desc'
} as const)

/** size 값 → CSS Module 클래스 키(`size-*`) */
export const TABLE_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const TABLE_STATE_CLASS = Object.freeze({
  IS_STRIPED: 'is-striped',
  IS_HOVER: 'is-hover',
  IS_LOADING: 'is-loading'
} as const)

export const TABLE_DEFAULT = Object.freeze({
  ROW_KEY: 'id',
  SIZE: TABLE_SIZE.MD,
  EMPTY_TEXT: '데이터가 없습니다.'
} as const)
