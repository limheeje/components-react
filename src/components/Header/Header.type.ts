import type {ReactNode} from 'react'

import type {HEADER_TYPE} from '~/components/Header/Header.constant'

export type HeaderType = (typeof HEADER_TYPE)[keyof typeof HEADER_TYPE]

export interface HeaderAction {
  /** 아이콘 노드 (예: <Icon name="bell" />) */
  icon: ReactNode
  /** 클릭 핸들러 */
  onClick?: () => void
  /** 우상단 뱃지 숫자/문자 */
  badge?: number | string
  /** 접근성 라벨 */
  label?: string
}

export interface HeaderProps {
  /** 시각 스타일. 기본값 default */
  type?: HeaderType
  /** 가운데 제목 */
  title?: ReactNode
  /** 좌측 뒤로가기 버튼 */
  back?: boolean
  /** 뒤로가기 클릭 핸들러 */
  onBack?: () => void
  /** 우측 액션 버튼 배열 */
  actions?: HeaderAction[]
  /** 좌측 로고 노드 (title 대신) */
  logo?: ReactNode
  /** 스크롤 시 상단 고정 + 그림자 */
  sticky?: boolean
  /** 커스텀 자식 (title/logo/actions 대신 전체 교체) */
  children?: ReactNode
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
