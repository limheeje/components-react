# Table

`columns` / `data` 배열로 구성하는 데이터 그리드. 정렬 · 행 선택 · 페이지네이션 · 다중 헤더
(`headGroups`) · 자동 rowspan 병합(`rowSpanKey`) · 특수 행 커스텀(`renderRow`) 을 지원합니다.
제네릭 함수 컴포넌트(`Table<T>`). 내부 스타일은 Tailwind 없이 `Table.module.scss` + `--m2m-*` 토큰.

```tsx
import Table from 'm2m-uiux-react/Table'

const columns = [
  {key: 'id', label: 'ID', width: 60, sortable: true},
  {key: 'name', label: '이름', sortable: true},
  {key: 'status', label: '상태', render: (v) => <Badge type={v} />}
]

;<Table
  columns={columns}
  data={data}
  rowKey="id"
  striped
  selectable
  selectedRowKeys={selected}
  onSelectionChange={(keys) => setSelected(keys)}
  pagination={{page, pageSize: 10, total, onChange: setPage}}
/>
```

## Props

| Prop                         | Type                                           | Default   | 설명                                                                                          |
| ---------------------------- | ---------------------------------------------- | --------- | --------------------------------------------------------------------------------------------- |
| `columns`                    | `TableColumn<T>[]`                             | `[]`      | `{ key, label, width?, align?, sortable?, render?, cellStyle?, rowSpanKey? }`                 |
| `headGroups`                 | `TableHeadCell[][]`                            | —         | 다중 헤더 행 (colSpan/rowSpan)                                                                |
| `data`                       | `T[]`                                          | —         | 데이터 배열                                                                                   |
| `rowKey`                     | `string \| ((row, i) => string \| number)`     | `'id'`    | 행 고유 키                                                                                    |
| `renderRow`                  | `(row, i) => ReactNode`                        | —         | 특수 행 직접 렌더 (undefined → 기본 렌더)                                                     |
| `striped` / `hover`          | `boolean`                                      | `false`   | 줄무늬 / hover 하이라이트                                                                     |
| `size`                       | `'sm' \| 'md'`                                 | `'md'`    | 밀도                                                                                          |
| `loading`                    | `boolean`                                      | `false`   | 로딩 오버레이                                                                                 |
| `emptyText` / `emptyContent` | `ReactNode`                                    | 기본 문구 | 빈 상태                                                                                       |
| `selectable`                 | `boolean`                                      | `false`   | 체크박스 열 추가                                                                              |
| `selectedRowKeys`            | `(string \| number)[]`                         | —         | 선택된 행 키 (제어; 없으면 내부 상태)                                                         |
| `onSelectionChange`          | `(keys, rows) => void`                         | —         | 선택 변경                                                                                     |
| `sort`                       | `{ key, direction } \| null`                   | —         | 정렬 상태 (제어; 없으면 클라이언트 정렬)                                                      |
| `onSortChange`               | `(sort \| null) => void`                       | —         | 헤더 클릭(asc→desc→해제)                                                                      |
| `pagination`                 | `{ page, pageSize, total?, align?, onChange }` | —         | 있으면 data 슬라이스 + 하단(총 개수 위 / 페이저 아래). `align`: `left`·`center`·`right`(기본) |
| `classNames`                 | `string \| string[]`                           | —         | 추가 클래스                                                                                   |

## 상수

`Table.constant.ts`: `TABLE_ALIGN`, `TABLE_SORT_DIRECTION`, `TABLE_SIZE`,
`TABLE_STATE_CLASS`, `TABLE_DEFAULT`.
