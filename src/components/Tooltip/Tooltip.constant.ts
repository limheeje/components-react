/** 표시 방향 → CSS Module 클래스 키(`placement-*`) */
export const TOOLTIP_PLACEMENT = Object.freeze({
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
} as const)

/** 트리거 방식 */
export const TOOLTIP_TRIGGER = Object.freeze({
  HOVER: 'hover',
  CLICK: 'click'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const TOOLTIP_STATE_CLASS = Object.freeze({
  IS_OPEN: 'is-open',
  HAS_ARROW: 'has-arrow'
} as const)

export const TOOLTIP_DEFAULT = Object.freeze({
  PLACEMENT: TOOLTIP_PLACEMENT.TOP,
  TRIGGER: TOOLTIP_TRIGGER.HOVER,
  ARROW: true,
  DELAY: 0
} as const)
