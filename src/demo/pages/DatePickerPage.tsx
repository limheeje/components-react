import {useState} from 'react'

import DatePicker, {DATE_PICKER_MODE} from '~/components/DatePicker'
import type {DatePickerValue} from '~/components/DatePicker'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = [
  'mode',
  'value',
  'onChange',
  'format',
  'placeholder',
  'minDate',
  'maxDate',
  'showTime',
  'clearable',
  'disabled',
  'error',
  'month',
  'day',
  'year'
]

const today = new Date()
const minD = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3)
const maxD = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)

function toText(v: DatePickerValue): string {
  if (v == null) return '(없음)'
  if (Array.isArray(v)) return v.map((d) => d?.toLocaleDateString() ?? '…').join(' ~ ')
  return v.toLocaleString()
}

export function DatePickerPage() {
  const [log, setLog] = useState('(없음)')

  return (
    <>
      <PageHeader
        title="DatePicker"
        component="DatePicker"
        desc="— 달력 팝업으로 날짜 또는 기간을 선택하는 인풋 컴포넌트. single / range 두 가지 모드를 지원합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'mode' && (
              <>
                <ComponentSection
                  title='mode="single" (기본)'
                  preview={<DatePicker />}
                  code={[
                    "import {useState} from 'react'",
                    "import DatePicker, {DATE_PICKER_MODE} from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  const [date, setDate] = useState<Date | null>(null)',
                    "  return <DatePicker mode={DATE_PICKER_MODE['SINGLE']} value={date} onChange={(d) => setDate(d)} />",
                    '}'
                  ]}
                  notes={[
                    'value / date 형태: Date | null (미선택이면 null)',
                    'onChange 인자 d: Date | null — 선택 시 Date, clearable 로 지우면 null',
                    '하루를 선택하면 즉시 닫힙니다'
                  ]}
                />
                <ComponentSection
                  title='mode="range" — 기간 선택'
                  preview={<DatePicker mode={DATE_PICKER_MODE['RANGE']} />}
                  code={[
                    "import {useState} from 'react'",
                    "import DatePicker, {DATE_PICKER_MODE} from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  const [start, setStart] = useState<Date | null>(null)',
                    '  const [end, setEnd] = useState<Date | null>(null)',
                    '  return (',
                    '    <DatePicker',
                    "      mode={DATE_PICKER_MODE['RANGE']}",
                    '      value={[start, end]}',
                    '      onChange={([s, e]) => { setStart(s); setEnd(e) }}',
                    '    />',
                    '  )',
                    '}'
                  ]}
                  notes={[
                    'value 형태: [Date | null, Date | null] — [시작, 종료] 튜플 (DateRange 타입)',
                    'start · end 각각 Date | null. 시작만 고른 중간 상태는 [Date, null]',
                    'onChange 인자도 동일한 [s, e] 튜플로 전달',
                    '첫 클릭 → 시작일, 두 번째 클릭 → 종료일',
                    'range 모드에서 두 달이 나란히 표시, hover 시 범위 미리보기'
                  ]}
                />
              </>
            )}

            {tab === 'value' && (
              <>
                <ComponentSection
                  title="value — 제어 (single, Date)"
                  preview={<DatePicker defaultValue={today} />}
                  code={[
                    "import {useState} from 'react'",
                    "import DatePicker from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  const [date, setDate] = useState<Date | null>(new Date())',
                    '  return <DatePicker value={date} onChange={setDate} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="value — range ([start, end])"
                  preview={
                    <DatePicker
                      mode={DATE_PICKER_MODE['RANGE']}
                      defaultRange={[
                        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
                        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)
                      ]}
                    />
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import DatePicker, {DATE_PICKER_MODE} from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  const [range, setRange] = useState<[Date | null, Date | null]>([null, null])',
                    "  return <DatePicker mode={DATE_PICKER_MODE['RANGE']} value={range} onChange={setRange} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'onChange' && (
              <ComponentSection
                title="onChange — 선택 로그"
                preview={
                  <div className="demo-col">
                    <DatePicker onChange={(v) => setLog(toText(v))} />
                    <span className="demo-hint">onChange: {log}</span>
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import DatePicker from 'm2m-uiux-react/DatePicker'",
                  '',
                  'export function Example() {',
                  '  const [date, setDate] = useState<Date | null>(null)',
                  '  return <DatePicker value={date} onChange={(d) => setDate(d)} />',
                  '}'
                ]}
              />
            )}

            {tab === 'format' && (
              <ComponentSection
                title="format"
                preview={
                  <div className="demo-col">
                    <DatePicker defaultValue={today} format="YYYY-MM-DD" />
                    <DatePicker defaultValue={today} format="MM/DD/YYYY" />
                    <DatePicker defaultValue={today} format="YYYY년 MM월 DD일" />
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import DatePicker from 'm2m-uiux-react/DatePicker'",
                  '',
                  'export function Example() {',
                  '  const [date, setDate] = useState<Date | null>(new Date())',
                  '  return <DatePicker value={date} onChange={setDate} format="YYYY.MM.DD" />',
                  '}'
                ]}
                notes={['YYYY=년, MM=월(2자리), DD=일(2자리), (showTime 시 HH mm)']}
              />
            )}

            {tab === 'placeholder' && (
              <>
                <ComponentSection
                  title="placeholder — string"
                  preview={<DatePicker placeholder="검진 날짜를 선택하세요" />}
                  code={[
                    "import DatePicker from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  return <DatePicker placeholder="검진 날짜를 선택하세요" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="placeholder — [string, string] (range)"
                  preview={<DatePicker mode={DATE_PICKER_MODE['RANGE']} placeholder={['체크인', '체크아웃']} />}
                  code={[
                    "import DatePicker, {DATE_PICKER_MODE} from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    "  return <DatePicker mode={DATE_PICKER_MODE['RANGE']} placeholder={['체크인', '체크아웃']} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'minDate' && (
              <ComponentSection
                title="minDate — 오늘 -3일 이전 비활성"
                preview={<DatePicker minDate={minD} />}
                code={[
                  "import DatePicker from 'm2m-uiux-react/DatePicker'",
                  '',
                  'const minDate = new Date() // 이 날짜 이전은 비활성',
                  '',
                  'export function Example() {',
                  '  return <DatePicker minDate={minDate} />',
                  '}'
                ]}
              />
            )}

            {tab === 'maxDate' && (
              <>
                <ComponentSection
                  title="maxDate — 오늘 +14일 이후 비활성"
                  preview={<DatePicker maxDate={maxD} />}
                  code={[
                    "import DatePicker from 'm2m-uiux-react/DatePicker'",
                    '',
                    'const maxDate = new Date(Date.now() + 14 * 864e5)',
                    '',
                    'export function Example() {',
                    '  return <DatePicker maxDate={maxDate} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="minDate + maxDate"
                  preview={<DatePicker minDate={minD} maxDate={maxD} />}
                  code={[
                    "import DatePicker from 'm2m-uiux-react/DatePicker'",
                    '',
                    'const minDate = new Date()',
                    'const maxDate = new Date(Date.now() + 14 * 864e5)',
                    '',
                    'export function Example() {',
                    '  return <DatePicker minDate={minDate} maxDate={maxDate} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'showTime' && (
              <ComponentSection
                title="showTime — 날짜 + 시간"
                preview={<DatePicker showTime defaultValue={today} />}
                code={[
                  "import {useState} from 'react'",
                  "import DatePicker from 'm2m-uiux-react/DatePicker'",
                  '',
                  'export function Example() {',
                  '  const [date, setDate] = useState<Date | null>(new Date())',
                  '  return <DatePicker showTime value={date} onChange={setDate} format="YYYY-MM-DD" />',
                  '}'
                ]}
                notes={['달력 하단에 시간 패널 추가, ▲▼ 로 시(HH)/분(5분 단위) 조정', "'확인' 버튼 클릭 시 최종 선택"]}
              />
            )}

            {tab === 'clearable' && (
              <>
                <ComponentSection
                  title="clearable"
                  preview={<DatePicker clearable defaultValue={today} />}
                  code={[
                    "import {useState} from 'react'",
                    "import DatePicker from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  const [date, setDate] = useState<Date | null>(new Date())',
                    '  return <DatePicker clearable value={date} onChange={setDate} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="clearable + range"
                  preview={
                    <DatePicker
                      mode={DATE_PICKER_MODE['RANGE']}
                      clearable
                      defaultRange={[today, new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)]}
                    />
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import DatePicker, {DATE_PICKER_MODE} from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  const [range, setRange] = useState<[Date | null, Date | null]>([null, null])',
                    "  return <DatePicker mode={DATE_PICKER_MODE['RANGE']} clearable value={range} onChange={setRange} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'disabled' && (
              <ComponentSection
                title="disabled"
                preview={<DatePicker disabled defaultValue={today} />}
                code={[
                  "import {useState} from 'react'",
                  "import DatePicker from 'm2m-uiux-react/DatePicker'",
                  '',
                  'export function Example() {',
                  '  const [date, setDate] = useState<Date | null>(new Date())',
                  '  return <DatePicker disabled value={date} onChange={setDate} />',
                  '}'
                ]}
              />
            )}

            {tab === 'error' && (
              <>
                <ComponentSection
                  title="error={true}"
                  preview={<DatePicker error />}
                  code={[
                    "import {useState} from 'react'",
                    "import DatePicker from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  const [date, setDate] = useState<Date | null>(null)',
                    '  return <DatePicker error value={date} onChange={setDate} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title='error="string"'
                  preview={<DatePicker error="예약 가능한 날짜를 선택해주세요." />}
                  code={[
                    "import DatePicker from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  return <DatePicker error="예약 가능한 날짜를 선택해주세요." />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'month' && (
              <ComponentSection
                title="월 선택기 — 헤더 'N월' 클릭"
                preview={<DatePicker showMonthPicker showYearPicker={false} />}
                code={[
                  "import DatePicker from 'm2m-uiux-react/DatePicker'",
                  '',
                  'export function Example() {',
                  '  return <DatePicker showMonthPicker />',
                  '}'
                ]}
                notes={["헤더의 'N월' 클릭 → 월 선택 패널 → 해당 월 날짜 뷰로 전환"]}
              />
            )}

            {tab === 'day' && (
              <>
                <ComponentSection
                  title="showTodayDot — 오늘 날짜 점 강조"
                  preview={<DatePicker showTodayDot />}
                  code={[
                    "import DatePicker from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  return <DatePicker showTodayDot />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="showWeekend — 일(빨강)/토(파랑)"
                  preview={<DatePicker showWeekend />}
                  code={[
                    "import DatePicker from 'm2m-uiux-react/DatePicker'",
                    '',
                    'export function Example() {',
                    '  return <DatePicker showWeekend />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'year' && (
              <ComponentSection
                title="연도 선택기 — 헤더 'YYYY년' 클릭"
                preview={<DatePicker showYearPicker showMonthPicker={false} />}
                code={[
                  "import DatePicker from 'm2m-uiux-react/DatePicker'",
                  '',
                  'export function Example() {',
                  '  return <DatePicker showYearPicker />',
                  '}'
                ]}
                notes={["'YYYY년' 클릭 → 연도 패널, ‹ › 로 12년 단위 이동"]}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
