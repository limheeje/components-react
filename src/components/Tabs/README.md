# Tabs

콘텐츠를 그룹으로 분리하고 탭으로 전환하는 내비게이션. `src/pages/TabPage.tsx` 원본 API 를 따릅니다.
내부 스타일은 Tailwind 없이 `Tabs.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Tabs from 'm2m-uiux-react/Tabs'
;<Tabs
  items={[
    {key: 'home', label: '홈', content: <HomePanel />},
    {key: 'noti', label: '알림', icon: <Icon name="info" />, badge: 5, content: <NotiPanel />},
    {key: 'off', label: '비활성', disabled: true}
  ]}
  type="line"
/>
```

## Props

| Prop         | Type                         | Default  | 설명                       |
| ------------ | ---------------------------- | -------- | -------------------------- |
| `items`      | `TabItem[]`                  | —        | 탭 배열 (필수)             |
| `defaultKey` | `string`                     | 첫 항목  | 비제어 초기 선택 key       |
| `activeKey`  | `string`                     | —        | 제어 선택 key              |
| `onChange`   | `(key: string) => void`      | —        | 선택 변경 콜백             |
| `type`       | `'line' \| 'card' \| 'pill'` | `'line'` | 스타일                     |
| `size`       | `'sm' \| 'md' \| 'lg'`       | `'md'`   | 크기                       |
| `centered`   | `boolean`                    | `false`  | 탭 중앙 정렬               |
| `fullWidth`  | `boolean`                    | `false`  | 탭이 전체 너비를 균등 분할 |
| `classNames` | `string \| string[]`         | —        | 추가 클래스                |

`ref` 는 루트 `<div>` 로 전달됩니다.

### `TabItem`

```ts
interface TabItem {
  key: string
  label: ReactNode
  icon?: ReactNode
  badge?: string | number
  disabled?: boolean
  content?: ReactNode
}
```

## 상수

`Tabs.constant.ts` 에서 export: `TABS_TYPE`, `TABS_SIZE`, `TABS_STATE_CLASS`, `TABS_DEFAULT`.
