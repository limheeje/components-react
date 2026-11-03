import type {ReactNode} from 'react'

import type {TABS_SIZE, TABS_TYPE} from '~/components/Tabs/Tabs.constant'

export type TabsType = (typeof TABS_TYPE)[keyof typeof TABS_TYPE]
export type TabsSize = (typeof TABS_SIZE)[keyof typeof TABS_SIZE]

export interface TabItem {
  key: string
  label: ReactNode
  icon?: ReactNode
  badge?: string | number
  disabled?: boolean
  /** 선택 시 표시할 콘텐츠 */
  content?: ReactNode
}

export interface TabsProps {
  /** 탭 배열 */
  items: TabItem[]
  /** 비제어 초기 선택 key */
  defaultKey?: string
  /** 제어 선택 key */
  activeKey?: string
  /** 선택 변경 콜백 */
  onChange?: (key: string) => void
  /** 스타일. 기본값 line */
  type?: TabsType
  /** 크기. 기본값 md */
  size?: TabsSize
  /** 탭 중앙 정렬 */
  centered?: boolean
  /** 탭이 전체 너비를 균등 분할 */
  fullWidth?: boolean
  /** 추가 클래스 (string | string[]) — 루트에 적용 */
  classNames?: string | string[]
}
