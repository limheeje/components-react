import type {HTMLAttributes, ReactNode} from 'react'

import type {PAGINATION_SIZE} from '~/components/Pagination/Pagination.constant'

export type PaginationSize = (typeof PAGINATION_SIZE)[keyof typeof PAGINATION_SIZE]

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'onChange'> {
  /** 현재 페이지 (1-base) */
  page: number
  /** 페이지 변경 콜백 */
  onChange: (page: number) => void
  /** 전체 항목 수 (totalPages 미지정 시 pageSize 로 계산) */
  total?: number
  /** 페이지당 항목 수. 기본값 10 */
  pageSize?: number
  /** 전체 페이지 수 (지정 시 total/pageSize 보다 우선) */
  totalPages?: number
  /** 현재 페이지 좌우로 항상 보일 페이지 수. 기본값 1 */
  siblingCount?: number
  /** 좌측 총 개수 표시 (`true` 기본 문구 / 함수 커스텀) */
  showTotal?: boolean | ((total: number) => ReactNode)
  /** 크기. 기본값 md */
  size?: PaginationSize
  /** 전체 비활성 */
  disabled?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
