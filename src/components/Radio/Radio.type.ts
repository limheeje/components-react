import type {InputHTMLAttributes, ReactNode} from 'react'

import type {RADIO_SIZE} from '~/components/Radio/Radio.constant'

export type RadioSize = (typeof RADIO_SIZE)[keyof typeof RADIO_SIZE]

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'className'> {
  /** 라벨 텍스트/노드 */
  label?: ReactNode
  /** 크기. 기본값 md */
  size?: RadioSize
  /** 에러(유효성 실패) 상태 */
  error?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
