import {useState} from 'react'

import Radio from '~/components/Radio'
import RadioGroup, {RADIO_GROUP_DIRECTION, RADIO_GROUP_SIZE} from '~/components/RadioGroup'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const CITY = [
  {label: '서울', value: 'seoul'},
  {label: '부산', value: 'busan'},
  {label: '인천', value: 'incheon'}
]

const TABS = ['checked', 'disabled', 'size', 'value', 'name', 'group', 'onChange', 'classNames']

/** 제어 RadioGroup + 선택값 표시 */
function GroupLive(props: {
  options: {label: string; value: string; disabled?: boolean}[]
  defaultValue?: string
  direction?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  name: string
}) {
  const [value, setValue] = useState(props.defaultValue ?? props.options[0].value)
  return (
    <div className="demo-col">
      <RadioGroup {...props} value={value} onChange={setValue} />
      <span className="demo-hint">선택: {value}</span>
    </div>
  )
}

export function RadioPage() {
  return (
    <>
      <PageHeader
        title="Radio"
        component="Radio"
        desc="— 라디오 버튼 컴포넌트. value 와 name prop 으로 그룹을 지정합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'checked' && (
              <ComponentSection
                title="checked — 선택 상태 (클릭해보세요)"
                preview={
                  <GroupLive
                    name="chk"
                    options={[
                      {label: '선택됨 (checked=true)', value: 'a'},
                      {label: '미선택 (checked=false)', value: 'b'}
                    ]}
                    defaultValue="a"
                  />
                }
                code={[
                  "import {useState} from 'react'",
                  "import Radio from 'm2m-uiux-react/Radio'",
                  '',
                  'export function Example() {',
                  "  const [value, setValue] = useState('a')",
                  '  return (',
                  '    <>',
                  "      <Radio name='opt' value='a' checked={value === 'a'} onChange={(e) => setValue(e.target.value)} label='선택됨' />",
                  "      <Radio name='opt' value='b' checked={value === 'b'} onChange={(e) => setValue(e.target.value)} label='미선택' />",
                  '    </>',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'disabled' && (
              <>
                <ComponentSection
                  title="disabled={true} — 선택 상태"
                  preview={<Radio name="d1" value="a" checked disabled label="비활성 선택" onChange={() => {}} />}
                  code={[
                    "import Radio from 'm2m-uiux-react/Radio'",
                    '',
                    'export function Example() {',
                    '  return <Radio checked disabled label="비활성 선택" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="disabled={true} — 미선택 상태"
                  preview={<Radio name="d2" value="a" disabled label="비활성 미선택" />}
                  code={[
                    "import Radio from 'm2m-uiux-react/Radio'",
                    '',
                    'export function Example() {',
                    '  return <Radio disabled label="비활성 미선택" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="그룹 내 일부 disabled"
                  preview={
                    <GroupLive
                      name="d3"
                      options={[
                        {label: '서울', value: 'seoul'},
                        {label: '부산 (비활성)', value: 'busan', disabled: true},
                        {label: '인천', value: 'incheon'}
                      ]}
                      defaultValue="seoul"
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
                    "  return <RadioGroup name='city' value={value} onChange={setValue} options={options} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'size' &&
              (['SM', 'MD', 'LG'] as const).map((s) => (
                <ComponentSection
                  key={s}
                  title={`size="${RADIO_GROUP_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''}`}
                  preview={
                    <GroupLive
                      name={`sz-${s}`}
                      options={CITY}
                      defaultValue="seoul"
                      size={RADIO_GROUP_SIZE[s]}
                      direction={RADIO_GROUP_DIRECTION['HORIZONTAL']}
                    />
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

            {tab === 'value' && (
              <ComponentSection
                title="value — 라디오 고유 값 (클릭해보세요)"
                preview={<GroupLive name="val" options={CITY} defaultValue="seoul" />}
                code={[
                  "import {useState} from 'react'",
                  "import Radio from 'm2m-uiux-react/Radio'",
                  '',
                  'export function Example() {',
                  "  const [city, setCity] = useState('seoul')",
                  "  return <Radio name='city' value='seoul' checked={city === 'seoul'} onChange={(e) => setCity(e.target.value)} label='서울' />",
                  '}'
                ]}
                notes={['value 는 해당 라디오가 나타내는 고유 식별 값', 'checked 와 value 를 비교해 활성 상태를 제어']}
              />
            )}

            {tab === 'name' && (
              <ComponentSection
                title="name — 그룹 네임스페이스"
                preview={
                  <GroupLive
                    name="gender"
                    options={[
                      {label: "남성 (name='gender')", value: 'male'},
                      {label: "여성 (name='gender')", value: 'female'}
                    ]}
                    defaultValue="male"
                  />
                }
                code={[
                  "import {useState} from 'react'",
                  "import Radio from 'm2m-uiux-react/Radio'",
                  "import RadioGroup from 'm2m-uiux-react/RadioGroup'",
                  '',
                  "const options = [{ label: '남성', value: 'male' }, { label: '여성', value: 'female' }]",
                  '',
                  'export function Example() {',
                  "  const [value, setValue] = useState('male')",
                  '  return (',
                  '    <>',
                  '      {/* name 이 같은 라디오들은 하나의 그룹으로 묶임 */}',
                  "      <Radio name='gender' value='male' checked={value === 'male'} onChange={(e) => setValue(e.target.value)} label='남성' />",
                  "      <Radio name='gender' value='female' checked={value === 'female'} onChange={(e) => setValue(e.target.value)} label='여성' />",
                  '      {/* RadioGroup 사용 시 name 을 그룹에서 한 번만 선언 */}',
                  "      <RadioGroup name='gender' value={value} onChange={setValue} options={options} />",
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['HTML name 속성으로 라디오 그룹을 구분', 'RadioGroup 은 name 생략 시 useId 로 자동 생성']}
              />
            )}

            {tab === 'group' && (
              <>
                <ComponentSection
                  title="RadioGroup — 세로 배치 (기본)"
                  preview={
                    <GroupLive
                      name="grp-v"
                      options={[
                        {label: '옵션 A', value: 'a'},
                        {label: '옵션 B', value: 'b'},
                        {label: '옵션 C', value: 'c'}
                      ]}
                      defaultValue="a"
                    />
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import RadioGroup from 'm2m-uiux-react/RadioGroup'",
                    '',
                    'const options = [',
                    "  { label: '옵션 A', value: 'a' },",
                    "  { label: '옵션 B', value: 'b' },",
                    "  { label: '옵션 C', value: 'c' },",
                    ']',
                    '',
                    'export function Example() {',
                    "  const [value, setValue] = useState('a')",
                    "  return <RadioGroup name='option' value={value} onChange={setValue} options={options} />",
                    '}'
                  ]}
                  notes={['RadioGroup 으로 감싸면 value/onChange 자동 연결']}
                />
                <ComponentSection
                  title='RadioGroup — direction="horizontal" 가로 배치'
                  preview={
                    <GroupLive
                      name="grp-h"
                      options={[
                        {label: '남성', value: 'male'},
                        {label: '여성', value: 'female'},
                        {label: '기타', value: 'other'}
                      ]}
                      defaultValue="male"
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
                  notes={['direction: "horizontal" | "vertical" (기본값 vertical)']}
                />
              </>
            )}

            {tab === 'onChange' && (
              <ComponentSection
                title="onChange 이벤트 핸들러 (클릭해보세요)"
                preview={<GroupLive name="oc" options={CITY} defaultValue="seoul" />}
                code={[
                  "import {useState} from 'react'",
                  "import RadioGroup from 'm2m-uiux-react/RadioGroup'",
                  '',
                  "const options = [{ label: '서울', value: 'seoul' }, { label: '부산', value: 'busan' }]",
                  '',
                  'export function Example() {',
                  "  const [value, setValue] = useState('seoul')",
                  '  // RadioGroup 의 onChange 는 선택된 value 문자열을 반환',
                  '  return <RadioGroup options={options} value={value} onChange={(value: string) => setValue(value)} />',
                  '}'
                ]}
                notes={['RadioGroup 의 onChange 는 선택된 value 문자열을 반환']}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={
                  <Radio name="cn" value="a" checked classNames="demo-hint" label="커스텀 스타일" onChange={() => {}} />
                }
                code={[
                  "import Radio from 'm2m-uiux-react/Radio'",
                  '',
                  'export function Example() {',
                  '  return <Radio checked classNames="mb-2" label="커스텀 스타일" />',
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
