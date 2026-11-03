import type {FilterSection} from '~/components/Filter/Filter.type'

/** 섹션 컨트롤 유형 (FilterSection.type 값) */
export const FILTER_SECTION_TYPE = Object.freeze({
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  RANGE: 'range',
  BRAND: 'brand'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const FILTER_STATE_CLASS = Object.freeze({
  IS_ACTIVE: 'is-active'
} as const)

export const FILTER_DEFAULT = Object.freeze({
  TITLE: '전체 필터',
  RESET_TEXT: '초기화',
  CONFIRM_TEXT: '적용하기',
  BRAND_PAGE_SIZE: 8,
  /** 브랜드 초성/알파벳 탐색의 "전체 보기" 항목 라벨 */
  ALPHABET_ALL: '전체',
  BRAND_SEARCH_PLACEHOLDER: '브랜드 검색',
  BRAND_EMPTY_TEXT: '검색 결과가 없습니다.'
} as const)

/**
 * e-커머스 목록 필터 참고/데모용 예시 구성. `Filter` 컴포넌트는 섹션을 자체적으로 정하지 않고
 * `sections` prop 을 필수로 받으므로, 이 상수는 그대로 쓰거나 참고해서 서비스 데이터로 교체하는 용도다.
 */
export const DEFAULT_FILTER_SECTIONS: FilterSection[] = [
  {
    key: 'buyingFormat',
    title: '판매 방식',
    type: 'checkbox',
    options: [
      {value: 'buyItNow', label: '즉시 구매'},
      {value: 'makerOffer', label: '메이커 오퍼'}
    ]
  },
  {
    key: 'brand',
    title: '브랜드',
    type: 'brand',
    options: [
      {value: 'accretech', label: 'Accretech'},
      {value: 'advantest', label: 'Advantest'},
      {value: 'amat', label: 'AMAT'},
      {value: 'asm', label: 'ASM'},
      {value: 'asml', label: 'ASML'},
      {value: 'axcelis', label: 'Axcelis'},
      {value: 'canon', label: 'Canon'},
      {value: 'disco', label: 'Disco'},
      {value: 'ebara', label: 'Ebara'},
      {value: 'hitachi', label: 'Hitachi'},
      {value: 'jeol', label: 'JEOL'},
      {value: 'kla', label: 'KLA'},
      {value: 'kulickeSoffa', label: 'Kulicke & Soffa'},
      {value: 'lamResearch', label: 'Lam Research'},
      {value: 'lasertec', label: 'Lasertec'},
      {value: 'nikon', label: 'Nikon'},
      {value: 'nova', label: 'Nova'},
      {value: 'ontoInnovation', label: 'Onto Innovation'},
      {value: 'screen', label: 'Screen'},
      {value: 'semes', label: 'SEMES'},
      {value: 'tel', label: 'Tokyo Electron'},
      {value: 'teradyne', label: 'Teradyne'},
      {value: 'ultratech', label: 'Ultratech'},
      {value: 'veeco', label: 'Veeco'}
    ]
  },
  {
    key: 'condition',
    title: '상품 상태',
    type: 'checkbox',
    options: [
      {value: 'newSealed', label: '새 제품(미개봉)'},
      {value: 'newUnsealed', label: '새 제품(개봉)'},
      {value: 'used', label: '중고'}
    ]
  },
  {
    key: 'shippingType',
    title: '배송 방법',
    type: 'checkbox',
    options: [
      {value: 'paid', label: '유료 배송'},
      {value: 'free', label: '무료 배송'},
      {value: 'pickup', label: '직접 수령'}
    ]
  },
  {
    key: 'returnsAvailable',
    title: '반품 가능',
    type: 'radio',
    options: [
      {value: 'yes', label: '가능'},
      {value: 'no', label: '불가'}
    ]
  },
  {
    key: 'warrantyPeriod',
    title: '보증 기간',
    type: 'radio',
    options: [
      {value: 'yes', label: '있음'},
      {value: 'no', label: '없음'}
    ]
  },
  {
    key: 'workingTest',
    title: '테스트 여부',
    type: 'radio',
    options: [
      {value: '1m', label: '1개월'},
      {value: '3m', label: '3개월'},
      {value: '6m', label: '6개월'},
      {value: '9m', label: '9개월'},
      {value: 'over1y', label: '1년 이상'}
    ]
  },
  {
    key: 'priceRange',
    title: '가격대',
    type: 'range',
    minPlaceholder: '최소 금액',
    maxPlaceholder: '최대 금액'
  }
]
