import type {ButtonHTMLAttributes, ReactNode} from 'react'

import type {BUTTON_SIZE, BUTTON_VARIANT} from '~/components/Button/Button.constant'

export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT]
export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE]

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'> {
  /** 시각 스타일. 기본값 primary */
  variant?: ButtonVariant
  /** 크기. 기본값 md */
  size?: ButtonSize
  /** 캡슐형(pill) 모서리 */
  round?: boolean
  /** 로딩 스피너 표시 + 클릭 차단 */
  loading?: boolean
  /** 부모 너비 100% 확장 */
  fullWidth?: boolean
  /** 네이티브 button type. 기본값 button */
  htmlType?: 'button' | 'submit' | 'reset'
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
  children?: ReactNode
}
