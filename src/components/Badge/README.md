# Badge

라벨/상태 표시용 배지. `src/pages/BadgePage.tsx` 원본 API 를 따릅니다.
내부 스타일은 Tailwind 없이 `Badge.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Badge from 'm2m-uiux-react/Badge';

<Badge type="success">정상</Badge>
<Badge type="danger-light" round>실패</Badge>
<Badge type="success" dot>정상 가동</Badge>
```

## Props

| Prop         | Type                                                                                                                                                                             | Default     | 설명                                       |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------ |
| `type`       | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'ghost' \| 'primary-light' \| 'success-light' \| 'warning-light' \| 'danger-light' \| 'info-light'` | `'primary'` | 색상 스타일 (`-light` 는 옅은 배경+테두리) |
| `size`       | `'sm' \| 'md' \| 'lg'`                                                                                                                                                           | `'md'`      | 크기                                       |
| `round`      | `boolean`                                                                                                                                                                        | `false`     | 캡슐형(pill) 모서리                        |
| `dot`        | `boolean`                                                                                                                                                                        | `false`     | 채운 배지 대신 "색상 점 + 평문" 으로 표시  |
| `classNames` | `string \| string[]`                                                                                                                                                             | —           | 추가 클래스                                |

`ref` 는 `<span>` 엘리먼트로 전달됩니다.

## 상수

`Badge.constant.ts` 에서 export: `BADGE_TYPE`, `BADGE_SIZE`, `BADGE_STATE_CLASS`(`{ IS_ROUND, IS_DOT }`), `BADGE_DEFAULT`.
