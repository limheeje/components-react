import {useState} from 'react'

import CheckboxGroup, {CHECKBOX_GROUP_DIRECTION, CHECKBOX_GROUP_SIZE} from '~/components/CheckboxGroup'
import type {CheckboxGroupOption} from '~/components/CheckboxGroup'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['options', 'value', 'direction', 'size', 'disabled', 'min', 'max']

const TECH: CheckboxGroupOption[] = [
  {value: 'react', label: 'React'},
  {value: 'vue', label: 'Vue.js'},
  {value: 'angular', label: 'Angular'},
  {value: 'svelte', label: 'Svelte'},
  {value: 'nextjs', label: 'Next.js'}
]
const FOOD: CheckboxGroupOption[] = [
  {value: 'pizza', label: '피자'},
  {value: 'burger', label: '버거'},
  {value: 'sushi', label: '스시', disabled: true},
  {value: 'pasta', label: '파스타'}
]
const DAY: CheckboxGroupOption[] = [
  {value: 'mon', label: '월'},
  {value: 'tue', label: '화'},
  {value: 'wed', label: '수'},
  {value: 'thu', label: '목'},
  {value: 'fri', label: '금'},
  {value: 'sat', label: '토'},
  {value: 'sun', label: '일'}
]

interface LiveProps {
  options: CheckboxGroupOption[]
  initial?: string[]
  label?: string
  direction?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  min?: number
  max?: number
}

function Live({options, initial = [], label = '선택값', ...rest}: LiveProps) {
  const [value, setValue] = useState<string[]>(initial)
  return (
    <div className="demo-col">
      <CheckboxGroup options={options} value={value} onChange={setValue} {...rest} />
      <span className="demo-hint">
        {label}: {value.length ? `[${value.join(', ')}]` : '없음'}
      </span>
    </div>
  )
}

