/** 필터 섹션의 컨트롤 유형 */
export type FilterSectionType = 'checkbox' | 'radio' | 'range' | 'brand'

/** 체크박스/라디오/브랜드 섹션의 선택지 (CheckboxGroup·RadioGroup 옵션 형태와 동일) */
export interface FilterOption {
  value: string
  label: string
}

/** type='range' 섹션 값 (예: 가격대 최소/최대) */
export interface FilterRangeValue {
  min?: string
  max?: string
}

export type FilterSectionValue = string[] | string | FilterRangeValue

/** 필터 섹션 1개 정의. `sections` prop 으로 서비스별 항목 구성을 교체할 수 있다 */
export interface FilterSection {
  /** `value` 에서 이 섹션 값을 식별하는 키 */
  key: string
  /** 섹션 제목 (예: '브랜드', '상품 상태') */
  title: string
  /** 'checkbox'|'radio' = 일반 옵션 목록, 'range' = 최소/최대 입력, 'brand' = 검색+초성 탐색+페이지네이션이 붙은 체크박스 목록 */
  type: FilterSectionType
  /** 'checkbox'|'radio'|'brand' 섹션의 선택지 */
  options?: FilterOption[]
  /** type='range' 최소값 입력 placeholder */
  minPlaceholder?: string
  /** type='range' 최대값 입력 placeholder */
  maxPlaceholder?: string
}

/** 전체 필터 선택값. 키 = FilterSection.key */
export type FilterValue = Record<string, FilterSectionValue>

export interface FilterProps {
  /** 열림 상태 (제어) */
  open: boolean
  /** 닫기 요청 (X 버튼 · 헤더 스와이프 · 배경 클릭 · ESC) */
  onClose: () => void
  /** 선택값 (제어) */
  value?: FilterValue
  /** 확정 버튼 클릭 시 */
  onChange?: (value: FilterValue) => void
  /** 확정 버튼 클릭 시 (`onChange` 와 함께 호출, 이어서 `onClose`) */
  onConfirm?: (value: FilterValue) => void
  /** 필터 섹션 구성. 컴포넌트 자체는 기본 항목을 정하지 않으며, 항상 부모(소비 앱)가 전달한다.
   *  참고용 e-커머스 데모 구성이 필요하면 `DEFAULT_FILTER_SECTIONS` 를 import 해서 그대로 넘기거나 커스텀할 수 있다. */
  sections: FilterSection[]
  /** 헤더 제목. 기본값 '전체 필터' */
  title?: string
  /** 전체 초기화 버튼 라벨. 기본값 '초기화' */
  resetText?: string
  /** 적용 버튼 라벨. 기본값 '적용하기' */
  confirmText?: string
  /** 배경 클릭으로 닫기. 기본값 true */
  closeOnBackdrop?: boolean
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
