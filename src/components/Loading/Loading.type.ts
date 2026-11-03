import type {HTMLAttributes, ReactNode} from 'react'

import type {LOADING_COLOR, LOADING_SIZE, LOADING_TYPE} from '~/components/Loading/Loading.constant'

export type LoadingType = (typeof LOADING_TYPE)[keyof typeof LOADING_TYPE]
export type LoadingSize = (typeof LOADING_SIZE)[keyof typeof LOADING_SIZE]
export type LoadingColor = (typeof LOADING_COLOR)[keyof typeof LOADING_COLOR]

export interface LoadingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** 표시 타입. 기본값 spinner */
  type?: LoadingType
  /** 크기. 기본값 md */
  size?: LoadingSize
  /** 색상. 기본값 primary */
  color?: LoadingColor
  /** 로더 아래 안내 문구 */
  text?: ReactNode
  /** 부모(또는 화면)를 덮는 오버레이 모드 */
  overlay?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
