# Grid

CSS Grid 레이아웃 래퍼. 열 구성·간격·정렬을 prop 으로 제어하고 `Grid.Item` 으로 셀 병합/개별
정렬을 지정합니다. 레이아웃 값은 동적이라 인라인 스타일로 적용되며, 컴포넌트 자체 스타일은
`Grid.module.scss` (베이스만) + `--m2m-*` 토큰.

```tsx
import Grid from 'm2m-uiux-react/Grid'
;<Grid columns={3} gap={12} alignItems="center">
  <div>A</div>
  <Grid.Item colSpan={2}>B (2칸)</Grid.Item>
  <Grid.Item justifySelf="end">C</Grid.Item>
</Grid>
;<Grid columns="200px 1fr" gap={16}>
  <aside>사이드바</aside>
  <main>콘텐츠</main>
</Grid>
```

## Grid Props

| Prop           | Type                                        | Default | 설명                                               |
| -------------- | ------------------------------------------- | ------- | -------------------------------------------------- |
| `columns`      | `number \| string`                          | `12`    | 숫자 → `repeat(n, minmax(0,1fr))`, 문자열 → 그대로 |
| `rows`         | `number \| string`                          | —       | grid-template-rows                                 |
| `gap`          | `number \| string`                          | `16`    | 행·열 공통 간격 (숫자 → px)                        |
| `rowGap`       | `number \| string`                          | —       | 행 간격 (지정 시 `gap` 무시)                       |
| `columnGap`    | `number \| string`                          | —       | 열 간격                                            |
| `justifyItems` | `'start' \| 'center' \| 'end' \| 'stretch'` | —       | 전체 셀 가로 정렬                                  |
| `alignItems`   | `'start' \| 'center' \| 'end' \| 'stretch'` | —       | 전체 셀 세로 정렬                                  |
| `autoRows`     | `number \| string`                          | —       | grid-auto-rows                                     |
| `inline`       | `boolean`                                   | `false` | `display: inline-grid`                             |
| `classNames`   | `string \| string[]`                        | —       | 추가 클래스                                        |

## Grid.Item Props

| Prop          | Type                                        | 설명                         |
| ------------- | ------------------------------------------- | ---------------------------- |
| `colSpan`     | `number`                                    | `grid-column: span N`        |
| `rowSpan`     | `number`                                    | `grid-row: span N`           |
| `justifySelf` | `'start' \| 'center' \| 'end' \| 'stretch'` | 이 셀만 가로 정렬 오버라이드 |
| `alignSelf`   | `'start' \| 'center' \| 'end' \| 'stretch'` | 이 셀만 세로 정렬 오버라이드 |
| `classNames`  | `string \| string[]`                        | 추가 클래스                  |

`ref` 는 각각 루트 `<div>` 로 전달됩니다.

## 상수

`Grid.constant.ts`: `GRID_ALIGN`, `GRID_DEFAULT`.
