/** direction 값 → CSS Module 클래스 키(`direction-*`) */
export const BUTTON_GROUP_DIRECTION = Object.freeze({
  ROW: 'row',
  COLUMN: 'column'
} as const)

/** size 값 → 하위 Button 에 일괄 주입 */
export const BUTTON_GROUP_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const BUTTON_GROUP_STATE_CLASS = Object.freeze({
  IS_ATTACHED: 'is-attached',
  IS_DISABLED: 'is-disabled'
} as const)

export const BUTTON_GROUP_DEFAULT = Object.freeze({
  DIRECTION: BUTTON_GROUP_DIRECTION.ROW,
  SIZE: BUTTON_GROUP_SIZE.MD
} as const)
