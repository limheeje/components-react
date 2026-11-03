import type {ReactNode} from 'react'

import type {TIME_PICKER_FORMAT, TIME_PICKER_SIZE} from '~/components/TimePicker/TimePicker.constant'

export type TimePickerFormat = (typeof TIME_PICKER_FORMAT)[keyof typeof TIME_PICKER_FORMAT]
export type TimePickerSize = (typeof TIME_PICKER_SIZE)[keyof typeof TIME_PICKER_SIZE]

export interface TimePickerProps {
  /** 제어 값 ('HH:mm' 또는 'HH:mm:ss') */
  value?: string
  /** 비제어 초기값 */
  defaultValue?: string
  /** '확인' 클릭 또는 초기화 시 호출 */
  onChange?: (value: string) => void
  /** 포맷. 기본값 'HH:mm' */
  format?: TimePickerFormat
  /** 크기. 기본값 md */
  size?: TimePickerSize
  /** 미선택 안내 문구 */
  placeholder?: string
  /** 분 단위 간격. 기본값 1 */
  step?: number
  /** 선택 시 ✕ 초기화 버튼 */
  clearable?: boolean
  /** 비활성 */
  disabled?: boolean
  /** 에러 상태. 문자열이면 하단 메시지로 표시 */
  error?: boolean | string
  /** 보조 안내 문구 (error 가 없을 때만 표시) */
  helperText?: ReactNode
  /** form 연동용 name (hidden input) */
  name?: string
  /** 트리거 id */
  id?: string
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
