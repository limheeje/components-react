/** size 값 → CSS Module 클래스 키(`size-*`) */
export const DIALOG_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  FULL: 'full'
} as const)

/** 확인 버튼 톤 (confirm/alert) */
export const DIALOG_TONE = Object.freeze({
  DEFAULT: 'default',
  DANGER: 'danger'
} as const)

/** 명령형 다이얼로그 종류 */
export const DIALOG_KIND = Object.freeze({
  MODAL: 'modal',
  CONFIRM: 'confirm',
  ALERT: 'alert'
} as const)

/** 표현 형태 — 중앙 모달 / 화면 가장자리에서 나오는 드로어 */
export const DIALOG_VARIANT = Object.freeze({
  MODAL: 'modal',
  DRAWER: 'drawer'
} as const)

/** 드로어가 나오는 방향 (variant='drawer' 전용) */
export const DIALOG_DIRECTION = Object.freeze({
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
} as const)

export const DIALOG_DEFAULT = Object.freeze({
  SIZE: DIALOG_SIZE.MD,
  TONE: DIALOG_TONE.DEFAULT,
  CLOSE_ON_BACKDROP: true,
  CLOSE_ON_ESC: true,
  CONFIRM_TEXT: '확인',
  CANCEL_TEXT: '취소',
  VARIANT: DIALOG_VARIANT.MODAL,
  DIRECTION: DIALOG_DIRECTION.BOTTOM,
  /** 배경(body) 스크롤 잠금 */
  LOCK_SCROLL: true,
  /** 드로어 상단 grab 핸들 표시 */
  HANDLE: true,
  /** 헤더/핸들을 방향 반대로 스와이프하면 닫힘 */
  SWIPE_TO_CLOSE: true,
  /** 스와이프 닫힘 임계값 (패널 길이 대비 0~1) */
  CLOSE_THRESHOLD: 0.45
} as const)
