# Loading

데이터 처리 중 시각 피드백. `src/pages/LoadingPage.tsx` 원본 API 를 따릅니다 (spinner / dots / skeleton + overlay).
내부 스타일은 Tailwind 없이 `Loading.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Loading from 'm2m-uiux-react/Loading';

<Loading type="spinner" size="md" text="불러오는 중…" />

// 부모를 덮는 오버레이 (부모에 position: relative 필요)
<div style={{ position: 'relative' }}>
  {content}
  {isLoading && <Loading overlay />}
</div>
```

## Props

| Prop         | Type                                | Default     | 설명                                     |
| ------------ | ----------------------------------- | ----------- | ---------------------------------------- |
| `type`       | `'spinner' \| 'dots'`               | `'spinner'` | 표시 타입                                |
| `size`       | `'sm' \| 'md' \| 'lg'`              | `'md'`      | 크기                                     |
| `color`      | `'primary' \| 'neutral' \| 'white'` | `'primary'` | 색상 (`white` 는 어두운 배경/오버레이용) |
| `text`       | `ReactNode`                         | —           | 로더 아래 안내 문구                      |
| `overlay`    | `boolean`                           | `false`     | 부모를 덮는 오버레이 모드                |
| `classNames` | `string \| string[]`                | —           | 추가 클래스                              |

`role="status"` `aria-live="polite"` 로 노출됩니다. `ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`Loading.constant.ts` 에서 export: `LOADING_TYPE`, `LOADING_SIZE`, `LOADING_COLOR`, `LOADING_STATE_CLASS`, `LOADING_DEFAULT`.
