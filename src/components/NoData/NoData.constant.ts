import type {IconName} from '~/components/Icon/Icon.type'

/** 프리셋 타입 → CSS Module 클래스 키(`type-*`) */
export const NO_DATA_TYPE = Object.freeze({
  EMPTY: 'empty',
  SEARCH: 'search',
  DANGER: 'danger'
} as const)

export const NO_DATA_STATE_CLASS = Object.freeze({
  HAS_ACTION: 'has-action'
} as const)

/** 타입별 기본 아이콘/문구 */
export const NO_DATA_PRESET = Object.freeze({
  empty: {
    icon: 'inbox' as IconName,
    title: '데이터가 없습니다',
    description: ''
  },
  search: {
    icon: 'search-off' as IconName,
    title: '검색 결과가 없습니다',
    description: '다른 키워드로 검색해보세요.'
  },
  danger: {
    icon: 'error' as IconName,
    title: '데이터를 불러올 수 없습니다',
    description: '네트워크 상태를 확인해주세요.'
  }
} as const)

export const NO_DATA_DEFAULT = Object.freeze({
  TYPE: NO_DATA_TYPE.EMPTY,
  RETRY_LABEL: '다시 시도'
} as const)
