import type {ReactNode} from 'react'

import type {DATE_PICKER_MODE} from '~/components/DatePicker/DatePicker.constant'

export type DatePickerMode = (typeof DATE_PICKER_MODE)[keyof typeof DATE_PICKER_MODE]

export type DateRange = [Date | null, Date | null]
/** single: Date | null · range: [Date|null, Date|null] */
export type DatePickerValue = Date | null | DateRange

export interface DatePickerProps {
  /** 모드. 기본값 single */
  mode?: DatePickerMode
  /** 제어 값 (single: Date|null / range: [start, end]) */
  value?: DatePickerValue
  /** 비제어 초기값 (single) */
  defaultValue?: Date | null
  /** 비제어 초기값 (range) */
  defaultRange?: DateRange
  /** 선택 변경 콜백 (single: Date|null / range: [start, end]) */
  onChange?: (value: DatePickerValue) => void
  /** 표시 포맷 (토큰: YYYY MM DD HH mm). 기본값 'YYYY-MM-DD' */
  format?: string
  /** 미선택 안내 (range 는 [시작, 종료]) */
  placeholder?: string | [string, string]
  /** 선택 가능 최소 날짜 */
  minDate?: Date
  /** 선택 가능 최대 날짜 */
  maxDate?: Date
  /** 날짜 + 시간 선택 (달력 하단 시간 패널) */
  showTime?: boolean
  /** 선택 시 ✕ 초기화 버튼 */
  clearable?: boolean
  /** 비활성 */
  disabled?: boolean
  /** 에러 상태. 문자열이면 하단 메시지로 표시 */
  error?: boolean | string
  /** 보조 안내 문구 (error 가 없을 때만 표시) */
  helperText?: ReactNode
  /** 헤더 'N월' 클릭 → 월 선택 패널. 기본값 true */
  showMonthPicker?: boolean
  /** 헤더 'YYYY년' 클릭 → 연도 선택 패널. 기본값 true */
  showYearPicker?: boolean
  /** 오늘 날짜 아래 점 강조 */
  showTodayDot?: boolean
  /** 주말(일/토) 색상 구분 */
  showWeekend?: boolean
  /** form 연동용 name (hidden input, 표시 문자열) */
  name?: string
  /** 트리거 id */
  id?: string
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
