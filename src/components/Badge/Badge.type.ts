import type {HTMLAttributes, ReactNode} from 'react'

import type {BADGE_SIZE, BADGE_TYPE} from '~/components/Badge/Badge.constant'

export type BadgeType = (typeof BADGE_TYPE)[keyof typeof BADGE_TYPE]
export type BadgeSize = (typeof BADGE_SIZE)[keyof typeof BADGE_SIZE]

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'className'> {
  /** 색상 스타일. 기본값 primary */
  type?: BadgeType
  /** 크기. 기본값 md */
  size?: BadgeSize
  /** 캡슐형(pill) 모서리 */
  round?: boolean
  /** 채운 배지 대신 "색상 점 + 평문 텍스트" 로 표시 */
  dot?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
  children?: ReactNode
}
