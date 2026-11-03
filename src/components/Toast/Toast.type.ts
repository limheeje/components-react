import type {ReactNode} from 'react'

import type {TOAST_POSITION, TOAST_TYPE, TOAST_VARIANT} from '~/components/Toast/Toast.constant'

export type ToastType = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE]
export type ToastPosition = (typeof TOAST_POSITION)[keyof typeof TOAST_POSITION]
export type ToastVariant = (typeof TOAST_VARIANT)[keyof typeof TOAST_VARIANT]

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastOptions {
  /** 메시지 (필수) */
  message: ReactNode
  /** 타입. 기본값 info */
  type?: ToastType
  /** 자동 닫힘(ms). Infinity 면 자동으로 닫히지 않음. 기본값 3000 */
  duration?: number
  /** 화면 위치. 기본값은 ToastProvider 의 position */
  position?: ToastPosition
  /** 액션 버튼 */
  action?: ToastAction
  /** 시각 변형. 기본값 filled */
  variant?: ToastVariant
  /** 우측 X 닫기 버튼. 기본값 true */
  dismissible?: boolean
}

export interface ToastData extends Required<Omit<ToastOptions, 'action'>> {
  id: number
  action?: ToastAction
}

export interface ToastProviderProps {
  /** 기본 위치. 기본값 top-right */
  position?: ToastPosition
  /** 위치별 최대 표시 개수. 기본값 5 */
  maxCount?: number
  children?: ReactNode
}
