# Pagination

페이지 이동. `src/pages/TablePage.tsx` 의 인라인 페이저(`< 1 2 3 >`, 활성=브랜드) 스타일을 따르되
페이지가 많을 때 `…` 로 축약합니다.
내부 스타일은 Tailwind 없이 `Pagination.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Pagination from 'm2m-uiux-react/Pagination'
;<Pagination page={page} total={128} pageSize={10} onChange={setPage} showTotal />
```

## Props

| Prop           | Type                                        | Default | 설명                                       |
| -------------- | ------------------------------------------- | ------- | ------------------------------------------ |
| `page`         | `number`                                    | —       | 현재 페이지 (1-base, 필수)                 |
| `onChange`     | `(page: number) => void`                    | —       | 페이지 변경 콜백 (필수)                    |
| `total`        | `number`                                    | —       | 전체 항목 수 (`totalPages` 미지정 시 계산) |
| `pageSize`     | `number`                                    | `10`    | 페이지당 항목 수                           |
| `totalPages`   | `number`                                    | —       | 전체 페이지 수 (지정 시 우선)              |
| `siblingCount` | `number`                                    | `1`     | 현재 페이지 좌우로 항상 보일 페이지 수     |
| `showTotal`    | `boolean \| ((total: number) => ReactNode)` | `false` | 좌측 총 개수 표시                          |
| `size`         | `'sm' \| 'md'`                              | `'md'`  | 크기                                       |
| `disabled`     | `boolean`                                   | `false` | 전체 비활성                                |
| `classNames`   | `string \| string[]`                        | —       | 추가 클래스                                |

`<nav aria-label="pagination">` + 활성 페이지 `aria-current="page"`.
`ref` 는 `<nav>` 로 전달됩니다.

## 상수

`Pagination.constant.ts` 에서 export: `PAGINATION_SIZE`, `PAGINATION_STATE_CLASS`, `PAGINATION_ELLIPSIS`, `PAGINATION_DEFAULT`.
