import type {CSSProperties, ReactNode} from 'react'

import type {GRID_ALIGN} from '~/components/Grid/Grid.constant'

export type GridAlign = (typeof GRID_ALIGN)[keyof typeof GRID_ALIGN]

export interface GridProps {
  /** 열 구성 — 숫자면 `repeat(n, 1fr)`, 문자열이면 그대로 grid-template-columns */
  columns?: number | string
  /** 행 구성 — 숫자면 `repeat(n, 1fr)`, 문자열이면 그대로 grid-template-rows */
  rows?: number | string
  /** 행·열 공통 간격 (숫자 → px) */
  gap?: number | string
  /** 행 간격 */
  rowGap?: number | string
  /** 열 간격 */
  columnGap?: number | string
  /** 전체 셀 가로 정렬 */
  justifyItems?: GridAlign
  /** 전체 셀 세로 정렬 */
  alignItems?: GridAlign
  /** 암묵적 행 높이 (grid-auto-rows) */
  autoRows?: number | string
  /** display: inline-grid */
  inline?: boolean
  /** 컨테이너 스타일 오버라이드 */
  style?: CSSProperties
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
  children?: ReactNode
}

export interface GridItemProps {
  /** 열 병합 개수 (grid-column: span N) */
  colSpan?: number
  /** 행 병합 개수 (grid-row: span N) */
  rowSpan?: number
  /** 이 셀만 가로 정렬 오버라이드 */
  justifySelf?: GridAlign
  /** 이 셀만 세로 정렬 오버라이드 */
  alignSelf?: GridAlign
  /** 스타일 오버라이드 */
  style?: CSSProperties
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
  children?: ReactNode
}
