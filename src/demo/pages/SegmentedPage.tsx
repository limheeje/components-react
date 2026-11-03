import {useState} from 'react'

import Segmented, {SEGMENTED_SIZE} from '~/components/Segmented'
import type {SegmentedOption} from '~/components/Segmented'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['options', 'value', 'size', 'disabled', 'block']

const CHANNEL: SegmentedOption[] = [
  {label: '공통', value: 'common'},
  {label: 'B2C', value: 'b2c'},
  {label: 'C2C', value: 'c2c'},
  {label: 'B2B', value: 'b2b'}
]

function Live({
  options,
  initial,
  ...rest
}: {
  options: SegmentedOption[]
  initial?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  block?: boolean
}) {
  const [value, setValue] = useState(initial ?? options[0]?.value ?? '')
  const [last, setLast] = useState<string>('')
  return (
    <div className="demo-col">
      <Segmented
        options={options}
        value={value}
        onChange={(v, opt) => {
          setValue(v)
          setLast(String(opt.value))
        }}
        {...rest}
      />
      <span className="demo-hint">
        value: {value || '없음'}
        {last ? ` · 마지막 클릭: ${last}` : ''}
      </span>
    </div>
  )
}

export function SegmentedPage() {
  return (
    <>
      <PageHeader
        title="Segmented"
        component="Segmented"
        desc="— 붙은 세그먼트(회색 트랙 + 흰 알약) 단일 선택 컨트롤. Ant Design Segmented 착안. 크기는 Input 필드와 동일."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'options' && (
              <ComponentSection
                title="options — 문자열 배열 또는 객체 배열"
                preview={<Live options={CHANNEL} />}
                code={[
                  "import {useState} from 'react'",
                  "import Segmented from 'm2m-uiux-react/Segmented'",
                  '',
                  'export function Example() {',
                  "  const [value, setValue] = useState('공통')",
                  '  // 문자열 배열 또는 [{ label, value }] 객체 배열',
                  "  return <Segmented options={['공통', 'B2C', 'C2C', 'B2B']} value={value} onChange={setValue} />",
                  '}'
                ]}
              />
            )}

            {tab === 'value' && (
              <ComponentSection
                title="value / onChange — 제어 + 클릭 감지"
                preview={<Live options={CHANNEL} initial="b2c" />}
                code={[
                  "import {useState} from 'react'",
                  "import Segmented from 'm2m-uiux-react/Segmented'",
                  '',
                  'export function Example() {',
                  "  const [channel, setChannel] = useState('b2c')",
                  '  return (',
                  '    <Segmented',
                  '      options={options}',
                  '      value={channel}',
                  '      onChange={(value, option) => setChannel(value)}',
                  '    />',
                  '  )',
                  '}'
                ]}
                notes={['onChange 는 (선택된 value, 옵션 객체) 를 전달합니다']}
              />
            )}

            {tab === 'size' && (
              <>
                {(['SM', 'MD', 'LG'] as const).map((s) => (
                  <ComponentSection
                    key={s}
                    title={`size="${SEGMENTED_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''} — Input 필드와 동일 높이`}
                    preview={<Live options={CHANNEL} size={SEGMENTED_SIZE[s]} />}
                    code={[
                      "import {useState} from 'react'",
                      "import Segmented, {SEGMENTED_SIZE} from 'm2m-uiux-react/Segmented'",
                      '',
                      'export function Example() {',
                      "  const [value, setValue] = useState('공통')",
                      `  return <Segmented size={SEGMENTED_SIZE['${s}']} options={options} value={value} onChange={setValue} />`,
                      '}'
                    ]}
                  />
                ))}
              </>
            )}

            {tab === 'disabled' && (
              <>
                <ComponentSection
                  title="disabled — 그룹 전체 비활성"
                  preview={<Live options={CHANNEL} disabled />}
                  code={[
                    "import {useState} from 'react'",
                    "import Segmented from 'm2m-uiux-react/Segmented'",
                    '',
                    'export function Example() {',
                    "  const [value, setValue] = useState('공통')",
                    '  return <Segmented disabled options={options} value={value} onChange={setValue} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="그룹 내 일부 disabled"
                  preview={
                    <Live
                      options={[
                        {label: '공통', value: 'common'},
                        {label: 'B2C', value: 'b2c'},
                        {label: 'B2B (비활성)', value: 'b2b', disabled: true}
                      ]}
                    />
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import Segmented from 'm2m-uiux-react/Segmented'",
                    '',
                    'const options = [',
                    "  { label: '공통', value: 'common' },",
                    "  { label: 'B2C', value: 'b2c' },",
                    "  { label: 'B2B', value: 'b2b', disabled: true },",
                    ']',
                    '',
                    'export function Example() {',
                    "  const [value, setValue] = useState('common')",
                    '  return <Segmented options={options} value={value} onChange={setValue} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'block' && (
              <ComponentSection
                title="block — 부모 너비를 꽉 채우고 균등 분배"
                preview={
                  <div style={{width: 420, maxWidth: '100%'}}>
                    <Live options={CHANNEL} block />
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import Segmented from 'm2m-uiux-react/Segmented'",
                  '',
                  'export function Example() {',
                  "  const [value, setValue] = useState('공통')",
                  '  return <Segmented block options={options} value={value} onChange={setValue} />',
                  '}'
                ]}
                notes={['기본값은 내용 너비만큼만 차지합니다']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
