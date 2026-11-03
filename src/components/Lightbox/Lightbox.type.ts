export interface LightboxProps {
  /** 이미지 URL 목록 */
  images: string[]
  /** 현재 표시 중인 인덱스 */
  index: number
  /** 닫기 요청 (ESC · 배경 클릭 · 닫기 버튼) */
  onClose: () => void
  /** 인덱스 변경 요청 (화살표 · 썸네일 · 키보드) */
  onChange: (index: number) => void
  /** 다운로드 버튼 노출. 기본값 true */
  downloadable?: boolean
}
