# ProgressBar

진행률 막대. `src/pages/ProgressPage.tsx` (`/progress/bar`) 원본 API 를 따릅니다.
내부 스타일은 Tailwind 없이 `ProgressBar.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import ProgressBar from 'm2m-uiux-react/ProgressBar'
;<ProgressBar value={60} showValue label="업로드 중" color="primary" />
```

## Props

| Prop         | Type                                              | Default     | 설명                           |
| ------------ | ------------------------------------------------- | ----------- | ------------------------------ |
| `value`      | `number`                                          | `0`         | 진행률 0~100 (범위 밖은 clamp) |
| `showValue`  | `boolean`                                         | `false`     | 우측에 퍼센트 표시             |
| `color`      | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 색상                           |
| `thickness`  | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | 막대 두께 (5 / 10 / 18px)      |
| `animated`   | `boolean`                                         | `false`     | 흐르는 그라데이션 애니메이션   |
| `label`      | `ReactNode`                                       | —           | 막대 위 라벨                   |
| `classNames` | `string \| string[]`                              | —           | 추가 클래스                    |

`role="progressbar"` + `aria-valuenow/min/max` 로 노출됩니다. `ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`ProgressBar.constant.ts` 에서 export: `PROGRESS_BAR_COLOR`, `PROGRESS_BAR_THICKNESS`, `PROGRESS_BAR_STATE_CLASS`, `PROGRESS_BAR_DEFAULT`.
