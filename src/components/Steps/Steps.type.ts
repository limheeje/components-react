import type {HTMLAttributes, ReactNode} from 'react'

import type {STEPS_DIRECTION, STEPS_STATUS} from '~/components/Steps/Steps.constant'

export type StepsDirection = (typeof STEPS_DIRECTION)[keyof typeof STEPS_DIRECTION]
export type StepsStatus = (typeof STEPS_STATUS)[keyof typeof STEPS_STATUS]

export interface StepItem {
  title: ReactNode
  description?: ReactNode
}

export interface StepsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** 단계 배열 */
  steps: StepItem[]
  /** 현재 단계 인덱스(0-base). 기본값 0 */
  current?: number
  /** 방향. 기본값 horizontal */
  direction?: StepsDirection
  /** current 단계 상태. 기본값 process */
  status?: StepsStatus
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
