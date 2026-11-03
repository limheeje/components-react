import type {CSSProperties, ReactNode} from 'react'

import type {TABLE_ALIGN, TABLE_SIZE, TABLE_SORT_DIRECTION} from '~/components/Table/Table.constant'

export type TableAlign = (typeof TABLE_ALIGN)[keyof typeof TABLE_ALIGN]
export type TableSortDirection = (typeof TABLE_SORT_DIRECTION)[keyof typeof TABLE_SORT_DIRECTION]
export type TableSize = (typeof TABLE_SIZE)[keyof typeof TABLE_SIZE]

export type TableRow = Record<string, unknown>

export interface TableColumn<T extends object = TableRow> {
  /** 데이터 키 */
  key: string
  /** 헤더 라벨 */
  label: ReactNode
  /** 열 너비 */
  width?: number | string
  /** 셀 정렬 */
  align?: TableAlign
  /** 헤더 클릭 정렬 활성화 */
  sortable?: boolean
  /** 셀 내용 커스텀 렌더 */
  render?: (value: unknown, row: T, index: number) => ReactNode
  /** 셀 <td> 스타일 */
  cellStyle?: (value: unknown, row: T, index: number) => CSSProperties
  /** 연속된 동일 값을 자동으로 rowspan 병합 (필드명) */
  rowSpanKey?: string
}

export interface TableHeadCell {
  label: ReactNode
  colSpan?: number
  rowSpan?: number
  align?: TableAlign
  width?: number | string
  style?: CSSProperties
}

export interface TableSort {
  key: string
  direction: TableSortDirection
}

export interface TablePagination {
  /** 현재 페이지 (1-base) */
  page: number
  /** 페이지당 행 수 */
  pageSize: number
  /** 전체 행 수 (기본값 data.length) */
  total?: number
  /** 페이저 가로 정렬 (기본 'right'). 총 개수는 위, 페이저는 아래 줄에 배치 */
  align?: TableAlign
  /** 페이지 변경 콜백 */
  onChange: (page: number) => void
}

export interface TableProps<T extends object = TableRow> {
  /** 컬럼 정의 */
  columns?: TableColumn<T>[]
  /** 다중 헤더 그룹 (있으면 헤더는 이걸로, 데이터 행은 columns 로) */
  headGroups?: TableHeadCell[][]
  /** 데이터 배열 */
  data: T[]
  /** 행 고유 키 필드명 또는 함수. 기본값 'id' */
  rowKey?: string | ((row: T, index: number) => string | number)
  /** 특수 행 직접 렌더 (undefined 반환 시 기본 렌더) */
  renderRow?: (row: T, index: number) => ReactNode
  /** 줄무늬 */
  striped?: boolean
  /** 행 hover 하이라이트 */
  hover?: boolean
  /** 크기. 기본값 md */
  size?: TableSize
  /** 로딩 오버레이 */
  loading?: boolean
  /** 빈 상태 텍스트 */
  emptyText?: ReactNode
  /** 빈 상태 커스텀 노드 (emptyText 대체) */
  emptyContent?: ReactNode
  /** 행 선택 활성화 (체크박스 열 추가) */
  selectable?: boolean
  /** 선택된 행 키 배열 (제어) */
  selectedRowKeys?: (string | number)[]
  /** 선택 변경 콜백 */
  onSelectionChange?: (keys: (string | number)[], rows: T[]) => void
  /** 정렬 상태 (제어). 없으면 컴포넌트가 내부에서 정렬 */
  sort?: TableSort | null
  /** 정렬 변경 콜백 */
  onSortChange?: (sort: TableSort | null) => void
  /** 페이지네이션 (있으면 data 를 슬라이스하고 하단 컨트롤 표시) */
  pagination?: TablePagination
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
