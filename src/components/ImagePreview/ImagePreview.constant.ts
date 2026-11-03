/** fit 값 (object-fit) */
export const IMAGE_PREVIEW_FIT = Object.freeze({
  COVER: 'cover',
  CONTAIN: 'contain',
  FILL: 'fill'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const IMAGE_PREVIEW_STATE_CLASS = Object.freeze({
  IS_PREVIEWABLE: 'is-previewable'
} as const)

export const IMAGE_PREVIEW_DEFAULT = Object.freeze({
  WIDTH: 120,
  HEIGHT: 120,
  RADIUS: 8,
  FIT: IMAGE_PREVIEW_FIT.COVER,
  PREVIEW: true
} as const)
