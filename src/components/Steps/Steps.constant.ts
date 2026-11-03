/** 진행 방향 */
export const STEPS_DIRECTION = Object.freeze({
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
} as const)

/** current 단계의 상태 */
export const STEPS_STATUS = Object.freeze({
  WAIT: 'wait',
  PROCESS: 'process',
  FINISH: 'finish',
  ERROR: 'error'
} as const)

/** 개별 노드 상태 → CSS Module 클래스 키(`node-*`) */
export const STEPS_NODE_STATE = Object.freeze({
  DONE: 'done',
  CURRENT: 'current',
  UPCOMING: 'upcoming'
} as const)

export const STEPS_STATE_CLASS = Object.freeze({
  IS_VERTICAL: 'is-vertical',
  STATUS_ERROR: 'bsStepsStatusError',
  STATUS_FINISH: 'bsStepsStatusFinish'
} as const)

export const STEPS_DEFAULT = Object.freeze({
  CURRENT: 0,
  DIRECTION: STEPS_DIRECTION.HORIZONTAL,
  STATUS: STEPS_STATUS.PROCESS
} as const)
