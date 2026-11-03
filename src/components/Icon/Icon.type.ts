import type {CSSProperties, MouseEventHandler} from 'react'

import type {ICON_NAME} from '~/components/Icon/Icon.constant'

/** 친숙한 이름 또는 icon-map() 원시 키 */
export type IconName = keyof typeof ICON_NAME | (string & {})

export interface IconProps {
  /** iconRegistry(icon-map) 키 또는 친숙한 별칭 */
  name: IconName
  /** 색상 (CSS color). 기본값 currentColor */
  color?: string
  /** width = height (px 숫자 또는 CSS 길이). 기본값 24 */
  size?: number | string
  /** 회전 각도(deg). 음수 허용. 기본값 0 */
  rotate?: number
  /** 회전 애니메이션 (로딩 스피너 등) */
  spin?: boolean
  /** 인라인 스타일 오버라이드 */
  style?: CSSProperties
  /** 클릭 핸들러 — 있으면 cursor: pointer 자동 적용 */
  onClick?: MouseEventHandler<HTMLElement>
  /** 접근성 라벨 (없으면 aria-hidden 처리) */
  'aria-label'?: string
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
