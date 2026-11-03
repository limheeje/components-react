# Header

페이지 상단 헤더. 좌측 뒤로가기/로고/제목 + 우측 액션 아이콘(뱃지 포함), `sticky` 고정 지원.
내부 스타일은 Tailwind 없이 `Header.module.scss` + `--m2m-*` 토큰, 아이콘은 `Icon`.

```tsx
import Header from 'm2m-uiux-react/Header'
import Icon from 'm2m-uiux-react/Icon'
;<Header
  title="상세 페이지"
  back
  onBack={() => history.back()}
  actions={[
    {icon: <Icon name="search" />, onClick: openSearch, label: '검색'},
    {icon: <Icon name="info" />, onClick: openAlerts, badge: 3, label: '알림'}
  ]}
  sticky
/>
```

## Props

| Prop         | Type                     | Default     | 설명                                 |
| ------------ | ------------------------ | ----------- | ------------------------------------ |
| `type`       | `'default' \| 'primary'` | `'default'` | 흰 배경 / 브랜드 컬러                |
| `title`      | `ReactNode`              | —           | 제목                                 |
| `back`       | `boolean`                | `false`     | 좌측 뒤로가기 버튼                   |
| `onBack`     | `() => void`             | —           | 뒤로가기 클릭                        |
| `actions`    | `HeaderAction[]`         | —           | `{ icon, onClick?, badge?, label? }` |
| `logo`       | `ReactNode`              | —           | 좌측 로고 (title 옆)                 |
| `sticky`     | `boolean`                | `false`     | `position: sticky` + 그림자          |
| `children`   | `ReactNode`              | —           | 전체 내용 교체 (title/actions 무시)  |
| `classNames` | `string \| string[]`     | —           | 추가 클래스                          |

`ref` 는 `<header>` 엘리먼트로 전달됩니다.

## 상수

`Header.constant.ts`: `HEADER_TYPE`, `HEADER_STATE_CLASS`, `HEADER_DEFAULT`.
