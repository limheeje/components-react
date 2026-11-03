# RegionPicker

대한민국 시/도 → 시군구 2단 선택 드로어. 내부적으로 `Dialog`(`variant="drawer"`, `direction="bottom"`,
`size="full"`)를 사용하며, 상단에 15px 여백을 남긴 플로팅 바텀시트 형태입니다. 헤더를 스와이프해
닫을 수 있고(Dialog 기본 동작), 우상단 X 버튼도 제공됩니다. 스타일은 Tailwind 없이
`RegionPicker.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

**기본값이 `multiple=true`** 라 아무 옵션 없이 쓰면 여러 시군구를 선택할 수 있습니다
(전남 무안군 · 보성군처럼):

```tsx
import {useState} from 'react'
import RegionPicker, {type RegionValue} from 'm2m-uiux-react/RegionPicker'

function Example() {
  const [open, setOpen] = useState(false)
  const [regions, setRegions] = useState<RegionValue[]>([])

  return (
    <>
      <button onClick={() => setOpen(true)}>
        {regions.length > 0 ? `${regions.length}개 지역 선택됨` : '지역 선택'}
      </button>
      <RegionPicker
        open={open}
        value={regions}
        onChange={(v) => setRegions(v as RegionValue[])}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
```

시군구 1개만 고르게 하려면 `multiple={false}` 로 단일 선택으로 전환합니다:

```tsx
const [region, setRegion] = useState<RegionValue | null>(null)

;<RegionPicker
  open={open}
  multiple={false}
  value={region}
  onChange={(v) => setRegion(v as RegionValue)}
  onClose={() => setOpen(false)}
/>
```

## Props

| Prop              | Type                                            | Default                    | 설명                                                                               |
| ----------------- | ----------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| `open`            | `boolean`                                       | —                          | 열림 상태 (제어)                                                                   |
| `onClose`         | `() => void`                                    | —                          | 닫기 요청 (뒤로가기 버튼 · X 버튼 · 헤더 스와이프 · 배경 클릭 · ESC)               |
| `value`           | `RegionValue \| RegionValue[] \| null`          | `null`                     | 선택값 (제어). `multiple` 이 false 면 단일 객체, true 면 배열                      |
| `onChange`        | `(value: RegionValue \| RegionValue[]) => void` | —                          | 확정 버튼 클릭 시                                                                  |
| `onConfirm`       | `(value: RegionValue \| RegionValue[]) => void` | —                          | 확정 버튼 클릭 시 (`onChange` 와 함께 호출, 이어서 `onClose`)                      |
| `multiple`        | `boolean`                                       | `true`                     | 여러 시군구를 선택할 수 있게 함 (시/도를 넘나들며 선택 가능). `false` 로 단일 선택 |
| `title`           | `string`                                        | `'시군구 선택'`            | 헤더 제목                                                                          |
| `hint`            | `string`                                        | `'행정구역을 선택하세요.'` | 미선택 상태에서 표시되는 안내문 (헤더 설명 + 시군구 컬럼)                          |
| `regions`         | `RegionGroup[]`                                 | 내장 17개 시/도            | 선택 데이터. 전체 목록을 교체하려면 이 prop 사용                                   |
| `confirmText`     | `string`                                        | `'선택'` / `'적용하기'`    | 하단 확정 버튼 라벨. 기본값은 `multiple=false` 면 `'선택'`, `true` 면 `'적용하기'` |
| `resetText`       | `string`                                        | `'초기화'`                 | (`multiple=true`) 전체 선택 초기화 버튼 라벨                                       |
| `closeOnBackdrop` | `boolean`                                       | `true`                     | 배경 클릭으로 닫기                                                                 |
| `classNames`      | `string \| string[]`                            | —                          | 추가 클래스                                                                        |

## multiple 모드 UX

- 시군구 항목을 클릭할 때마다 체크박스가 토글되며, 다른 시/도로 이동해도 이전에 선택한 항목은
  유지됩니다 — 좌측 시/도 목록에는 선택된 시군구 개수가 뱃지로 표시됩니다.
- 하단에는 현재까지 선택된 항목이 `시/도 > 시군구` 칩으로 나열되고, 칩의 X 로 개별 해제할 수
  있습니다. `초기화` 버튼으로 전체를 한 번에 비울 수 있습니다.
- 헤더 설명(부제)에는 마지막으로 클릭한 항목이 `시/도 > 시군구` 형태로 표시됩니다.
- 시군구를 1개 이상 선택해야 확정(`적용하기`) 버튼이 활성화됩니다.

`multiple=false` 에서는 시/도를 넘나들어도 되지만, 시군구를 다시 선택하면 이전 선택을 대체합니다
(항상 최대 1개).

- 기본 내장 데이터(`DEFAULT_REGIONS`)는 참고용 목록입니다. 실제 서비스에서 행정구역 개편 등으로
  최신 목록이 필요하면 `regions` prop 으로 자체 데이터를 전달하세요.

## 상수

`RegionPicker.constant.ts` 에서 export: `DEFAULT_REGIONS`, `REGION_PICKER_DEFAULT`, `REGION_PICKER_STATE_CLASS`.
