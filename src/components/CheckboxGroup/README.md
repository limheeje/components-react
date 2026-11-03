# CheckboxGroup

여러 항목을 동시에 선택하는 체크박스 그룹 컴포지트. `options` 배열을 받아 `Checkbox` 원자를
렌더하며, `min` / `max` 로 선택 개수를 제어합니다. 제어 컴포넌트(`value` + `onChange` 필수).
내부 스타일은 Tailwind 없이 `CheckboxGroup.module.scss` + `--m2m-*` 토큰.

```tsx
import CheckboxGroup from 'm2m-uiux-react/CheckboxGroup'

const options = [
  {value: 'react', label: 'React'},
  {value: 'vue', label: 'Vue.js'},
  {value: 'svelte', label: 'Svelte', disabled: true}
]

;<CheckboxGroup options={options} value={selected} onChange={setSelected} direction="horizontal" max={2} />
```

## Props

| Prop         | Type                         | Default      | 설명                                   |
| ------------ | ---------------------------- | ------------ | -------------------------------------- |
| `options`    | `CheckboxGroupOption[]`      | —            | `{ label, value, disabled? }` 배열     |
| `value`      | `string[]`                   | —            | 선택된 값 배열 (제어)                  |
| `onChange`   | `(value: string[]) => void`  | —            | 선택 변경 콜백                         |
| `direction`  | `'horizontal' \| 'vertical'` | `'vertical'` | 나열 방향                              |
| `disabled`   | `boolean`                    | `false`      | 그룹 전체 비활성화                     |
| `size`       | `'sm' \| 'md' \| 'lg'`       | `'md'`       | 하위 Checkbox 크기                     |
| `min`        | `number`                     | —            | 최소 선택 개수 (미만 해제 차단)        |
| `max`        | `number`                     | —            | 최대 선택 개수 (초과 시 나머지 비활성) |
| `name`       | `string`                     | —            | 하위 input 의 name                     |
| `classNames` | `string \| string[]`         | —            | 추가 클래스                            |

`ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`CheckboxGroup.constant.ts` 에서 export: `CHECKBOX_GROUP_DIRECTION`, `CHECKBOX_GROUP_SIZE`,
`CHECKBOX_GROUP_STATE_CLASS`, `CHECKBOX_GROUP_DEFAULT`.
