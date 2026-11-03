import {useState} from 'react'

import TimePicker, {TIME_PICKER_FORMAT, TIME_PICKER_SIZE} from '~/components/TimePicker'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['value', 'format', 'size', 'placeholder', 'step', 'clearable', 'disabled', 'error', 'onChange', 'range']

export function TimePickerPage() {
  const [time, setTime] = useState('14:30')
  const [log, setLog] = useState<string | null>(null)
  const [start, setStart] = useState('09:00')
  const [end, setEnd] = useState('18:00')

  return (
    <>
      <PageHeader
        title="TimePicker"
        component="TimePicker"
        desc="— 시(HH)·분(mm)·초(ss)를 스크롤 휠로 선택하는 팝업 컴포넌트. '확인' 시에만 onChange 를 호출합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'value' && (
              <>
                <ComponentSection
                  title="value — 제어 컴포넌트"
                  preview={
                    <div className="demo-col">
                      <TimePicker value={time} onChange={setTime} />
                      <span className="demo-hint">value: {time || '(빈 값)'}</span>
                    </div>
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import TimePicker from 'm2m-uiux-react/TimePicker'",
                    '',
                    'export function Example() {',
                    "  const [time, setTime] = useState('14:30')",
                    '  return <TimePicker value={time} onChange={(t) => setTime(t)} />',
                    '}'
                  ]}
                  notes={["value 는 'HH:mm' 또는 'HH:mm:ss' 문자열"]}
                />
                <ComponentSection
                  title="비선택 상태"
                  preview={<TimePicker />}
                  code={[
                    "import {useState} from 'react'",
                    "import TimePicker from 'm2m-uiux-react/TimePicker'",
                    '',
                    'export function Example() {',
                    "  const [time, setTime] = useState('')",
                    '  return <TimePicker value={time} onChange={setTime} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'format' && (
              <>
                <ComponentSection
                  title='format="HH:mm" (기본)'
                  preview={<TimePicker defaultValue="09:30" />}
                  code={[
                    "import TimePicker, {TIME_PICKER_FORMAT} from 'm2m-uiux-react/TimePicker'",
                    '',
                    'export function Example() {',
                    "  return <TimePicker format={TIME_PICKER_FORMAT['HM']} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='format="HH:mm:ss" — 초 포함'
                  preview={<TimePicker defaultValue="09:30:45" format={TIME_PICKER_FORMAT['HMS']} />}
                  code={[
                    "import TimePicker, {TIME_PICKER_FORMAT} from 'm2m-uiux-react/TimePicker'",
                    '',
                    'export function Example() {',
                    "  return <TimePicker format={TIME_PICKER_FORMAT['HMS']} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'size' && (
              <ComponentSection
                title="size"
                preview={
                  <div className="demo-col">
                    <TimePicker size={TIME_PICKER_SIZE['SM']} defaultValue="09:00" />
                    <TimePicker size={TIME_PICKER_SIZE['MD']} defaultValue="09:00" />
                    <TimePicker size={TIME_PICKER_SIZE['LG']} defaultValue="09:00" />
                  </div>
                }
                code={[
                  "import TimePicker, {TIME_PICKER_SIZE} from 'm2m-uiux-react/TimePicker'",
                  '',
                  'export function Example() {',
                  "  return <TimePicker size={TIME_PICKER_SIZE['LG']} />",
                  '}'
                ]}
              />
            )}

            {tab === 'placeholder' && (
              <ComponentSection
                title="placeholder 커스텀"
                preview={<TimePicker placeholder="회의 시작 시간" />}
                code={[
                  "import TimePicker from 'm2m-uiux-react/TimePicker'",
                  '',
                  'export function Example() {',
                  '  return <TimePicker placeholder="회의 시작 시간" />',
                  '}'
                ]}
              />
            )}

            {tab === 'step' &&
              (
                [
                  [1, ' — 1분 단위 (기본)', undefined],
                  [5, ' — 5분 단위', undefined],
                  [15, ' — 15분 단위', undefined],
                  [30, ' — 30분 단위', 'step={30} 이면 00·30분만 선택 가능']
                ] as const
              ).map(([n, label, note]) => (
                <ComponentSection
                  key={n}
                  title={`step={${n}}${label}`}
                  preview={<TimePicker defaultValue="09:00" step={n} />}
                  code={[
                    "import TimePicker from 'm2m-uiux-react/TimePicker'",
                    '',
                    'export function Example() {',
                    `  return <TimePicker step={${n}} />`,
                    '}'
                  ]}
                  notes={note ? [note] : undefined}
                />
              ))}

            {tab === 'clearable' && (
              <ComponentSection
                title="clearable — ✕ 초기화"
                preview={<TimePicker clearable defaultValue="14:30" />}
                code={[
                  "import {useState} from 'react'",
                  "import TimePicker from 'm2m-uiux-react/TimePicker'",
                  '',
                  'export function Example() {',
                  "  const [time, setTime] = useState('14:30')",
                  '  return <TimePicker clearable value={time} onChange={setTime} />',
                  '}'
                ]}
              />
            )}

            {tab === 'disabled' && (
              <ComponentSection
                title="disabled"
                preview={<TimePicker disabled defaultValue="14:30" />}
                code={[
                  "import {useState} from 'react'",
                  "import TimePicker from 'm2m-uiux-react/TimePicker'",
                  '',
                  'export function Example() {',
                  "  const [time] = useState('14:30')",
                  '  return <TimePicker disabled value={time} />',
                  '}'
                ]}
              />
            )}

            {tab === 'error' && (
              <>
                <ComponentSection
                  title="error={true}"
                  preview={<TimePicker error />}
                  code={[
                    "import TimePicker from 'm2m-uiux-react/TimePicker'",
                    '',
                    'export function Example() {',
                    '  return <TimePicker error />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title='error="string" — 메시지'
                  preview={<TimePicker error="근무 시간(09:00~18:00) 내에서 선택해주세요." />}
                  code={[
                    "import TimePicker from 'm2m-uiux-react/TimePicker'",
                    '',
                    'export function Example() {',
                    '  return <TimePicker error="근무 시간 내에서 선택해주세요." />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'onChange' && (
              <ComponentSection
                title="onChange — '확인' 클릭 시 콜백"
                preview={
                  <div className="demo-col">
                    <TimePicker defaultValue="09:00" onChange={setLog} />
                    <span className="demo-hint">onChange: {log ?? '—'}</span>
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import TimePicker from 'm2m-uiux-react/TimePicker'",
                  '',
                  'export function Example() {',
                  "  const [time, setTime] = useState('')",
                  '  return <TimePicker value={time} onChange={(t) => setTime(t)} />',
                  '}'
                ]}
                notes={["'확인' 버튼을 눌렀을 때만 onChange 가 호출됩니다"]}
              />
            )}

            {tab === 'range' && (
              <ComponentSection
                title="시간 범위 — 두 TimePicker 조합"
                preview={
                  <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <TimePicker value={start} onChange={setStart} placeholder="시작 시간" />
                    <span className="demo-hint">~</span>
                    <TimePicker value={end} onChange={setEnd} placeholder="종료 시간" />
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import TimePicker from 'm2m-uiux-react/TimePicker'",
                  '',
                  'export function Example() {',
                  "  const [start, setStart] = useState('09:00')",
                  "  const [end, setEnd] = useState('18:00')",
                  '  return (',
                  '    <>',
                  '      <TimePicker value={start} onChange={setStart} placeholder="시작 시간" />',
                  '      <span>~</span>',
                  '      <TimePicker value={end} onChange={setEnd} placeholder="종료 시간" />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['range 모드는 두 개의 독립된 TimePicker 를 조합합니다']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
