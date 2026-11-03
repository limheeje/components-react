/** loading 전략 */
export const IMAGE_LOADING = Object.freeze({
  LAZY: 'lazy',
  EAGER: 'eager'
} as const)

/** 내부 로드 상태 */
export const IMAGE_STATUS = Object.freeze({
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const IMAGE_STATE_CLASS = Object.freeze({
  IS_LOADING: 'is-loading',
  IS_LOADED: 'is-loaded',
  IS_ERROR: 'is-error',
  IS_FADE: 'is-fade'
} as const)

export const IMAGE_DEFAULT = Object.freeze({
  WIDTH: '100%',
  HEIGHT: 'auto',
  OBJECT_FIT: 'cover',
  ROUNDED: 0,
  SKELETON: true,
  FADE_IN: true,
  LOADING: IMAGE_LOADING.LAZY
} as const)
