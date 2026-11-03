/** 방향 (원본 prop 명: direction) */
export const DIVIDER_DIRECTION = Object.freeze({
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
} as const)

/** 라벨 정렬 */
export const DIVIDER_LABEL_ALIGN = Object.freeze({
  CENTER: 'center',
  LEFT: 'left'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const DIVIDER_STATE_CLASS = Object.freeze({
  IS_VERTICAL: 'is-vertical',
  IS_DASHED: 'is-dashed',
  HAS_LABEL: 'has-label',
  LABEL_LEFT: 'bsDividerLabelLeft'
} as const)

export const DIVIDER_DEFAULT = Object.freeze({
  DIRECTION: DIVIDER_DIRECTION.HORIZONTAL,
  LABEL_ALIGN: DIVIDER_LABEL_ALIGN.CENTER,
  THICKNESS: 1
} as const)
