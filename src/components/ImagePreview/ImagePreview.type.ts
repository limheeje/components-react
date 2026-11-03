import type {IMAGE_PREVIEW_FIT} from '~/components/ImagePreview/ImagePreview.constant'

export type ImagePreviewFit = (typeof IMAGE_PREVIEW_FIT)[keyof typeof IMAGE_PREVIEW_FIT]

export interface ImagePreviewProps {
  /** 썸네일 이미지 URL */
  src: string
  /** 대체 텍스트 */
  alt?: string
  /** 썸네일 너비 (숫자 → px). 기본값 120 */
  width?: number | string
  /** 썸네일 높이. 기본값 120 */
  height?: number | string
  /** 클릭 시 라이트박스 열기. 기본값 true */
  preview?: boolean
  /** 갤러리 묶음 — 같은 배열을 공유하면 라이트박스에서 이동 가능 */
  group?: string[]
  /** 모서리 둥글기 px. 기본값 8 (999 → 원형) */
  radius?: number
  /** object-fit. 기본값 cover */
  fit?: ImagePreviewFit
  /** 로드 실패 시 대체 이미지 URL */
  fallback?: string
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
