import type {HTMLAttributes, ReactNode} from 'react'

import type {NO_DATA_TYPE} from '~/components/NoData/NoData.constant'

export type NoDataType = (typeof NO_DATA_TYPE)[keyof typeof NO_DATA_TYPE]

export interface NoDataProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  /** 프리셋. 기본값 empty (기본 아이콘/문구 제공) */
  type?: NoDataType
  /** 아이콘 (지정 시 프리셋 아이콘 대체) */
  icon?: ReactNode
  /** 제목 (지정 시 프리셋 제목 대체) */
  title?: ReactNode
  /** 설명 (지정 시 프리셋 설명 대체) */
  description?: ReactNode
  /** 하단 액션 영역 (버튼 등) */
  action?: ReactNode
  /** type="danger" 등에서 "다시 시도" 버튼 표시 + 콜백 */
  onRetry?: () => void
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
