import {useContext, useState} from 'react'

import Select, {SELECT_SIZE} from '~/components/Select'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {DemoTabContext} from '~/demo/components/navContext'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const OPTIONS = [
  {label: '서울', value: 'seoul'},
  {label: '부산', value: 'busan'},
  {label: '인천', value: 'incheon'},
  {label: '대구', value: 'daegu'},
  {label: '광주', value: 'gwangju'}
]

const WITH_DISABLED = [
  {label: '서울', value: 'seoul'},
  {label: '부산', value: 'busan', disabled: true},
  {label: '인천', value: 'incheon'}
]

const TABS = [
  'variant',
  'options',
  'value',
  'searchable',
  'disabled',
  'error',
  'size',
  'placeholder',
  'onChange',
  'classNames'
]

const wrap = {maxWidth: 320}

export function SelectPage() {
  const {tab: forced} = useContext(DemoTabContext)
  const isMulti = (forced ?? 'Default').toLowerCase() === 'multi'
  const L = isMulti ? 'Select.Multi' : 'Select.Default'

  /** 단일/다중 공통 프리뷰 렌더러 */
  const S = (props: {
    defaultValue?: string | string[]
    searchable?: boolean
    disabled?: boolean
    error?: boolean | string
    helperText?: string
    size?: 'sm' | 'md' | 'lg'
    placeholder?: string
    options?: {label: string; value: string; disabled?: boolean}[]
    classNames?: string
  }) => {
    const {defaultValue, options = OPTIONS, ...rest} = props
    return isMulti ? (
      <Select
        multiple
        options={options}
        defaultValue={(defaultValue as string[]) ?? []}
        placeholder="선택해주세요"
        {...rest}
      />
    ) : (
      <Select options={options} defaultValue={(defaultValue as string) ?? ''} placeholder="선택해주세요" {...rest} />
    )
  }

  return (
    <>
      <PageHeader
        title={L}
        component={L}
        desc={
          isMulti
            ? '— 다중 선택 드롭다운. value 가 배열 형태이며 선택 항목이 태그 칩으로 표시됩니다.'
            : '— 단일 선택 커스텀 드롭다운(네이티브 select 아님). options 배열로 항목을 정의합니다.'
        }
      />
      <PropTabs tabs={TABS} key={L}>
        {(tab) => (
          <>
            {tab === 'variant' && (
              <>
                <ComponentSection
                  title={`${L} — 기본 (클릭해서 열어보세요)`}
                  preview={
                    <div className="demo-col" style={wrap}>
                      {S({defaultValue: isMulti ? ['seoul', 'busan'] : 'seoul'})}
                    </div>
                  }
                  code={
                    isMulti
                      ? [
                          "import {useState} from 'react'",
                          "import Select from 'm2m-uiux-react/Select'",
                          '',
                          'export function Example() {',
                          "  const [values, setValues] = useState(['seoul', 'busan'])",
                          '  return (',
                          '    <Select',
                          '      multiple',
                          '      value={values}',
                          '      options={options}',
                          '      onChange={(values) => setValues(values)}',
                          '    />',
                          '  )',
                          '}'
                        ]
                      : [
                          "import {useState} from 'react'",
                          "import Select from 'm2m-uiux-react/Select'",
                          '',
                          "const options = [{ label: '서울', value: 'seoul' }, { label: '부산', value: 'busan' }]",
                          '',
                          'export function Example() {',
                          "  const [value, setValue] = useState('')",
                          '  return <Select value={value} options={options} onChange={(v) => setValue(v)} />',
                          '}'
                        ]
                  }
                  notes={
                    isMulti
                      ? [
                          'multiple → value 는 string[]',
                          '태그 칩의 × 클릭으로 개별 제거',
                          '드롭다운은 선택해도 닫히지 않음'
                        ]
                      : [
                          '네이티브 <select> 가 아닌 커스텀 드롭다운 레이어',
                          '선택 항목은 brand-light 배경 + 체크 아이콘'
                        ]
                  }
                />
                <ComponentSection
                  title={isMulti ? '빈 상태' : '미선택 상태'}
                  preview={
                    <div className="demo-col" style={wrap}>
                      {S({defaultValue: isMulti ? [] : ''})}
                    </div>
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import Select from 'm2m-uiux-react/Select'",
                    '',
                    'export function Example() {',
                    `  const [value, setValue] = useState${isMulti ? '<string[]>([])' : "('')"}`,
                    `  return <Select${isMulti ? ' multiple' : ''} value={value} options={options} onChange={setValue} />`,
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'options' && (
              <>
                <ComponentSection
                  title="options — 기본 배열"
                  preview={
                    <div className="demo-col" style={wrap}>
                      {S({defaultValue: isMulti ? ['seoul'] : 'seoul'})}
                    </div>
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import Select from 'm2m-uiux-react/Select'",
                    '',
                    'const options = [',
                    "  { label: '서울', value: 'seoul' },",
                    "  { label: '부산', value: 'busan' },",
                    "  { label: '인천', value: 'incheon' },",
                    ']',
                    '',
                    'export function Example() {',
                    `  const [value, setValue] = useState${isMulti ? "<string[]>(['seoul'])" : "('seoul')"}`,
                    `  return <Select${isMulti ? ' multiple' : ''} value={value} options={options} onChange={setValue} />`,
                    '}'
                  ]}
                />
                <ComponentSection
                  title="options — 비활성 항목 포함"
                  preview={
                    <div className="demo-col" style={wrap}>
                      {S({options: WITH_DISABLED, defaultValue: isMulti ? ['seoul'] : 'seoul'})}
                    </div>
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import Select from 'm2m-uiux-react/Select'",
                    '',
                    'const options = [',
                    "  { label: '서울', value: 'seoul' },",
                    "  { label: '부산', value: 'busan', disabled: true },",
                    "  { label: '인천', value: 'incheon' },",
                    ']',
                    '',
                    'export function Example() {',
                    `  const [value, setValue] = useState${isMulti ? "<string[]>(['seoul'])" : "('seoul')"}`,
                    `  return <Select${isMulti ? ' multiple' : ''} value={value} options={options} onChange={setValue} />`,
                    '}'
                  ]}
                  notes={['disabled: true 인 항목은 클릭 불가']}
                />
              </>
            )}

            {tab === 'value' && (
              <>
                <ComponentSection
                  title={isMulti ? 'value — 배열 (다중 선택)' : 'value — 선택된 값'}
                  preview={
                    <div className="demo-col" style={wrap}>
                      {S({defaultValue: isMulti ? ['seoul', 'busan'] : 'seoul'})}
                    </div>
                  }
                  code={
                    isMulti
                      ? [
                          "import {useState} from 'react'",
                          "import Select from 'm2m-uiux-react/Select'",
                          '',
                          'export function Example() {',
                          "  const [values, setValues] = useState(['seoul', 'busan'])",
                          '  return <Select multiple value={values} onChange={(v) => setValues(v)} options={options} />',
                          '}'
                        ]
                      : [
                          "import {useState} from 'react'",
                          "import Select from 'm2m-uiux-react/Select'",
                          '',
                          'export function Example() {',
                          "  const [value, setValue] = useState('seoul')",
                          '  return <Select value={value} onChange={(v) => setValue(v)} options={options} />',
                          '}'
                        ]
                  }
                  notes={[
                    isMulti ? 'multiple 모드에서 value 는 반드시 string[] 타입' : 'onChange 인자는 선택된 value 문자열'
                  ]}
                />
                <ComponentSection
                  title={isMulti ? 'value — 빈 배열 (미선택)' : 'value — 미선택 상태'}
                  preview={
                    <div className="demo-col" style={wrap}>
                      {S({defaultValue: isMulti ? [] : ''})}
                    </div>
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import Select from 'm2m-uiux-react/Select'",
                    '',
                    'export function Example() {',
                    `  const [value, setValue] = useState${isMulti ? '<string[]>([])' : "('')"}`,
                    `  return <Select${isMulti ? ' multiple' : ''} value={value} onChange={setValue} options={options} />`,
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'searchable' && (
              <ComponentSection
                title="searchable={true} — 검색 가능 (클릭 후 입력)"
                preview={
                  <div className="demo-col" style={wrap}>
                    {S({searchable: true, defaultValue: isMulti ? ['seoul'] : 'seoul'})}
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import Select from 'm2m-uiux-react/Select'",
                  '',
                  'export function Example() {',
                  `  const [value, setValue] = useState${isMulti ? "<string[]>(['seoul'])" : "('seoul')"}`,
                  `  return <Select${isMulti ? ' multiple' : ''} searchable value={value} options={options} onChange={setValue} />`,
                  '}'
                ]}
                notes={['드롭다운 상단에 검색 입력창 자동 삽입', 'label 포함 검색, "결과 없음" 표시']}
              />
            )}

            {tab === 'disabled' && (
              <ComponentSection
                title="disabled={true}"
                preview={
                  <div className="demo-col" style={wrap}>
                    {S({disabled: true, defaultValue: isMulti ? ['seoul'] : 'seoul'})}
                  </div>
                }
                code={[
                  "import Select from 'm2m-uiux-react/Select'",
                  '',
                  'export function Example() {',
                  `  return <Select${isMulti ? ' multiple' : ''} disabled value={${isMulti ? "['seoul']" : "'seoul'"}} options={options} onChange={() => {}} />`,
                  '}'
                ]}
                notes={['클릭 및 키보드 조작 불가', '배경 회색 처리']}
              />
            )}

            {tab === 'error' && (
              <ComponentSection
                title="error / helperText"
                preview={
                  <div className="demo-col" style={wrap}>
                    {S({error: '지역을 선택하세요.', defaultValue: isMulti ? [] : ''})}
                    {S({helperText: '배송 가능 지역만 표시됩니다.', defaultValue: isMulti ? [] : ''})}
                  </div>
                }
                code={[
                  "import Select from 'm2m-uiux-react/Select'",
                  '',
                  'export function Example() {',
                  `  return <Select${isMulti ? ' multiple' : ''} error="지역을 선택하세요." options={options} onChange={() => {}} />`,
                  '}'
                ]}
                notes={['error 에 boolean 또는 string 전달 가능', 'string 전달 시 하단 메시지 자동 표시']}
              />
            )}

            {tab === 'size' &&
              (
                [
                  ['SM', ''],
                  ['MD', ' (기본)'],
                  ['LG', '']
                ] as const
              ).map(([s, suffix]) => (
                <ComponentSection
                  key={s}
                  title={`size="${SELECT_SIZE[s]}"${suffix}`}
                  preview={
                    <div className="demo-col" style={wrap}>
                      {S({size: SELECT_SIZE[s], defaultValue: isMulti ? ['seoul'] : 'seoul'})}
                    </div>
                  }
                  code={[
                    "import Select, {SELECT_SIZE} from 'm2m-uiux-react/Select'",
                    '',
                    'export function Example() {',
                    `  return <Select${isMulti ? ' multiple' : ''} size={SELECT_SIZE['${s}']} options={options} onChange={() => {}} />`,
                    '}'
                  ]}
                  notes={s === 'MD' ? ['size 기본값은 md'] : undefined}
                />
              ))}

            {tab === 'placeholder' && (
              <ComponentSection
                title="placeholder — 안내 텍스트"
                preview={
                  <div className="demo-col" style={wrap}>
                    {S({placeholder: '도시를 선택해주세요', defaultValue: isMulti ? [] : ''})}
                  </div>
                }
                code={[
                  "import Select from 'm2m-uiux-react/Select'",
                  '',
                  'export function Example() {',
                  `  return <Select${isMulti ? ' multiple' : ''} placeholder="도시를 선택해주세요" options={options} onChange={() => {}} />`,
                  '}'
                ]}
                notes={['value 가 비어있을 때 placeholder 표시']}
              />
            )}

            {tab === 'onChange' && <OnChangeDemo isMulti={isMulti} />}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={
                  <div className="demo-col" style={wrap}>
                    {S({classNames: 'demo-hint', defaultValue: isMulti ? [] : ''})}
                  </div>
                }
                code={[
                  "import Select from 'm2m-uiux-react/Select'",
                  '',
                  'export function Example() {',
                  `  return <Select${isMulti ? ' multiple' : ''} classNames="w-full" options={options} onChange={() => {}} />`,
                  '}'
                ]}
                notes={['classNames prop 은 문자열 또는 배열 허용']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}

function OnChangeDemo({isMulti}: {isMulti: boolean}) {
  const [single, setSingle] = useState('seoul')
  const [multi, setMulti] = useState<string[]>(['seoul'])
  return (
    <ComponentSection
      title="onChange 이벤트 핸들러"
      preview={
        <div className="demo-col" style={wrap}>
          {isMulti ? (
            <Select multiple options={OPTIONS} value={multi} onChange={setMulti} placeholder="선택" />
          ) : (
            <Select options={OPTIONS} value={single} onChange={setSingle} placeholder="선택" />
          )}
          <span className="demo-hint">선택값: {isMulti ? multi.join(', ') || '(없음)' : single || '(없음)'}</span>
        </div>
      }
      code={
        isMulti
          ? [
              "import {useState} from 'react'",
              "import Select from 'm2m-uiux-react/Select'",
              '',
              'export function Example() {',
              '  const [values, setValues] = useState<string[]>([])',
              '  return <Select multiple value={values} options={options} onChange={(v: string[]) => setValues(v)} />',
              '}'
            ]
          : [
              "import {useState} from 'react'",
              "import Select from 'm2m-uiux-react/Select'",
              '',
              'export function Example() {',
              "  const [value, setValue] = useState('')",
              '  return <Select value={value} options={options} onChange={(v: string) => setValue(v)} />',
              '}'
            ]
      }
      notes={[isMulti ? 'multiple 모드에서 onChange 파라미터는 string[]' : '단일 모드에서 onChange 파라미터는 string']}
    />
  )
}
