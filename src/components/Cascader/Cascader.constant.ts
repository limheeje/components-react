export const CASCADER_SIZE = Object.freeze({SM: 'sm', MD: 'md', LG: 'lg'} as const)

export const CASCADER_EXPAND_TRIGGER = Object.freeze({CLICK: 'click', HOVER: 'hover'} as const)

export const CASCADER_STATE_CLASS = Object.freeze({
  IS_OPEN: 'is-open',
  IS_ERROR: 'is-error',
  IS_DISABLED: 'is-disabled',
  IS_PLACEHOLDER: 'is-placeholder'
} as const)

export const CASCADER_CONFIG_DEFAULT = Object.freeze({
  EXPAND_TRIGGER: CASCADER_EXPAND_TRIGGER.CLICK,
  MULTIPLE: false,
  CHECK_STRICTLY: false,
  EMIT_PATH: true,
  LAZY: false,
  VALUE: 'value',
  LABEL: 'label',
  CHILDREN: 'children',
  DISABLED: 'disabled',
  LEAF: 'leaf'
} as const)

export const CASCADER_DEFAULT = Object.freeze({
  SIZE: CASCADER_SIZE.MD,
  PLACEHOLDER: '선택해주세요',
  SEPARATOR: ' / ',
  DEBOUNCE: 300,
  SEARCH_PLACEHOLDER: '검색...',
  EMPTY_TEXT: '데이터 없음',
  NO_MATCH_TEXT: '일치하는 데이터가 없습니다',
  LOADING_TEXT: '로딩 중...'
} as const)
