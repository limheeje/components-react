import type {HTMLAttributes, ReactNode} from 'react'

export interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  /** 주 텍스트 */
  title: ReactNode
  /** 보조 설명 */
  description?: ReactNode
  /** 좌측 아바타/아이콘 */
  avatar?: ReactNode
  /** 우측 추가 요소 */
  extra?: ReactNode
  /**
   * 클릭 가능 행 (hover 배경 + 우측 chevron 자동).
   * 미지정 시 상위 `<List clickable>` 값을 따른다.
   */
  clickable?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
