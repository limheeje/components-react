/** direction 값 → CSS Module 클래스 키(`direction-*`) */
export const CHECKBOX_GROUP_DIRECTION = Object.freeze({
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
} as const)

/** size 값 → 하위 Checkbox 에 일괄 주입 */
export const CHECKBOX_GROUP_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const CHECKBOX_GROUP_STATE_CLASS = Object.freeze({
  IS_DISABLED: 'is-disabled'
} as const)

export const CHECKBOX_GROUP_DEFAULT = Object.freeze({
  DIRECTION: CHECKBOX_GROUP_DIRECTION.VERTICAL,
  SIZE: CHECKBOX_GROUP_SIZE.MD
} as const)
