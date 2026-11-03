import type {InputHTMLAttributes, ReactNode} from 'react'

import type {CHECKBOX_SIZE} from '~/components/Checkbox/Checkbox.constant'

export type CheckboxSize = (typeof CHECKBOX_SIZE)[keyof typeof CHECKBOX_SIZE]

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'className'> {
  /** 라벨 텍스트/노드 */
  label?: ReactNode
  /** 크기. 기본값 md */
  size?: CheckboxSize
  /** 부분 선택 상태 (checked 보다 우선하는 시각 표현) */
  indeterminate?: boolean
  /** 에러(유효성 실패) 상태 */
  error?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
