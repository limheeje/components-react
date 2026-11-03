import type {InputHTMLAttributes, ReactNode} from 'react'

import type {SWITCH_SIZE} from '~/components/Switch/Switch.constant'

export type SwitchSize = (typeof SWITCH_SIZE)[keyof typeof SWITCH_SIZE]

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'className'> {
  /** 라벨 텍스트/노드 */
  label?: ReactNode
  /** 크기. 기본값 md */
  size?: SwitchSize
  /** 에러(유효성 실패) 상태 */
  error?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
