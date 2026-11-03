# Input

공통 입력 컴포넌트. `src/pages/InputPage.tsx` 원본 API 를 따릅니다.
`type` prop 으로도, 원본과 동일한 **compound 서브 컴포넌트**(`Input.Text` · `Input.Password` …)로도 사용합니다.
내부 스타일은 Tailwind 없이 `Input.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Input from 'm2m-uiux-react/Input';

<Input.Text value={value} onChange={(e) => setValue(e.target.value)} placeholder="이름" />
<Input.Password showToggle onToggle={(v) => ...} />
<Input.Search onSearch={(v) => handleSearch(v)} />

// 동등: <Input type="text" ... />
```

제어(`value` + `onChange`) / 비제어(`defaultValue`) 모두 지원합니다.

## 서브 컴포넌트

| 컴포넌트         | 고정 type  | 비고                                                    |
| ---------------- | ---------- | ------------------------------------------------------- |
| `Input.Text`     | `text`     |                                                         |
| `Input.Password` | `password` | `showToggle` 로 눈 아이콘 표시/숨김 토글                |
| `Input.Number`   | `number`   |                                                         |
| `Input.Email`    | `email`    |                                                         |
| `Input.Tel`      | `tel`      |                                                         |
| `Input.Search`   | `search`   | `onSearch` 지정 시 돋보기 아이콘이 버튼 + Enter 로 실행 |

서브 컴포넌트 props = `InputVariantProps` (= `InputProps` 에서 `type` 제외).

## Props

| Prop         | Type                                                               | Default  | 설명                                              |
| ------------ | ------------------------------------------------------------------ | -------- | ------------------------------------------------- |
| `type`       | `'text' \| 'password' \| 'number' \| 'email' \| 'tel' \| 'search'` | `'text'` | input 타입 (서브 컴포넌트 사용 시 자동 고정)      |
| `size`       | `'sm' \| 'md' \| 'lg'`                                             | `'md'`   | 크기                                              |
| `error`      | `boolean \| string`                                                | `false`  | 에러 상태. 문자열이면 컨트롤 하단에 메시지로 표시 |
| `helperText` | `ReactNode`                                                        | —        | 보조 안내 문구 (`error` 가 없을 때만 표시)        |
| `clearable`  | `boolean`                                                          | `true`   | 입력값이 있을 때 우측 X 버튼 노출                 |
| `onClear`    | `() => void`                                                       | —        | X 버튼 클릭 시 콜백 (값 초기화 후 호출)           |
| `onSearch`   | `(value: string) => void`                                          | —        | `type="search"` 에서 Enter/아이콘 클릭 시         |
| `showCount`  | `boolean`                                                          | `false`  | `maxLength` 대비 글자 수 카운터                   |
| `prefix`     | `ReactNode`                                                        | —        | 좌측 고정 요소                                    |
| `suffix`     | `ReactNode`                                                        | —        | 우측 고정 요소                                    |
| `showToggle` | `boolean`                                                          | `false`  | `type="password"` 표시/숨기기 토글 버튼           |
| `onToggle`   | `(visible: boolean) => void`                                       | —        | 토글 버튼 클릭 시 콜백                            |
| `classNames` | `string \| string[]`                                               | —        | 추가 클래스                                       |

그 외 `<input>` 표준 속성(`placeholder`, `disabled`, `readOnly`, `maxLength`, `name` …)을 전달할 수 있습니다.
`ref` 는 내부 `<input>` 으로 전달되며, X 버튼 클릭 시 자동으로 포커스가 복귀합니다.

## 상수

`Input.constant.ts` 에서 export: `INPUT_TYPE`, `INPUT_SIZE`, `INPUT_STATE_CLASS`(`{ IS_ERROR, IS_DISABLED, IS_READONLY, IS_FOCUSED }`), `INPUT_DEFAULT`.
