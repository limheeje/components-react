import type {ReactNode, TextareaHTMLAttributes} from 'react'

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  /** 에러 상태. 문자열이면 컨트롤 하단에 메시지로 표시 */
  error?: boolean | string
  /** 세로 리사이즈 핸들 노출. 기본값 true */
  resize?: boolean
  /** 우측 하단 글자 수 카운터 표시 (maxLength 와 함께 사용) */
  showCount?: boolean
  /** 기본 표시 줄 수. 기본값 3 */
  rows?: number
  /** 보조 안내 문구 (error 가 없을 때만 표시) */
  helperText?: ReactNode
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
