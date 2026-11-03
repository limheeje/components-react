/** 탭 스타일 → CSS Module 클래스 키(`type-*`) */
export const TABS_TYPE = Object.freeze({
  LINE: 'line',
  CARD: 'card',
  PILL: 'pill'
} as const)

/** size 값 → CSS Module 클래스 키(`size-*`) */
export const TABS_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const TABS_STATE_CLASS = Object.freeze({
  IS_ACTIVE: 'is-active',
  IS_DISABLED: 'is-disabled',
  IS_CENTERED: 'is-centered',
  IS_FULL_WIDTH: 'is-full-width'
} as const)

export const TABS_DEFAULT = Object.freeze({
  TYPE: TABS_TYPE.LINE,
  SIZE: TABS_SIZE.MD
} as const)
