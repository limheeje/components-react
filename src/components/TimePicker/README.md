# TimePicker

시(HH)·분(mm)·초(ss)를 스크롤 컬럼으로 선택하는 팝업. `src/pages/TimePickerPage.tsx` 의
`CommonTimePicker` API·디자인을 그대로 따릅니다. **'확인' 클릭 시에만 `onChange` 가 호출됩니다.**
내부 스타일은 Tailwind 없이 `TimePicker.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import TimePicker from 'm2m-uiux-react/TimePicker';

<TimePicker value={time} onChange={(t) => setTime(t)} format="HH:mm" />
<TimePicker format="HH:mm:ss" step={5} clearable />
```

제어(`value` + `onChange`) / 비제어(`defaultValue`) 모두 지원합니다.

## Props

| Prop           | Type                      | Default               | 설명                                   |
| -------------- | ------------------------- | --------------------- | -------------------------------------- |
| `value`        | `string`                  | —                     | 제어 값 (`HH:mm` 또는 `HH:mm:ss`)      |
| `defaultValue` | `string`                  | `''`                  | 비제어 초기값                          |
| `onChange`     | `(value: string) => void` | —                     | '확인' 클릭 또는 초기화 시 (빈 문자열) |
| `format`       | `'HH:mm' \| 'HH:mm:ss'`   | `'HH:mm'`             | 초 포함 여부 (3컬럼)                   |
| `size`         | `'sm' \| 'md' \| 'lg'`    | `'md'`                | 크기                                   |
| `placeholder`  | `string`                  | `'시간을 선택하세요'` | 미선택 안내                            |
| `step`         | `number`                  | `1`                   | 분 단위 간격 (예: 30 → 00·30분만)      |
| `clearable`    | `boolean`                 | `false`               | 선택 시 ✕ 초기화 버튼                  |
| `disabled`     | `boolean`                 | `false`               | 비활성 (팝업 안 열림)                  |
| `error`        | `boolean \| string`       | `false`               | 에러 상태 (문자열이면 하단 메시지)     |
| `helperText`   | `ReactNode`               | —                     | 보조 안내 (`error` 없을 때만)          |
| `name`         | `string`                  | —                     | form 연동용 hidden input               |
| `classNames`   | `string \| string[]`      | —                     | 추가 클래스                            |

`ref` 는 루트 `<div>` 로 전달됩니다. 시간 범위는 두 개의 `<TimePicker>` 를 조합합니다.

## 상수

`TimePicker.constant.ts` 에서 export: `TIME_PICKER_FORMAT`, `TIME_PICKER_SIZE`, `TIME_PICKER_STATE_CLASS`, `TIME_PICKER_DEFAULT`.
