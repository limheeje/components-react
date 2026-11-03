# Filter

e-커머스 목록 화면에서 쓰는 **전체 필터** 풀팝업. `RegionPicker` 와 동일하게 내부적으로
`Dialog`(`variant="drawer"`, `direction="bottom"`, `size="full"`)를 사용하는 상단 여백 있는
플로팅 바텀시트입니다. **컴포넌트 자체는 필터 항목(브랜드~가격대 등)을 전혀 정의하지 않으며**,
`sections` prop 으로 부모(소비 앱)가 필터 구성을 필수로 전달해야 렌더됩니다 — 서비스마다 판매
카테고리·필터 항목이 다르기 때문입니다. 참고용 e-커머스 데모 구성이 필요하면 `DEFAULT_FILTER_SECTIONS`
를 import 해서 그대로 쓰거나 커스텀할 수 있습니다. 스타일은 Tailwind 없이 `Filter.module.scss` +
`--m2m-*` 토큰으로만 구성됩니다.

```tsx
import {useState} from 'react'
import Filter, {DEFAULT_FILTER_SECTIONS, type FilterValue} from 'm2m-uiux-react/Filter'

function Example() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<FilterValue>({})
  // 서비스에 맞는 자체 섹션 배열을 넘기거나, 참고용으로 내장 데모 구성을 그대로 사용
  const sections = DEFAULT_FILTER_SECTIONS

  return (
    <>
      <button onClick={() => setOpen(true)}>필터</button>
      <Filter
        open={open}
        value={value}
        sections={sections}
        onChange={setValue}
        onClose={() => setOpen(false)}
        onConfirm={(v) => console.log(v)}
      />
    </>
  )
}
```

## Props

| Prop              | Type                           | Default       | 설명                                                                                                                     |
| ----------------- | ------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `open`            | `boolean`                      | —             | 열림 상태 (제어)                                                                                                         |
| `onClose`         | `() => void`                   | —             | 닫기 요청 (X 버튼 · 헤더 스와이프 · 배경 클릭 · ESC)                                                                     |
| `value`           | `FilterValue`                  | `{}`          | 선택값 (제어). 섹션 `key` 별로 체크박스는 `string[]`, 라디오는 `string`, range 는 `{min?, max?}`                         |
| `onChange`        | `(value: FilterValue) => void` | —             | 적용 버튼 클릭 시                                                                                                        |
| `onConfirm`       | `(value: FilterValue) => void` | —             | 적용 버튼 클릭 시 (`onChange` 와 함께 호출, 이어서 `onClose`)                                                            |
| `sections`        | `FilterSection[]`              | — (필수)      | 필터 섹션 구성. 컴포넌트는 기본값을 두지 않으므로 항상 부모가 전달해야 함. `DEFAULT_FILTER_SECTIONS` 를 참고/재사용 가능 |
| `title`           | `string`                       | `'전체 필터'` | 헤더 제목                                                                                                                |
| `resetText`       | `string`                       | `'초기화'`    | 전체 초기화 버튼 라벨                                                                                                    |
| `confirmText`     | `string`                       | `'적용하기'`  | 적용 버튼 라벨 (활성 필터 개수가 함께 표시됨)                                                                            |
| `closeOnBackdrop` | `boolean`                      | `true`        | 배경 클릭으로 닫기                                                                                                       |
| `classNames`      | `string \| string[]`           | —             | 추가 클래스                                                                                                              |

## 섹션 유형 (`FilterSection.type`)

- **`checkbox`** — 다중 선택 옵션 목록. 내부적으로 `CheckboxGroup` 사용.
- **`radio`** — 단일 선택 옵션 목록(반품 가능/보증 기간/테스트 여부 등). 내부적으로 `RadioGroup` 사용.
- **`range`** — 최소/최대 텍스트 입력 2개 (가격대 등).
- **`brand`** — 브랜드처럼 옵션이 많은 목록 전용. 검색창 + 첫 글자 기준 알파벳/초성 탐색 탭 +
  `CheckboxGroup` + `Pagination`(페이지당 8개)이 함께 제공됩니다. 검색/탐색은 화면에 보이는 옵션만
  필터링할 뿐, 선택 상태는 페이지 이동과 무관하게 `value`에 계속 누적됩니다.

## 상수

`Filter.constant.ts` 에서 export: `FILTER_SECTION_TYPE`, `FILTER_STATE_CLASS`, `FILTER_DEFAULT`,
`DEFAULT_FILTER_SECTIONS`.
