import type {ReactElement, ReactNode} from 'react'

import type {TOOLTIP_PLACEMENT, TOOLTIP_TRIGGER} from '~/components/Tooltip/Tooltip.constant'

export type TooltipPlacement = (typeof TOOLTIP_PLACEMENT)[keyof typeof TOOLTIP_PLACEMENT]
export type TooltipTrigger = (typeof TOOLTIP_TRIGGER)[keyof typeof TOOLTIP_TRIGGER]

export interface TooltipProps {
  /** 툴팁 내용 (텍스트 또는 노드) */
  content: ReactNode
  /** 대상 엘리먼트 (단일 자식) */
  children: ReactElement
  /** 표시 방향. 기본값 top */
  placement?: TooltipPlacement
  /** 트리거 방식. 기본값 hover */
  trigger?: TooltipTrigger
  /** 화살표 표시. 기본값 true */
  arrow?: boolean
  /** 표시 지연(ms). 기본값 0 */
  delay?: number
  /** 비활성화 (툴팁 안 뜸) */
  disabled?: boolean
  /** 추가 클래스 (string | string[]) — 툴팁 박스에 적용 */
  classNames?: string | string[]
}
