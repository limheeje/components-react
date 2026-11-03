import type {ReactNode} from 'react'

import type {SEGMENTED_SIZE} from '~/components/Segmented/Segmented.constant'

export type SegmentedSize = (typeof SEGMENTED_SIZE)[keyof typeof SEGMENTED_SIZE]

export interface SegmentedOption {
  label: ReactNode
  value: string
  disabled?: boolean
}

export interface SegmentedProps {
  /** 항목 배열. 문자열이면 label·value 동일로 취급 */
  options: (SegmentedOption | string)[]
  /** 선택된 값 (제어 컴포넌트) */
  value?: string
  /** 초기 선택 값 (비제어 컴포넌트) */
  defaultValue?: string
  /** 선택 변경 콜백 — 선택된 value 와 해당 옵션 객체 */
  onChange?: (value: string, option: SegmentedOption) => void
  /** HTML name 속성 — 생략 시 자동 생성 */
  name?: string
  /** 컨트롤 크기. Input 필드와 동일(sm 31 · md 40 · lg 50). 기본값 md */
  size?: SegmentedSize
  /** 그룹 전체 비활성화 */
  disabled?: boolean
  /** 부모 너비를 꽉 채우고 항목을 균등 분배 */
  block?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
