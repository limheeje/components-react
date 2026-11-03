# Textarea

네이티브 `<textarea>` 기반 공통 여러 줄 입력. `src/pages/TextareaPage.tsx` 원본 API 를 따릅니다.
내부 스타일은 Tailwind 없이 `Textarea.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Textarea from 'm2m-uiux-react/Textarea'
;<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={4}
  maxLength={200}
  showCount
  placeholder="내용을 입력해주세요"
/>
```

제어(`value` + `onChange`) / 비제어(`defaultValue`) 모두 지원합니다.

## Props

| Prop         | Type                 | Default | 설명                                                |
| ------------ | -------------------- | ------- | --------------------------------------------------- |
| `rows`       | `number`             | `3`     | 기본 표시 줄 수                                     |
| `resize`     | `boolean`            | `true`  | 세로 리사이즈 핸들 노출                             |
| `error`      | `boolean \| string`  | `false` | 에러 상태. 문자열이면 컨트롤 하단에 메시지로 표시   |
| `helperText` | `ReactNode`          | —       | 보조 안내 문구 (`error` 가 없을 때만 표시)          |
| `showCount`  | `boolean`            | `false` | 우측 하단 글자 수 카운터 (`maxLength` 와 함께 사용) |
| `classNames` | `string \| string[]` | —       | 추가 클래스                                         |

그 외 `<textarea>` 표준 속성(`placeholder`, `disabled`, `readOnly`, `maxLength`, `name` …)을 전달할 수 있습니다.
`ref` 는 `<textarea>` 엘리먼트로 전달됩니다.

## 상수

`Textarea.constant.ts` 에서 export: `TEXTAREA_STATE_CLASS`(`{ IS_ERROR, IS_DISABLED, IS_READONLY, IS_FOCUSED, IS_NO_RESIZE }`), `TEXTAREA_DEFAULT`.
