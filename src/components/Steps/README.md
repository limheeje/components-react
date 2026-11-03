# Steps

단계 진행 표시. `src/pages/ProgressPage.tsx` (`/progress/steps`) 의 `Steps` API 를 따릅니다.
내부 스타일은 Tailwind 없이 `Steps.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Steps from 'm2m-uiux-react/Steps'
;<Steps
  steps={[
    {title: '약관 동의', description: '이용약관 확인'},
    {title: '정보 입력', description: '기본 정보'},
    {title: '완료'}
  ]}
  current={1}
/>
```

## Props

| Prop         | Type                                         | Default        | 설명                                               |
| ------------ | -------------------------------------------- | -------------- | -------------------------------------------------- |
| `steps`      | `StepItem[]`                                 | —              | 단계 배열 (`{ title, description? }`, 필수)        |
| `current`    | `number`                                     | `0`            | 현재 단계 인덱스(0-base)                           |
| `direction`  | `'horizontal' \| 'vertical'`                 | `'horizontal'` | 방향                                               |
| `status`     | `'wait' \| 'process' \| 'finish' \| 'error'` | `'process'`    | 현재 단계 상태 (완료=녹색+체크, 오류=빨강+경고, …) |
| `classNames` | `string \| string[]`                         | —              | 추가 클래스                                        |

- `index < current` → 완료(녹색 + 체크)
- `index === current` → status 에 따라 색/아이콘 (process=브랜드, error=빨강, finish=녹색)
- `index > current` → 대기(회색 + 숫자)

`ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`Steps.constant.ts` 에서 export: `STEPS_DIRECTION`, `STEPS_STATUS`, `STEPS_NODE_STATE`, `STEPS_STATE_CLASS`, `STEPS_DEFAULT`.
