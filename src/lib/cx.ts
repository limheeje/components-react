/** 조건부 className 병합 유틸 (falsy 값 제거 후 공백 결합). */
export type CxInput = string | false | null | undefined

export function cx(...inputs: CxInput[]): string {
  return inputs.filter(Boolean).join(' ')
}

/**
 * 공통 `classNames` prop (`string | string[]`) → 단일 문자열.
 * 원본 `Common*` 컴포넌트의 API 규약과 맞추기 위한 헬퍼.
 */
export function resolveClassNames(classNames: string | string[] | undefined): string {
  if (Array.isArray(classNames)) return classNames.filter(Boolean).join(' ')
  return classNames ?? ''
}