export function CheckboxGroupPage() {
  return (
    <>
      <PageHeader
        title="CheckboxGroup"
        component="CheckboxGroup"
        desc="— 여러 항목을 동시에 선택할 수 있는 체크박스 그룹 컴포넌트. min/max 로 선택 개수를 제어합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'options' && (
              <>
                <ComponentSection
                  title="options — 항목 배열"
                  preview={<Live options={TECH} initial={['react', 'nextjs']} label="선택된 기술" />}
                  code={[
                    "import {useState} from 'react'",
                    "import CheckboxGroup from 'm2m-uiux-react/CheckboxGroup'",
                    '',
                    'const options = [',
                    "  { value: 'react', label: 'React' },",
                    "  { value: 'vue', label: 'Vue.js' },",
                    "  { value: 'nextjs', label: 'Next.js' },",
                    ']',
                    '',
                    'export function Example() {',
                    "  const [selected, setSelected] = useState(['react'])",
                    '  return <CheckboxGroup options={options} value={selected} onChange={setSelected} />',
                    '}'
                  ]}
                  notes={['disabled 필드로 개별 항목 비활성화 가능']}
                />
                <ComponentSection
                  title="개별 disabled 항목 포함"
                  preview={<Live options={FOOD} initial={['pizza']} />}
                  code={[
                    "import {useState} from 'react'",
                    "import CheckboxGroup from 'm2m-uiux-react/CheckboxGroup'",
                    '',
                    'const options = [',
                    "  { value: 'pizza', label: '피자' },",
                    "  { value: 'sushi', label: '스시', disabled: true },",
                    "  { value: 'pasta', label: '파스타' },",
                    ']',
                    '',
                    'export function Example() {',
                    "  const [selected, setSelected] = useState(['pizza'])",
                    '  return <CheckboxGroup options={options} value={selected} onChange={setSelected} />',
                    '}'
                  ]}
                  notes={['disabled 항목은 클릭해도 선택되지 않습니다']}
                />
              </>
            )}

            {tab === 'value' && (
              <>
                <ComponentSection
                  title="value — 선택된 값 배열"
                  preview={<Live options={TECH} initial={['react', 'vue', 'nextjs']} />}
                  code={[
                    "import {useState} from 'react'",
                    "import CheckboxGroup from 'm2m-uiux-react/CheckboxGroup'",
                    '',
                    'const options = [',
                    "  { value: 'react', label: 'React' },",
                    "  { value: 'vue', label: 'Vue.js' },",
                    ']',
                    '',
                    'export function Example() {',
                    "  const [selected, setSelected] = useState(['react', 'vue'])",
                    '  return <CheckboxGroup options={options} value={selected} onChange={setSelected} />',
                    '}'
                  ]}
                  notes={['value 는 string[] 타입', '비어 있으면 [] 전달']}
                />
                <ComponentSection
                  title="전체 해제 상태"
                  preview={<Live options={TECH} initial={[]} />}
                  code={[
                    "import {useState} from 'react'",
                    "import CheckboxGroup from 'm2m-uiux-react/CheckboxGroup'",
                    '',
                    "const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue.js' }]",
                    '',
                    'export function Example() {',
                    '  const [selected, setSelected] = useState<string[]>([])',
                    '  return <CheckboxGroup options={options} value={selected} onChange={setSelected} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'direction' && (
              <>
                <ComponentSection
                  title='direction="vertical" (기본)'
                  preview={<Live options={TECH.slice(0, 4)} initial={['react']} />}
                  code={[
                    "import {useState} from 'react'",
                    "import CheckboxGroup, {CHECKBOX_GROUP_DIRECTION} from 'm2m-uiux-react/CheckboxGroup'",
                    '',
                    "const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue.js' }]",
                    '',
                    'export function Example() {',
                    "  const [v, setV] = useState(['react'])",
                    '  return (',
                    "    <CheckboxGroup direction={CHECKBOX_GROUP_DIRECTION['VERTICAL']} options={options} value={v} onChange={setV} />",
                    '  )',
                    '}'
                  ]}
                />
                <ComponentSection
                  title='direction="horizontal" — 가로 나열'
                  preview={
                    <Live
                      options={DAY}
                      initial={['mon', 'wed', 'fri']}
                      direction={CHECKBOX_GROUP_DIRECTION['HORIZONTAL']}
                    />
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import CheckboxGroup, {CHECKBOX_GROUP_DIRECTION} from 'm2m-uiux-react/CheckboxGroup'",
                    '',
                    "const options = [{ value: 'mon', label: '월' }, { value: 'tue', label: '화' }, { value: 'wed', label: '수' }]",
                    '',
                    'export function Example() {',
                    "  const [v, setV] = useState(['mon', 'wed'])",
                    '  return (',
                    "    <CheckboxGroup direction={CHECKBOX_GROUP_DIRECTION['HORIZONTAL']} options={options} value={v} onChange={setV} />",
                    '  )',
                    '}'
                  ]}
                  notes={['flex-wrap 이 적용되어 화면 너비에서 자동 줄바꿈']}
                />
              </>
            )}

            {tab === 'size' && (
              <>
                {(['SM', 'MD', 'LG'] as const).map((s) => (
                  <ComponentSection
                    key={s}
                    title={`size="${CHECKBOX_GROUP_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''}`}
                    preview={
                      <Live
                        options={TECH.slice(0, 3)}
                        initial={['react']}
                        size={CHECKBOX_GROUP_SIZE[s]}
                        direction={CHECKBOX_GROUP_DIRECTION['HORIZONTAL']}
                      />
                    }
                    code={[
                      "import {useState} from 'react'",
                      "import CheckboxGroup, {CHECKBOX_GROUP_SIZE} from 'm2m-uiux-react/CheckboxGroup'",
                      '',
                      "const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue.js' }]",
                      '',
                      'export function Example() {',
                      "  const [v, setV] = useState(['react'])",
                      `  return <CheckboxGroup size={CHECKBOX_GROUP_SIZE['${s}']} options={options} value={v} onChange={setV} />`,
                      '}'
                    ]}
                  />
                ))}
              </>
            )}

            {tab === 'disabled' && (
              <ComponentSection
                title="disabled — 그룹 전체 비활성"
                preview={<Live options={TECH.slice(0, 4)} initial={['react', 'vue']} disabled />}
                code={[
                  "import {useState} from 'react'",
                  "import CheckboxGroup from 'm2m-uiux-react/CheckboxGroup'",
                  '',
                  "const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue.js' }]",
                  '',
                  'export function Example() {',
                  "  const [v, setV] = useState(['react', 'vue'])",
                  '  return <CheckboxGroup disabled options={options} value={v} onChange={setV} />',
                  '}'
                ]}
              />
            )}

            {tab === 'min' && (
              <ComponentSection
                title="min={1} — 최소 1개 이상 선택 강제"
                preview={<Live options={TECH.slice(0, 4)} initial={['react']} min={1} />}
                code={[
                  "import {useState} from 'react'",
                  "import CheckboxGroup from 'm2m-uiux-react/CheckboxGroup'",
                  '',
                  "const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue.js' }]",
                  '',
                  'export function Example() {',
                  "  const [v, setV] = useState(['react'])",
                  '  return <CheckboxGroup min={1} options={options} value={v} onChange={setV} />',
                  '}'
                ]}
                notes={['선택 해제 시 min 미만이 되면 차단됩니다']}
              />
            )}

            {tab === 'max' && (
              <>
                <ComponentSection
                  title="max={2} — 최대 2개까지 선택"
                  preview={<Live options={TECH} initial={['react', 'nextjs']} max={2} />}
                  code={[
                    "import {useState} from 'react'",
                    "import CheckboxGroup from 'm2m-uiux-react/CheckboxGroup'",
                    '',
                    "const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue.js' }, { value: 'nextjs', label: 'Next.js' }]",
                    '',
                    'export function Example() {',
                    "  const [v, setV] = useState(['react', 'nextjs'])",
                    '  return <CheckboxGroup max={2} options={options} value={v} onChange={setV} />',
                    '}'
                  ]}
                  notes={['max 초과 시 나머지 항목이 비활성화됩니다']}
                />
                <ComponentSection
                  title="min={1} + max={3} 조합"
                  preview={<Live options={TECH} initial={['react', 'vue']} min={1} max={3} />}
                  code={[
                    "import {useState} from 'react'",
                    "import CheckboxGroup from 'm2m-uiux-react/CheckboxGroup'",
                    '',
                    "const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue.js' }, { value: 'nextjs', label: 'Next.js' }]",
                    '',
                    'export function Example() {',
                    "  const [v, setV] = useState(['react', 'vue'])",
                    '  return <CheckboxGroup min={1} max={3} options={options} value={v} onChange={setV} />',
                    '}'
                  ]}
                />
              </>
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
