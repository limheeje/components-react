# Select

커스텀 드롭다운 선택 컴포넌트 (네이티브 `<select>` 아님 — 플로팅 레이어).
`src/pages/SelectPage.tsx` 원본 동작을 따릅니다: 선택 항목 `--m2m-pg-brand-light` 배경 + 체크 아이콘,
`searchable` 시 상단 검색 입력.
내부 스타일은 Tailwind 없이 `Select.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Select from 'm2m-uiux-react/Select'
;<Select
  options={[
    {label: '서울', value: 'seoul'},
    {label: '부산', value: 'busan', disabled: true}
  ]}
  value={value}
  onChange={setValue}
  searchable
  placeholder="도시 선택"
/>
```

## Props

| Prop           | Type                      | Default          | 설명                                               |
| -------------- | ------------------------- | ---------------- | -------------------------------------------------- |
| `options`      | `SelectOption[]`          | —                | 선택지 목록 (필수)                                 |
| `multiple`     | `boolean`                 | `false`          | 다중 선택 모드 (아래 표 참고)                      |
| `value`        | `string`                  | —                | 제어 값 (`multiple` 시 `string[]`)                 |
| `defaultValue` | `string`                  | `''`             | 비제어 초기값 (`multiple` 시 `string[]`)           |
| `onChange`     | `(value: string) => void` | —                | 선택 변경 콜백 (`multiple` 시 `(value: string[])`) |
| `placeholder`  | `string`                  | `'선택해주세요'` | 미선택 안내 문구                                   |
| `size`         | `'sm' \| 'md' \| 'lg'`    | `'md'`           | 크기                                               |
| `searchable`   | `boolean`                 | `false`          | 드롭다운 상단 검색 입력                            |
| `disabled`     | `boolean`                 | `false`          | 비활성                                             |
| `error`        | `boolean \| string`       | `false`          | 에러 상태. 문자열이면 하단 메시지로 표시           |
| `helperText`   | `ReactNode`               | —                | 보조 안내 문구 (`error` 없을 때만)                 |
| `name`         | `string`                  | —                | form 연동용 hidden input                           |
| `classNames`   | `string \| string[]`      | —                | 추가 클래스                                        |

키보드: `Enter`/`Space`/`↓` 열기, `Esc` 닫기, `↑`/`↓` 이동, `Enter` 선택.
`ref` 는 루트 `<div>` 엘리먼트로 전달됩니다.

### `multiple` 다중 선택

```tsx
<Select
  multiple
  options={OPTIONS}
  value={selected} // string[]
  onChange={setSelected} // (value: string[]) => void
  placeholder="도시 선택"
/>
```

- `value` / `defaultValue` 는 `string[]`, `onChange` 인자도 `string[]`.
- 선택 항목은 트리거에 `--m2m-pg-brand-light` 태그 칩으로 표시되고, 칩의 `×` 로 개별 해제.
- 옵션 클릭은 토글이며 드롭다운이 닫히지 않습니다 (단일 선택은 기존대로 선택 시 닫힘).
- `searchable` 와 함께 사용 가능.
- `name` 지정 시 선택된 값마다 hidden `<input>` 이 하나씩 렌더됩니다.

### `SelectOption`

```ts
interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}
```

## 상수

`Select.constant.ts` 에서 export: `SELECT_SIZE`, `SELECT_STATE_CLASS`(`{ IS_OPEN, IS_ERROR, IS_DISABLED, IS_PLACEHOLDER }`), `SELECT_DEFAULT`.
