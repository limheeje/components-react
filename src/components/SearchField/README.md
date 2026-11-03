# SearchField

검색 전용 입력. 좌측 돋보기 버튼 + 우측 지우기(X) 버튼 내장, `Input.Search` 와 같은 검색 패턴을
독립 컴포넌트로 제공합니다. 내부 스타일은 Tailwind 없이 `SearchField.module.scss` + `--m2m-*` 토큰.

```tsx
import SearchField from 'm2m-uiux-react/SearchField'
;<SearchField
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onSearch={(value) => runSearch(value)}
  placeholder="검색어 입력"
/>
```

제어(`value` + `onChange`) / 비제어(`defaultValue`) 모두 지원합니다.

## Props

| Prop         | Type                      | Default | 설명                                            |
| ------------ | ------------------------- | ------- | ----------------------------------------------- |
| `size`       | `'sm' \| 'md' \| 'lg'`    | `'md'`  | 크기                                            |
| `onSearch`   | `(value: string) => void` | —       | Enter 키 또는 돋보기 버튼 클릭 시               |
| `clearable`  | `boolean`                 | `true`  | 입력값이 있을 때 우측 X 버튼                    |
| `onClear`    | `() => void`              | —       | X 버튼 클릭 시 콜백 (값 초기화 후, 포커스 복귀) |
| `loading`    | `boolean`                 | `false` | 돋보기 자리에 스피너 표시                       |
| `classNames` | `string \| string[]`      | —       | 추가 클래스                                     |

그 외 `<input>` 표준 속성(`placeholder`, `disabled`, `name`, `maxLength` …)을 전달할 수 있습니다.
`ref` 는 내부 `<input>` 으로 전달됩니다.

## 상수

`SearchField.constant.ts` 에서 export: `SEARCH_FIELD_SIZE`, `SEARCH_FIELD_STATE_CLASS`, `SEARCH_FIELD_DEFAULT`.
