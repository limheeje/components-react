import type {HTMLAttributes, ReactElement, ReactNode} from 'react'

export interface ListProps<T = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  /** 데이터 배열 (renderItem 과 함께 사용) */
  items?: T[]
  /** 각 항목 렌더러 — `<ListItem>` 반환 권장 */
  renderItem?: (item: T, index: number) => ReactElement
  /** items 항목 클릭 콜백 */
  onItemClick?: (item: T, index: number) => void
  /** 항목 간 구분선. 기본값 true */
  divided?: boolean
  /** 모든 항목 클릭 가능 (자식 ListItem 에 전파) */
  clickable?: boolean
  /** 로딩 스켈레톤 표시 */
  loading?: boolean
  /** 직접 자식으로 `<ListItem>` 을 넣는 방식 */
  children?: ReactNode
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
