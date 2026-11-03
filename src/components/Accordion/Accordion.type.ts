import type {ReactNode} from 'react'

import type {ACCORDION_TYPE} from '~/components/Accordion/Accordion.constant'

export type AccordionType = (typeof ACCORDION_TYPE)[keyof typeof ACCORDION_TYPE]

export interface AccordionProps {
  /** 열림 모드. 기본값 single */
  type?: AccordionType
  /** 비제어 초기 열림값 (single: string, multiple: string[]) */
  defaultValue?: string | string[]
  /** 제어 열림값 */
  value?: string | string[]
  /** 열림값 변경 콜백 (single: string, multiple: string[]) */
  onValueChange?: (value: string | string[]) => void
  /** 추가 클래스 (string | string[]) — 루트에 적용 */
  classNames?: string | string[]
  children: ReactNode
}

export interface AccordionItemProps {
  /** 항목 식별자 */
  value: string
  /** 헤더 제목 */
  title: ReactNode
  /** 비활성 */
  disabled?: boolean
  /** 추가 클래스 (string | string[]) — 항목 래퍼에 적용 */
  classNames?: string | string[]
  /** 펼쳤을 때 표시할 콘텐츠 */
  children: ReactNode
}

export interface AccordionContextValue {
  isOpen: (value: string) => boolean
  toggle: (value: string) => void
}
