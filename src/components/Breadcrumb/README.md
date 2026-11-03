# Breadcrumb

경로 탐색 브레드크럼. `src/pages/BreadcrumbPage.tsx` 원본 API 를 따릅니다.
내부 스타일은 Tailwind 없이 `Breadcrumb.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Breadcrumb from 'm2m-uiux-react/Breadcrumb'
;<Breadcrumb
  items={[
    {label: '홈', href: '/'},
    {label: '카테고리', href: '/category'},
    {label: 'iPhone 15 Pro'} // 마지막 = 현재 위치
  ]}
  maxItems={4}
/>
```

## Props

| Prop         | Type                   | Default        | 설명                                                             |
| ------------ | ---------------------- | -------------- | ---------------------------------------------------------------- |
| `items`      | `BreadcrumbItem[]`     | —              | 경로 항목 (필수, 마지막 항목이 현재 위치)                        |
| `separator`  | `ReactNode`            | chevron 아이콘 | 구분자                                                           |
| `maxItems`   | `number`               | —              | 초과 시 가운데를 "…" 로 축약 (첫 1 + … + 마지막 2, 클릭 시 펼침) |
| `size`       | `'sm' \| 'md' \| 'lg'` | `'md'`         | 크기                                                             |
| `classNames` | `string \| string[]`   | —              | 추가 클래스                                                      |

`<nav aria-label="breadcrumb">` 로 감싸고 마지막 항목에 `aria-current="page"` 를 부여합니다.
`ref` 는 `<nav>` 로 전달됩니다.

### `BreadcrumbItem`

```ts
interface BreadcrumbItem {
  label: ReactNode
  href?: string
  icon?: ReactNode
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
```

## 상수

`Breadcrumb.constant.ts` 에서 export: `BREADCRUMB_SIZE`, `BREADCRUMB_STATE_CLASS`, `BREADCRUMB_DEFAULT`.
