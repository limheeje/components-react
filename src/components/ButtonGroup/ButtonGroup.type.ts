import type {HTMLAttributes, ReactNode} from 'react'

import type {BUTTON_GROUP_DIRECTION, BUTTON_GROUP_SIZE} from '~/components/ButtonGroup/ButtonGroup.constant'

export type ButtonGroupDirection = (typeof BUTTON_GROUP_DIRECTION)[keyof typeof BUTTON_GROUP_DIRECTION]
export type ButtonGroupSize = (typeof BUTTON_GROUP_SIZE)[keyof typeof BUTTON_GROUP_SIZE]

export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** 나열 방향. 기본값 row */
  direction?: ButtonGroupDirection
  /** 버튼 사이 여백 제거 + 경계 모서리 자동 조정 */
  attached?: boolean
  /** 하위 Button 전체에 일괄 적용되는 크기. 기본값 md */
  size?: ButtonGroupSize
  /** 그룹 전체 비활성화 (개별 버튼의 disabled 는 유지) */
  disabled?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
  children?: ReactNode
}
