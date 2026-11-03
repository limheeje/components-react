import type {FormHTMLAttributes, ReactNode} from 'react'

import type {FORM_ACTIONS_ALIGN, FORM_LAYOUT} from '~/components/Form/Form.constant'

export type FormLayout = (typeof FORM_LAYOUT)[keyof typeof FORM_LAYOUT]
export type FormActionsAlign = (typeof FORM_ACTIONS_ALIGN)[keyof typeof FORM_ACTIONS_ALIGN]

export interface FormContextValue {
  layout: FormLayout
  labelWidth: number | string
  disabled: boolean
}

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'className'> {
  /** 필드 배치. 기본값 vertical */
  layout?: FormLayout
  /** horizontal 레이아웃의 라벨 너비 (숫자 → px). 기본값 96 */
  labelWidth?: number | string
  /** 전체 필드 비활성화 (fieldset disabled) */
  disabled?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
  children?: ReactNode
}

export interface FormFieldProps {
  /** 라벨 */
  label?: ReactNode
  /** 필드 이름 (제어 컨트롤과 연결) */
  name?: string
  /** 필수 표시(*) */
  required?: boolean
  /** 에러 메시지 (있으면 빨간 테두리 상태 + 메시지) */
  error?: string
  /** 도움말 (error 없을 때 표시) */
  help?: ReactNode
  /** 라벨 `for` 대상 id */
  htmlFor?: string
  /** 이 필드만 레이아웃 오버라이드 */
  layout?: FormLayout
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
  children: ReactNode
}

export interface FormActionsProps {
  /** 버튼 정렬. 기본값 end */
  align?: FormActionsAlign
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
  children: ReactNode
}
