import type {ReactNode} from 'react'

import type {CHECKBOX_GROUP_DIRECTION, CHECKBOX_GROUP_SIZE} from '~/components/CheckboxGroup/CheckboxGroup.constant'

export type CheckboxGroupDirection = (typeof CHECKBOX_GROUP_DIRECTION)[keyof typeof CHECKBOX_GROUP_DIRECTION]
export type CheckboxGroupSize = (typeof CHECKBOX_GROUP_SIZE)[keyof typeof CHECKBOX_GROUP_SIZE]

export interface CheckboxGroupOption {
  label: ReactNode
  value: string
  disabled?: boolean
}

export interface CheckboxGroupProps {
  /** 항목 배열 */
  options: CheckboxGroupOption[]
  /** 선택된 값 배열 (제어 컴포넌트) */
  value: string[]
  /** 선택 변경 콜백 */
  onChange: (value: string[]) => void
  /** 나열 방향. 기본값 vertical */
  direction?: CheckboxGroupDirection
  /** 그룹 전체 비활성화 */
  disabled?: boolean
  /** 하위 Checkbox 전체에 일괄 적용되는 크기. 기본값 md */
  size?: CheckboxGroupSize
  /** 최소 선택 개수 (미만이 되는 해제를 차단) */
  min?: number
  /** 최대 선택 개수 (초과 시 나머지 항목 비활성화) */
  max?: number
  /** 하위 input 의 name 속성 */
  name?: string
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
