# RadioGroup

단일 선택 라디오 그룹 컴포지트. `options` 배열을 받아 `Radio` 원자를 렌더하고 `name` 을
자동으로 묶어줍니다. 제어(`value` + `onChange`) / 비제어(`defaultValue`) 모두 지원.
내부 스타일은 Tailwind 없이 `RadioGroup.module.scss` + `--m2m-*` 토큰.

```tsx
import RadioGroup from 'm2m-uiux-react/RadioGroup'
;<RadioGroup
  name="city"
  options={[
    {label: '서울', value: 'seoul'},
    {label: '부산', value: 'busan'},
    {label: '인천', value: 'incheon'}
  ]}
  value={city}
  onChange={setCity}
  direction="horizontal"
/>
```

## Props

| Prop           | Type                         | Default      | 설명                               |
| -------------- | ---------------------------- | ------------ | ---------------------------------- |
| `options`      | `RadioGroupOption[]`         | —            | `{ label, value, disabled? }` 배열 |
| `value`        | `string`                     | —            | 선택된 값 (제어)                   |
| `defaultValue` | `string`                     | —            | 초기 선택 값 (비제어)              |
| `onChange`     | `(value: string) => void`    | —            | 선택 변경 콜백                     |
| `name`         | `string`                     | 자동 생성    | HTML name 속성                     |
| `direction`    | `'horizontal' \| 'vertical'` | `'vertical'` | 나열 방향                          |
| `disabled`     | `boolean`                    | `false`      | 그룹 전체 비활성화                 |
| `size`         | `'sm' \| 'md' \| 'lg'`       | `'md'`       | 하위 Radio 크기                    |
| `classNames`   | `string \| string[]`         | —            | 추가 클래스                        |

`ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`RadioGroup.constant.ts` 에서 export: `RADIO_GROUP_DIRECTION`, `RADIO_GROUP_SIZE`,
`RADIO_GROUP_STATE_CLASS`, `RADIO_GROUP_DEFAULT`.
