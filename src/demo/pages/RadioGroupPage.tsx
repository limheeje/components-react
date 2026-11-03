import {useState} from 'react'

import RadioGroup, {RADIO_GROUP_DIRECTION, RADIO_GROUP_SIZE} from '~/components/RadioGroup'
import type {RadioGroupOption} from '~/components/RadioGroup'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['options', 'value', 'direction', 'size', 'disabled', 'name']

const CITY: RadioGroupOption[] = [
  {label: '서울', value: 'seoul'},
  {label: '부산', value: 'busan'},
  {label: '인천', value: 'incheon'}
]

function Live({
  options,
  initial,
  ...rest
}: {
  options: RadioGroupOption[]
  initial?: string
  direction?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  name?: string
}) {
  const [value, setValue] = useState(initial ?? options[0]?.value ?? '')
  return (
    <div className="demo-col">
      <RadioGroup options={options} value={value} onChange={setValue} {...rest} />
      <span className="demo-hint">value: {value || '없음'}</span>
    </div>
  )
}

export function RadioGroupPage() {
  return (
    <>
      <PageHeader
        title="RadioGroup"
        component="RadioGroup"
        desc="— 단일 선택 라디오 그룹. options 배열로 Radio 를 렌더하고 name 을 자동으로 묶습니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'options' && (
              <ComponentSection
                title="options — 항목 배열"
                preview={<Live options={CITY} />}
                code={[
                  "import {useState} from 'react'",
                  "import RadioGroup from 'm2m-uiux-react/RadioGroup'",
                  '',
                  'const options = [',
                  "  { label: '서울', value: 'seoul' },",
                  "  { label: '부산', value: 'busan' },",
                  ']',
                  '',
                  'export function Example() {',
                  "  const [city, setCity] = useState('seoul')",
                  '  return <RadioGroup options={options} value={city} onChange={setCity} />',
                  '}'
                ]}
              />
            )}

            {tab === 'value' && (
              <ComponentSection
                title="value / onChange — 제어 컴포넌트"
                preview={<Live options={CITY} initial="busan" />}
                code={[
                  "import {useState} from 'react'",
                  "import RadioGroup from 'm2m-uiux-react/RadioGroup'",
                  '',
                  "const options = [{ label: '서울', value: 'seoul' }, { label: '부산', value: 'busan' }]",
                  '',
                  'export function Example() {',
                  "  const [city, setCity] = useState('busan')",
                  '  return <RadioGroup options={options} value={city} onChange={setCity} />',
                  '}'
                ]}
                notes={['onChange 는 선택된 value 문자열을 반환합니다']}
              />
            )}

            {tab === 'direction' && (
              <>
                <ComponentSection
                  title='direction="vertical" (기본)'
                  preview={<Live options={CITY} />}
                  code={[
                    "import {useState} from 'react'",
                    "import RadioGroup, {RADIO_GROUP_DIRECTION} from 'm2m-uiux-react/RadioGroup'",
                    '',
                    'export function Example() {',
                    "  const [value, setValue] = useState('seoul')",
                    "  return <RadioGroup direction={RADIO_GROUP_DIRECTION['VERTICAL']} options={options} value={value} onChange={setValue} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='direction="horizontal" — 가로 배치'
                  preview={
                    <Live
                      options={[
                        {label: '남성', value: 'male'},
                        {label: '여성', value: 'female'},
                        {label: '기타', value: 'other'}
                      ]}
                      direction={RADIO_GROUP_DIRECTION['HORIZONTAL']}
                    />
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import RadioGroup, {RADIO_GROUP_DIRECTION} from 'm2m-uiux-react/RadioGroup'",
                    '',
                    'export function Example() {',
                    "  const [value, setValue] = useState('male')",
                    "  return <RadioGroup direction={RADIO_GROUP_DIRECTION['HORIZONTAL']} options={options} value={value} onChange={setValue} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'size' && (
              <>
                {(['SM', 'MD', 'LG'] as const).map((s) => (
                  <ComponentSection
                    key={s}
                    title={`size="${RADIO_GROUP_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''}`}
                    preview={
                      <Live options={CITY} size={RADIO_GROUP_SIZE[s]} direction={RADIO_GROUP_DIRECTION['HORIZONTAL']} />
                    }
                    code={[
                      "import {useState} from 'react'",
                      "import RadioGroup, {RADIO_GROUP_SIZE} from 'm2m-uiux-react/RadioGroup'",
                      '',
                      'export function Example() {',
                      "  const [value, setValue] = useState('seoul')",
                      `  return <RadioGroup size={RADIO_GROUP_SIZE['${s}']} options={options} value={value} onChange={setValue} />`,
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
                  preview={<Live options={CITY} disabled />}
                  code={[
                    "import {useState} from 'react'",
                    "import RadioGroup from 'm2m-uiux-react/RadioGroup'",
                    '',
                    'export function Example() {',
                    "  const [value, setValue] = useState('seoul')",
                    '  return <RadioGroup disabled options={options} value={value} onChange={setValue} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="그룹 내 일부 disabled"
                  preview={
                    <Live
                      options={[
                        {label: '서울', value: 'seoul'},
                        {label: '부산 (비활성)', value: 'busan', disabled: true},
                        {label: '인천', value: 'incheon'}
                      ]}
                    />
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import RadioGroup from 'm2m-uiux-react/RadioGroup'",
                    '',
                    'const options = [',
                    "  { label: '서울', value: 'seoul' },",
                    "  { label: '부산', value: 'busan', disabled: true },",
                    "  { label: '인천', value: 'incheon' },",
                    ']',
                    '',
                    'export function Example() {',
                    "  const [value, setValue] = useState('seoul')",
                    '  return <RadioGroup options={options} value={value} onChange={setValue} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'name' && (
              <ComponentSection
                title="name — HTML name 속성"
                preview={<Live options={CITY} name="city" />}
                code={[
                  "import {useState} from 'react'",
                  "import RadioGroup from 'm2m-uiux-react/RadioGroup'",
                  '',
                  'export function Example() {',
                  "  const [value, setValue] = useState('seoul')",
                  '  return <RadioGroup name="city" options={options} value={value} onChange={setValue} />',
                  '}'
                ]}
                notes={['생략하면 useId 로 자동 생성됩니다']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
