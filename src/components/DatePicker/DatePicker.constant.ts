/** 모드 */
export const DATE_PICKER_MODE = Object.freeze({
  SINGLE: 'single',
  RANGE: 'range'
} as const)

/** 캘린더 뷰 */
export const CALENDAR_VIEW = Object.freeze({
  DAYS: 'days',
  MONTHS: 'months',
  YEARS: 'years'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const DATE_PICKER_STATE_CLASS = Object.freeze({
  IS_OPEN: 'is-open',
  IS_DISABLED: 'is-disabled',
  IS_ERROR: 'is-error',
  IS_PLACEHOLDER: 'is-placeholder'
} as const)

/** 날짜 셀 상태 (CSS Module 키) */
export const DAY_CELL_STATE = Object.freeze({
  SELECTED: 'selected',
  IN_RANGE: 'in-range',
  RANGE_START: 'range-start',
  RANGE_END: 'range-end',
  TODAY: 'today',
  DISABLED: 'disabled',
  SUN: 'sun',
  SAT: 'sat'
} as const)

export const DATE_PICKER_DEFAULT = Object.freeze({
  MODE: DATE_PICKER_MODE.SINGLE,
  FORMAT: 'YYYY-MM-DD',
  MINUTE_STEP: 5,
  YEAR_PAGE_SIZE: 12,
  SINGLE_PLACEHOLDER: '날짜를 선택하세요',
  RANGE_PLACEHOLDER: ['시작일', '종료일'] as [string, string],
  ERROR_TEXT: '날짜를 선택해주세요.'
} as const)
