import type {ReactNode} from 'react'

import type {RADIO_GROUP_DIRECTION, RADIO_GROUP_SIZE} from '~/components/RadioGroup/RadioGroup.constant'

export type RadioGroupDirection = (typeof RADIO_GROUP_DIRECTION)[keyof typeof RADIO_GROUP_DIRECTION]
export type RadioGroupSize = (typeof RADIO_GROUP_SIZE)[keyof typeof RADIO_GROUP_SIZE]

export interface RadioGroupOption {
  label: ReactNode
  value: string
  disabled?: boolean
}

export interface RadioGroupProps {
  /** 항목 배열 */
  options: RadioGroupOption[]
  /** 선택된 값 (제어 컴포넌트) */
  value?: string
  /** 초기 선택 값 (비제어 컴포넌트) */
  defaultValue?: string
  /** 선택 변경 콜백 — 선택된 value 문자열 */
  onChange?: (value: string) => void
  /** HTML name 속성 — 생략 시 자동 생성 */
  name?: string
  /** 나열 방향. 기본값 vertical */
  direction?: RadioGroupDirection
  /** 그룹 전체 비활성화 */
  disabled?: boolean
  /** 하위 Radio 전체에 일괄 적용되는 크기. 기본값 md */
  size?: RadioGroupSize
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
