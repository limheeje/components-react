import type {ReactNode} from 'react'

import type {SWIPER_PAGINATION} from '~/components/Swiper/Swiper.constant'

export type SwiperPagination = (typeof SWIPER_PAGINATION)[keyof typeof SWIPER_PAGINATION]

export interface SwiperProps {
  /** 슬라이드 배열 (children 대신) */
  items?: ReactNode[]
  /** 슬라이드 (items 대신) */
  children?: ReactNode
  /** 자동 재생 — true(2800ms) 또는 ms 숫자. 기본값 false */
  autoplay?: boolean | number
  /** 무한 반복. 기본값 false */
  loop?: boolean
  /** 좌우 화살표. 기본값 true */
  navigation?: boolean
  /** 페이지 인디케이터. 기본값 'bullets' */
  pagination?: SwiperPagination | false
  /** 한 화면에 보이는 슬라이드 수 (소수 허용). 기본값 1 */
  slidesPerView?: number
  /** 슬라이드 간격 px. 기본값 0 */
  spaceBetween?: number
  /** 슬라이드 변경 콜백 */
  onChange?: (index: number) => void
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
