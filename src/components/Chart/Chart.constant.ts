/** type 값 → CSS Module 클래스 키(`type-*`) */
export const CHART_TYPE = Object.freeze({
  LINE: 'line',
  BAR: 'bar',
  AREA: 'area',
  PIE: 'pie',
  DONUT: 'donut',
  RADAR: 'radar',
  SCATTER: 'scatter'
} as const)

/** 계열별 렌더 타입 (composed 차트용 override) */
export const CHART_SERIES_TYPE = Object.freeze({
  LINE: 'line',
  BAR: 'bar',
  AREA: 'area'
} as const)

/** 기본 데이터 팔레트 (colors prop 으로 교체 가능) */
export const CHART_PALETTE: readonly string[] = Object.freeze([
  '#FF5A00',
  '#6366F1',
  '#22C55E',
  '#F59E0B',
  '#EF4444',
  '#06B6D4',
  '#8B5CF6',
  '#EC4899'
])

export const CHART_DEFAULT = Object.freeze({
  TYPE: CHART_TYPE.LINE,
  HEIGHT: 260
} as const)
