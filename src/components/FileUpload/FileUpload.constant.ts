/** listType 값 → CSS Module 클래스 키(`list-*`) */
export const FILE_UPLOAD_LIST_TYPE = Object.freeze({
  TEXT: 'text',
  PICTURE: 'picture'
} as const)

/** 파일 항목 상태 */
export const FILE_UPLOAD_FILE_STATUS = Object.freeze({
  DONE: 'done',
  ERROR: 'error'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const FILE_UPLOAD_STATE_CLASS = Object.freeze({
  IS_DISABLED: 'is-disabled',
  IS_OVER: 'is-over',
  IS_ERROR: 'is-error'
} as const)

export const FILE_UPLOAD_DEFAULT = Object.freeze({
  ACCEPT: '*',
  MAX_SIZE: 5 * 1024 * 1024,
  MAX_COUNT: 10,
  LIST_TYPE: FILE_UPLOAD_LIST_TYPE.TEXT
} as const)
