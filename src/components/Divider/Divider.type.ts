import type {HTMLAttributes, ReactNode} from 'react'

import type {DIVIDER_DIRECTION, DIVIDER_LABEL_ALIGN} from '~/components/Divider/Divider.constant'

export type DividerDirection = (typeof DIVIDER_DIRECTION)[keyof typeof DIVIDER_DIRECTION]
export type DividerLabelAlign = (typeof DIVIDER_LABEL_ALIGN)[keyof typeof DIVIDER_LABEL_ALIGN]

export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'> {
  /** 방향. 기본값 horizontal */
  direction?: DividerDirection
  /** 선 색상 (CSS color 또는 토큰 문자열). 기본값 var(--m2m-pg-comp-border) */
  color?: string
  /** 선 두께(px). 기본값 1 */
  thickness?: number
  /** 가운데/좌측 라벨 (horizontal 에서만) */
  label?: ReactNode
  /** 라벨 정렬. 기본값 center */
  labelAlign?: DividerLabelAlign
  /** 점선 스타일 */
  dashed?: boolean
  /** 장식이면 true(스크린리더 무시). label 이 있으면 자동 false. 기본값 true */
  decorative?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
