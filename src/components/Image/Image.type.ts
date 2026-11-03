import type {CSSProperties} from 'react'

import type {IMAGE_LOADING} from '~/components/Image/Image.constant'

export type ImageLoading = (typeof IMAGE_LOADING)[keyof typeof IMAGE_LOADING]

export interface ImageProps {
  /** 이미지 URL */
  src: string
  /** 대체 텍스트 (접근성 — 필수, 장식용은 빈 문자열) */
  alt: string
  /** src 실패 시 대체 이미지 URL. 없으면 오류 플레이스홀더 */
  fallbackSrc?: string
  /** 컨테이너 너비. 기본값 '100%' */
  width?: number | string
  /** 컨테이너 높이. 기본값 'auto' */
  height?: number | string
  /** object-fit. 기본값 'cover' */
  objectFit?: CSSProperties['objectFit']
  /** border-radius (숫자 → px). 기본값 0 */
  rounded?: number | string
  /** 로딩 중 shimmer 스켈레톤. 기본값 true */
  skeleton?: boolean
  /** 로드 완료 시 페이드인. 기본값 true */
  fadeIn?: boolean
  /** 브라우저 로딩 전략. 기본값 'lazy' */
  loading?: ImageLoading
  /** 내부 <img> 에 직접 적용할 스타일 */
  imgStyle?: CSSProperties
  /** 컨테이너 <div> 스타일 */
  style?: CSSProperties
  /** 로드 완료 콜백 */
  onLoad?: () => void
  /** 로드 실패 콜백 (fallback 도 실패했을 때) */
  onError?: () => void
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
