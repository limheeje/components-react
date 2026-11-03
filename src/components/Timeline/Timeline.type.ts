import type {ReactNode} from 'react'

import type {
  TIMELINE_ALIGN,
  TIMELINE_COLOR,
  TIMELINE_DIRECTION,
  TIMELINE_STATUS
} from '~/components/Timeline/Timeline.constant'

export type TimelineDirection = (typeof TIMELINE_DIRECTION)[keyof typeof TIMELINE_DIRECTION]
export type TimelineAlign = (typeof TIMELINE_ALIGN)[keyof typeof TIMELINE_ALIGN]
export type TimelineStatus = (typeof TIMELINE_STATUS)[keyof typeof TIMELINE_STATUS]
export type TimelineColor = (typeof TIMELINE_COLOR)[keyof typeof TIMELINE_COLOR]

export interface TimelineItem {
  /** 제목 */
  title: ReactNode
  /** 부가 설명 */
  description?: ReactNode
  /** 날짜/시간 라벨 */
  date?: ReactNode
  /** 노드 색을 정하는 상태 (color 보다 우선) */
  status?: TimelineStatus
  /** 노드 안에 렌더할 아이콘 노드 */
  icon?: ReactNode
}

export interface TimelineProps {
  /** 항목 배열 */
  items: TimelineItem[]
  /** 배치 방향. 기본값 vertical */
  direction?: TimelineDirection
  /** 세로 모드 정렬. 기본값 left */
  align?: TimelineAlign
  /** 마지막에 진행 중 노드 추가 (true 또는 표시할 내용) */
  pending?: boolean | ReactNode
  /** 전체 테마 색. 항목 status 가 있으면 그쪽이 우선. 기본값 primary */
  color?: TimelineColor
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
