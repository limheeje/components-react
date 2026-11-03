# Chart

`recharts` 래퍼 차트. `line` · `bar` · `area` · `pie` · `donut` · `radar` · `scatter` +
계열별 타입 override 로 composed(혼합) 차트를 만듭니다. 격자·축·범례는 `--m2m-pg-*` 토큰,
데이터 색은 `colors` 팔레트(교체 가능).

```tsx
import Chart from 'm2m-uiux-react/Chart';

const data = [
  { month: '1월', 방문자: 4200, 매출: 1800 },
  { month: '2월', 방문자: 3800, 매출: 1540 },
];

<Chart type="line" data={data} xKey="month" series={['방문자', '매출']} />

// composed — 계열별 타입 지정
<Chart
  data={data}
  xKey="month"
  series={[
    { key: '방문자', type: 'bar' },
    { key: '매출', type: 'line', dashed: true },
  ]}
/>

// donut
<Chart type="donut" data={sourceData} xKey="name" series={['value']} />
```

## `data` 스펙

`data` 는 **평평한(flat) 객체 배열** — `Record<string, unknown>[]` — 하나입니다.
차트 종류가 달라져도 **형태는 동일**하고, "어느 키를 무엇으로 읽느냐"만 `xKey` / `series` 로 지정합니다.

```
data = [ { <xKey>: 축라벨, <seriesKey1>: 숫자, <seriesKey2>: 숫자, ... }, ... ]
       └───────────────── 한 객체 = 축(x) 위의 한 지점 / 한 조각 ─────────────────┘
```

- `xKey` → 각 객체에서 **가로축(카테고리) 값**으로 쓸 키. 문자열·숫자 모두 가능.
- `series` → 각 객체에서 **실제 값(y)** 으로 그릴 키들. `['방문자']` 또는
  `[{ key: '방문자', label: '방문 수', color: '#6366F1', dashed: true }]`.
- `series` 에 없는 키는 무시됩니다 (같은 `data` 로 여러 차트를 그려도 됨).

### 종류별 읽는 방식

| type                   | `xKey` 는              | `series` 는                                 | data 예시 1행                                |
| ---------------------- | ---------------------- | ------------------------------------------- | -------------------------------------------- |
| `line`/`bar`/`area`    | 가로축 라벨 키         | y값 키(1개 이상, 여러 개면 멀티/그룹)       | `{ month: '1월', 방문자: 4200, 매출: 1800 }` |
| `composed` (type 생략) | 가로축 라벨 키         | `{ key, type: 'bar'\|'line'\|'area' }` 배열 | `{ month: '1월', 방문자: 4200, 매출: 1800 }` |
| `pie`/`donut`          | **조각 이름** 키       | **값 키 1개** (`['value']`)                 | `{ name: '검색', value: 38 }`                |
| `radar`                | **축(꼭짓점) 이름** 키 | 폴리곤별 값 키(1개 이상)                    | `{ subject: '개발', A팀: 76, B팀: 94 }`      |
| `scatter`              | **x 좌표** 키          | **y 좌표** 키 1개 (`['y']`)                 | `{ x: 42, y: 71 }`                           |

```tsx
// line / bar / area — 한 축에 여러 계열
const monthly = [
  {month: '1월', 방문자: 4200, 매출: 1800},
  {month: '2월', 방문자: 3800, 매출: 1540}
]
;<Chart type="line" data={monthly} xKey="month" series={['방문자', '매출']} />

// pie / donut — 행 하나가 조각 하나
const source = [
  {name: '검색', value: 38},
  {name: 'SNS', value: 27}
]
;<Chart type="donut" data={source} xKey="name" series={['value']} />

// scatter — 행 하나가 점 하나
const points = [
  {x: 42, y: 71},
  {x: 18, y: 25}
]
;<Chart type="scatter" data={points} xKey="x" series={['y']} />
```

> 값은 숫자여야 하며(문자열 `"4,200"` 불가), 누락 키는 0 이 아니라 "구멍"으로 그려집니다.
> `valueFormatter` 는 표시용 포맷만 바꿉니다(원본 데이터는 숫자 유지).

## Props

| Prop             | Type                                                        | Default          | 설명                                             |
| ---------------- | ----------------------------------------------------------- | ---------------- | ------------------------------------------------ | ------------------------------- |
| `type`           | `'line'\|'bar'\|'area'\|'pie'\|'donut'\|'radar'\|'scatter'` | `'line'`         | 차트 종류                                        |
| `data`           | `Record<string, unknown>[]`                                 | —                | 데이터 배열                                      |
| `xKey`           | `string`                                                    | —                | 카테고리 축 키 (pie/radar=라벨 키, scatter=x 키) |
| `series`         | `(string \| ChartSeries)[]`                                 | —                | 계열 — `{ key, label?, color?, type?, dashed? }` |
| `height`         | `number`                                                    | `260`            | 높이 px                                          |
| `colors`         | `string[]`                                                  | 브랜드 팔레트    | 데이터 색 팔레트                                 |
| `showGrid`       | `boolean`                                                   | `true`           | 격자선                                           |
| `showAxis`       | `boolean`                                                   | `true`           | 축/눈금 라벨                                     |
| `showLegend`     | `boolean`                                                   | `true`           | 범례                                             |
| `showTooltip`    | `boolean`                                                   | `true`           | hover `<title>` 툴팁                             |
| `stacked`        | `boolean`                                                   | `false`          | 누적 (bar/area)                                  |
| `layout`         | `'horizontal'                                               | 'vertical'`      | `'horizontal'`                                   | bar 방향 (vertical = 수평 막대) |
| `referenceLines` | `{ value: number; label?: string; color?: string }[]`       | —                | y축 기준선 (line/bar/area)                       |
| `maxValue`       | `number`                                                    | 자동             | y축 최댓값 고정                                  |
| `valueFormatter` | `(v: number) => string`                                     | `toLocaleString` | 값 포맷                                          |
| `classNames`     | `string \| string[]`                                        | —                | 추가 클래스                                      |

`ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`Chart.constant.ts`: `CHART_TYPE`, `CHART_SERIES_TYPE`, `CHART_PALETTE`, `CHART_DEFAULT`.
