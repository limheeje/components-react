# Checkbox

네이티브 `<input type="checkbox">` 기반 공통 체크박스. 커스텀 체크 박스 UI를 얹되
포커스·키보드·폼 연동은 네이티브 동작을 그대로 사용합니다.
내부 스타일은 Tailwind 없이 `Checkbox.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Checkbox from 'm2m-uiux-react/Checkbox'
;<Checkbox label="약관에 동의합니다" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
```

## Props

| Prop            | Type                   | Default | 설명                                               |
| --------------- | ---------------------- | ------- | -------------------------------------------------- |
| `label`         | `ReactNode`            | —       | 라벨 텍스트/노드                                   |
| `size`          | `'sm' \| 'md' \| 'lg'` | `'md'`  | 크기                                               |
| `indeterminate` | `boolean`              | `false` | 부분 선택 상태 (`checked` 보다 우선하는 시각 표현) |
| `error`         | `boolean`              | `false` | 에러(유효성 실패) 상태                             |

그 외 `<input>` 의 표준 속성(`checked`, `defaultChecked`, `disabled`, `name`, `value`, `onChange` …)을 전달할 수 있습니다.
`ref` 는 내부 `<input>` 엘리먼트로 전달됩니다 (`indeterminate` 는 DOM 프로퍼티로 반영).

## 상수

`Checkbox.constant.ts` 에서 export: `CHECKBOX_SIZE`, `CHECKBOX_STATE_CLASS`(`{ IS_CHECKED, IS_INDETERMINATE, IS_DISABLED, IS_ERROR }`), `CHECKBOX_DEFAULT`.
