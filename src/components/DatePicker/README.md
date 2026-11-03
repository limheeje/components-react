# DatePicker

달력 팝업으로 날짜 또는 기간을 선택하는 인풋. `src/pages/DatePickerPage.tsx` 의
`CommonDatePicker` API·디자인을 그대로 따릅니다. **순수 커스텀 구현**(외부 캘린더 의존 없음) —
days/months/years 3개 뷰, single/range, showTime.
내부 스타일은 Tailwind 없이 `DatePicker.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import DatePicker from 'm2m-uiux-react/DatePicker';

<DatePicker value={date} onChange={(d) => setDate(d as Date)} />
<DatePicker mode="range" onChange={(r) => setRange(r as [Date, Date])} />
<DatePicker showTime format="YYYY-MM-DD" onChange={setDateTime} />
```

- single: `value` / `defaultValue` = `Date | null`, `onChange(date)`
- range: `value` / `defaultRange` = `[Date|null, Date|null]`, `onChange([start, end])`

## Props

| Prop                  | Type                                       | Default        | 설명                                           |
| --------------------- | ------------------------------------------ | -------------- | ---------------------------------------------- |
| `mode`                | `'single' \| 'range'`                      | `'single'`     | range 는 두 달을 나란히 표시                   |
| `value`               | `Date \| null \| [Date\|null, Date\|null]` | —              | 제어 값                                        |
| `defaultValue`        | `Date \| null`                             | `null`         | 비제어 초기값 (single)                         |
| `defaultRange`        | `[Date\|null, Date\|null]`                 | `[null, null]` | 비제어 초기값 (range)                          |
| `onChange`            | `(value) => void`                          | —              | 선택 변경 (single: Date\|null / range: [s, e]) |
| `format`              | `string`                                   | `'YYYY-MM-DD'` | 표시 포맷 (YYYY MM DD HH mm)                   |
| `placeholder`         | `string \| [string, string]`               | —              | 미선택 안내                                    |
| `minDate` / `maxDate` | `Date`                                     | —              | 선택 가능 범위 (밖은 회색 + 클릭 불가)         |
| `showTime`            | `boolean`                                  | `false`        | 달력 하단 시간 패널 (▲▼ 시/5분, '확인')        |
| `clearable`           | `boolean`                                  | `false`        | 선택 시 ✕ 초기화 버튼                          |
| `disabled`            | `boolean`                                  | `false`        | 비활성 (팝업 안 열림)                          |
| `error`               | `boolean \| string`                        | `false`        | 에러 상태 (문자열이면 하단 메시지)             |
| `helperText`          | `ReactNode`                                | —              | 보조 안내 (`error` 없을 때만)                  |
| `showMonthPicker`     | `boolean`                                  | `true`         | 헤더 'N월' 클릭 → 월 선택 패널                 |
| `showYearPicker`      | `boolean`                                  | `true`         | 헤더 'YYYY년' 클릭 → 연도 선택 패널            |
| `showTodayDot`        | `boolean`                                  | `false`        | 오늘 날짜 아래 점 강조                         |
| `showWeekend`         | `boolean`                                  | `false`        | 일(빨강)/토(파랑) 색상 구분                    |
| `name`                | `string`                                   | —              | form 연동용 hidden input (표시 문자열)         |
| `classNames`          | `string \| string[]`                       | —              | 추가 클래스                                    |

`ref` 는 루트 `<div>` 로 전달됩니다. range 는 첫 클릭=시작일, 두 번째=종료일 (hover 미리보기).

## 상수

`DatePicker.constant.ts` 에서 export: `DATE_PICKER_MODE`, `CALENDAR_VIEW`, `DATE_PICKER_STATE_CLASS`, `DAY_CELL_STATE`, `DATE_PICKER_DEFAULT`.
