/** 내부에서 관리하는 이미지 항목 */
export interface ImageUploadPreviewItem {
  id: number
  file: File
  /** 유효 이미지의 dataURL (에러면 '') */
  dataUrl: string
  /** 에러 사유 (크기 초과 등) */
  errorMessage?: string
}

export interface ImageUploadPreviewProps {
  /** 최대 개수. 기본값 8 */
  maxCount?: number
  /** 파일당 최대 크기(byte). 기본값 5MB */
  maxSize?: number
  /** 그리드 열 수. 기본값 4 */
  cols?: number
  /** 썸네일 한 변 px. 기본값 88 */
  thumbSize?: number
  /** 드래그 & 드롭 영역 모드 */
  drag?: boolean
  /** 리스트형 미리보기 (기본은 그리드) */
  listView?: boolean
  /** 비활성화 — 추가 UI 숨김 */
  disabled?: boolean
  /** false면 선택 UI만 표시하고 내부 썸네일을 관리하지 않음 */
  showList?: boolean
  /** 유효한 이미지 목록이 바뀔 때 */
  onChange?: (files: File[]) => void
  /** showList=false에서 크기·개수 검증에 실패한 파일 */
  onReject?: (items: Array<{file: File; message: string}>) => void
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
