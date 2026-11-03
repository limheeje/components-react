/** pagination 값 → CSS Module 클래스 키(`pagination-*`) */
export const SWIPER_PAGINATION = Object.freeze({
  BULLETS: 'bullets',
  FRACTION: 'fraction',
  PROGRESSBAR: 'progressbar'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const SWIPER_STATE_CLASS = Object.freeze({
  IS_DISABLED: 'is-disabled'
} as const)

export const SWIPER_DEFAULT = Object.freeze({
  AUTOPLAY_DELAY: 2800,
  SLIDES_PER_VIEW: 1,
  SPACE_BETWEEN: 0,
  PAGINATION: SWIPER_PAGINATION.BULLETS
} as const)
