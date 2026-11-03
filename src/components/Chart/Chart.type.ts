import type {CHART_SERIES_TYPE, CHART_TYPE} from '~/components/Chart/Chart.constant'

export type ChartType = (typeof CHART_TYPE)[keyof typeof CHART_TYPE]
export type ChartSeriesType = (typeof CHART_SERIES_TYPE)[keyof typeof CHART_SERIES_TYPE]

export type ChartDatum = Record<string, unknown>

export interface ChartSeries {
  /** 데이터 키 */
  key: string
  /** 범례 라벨 (기본값 key) */
  label?: string
  /** 색 (기본값 colors 팔레트 순환) */
  color?: string
  /** composed 차트에서 이 계열만 다른 렌더 타입 */
  type?: ChartSeriesType
  /** 점선 (line/area) */
  dashed?: boolean
}

export interface ChartProps {
  /** 차트 종류. 기본값 line */
  type?: ChartType
  /** 데이터 배열 */
  data: ChartDatum[]
  /** 카테고리(x)축 키 — pie/donut/radar 는 라벨 키, scatter 는 x 값 키 */
  xKey: string
  /** 계열 — 키 문자열 또는 상세 객체 배열 */
  series: (string | ChartSeries)[]
  /** 높이 px. 기본값 260 */
  height?: number
  /** 데이터 팔레트 (series.color 미지정 시) */
  colors?: string[]
  /** 격자선 */
  showGrid?: boolean
  /** 축/눈금 라벨 */
  showAxis?: boolean
  /** 범례 */
  showLegend?: boolean
  /** hover 시 네이티브 툴팁(<title>) */
  showTooltip?: boolean
  /** 누적 (bar/area) */
  stacked?: boolean
  /** bar 차트 방향. 기본값 'horizontal'(수직 막대), 'vertical'(수평 막대) */
  layout?: 'horizontal' | 'vertical'
  /** y축 기준선 (line/bar/area) */
  referenceLines?: {value: number; label?: string; color?: string}[]
  /** y축 최댓값 고정 */
  maxValue?: number
  /** 값 포맷터 (툴팁·축) */
  valueFormatter?: (value: number) => string
  /** 추가 클래스 (string | string[]) */
  classNames?: string | string[]
}
