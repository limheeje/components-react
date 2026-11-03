import {useState} from 'react'

import Switch, {SWITCH_SIZE} from '~/components/Switch'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['checked', 'disabled', 'size', 'label', 'onChange', 'classNames']

function SettingsDemo() {
  const items = [
    {label: '알림 받기', on: true},
    {label: '마케팅 수신', on: false},
    {label: '다크 모드', on: false}
  ]
  const [states, setStates] = useState(items.map((i) => i.on))
  return (
    <div className="demo-col">
      {items.map((item, i) => (
        <Switch
          key={item.label}
          label={item.label}
          checked={states[i]}
          onChange={(e) => setStates((prev) => prev.map((v, idx) => (idx === i ? e.target.checked : v)))}
        />
      ))}
    </div>
  )
}

export function SwitchPage() {
  return (
    <>
      <PageHeader title="Switch" component="Switch" desc="— 토글 스위치 컴포넌트. boolean 값을 on/off 로 표현합니다." />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'checked' && (
              <>
                <ComponentSection
                  title="checked={true} — 클릭해서 토글해보세요"
                  preview={<Switch label="켜짐" defaultChecked />}
                  code={[
                    "import {useState} from 'react'",
                    "import Switch from 'm2m-uiux-react/Switch'",
                    '',
                    'export function Example() {',
                    '  const [on, setOn] = useState(true)',
                    '  return <Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="켜짐" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="checked={false} — 클릭해서 토글해보세요"
                  preview={<Switch label="꺼짐" />}
                  code={[
                    "import {useState} from 'react'",
                    "import Switch from 'm2m-uiux-react/Switch'",
                    '',
                    'export function Example() {',
                    '  const [on, setOn] = useState(false)',
                    '  return <Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="꺼짐" />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'disabled' && (
              <>
                <ComponentSection
                  title="disabled={true} — 켜진 상태"
                  preview={<Switch label="비활성 켜짐" disabled defaultChecked />}
                  code={[
                    "import Switch from 'm2m-uiux-react/Switch'",
                    '',
                    'export function Example() {',
                    '  return <Switch checked disabled label="비활성 켜짐" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="disabled={true} — 꺼진 상태"
                  preview={<Switch label="비활성 꺼짐" disabled />}
                  code={[
                    "import Switch from 'm2m-uiux-react/Switch'",
                    '',
                    'export function Example() {',
                    '  return <Switch disabled label="비활성 꺼짐" />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'size' &&
              (['SM', 'MD', 'LG'] as const).map((s) => {
                const label = s === 'SM' ? 'Small' : s === 'MD' ? 'Medium' : 'Large'
                return (
                  <ComponentSection
                    key={s}
                    title={`size="${SWITCH_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''}`}
                    preview={<Switch size={SWITCH_SIZE[s]} defaultChecked label={label} />}
                    code={[
                      "import Switch, {SWITCH_SIZE} from 'm2m-uiux-react/Switch'",
                      '',
                      'export function Example() {',
                      `  return <Switch size={SWITCH_SIZE['${s}']} checked>${label}</Switch>`,
                      '}'
                    ]}
                  />
                )
              })}

            {tab === 'label' && (
              <ComponentSection
                title="label — 설정 패널 예시 (모두 클릭 가능)"
                preview={<SettingsDemo />}
                code={[
                  "import {useState} from 'react'",
                  "import Switch from 'm2m-uiux-react/Switch'",
                  '',
                  'export function Example() {',
                  '  const [notify, setNotify] = useState(true)',
                  '  const [marketing, setMarketing] = useState(false)',
                  '  return (',
                  '    <>',
                  '      <Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} label="알림 받기" />',
                  '      <Switch checked={marketing} onChange={(e) => setMarketing(e.target.checked)} label="마케팅 수신" />',
                  '    </>',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'onChange' && (
              <ComponentSection
                title="onChange 이벤트 — 클릭해보세요"
                preview={<Switch label="토글해보세요" />}
                code={[
                  "import {useState} from 'react'",
                  "import Switch from 'm2m-uiux-react/Switch'",
                  '',
                  'export function Example() {',
                  '  const [on, setOn] = useState(false)',
                  '  return (',
                  '    <Switch',
                  '      checked={on}',
                  '      onChange={(e) => {',
                  '        setOn(e.target.checked)',
                  '        console.log("switched:", e.target.checked)',
                  '      }}',
                  '      label="토글해보세요"',
                  '    />',
                  '  )',
                  '}'
                ]}
                notes={['onChange 파라미터는 React.ChangeEvent<HTMLInputElement>']}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={<Switch classNames="demo-hint" defaultChecked label="커스텀" />}
                code={[
                  "import {useState} from 'react'",
                  "import Switch from 'm2m-uiux-react/Switch'",
                  '',
                  'export function Example() {',
                  '  const [on, setOn] = useState(true)',
                  '  return <Switch checked={on} onChange={(e) => setOn(e.target.checked)} classNames="mb-4" label="커스텀" />',
                  '}'
                ]}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
