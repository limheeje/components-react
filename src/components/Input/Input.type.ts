import type {InputHTMLAttributes, ReactNode} from 'react'

import type {INPUT_SIZE, INPUT_TYPE} from '~/components/Input/Input.constant'

export type InputType = (typeof INPUT_TYPE)[keyof typeof INPUT_TYPE]
export type InputSize = (typeof INPUT_SIZE)[keyof typeof INPUT_SIZE]

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'prefix' | 'onToggle' | 'className'> {
  /** input type. 기본값 text */
  type?: InputType
  /** 크기. 기본값 md */
  size?: InputSize
  /** 에러 상태. 문자열이면 컨트롤 하단에 메시지로 표시 */
  error?: boolean | string
  /** 보조 안내 문구 (error 가 없을 때만 표시) */
  helperText?: ReactNode
  /** 입력값이 있을 때 우측 X(지우기) 버튼 노출. 기본값 true */
  clearable?: boolean
  /** X 버튼 클릭 시 콜백 (값 초기화 후 호출) */
  onClear?: () => void
  /** 글자 수 카운터 표시 (maxLength 와 함께 사용) */
  showCount?: boolean
  /** 좌측 고정 요소 */
  prefix?: ReactNode
  /** 우측 고정 요소 */
  suffix?: ReactNode
  /** type="password" 에서 표시/숨기기 토글 버튼 노출 */
  showToggle?: boolean
  /** 토글 버튼 클릭 시 콜백 */
  onToggle?: (visible: boolean) => void
  /**
   * type="search" 에서 Enter 키 또는 돋보기 아이콘 클릭 시 호출.
   * 지정하면 돋보기 아이콘이 버튼으로 렌더된다.
   */
  onSearch?: (value: string) => void
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}

/** `Input.Text` 등 서브 컴포넌트 props (type 은 고정) */
export type InputVariantProps = Omit<InputProps, 'type'>
