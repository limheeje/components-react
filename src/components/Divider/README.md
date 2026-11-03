# Divider

구분선 (ui `separator` 기반). `src/pages/DividerPage.tsx` 원본 API 를 따릅니다.
내부 스타일은 Tailwind 없이 `Divider.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Divider from 'm2m-uiux-react/Divider';

<Divider />
<Divider label="또는" />
<Divider direction="vertical" />
<Divider thickness={2} color="var(--m2m-pg-brand)" />
```

## Props

| Prop         | Type                         | Default        | 설명                                            |
| ------------ | ---------------------------- | -------------- | ----------------------------------------------- |
| `direction`  | `'horizontal' \| 'vertical'` | `'horizontal'` | 방향. vertical 은 부모 flex 높이에 맞춰 늘어남  |
| `color`      | `string`                     | 토큰 border    | 선 색상 (CSS color / 토큰 문자열)               |
| `thickness`  | `number`                     | `1`            | 선 두께(px)                                     |
| `label`      | `ReactNode`                  | —              | 라벨 (horizontal 전용)                          |
| `labelAlign` | `'center' \| 'left'`         | `'center'`     | 라벨 정렬                                       |
| `dashed`     | `boolean`                    | `false`        | 점선 스타일                                     |
| `decorative` | `boolean`                    | `true`         | 장식이면 스크린리더 무시. `label` 시 자동 false |
| `classNames` | `string \| string[]`         | —              | 추가 클래스                                     |

`ref` 는 `<div>` 엘리먼트로 전달됩니다.

## 상수

`Divider.constant.ts` 에서 export: `DIVIDER_DIRECTION`, `DIVIDER_LABEL_ALIGN`, `DIVIDER_STATE_CLASS`, `DIVIDER_DEFAULT`.
