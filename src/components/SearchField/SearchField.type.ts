import type {InputHTMLAttributes} from 'react'

import type {SEARCH_FIELD_SIZE} from '~/components/SearchField/SearchField.constant'

export type SearchFieldSize = (typeof SEARCH_FIELD_SIZE)[keyof typeof SEARCH_FIELD_SIZE]

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'className'> {
  /** 크기. 기본값 md */
  size?: SearchFieldSize
  /** Enter 키 또는 돋보기 버튼 클릭 시 호출 */
  onSearch?: (value: string) => void
  /** 입력값이 있을 때 우측 X 버튼. 기본값 true */
  clearable?: boolean
  /** X 버튼 클릭 시 콜백 (값 초기화 후) */
  onClear?: () => void
  /** 로딩 스피너 표시 (돋보기 대체) */
  loading?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
