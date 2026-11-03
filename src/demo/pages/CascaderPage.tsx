import {useRef, useState} from 'react'
import type {ComponentProps, ReactNode} from 'react'

import Button from '~/components/Button'
import Cascader, {CascaderPanel, CASCADER_EXPAND_TRIGGER, CASCADER_SIZE} from '~/components/Cascader'
import type {CascaderConfig, CascaderModelValue, CascaderNode, CascaderOption, CascaderRef} from '~/components/Cascader'
import {ComponentSection as BaseComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const OPTIONS: CascaderOption[] = [
  {
    value: 'seoul',
    label: '서울',
    children: [
      {value: 'gangnam', label: '강남구'},
      {value: 'seocho', label: '서초구'},
      {value: 'mapo', label: '마포구'}
    ]
  },
  {
    value: 'gyeonggi',
    label: '경기',
    children: [
      {
        value: 'suwon',
        label: '수원시',
        children: [
          {value: 'yeongtong', label: '영통구'},
          {value: 'paldal', label: '팔달구'}
        ]
      },
      {value: 'seongnam', label: '성남시', children: [{value: 'bundang', label: '분당구'}]},
      {value: 'goyang', label: '고양시'}
    ]
  },
  {value: 'busan', label: '부산', children: [{value: 'haeundae', label: '해운대구'}]}
]
const DISABLED_OPTIONS: CascaderOption[] = [
  {
    value: 'seoul',
    label: '서울',
    children: [
      {value: 'gangnam', label: '강남구'},
      {value: 'seocho', label: '서초구', disabled: true}
    ]
  },
  {value: 'gyeonggi', label: '경기 (비활성)', disabled: true, children: [{value: 'suwon', label: '수원시'}]}
]
const CUSTOM_KEY_OPTIONS: CascaderOption[] = [
  {
    id: 'seoul',
    name: '서울',
    items: [
      {id: 'gangnam', name: '강남구'},
      {id: 'seocho', name: '서초구', off: true}
    ]
  },
  {id: 'busan', name: '부산', items: [{id: 'haeundae', name: '해운대구'}]}
]
const TABS = [
  'basic',
  'disabled',
  'clearable',
  'showAllLevels',
  'multiple',
  'collapseTags',
  'checkStrictly',
  'emitPath',
  'lazy',
  'filterable',
  'slot',
  'size',
  'error',
  'events',
  'panel'
]

const EXAMPLE_OPTIONS = [
  'const options = [',
  "  {value: 'seoul', label: '서울', children: [{value: 'gangnam', label: '강남구'}]},",
  "  {value: 'gyeonggi', label: '경기', children: [{value: 'suwon', label: '수원시'}]}",
  ']'
]

function completeReactExample(source: string | string[]) {
  const lines = typeof source === 'string' ? source.split('\n') : source
  const text = lines.join('\n')
  const jsxStart = lines.findIndex((line) => line.trimStart().startsWith('<'))
  const declarations = jsxStart >= 0 ? lines.slice(0, jsxStart) : []
  const jsx = jsxStart >= 0 ? lines.slice(jsxStart) : lines
  const imports = [
    "import {useRef, useState} from 'react'",
    "import Cascader, {CascaderPanel, CASCADER_SIZE} from 'm2m-uiux-react/Cascader'",
    "import type {CascaderModelValue, CascaderNode, CascaderOption, CascaderRef} from 'm2m-uiux-react/Cascader'"
  ]
  if (text.includes('<Button')) imports.push("import Button from 'm2m-uiux-react/Button'")

  const setup = [...declarations]
  if (!text.includes('const options =')) setup.unshift(...EXAMPLE_OPTIONS, '')
  if (!text.includes('const [value') && !text.includes('const value'))
    setup.push("const [value, setValue] = useState<CascaderModelValue>(['seoul', 'gangnam'])")
  if (text.includes('multiple') && !text.includes('const [multiple'))
    setup.push('const [multiple, setMultiple] = useState<CascaderModelValue>([])')

  return [
    ...imports,
    '',
    'export default function Example() {',
    ...setup.map((line) => (line ? `  ${line}` : '')),
    '',
    '  return (',
    '    <>',
    ...jsx.map((line) => `      ${line}`),
    '    </>',
    '  )',
    '}'
  ]
}

function ComponentSection(props: ComponentProps<typeof BaseComponentSection>) {
  return <BaseComponentSection {...props} code={completeReactExample(props.code)} />
}

function Demo({
  config,
  initial,
  ...props
}: {config?: CascaderConfig; initial?: CascaderModelValue} & Partial<ComponentProps<typeof Cascader>>) {
  const [value, setValue] = useState<CascaderModelValue>(initial ?? (config?.multiple ? [] : ['seoul', 'gangnam']))
  return (
    <div style={{maxWidth: 320}}>
      <Cascader {...props} options={props.options ?? OPTIONS} config={config} value={value} onChange={setValue} />
      <div className="demo-hint demo-cascader-value">선택값: {JSON.stringify(value)}</div>
    </div>
  )
}

let lazyId = 0
function LazyDemo() {
  const lazyLoad = (node: CascaderNode, resolve: (data?: CascaderOption[]) => void) =>
    setTimeout(
      () =>
        resolve(
          Array.from({length: node.level + 2}, () => ({
            value: ++lazyId,
            label: `옵션 ${lazyId}`,
            leaf: node.level >= 2
          }))
        ),
      600
    )
  return (
    <div className="demo-col" style={{width: 320, maxWidth: '100%', gap: 10}}>
      <Cascader config={{lazy: true, lazyLoad}} options={[]} />
      <Cascader config={{lazy: true, lazyLoad}} options={[{value: 'preset', label: '미리 로드된 루트', leaf: false}]} />
    </div>
  )
}

function EventDemo() {
  const [log, setLog] = useState<string[]>([])
  const [value, setValue] = useState<CascaderModelValue>([])
  const push = (text: string) => setLog((items) => [text, ...items].slice(0, 6))
  return (
    <div style={{maxWidth: 320}}>
      <Cascader
        options={OPTIONS}
        config={{multiple: true}}
        value={value}
        onChange={(next) => {
          setValue(next)
          push(`change ${JSON.stringify(next)}`)
        }}
        onExpandChange={(path) => push(`expand-change ${JSON.stringify(path)}`)}
        onVisibleChange={(visible) => push(`visible-change ${visible}`)}
        onRemoveTag={(removed) => push(`remove-tag ${JSON.stringify(removed)}`)}
        onFocus={() => push('focus')}
        onBlur={() => push('blur')}
      />
      <div className="demo-col" style={{gap: 4, marginTop: 8}}>
        {(log.length ? log : ['이벤트 없음']).map((item, index) => (
          <div key={`${item}-${index}`} className="demo-hint">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function CheckedNodesDemo() {
  const ref = useRef<CascaderRef>(null)
  const [value, setValue] = useState<CascaderModelValue>([
    ['seoul', 'gangnam'],
    ['gyeonggi', 'suwon', 'yeongtong']
  ])
  const [result, setResult] = useState('없음')
  return (
    <div className="demo-col" style={{width: 320, maxWidth: '100%'}}>
      <Cascader ref={ref} options={OPTIONS} config={{multiple: true}} value={value} onChange={setValue} />
      <Button onClick={() => setResult(JSON.stringify(ref.current?.getCheckedNodes(true).map((node) => node.data)))}>
        getCheckedNodes(true)
      </Button>
      <div className="demo-hint">결과: {result}</div>
    </div>
  )
}

function SlotDemo() {
  const [value, setValue] = useState<CascaderModelValue>([])
  return (
    <div className="demo-col" style={{width: 320, maxWidth: '100%', gap: 10}}>
      <Cascader
        options={OPTIONS}
        value={value}
        onChange={setValue}
        renderLabel={(node) => (
          <>
            <span>{node.label}</span>
            {!node.leaf && <span> ({node.children.length})</span>}
          </>
        )}
      />
      <Cascader options={[]} renderEmpty={() => <>데이터가 없어요</>} />
    </div>
  )
}

function ErrorDemo() {
  return (
    <div className="demo-col" style={{width: 320, maxWidth: '100%', gap: 10}}>
      <Cascader options={OPTIONS} placeholder="지역 선택" error="지역을 선택해주세요" />
      <Cascader options={OPTIONS} helperText="시/군/구까지 선택해주세요" />
    </div>
  )
}

function PanelDemo() {
  const [single, setSingle] = useState<CascaderModelValue>(['seoul', 'gangnam'])
  const [multiple, setMultiple] = useState<CascaderModelValue>([])
  return (
    <div className="demo-col" style={{alignItems: 'flex-start', gap: 10}}>
      <CascaderPanel options={OPTIONS} value={single} onChange={setSingle} />
      <div className="demo-hint">선택값: {JSON.stringify(single)}</div>
      <CascaderPanel options={OPTIONS} config={{multiple: true}} value={multiple} onChange={setMultiple} />
      <div className="demo-hint">선택값: {JSON.stringify(multiple)}</div>
    </div>
  )
}

function CollapseTagsDemo() {
  const [value, setValue] = useState<CascaderModelValue>([
    ['seoul', 'gangnam'],
    ['seoul', 'seocho'],
    ['busan', 'haeundae']
  ])
  const config = {multiple: true} as const
  return (
    <div className="demo-col" style={{width: 320, maxWidth: '100%', gap: 10}}>
      <Cascader options={OPTIONS} config={config} value={value} onChange={setValue} collapseTags clearable />
      <Cascader options={OPTIONS} config={config} value={value} onChange={setValue} clearable />
    </div>
  )
}

function DisabledDemo() {
  return (
    <div className="demo-col" style={{width: 320, maxWidth: '100%', gap: 10}}>
      <Cascader options={DISABLED_OPTIONS} />
      <Cascader options={DISABLED_OPTIONS} value={['seoul', 'gangnam']} disabled />
    </div>
  )
}

function ShowAllLevelsDemo() {
  const [value, setValue] = useState<CascaderModelValue>(['gyeonggi', 'suwon', 'yeongtong'])
  return (
    <div className="demo-col" style={{width: 320, maxWidth: '100%', gap: 10}}>
      <Cascader options={OPTIONS} value={value} onChange={setValue} showAllLevels={false} />
      <Cascader options={OPTIONS} value={value} onChange={setValue} separator=" > " />
    </div>
  )
}

function CheckStrictlyDemo() {
  const [single, setSingle] = useState<CascaderModelValue>(['gyeonggi'])
  const [multiple, setMultiple] = useState<CascaderModelValue>([['seoul'], ['gyeonggi', 'suwon']])
  return (
    <div className="demo-col" style={{width: 320, maxWidth: '100%', gap: 10}}>
      <Cascader options={OPTIONS} config={{checkStrictly: true}} value={single} onChange={setSingle} />
      <Cascader
        options={OPTIONS}
        config={{checkStrictly: true, multiple: true}}
        value={multiple}
        onChange={setMultiple}
      />
    </div>
  )
}

function EmitPathDemo() {
  const [single, setSingle] = useState<CascaderModelValue>('yeongtong')
  const [multiple, setMultiple] = useState<CascaderModelValue>(['gangnam', 'haeundae'])
  return (
    <div className="demo-col" style={{width: 320, maxWidth: '100%', gap: 10}}>
      <div>
        <Cascader options={OPTIONS} config={{emitPath: false}} value={single} onChange={setSingle} />
        <div className="demo-hint demo-cascader-value">선택값: {JSON.stringify(single)}</div>
      </div>
      <div>
        <Cascader
          options={OPTIONS}
          config={{emitPath: false, multiple: true}}
          value={multiple}
          onChange={setMultiple}
        />
        <div className="demo-hint demo-cascader-value">선택값: {JSON.stringify(multiple)}</div>
      </div>
    </div>
  )
}

function FilterableDemo() {
  const [single, setSingle] = useState<CascaderModelValue>([])
  const [multiple, setMultiple] = useState<CascaderModelValue>([])
  return (
    <div className="demo-col" style={{width: 320, maxWidth: '100%', gap: 10}}>
      <Cascader options={OPTIONS} value={single} onChange={setSingle} filterable />
      <Cascader options={OPTIONS} config={{multiple: true}} value={multiple} onChange={setMultiple} filterable />
    </div>
  )
}

function CustomFilterDemo() {
  const [value, setValue] = useState<CascaderModelValue>([])
  const [log, setLog] = useState<string[]>([])
  const push = (text: string) => setLog((items) => [text, ...items].slice(0, 4))
  return (
    <div style={{width: 320, maxWidth: '100%'}}>
      <Cascader
        options={OPTIONS}
        value={value}
        onChange={setValue}
        filterable
        debounce={500}
        beforeFilter={(keyword) => {
          push(`beforeFilter ${keyword}`)
          return keyword.length >= 2
        }}
        filterMethod={(node, keyword) => node.pathLabels.join('/').includes(keyword)}
        onVisibleChange={(visible) => push(`visible-change ${visible}`)}
        onFocus={() => push('focus')}
        onBlur={() => push('blur')}
      />
      <div className="demo-hint">최근 로그: {log.join(' | ') || '없음'}</div>
    </div>
  )
}

const section = (title: string, preview: ReactNode, code: string[], notes?: string[]) => (
  <ComponentSection title={title} preview={preview} code={code} notes={notes} />
)

export function CascaderPage() {
  return (
    <div className="demo-cascader-page">
      <PageHeader
        title="Cascader"
        component="Cascader"
        desc="— 계층(시/도 → 시/군/구 …) 데이터를 단계별 메뉴로 선택하는 드롭다운. 다중 선택 · 동적 로딩 · 검색을 지원합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'basic' && (
              <>
                {section(
                  '기본 — 클릭으로 하위 메뉴 펼치기',
                  <Demo />,
                  ['<Cascader options={options} value={value} onChange={setValue} />'],
                  ['value는 선택 경로 배열 (emitPath 기본값 true)', '← → ↑ ↓로 이동, Enter 선택, Esc 닫기']
                )}
                {section(
                  'config.expandTrigger="hover" — hover로 하위 메뉴 펼치기',
                  <Demo config={{expandTrigger: CASCADER_EXPAND_TRIGGER.HOVER}} initial={[]} />,
                  ["<Cascader config={{expandTrigger: 'hover'}} />"]
                )}
              </>
            )}
            {tab === 'disabled' && (
              <>
                <ComponentSection
                  title="비활성 옵션 — 옵션의 disabled / 컴포넌트 disabled"
                  preview={<DisabledDemo />}
                  code={[
                    'const options = [',
                    "  {value: 'seoul', label: '서울', children: [",
                    "    {value: 'gangnam', label: '강남구'},",
                    "    {value: 'seocho', label: '서초구', disabled: true}",
                    '  ]}',
                    ']',
                    '',
                    '<Cascader options={options} />',
                    '<Cascader options={options} disabled />'
                  ]}
                  notes={['부모가 disabled 면 자식도 선택할 수 없습니다 (checkStrictly 제외)']}
                />
                <ComponentSection
                  title="config 키 매핑 — value / label / children / disabled 이름 바꾸기"
                  preview={
                    <div style={{width: 320, maxWidth: '100%'}}>
                      <Cascader
                        options={CUSTOM_KEY_OPTIONS}
                        config={{value: 'id', label: 'name', children: 'items', disabled: 'off'}}
                      />
                    </div>
                  }
                  code={[
                    'const options = [',
                    "  {id: 'seoul', name: '서울', items: [",
                    "    {id: 'seocho', name: '서초구', off: true}",
                    '  ]}',
                    ']',
                    '',
                    '<Cascader',
                    '  options={options}',
                    "  config={{value: 'id', label: 'name', children: 'items', disabled: 'off'}}",
                    '/>'
                  ]}
                />
              </>
            )}
            {tab === 'clearable' && (
              <ComponentSection
                title="clearable — 값이 있을 때 hover 하면 지우기 아이콘"
                preview={<Demo clearable initial={['gyeonggi', 'suwon', 'yeongtong']} />}
                code={[
                  "const [value, setValue] = useState(['gyeonggi', 'suwon', 'yeongtong'])",
                  '',
                  '<Cascader options={options} value={value} onChange={setValue} clearable />'
                ]}
                notes={['터치 기기에서는 지우기 아이콘이 항상 보입니다']}
              />
            )}
            {tab === 'showAllLevels' && (
              <ComponentSection
                title="showAllLevels=false — 마지막 레벨만 표시 / separator 변경"
                preview={<ShowAllLevelsDemo />}
                code={[
                  "const [value, setValue] = useState(['gyeonggi', 'suwon', 'yeongtong'])",
                  '',
                  '<Cascader',
                  '  options={options}',
                  '  value={value}',
                  '  onChange={setValue}',
                  '  showAllLevels={false}',
                  '/>',
                  '<Cascader',
                  '  options={options}',
                  '  value={value}',
                  '  onChange={setValue}',
                  '  separator=" > "',
                  '/>'
                ]}
              />
            )}
            {tab === 'multiple' && (
              <ComponentSection
                title="config.multiple — 다중 선택"
                preview={
                  <Demo
                    config={{multiple: true}}
                    initial={[
                      ['seoul', 'gangnam'],
                      ['gyeonggi', 'suwon', 'yeongtong']
                    ]}
                  />
                }
                code={[
                  "const [value, setValue] = useState([['seoul', 'gangnam'], ['gyeonggi', 'suwon', 'yeongtong']])",
                  '',
                  '<Cascader',
                  '  options={options}',
                  '  value={value}',
                  '  onChange={setValue}',
                  '  config={{multiple: true}}',
                  '/>'
                ]}
                notes={[
                  '부모 체크박스를 누르면 활성 leaf 전체가 선택/해제되고, 일부만 선택되면 반선택(−) 표시',
                  'value는 경로 배열의 배열 (emitPath=false면 value 배열)',
                  '태그의 × 또는 Backspace로 제거',
                  '드롭다운은 선택해도 닫히지 않음'
                ]}
              />
            )}
            {tab === 'collapseTags' &&
              section("collapseTags — 태그를 첫 개 + '+N' 으로 접기", <CollapseTagsDemo />, [
                '<Cascader config={{multiple: true}} collapseTags />'
              ])}
            {tab === 'checkStrictly' && (
              <ComponentSection
                title="config.checkStrictly — 아무 레벨이나 선택 (부모/자식 독립)"
                preview={<CheckStrictlyDemo />}
                code={[
                  '<Cascader',
                  '  options={options}',
                  '  value={value}',
                  '  onChange={setValue}',
                  '  config={{checkStrictly: true}}',
                  '/>',
                  '<Cascader',
                  '  options={options}',
                  '  value={multiple}',
                  '  onChange={setMultiple}',
                  '  config={{checkStrictly: true, multiple: true}}',
                  '/>'
                ]}
                notes={[
                  '단일: 각 항목을 라디오로 선택 (항목명 클릭은 펼치기)',
                  '다중: 부모와 자식이 서로 영향 없이 개별 체크'
                ]}
              />
            )}
            {tab === 'emitPath' && (
              <ComponentSection
                title="config.emitPath=false — 경로 대신 마지막 value만"
                preview={<EmitPathDemo />}
                code={[
                  "const [value, setValue] = useState('yeongtong') // 경로가 아닌 마지막 value만",
                  '',
                  '<Cascader',
                  '  options={options}',
                  '  value={value}',
                  '  onChange={setValue}',
                  '  config={{emitPath: false}}',
                  '/>'
                ]}
                notes={['value가 옵션 전체에서 유일해야 합니다']}
              />
            )}
            {tab === 'lazy' && (
              <ComponentSection
                title="config.lazy + lazyLoad — 동적 로딩"
                preview={<LazyDemo />}
                code={[
                  'let id = 0',
                  'function lazyLoad(node, resolve) {',
                  '  setTimeout(() => {',
                  '    resolve(Array.from({length: node.level + 1}, () => ({',
                  '      value: ++id,',
                  '      label: `옵션 ${id}`,',
                  '      leaf: node.level >= 2',
                  '    })))',
                  '  }, 600)',
                  '}',
                  '',
                  '<Cascader config={{lazy: true, lazyLoad}} />'
                ]}
                notes={[
                  'lazyLoad(node, resolve) — resolve로 하위 옵션 전달, 빈 배열이면 leaf 처리',
                  'options가 비어 있으면 루트도 lazyLoad로 가져옵니다 (node.level = 0)',
                  '옵션의 leaf: true로 더 이상 하위가 없음을 미리 알릴 수 있습니다'
                ]}
              />
            )}
            {tab === 'filterable' && (
              <>
                <ComponentSection
                  title="filterable — 옵션 검색"
                  preview={<FilterableDemo />}
                  code={[
                    '<Cascader options={options} value={value} onChange={setValue} filterable />',
                    '<Cascader',
                    '  options={options}',
                    '  value={multiple}',
                    '  onChange={setMultiple}',
                    '  config={{multiple: true}}',
                    '  filterable',
                    '/>'
                  ]}
                  notes={['입력 후 debounce(기본 300ms) 뒤에 검색 결과 목록으로 전환', '결과 항목은 전체 경로로 표시']}
                />
                <ComponentSection
                  title="filterMethod · beforeFilter · debounce — 검색 커스터마이징"
                  preview={<CustomFilterDemo />}
                  code={[
                    '<Cascader',
                    '  options={options}',
                    '  filterable',
                    '  debounce={500}',
                    '  beforeFilter={(keyword) => keyword.length >= 2}',
                    '  filterMethod={(node, keyword) =>',
                    "    node.pathLabels.join('/').includes(keyword)",
                    '  }',
                    '/>'
                  ]}
                />
              </>
            )}
            {tab === 'slot' && (
              <ComponentSection
                title="renderLabel — 노드 내용 커스터마이징 · empty"
                preview={<SlotDemo />}
                code={[
                  '<Cascader',
                  '  options={options}',
                  '  renderLabel={(node) => (',
                  '    <>',
                  '      <span>{node.label}</span>',
                  '      {!node.leaf && <span> ({node.children.length})</span>}',
                  '    </>',
                  '  )}',
                  '/>',
                  '<Cascader options={[]} renderEmpty={() => <>데이터가 없어요</>} />'
                ]}
                notes={['기본 renderLabel 파라미터: {node} (원본 옵션은 node.data)']}
              />
            )}
            {tab === 'size' && (
              <>
                {(['SM', 'MD', 'LG'] as const).map((key) =>
                  section(
                    `size="${CASCADER_SIZE[key]}"${key === 'MD' ? ' (기본)' : ''}`,
                    <div style={{width: 320, maxWidth: '100%'}}>
                      <Cascader options={OPTIONS} defaultValue={['seoul', 'gangnam']} size={CASCADER_SIZE[key]} />
                    </div>,
                    [
                      '<Cascader',
                      '  options={options}',
                      '  value={value}',
                      '  onChange={setValue}',
                      `  size={CASCADER_SIZE.${key}}`,
                      '/>'
                    ]
                  )
                )}
              </>
            )}
            {tab === 'error' && (
              <ComponentSection
                title="error · helperText · placeholder"
                preview={<ErrorDemo />}
                code={[
                  '<Cascader options={options} placeholder="지역 선택" error="지역을 선택해주세요" />',
                  '<Cascader options={options} helperText="시/군/구까지 선택해주세요" />'
                ]}
              />
            )}
            {tab === 'events' && (
              <>
                <ComponentSection
                  title="이벤트 — change · expand-change · visible-change · remove-tag · focus · blur"
                  preview={<EventDemo />}
                  code={[
                    '<Cascader',
                    '  options={options}',
                    '  config={{multiple: true}}',
                    "  onChange={(value) => console.log('change', value)}",
                    "  onExpandChange={(path) => console.log('expand', path)}",
                    "  onVisibleChange={(open) => console.log('visible', open)}",
                    "  onRemoveTag={(value) => console.log('remove-tag', value)}",
                    '  onFocus={() => {}}',
                    '  onBlur={() => {}}',
                    '/>'
                  ]}
                />
                <ComponentSection
                  title="getCheckedNodes(leafOnly) — 선택 노드 조회"
                  preview={<CheckedNodesDemo />}
                  code={[
                    'const cascaderRef = useRef<CascaderRef>(null)',
                    '',
                    '<Cascader ref={cascaderRef} options={options} config={{multiple: true}} />',
                    '<Button onClick={() => cascaderRef.current?.getCheckedNodes(true)}>',
                    '  getCheckedNodes(true)',
                    '</Button>'
                  ]}
                />
              </>
            )}
            {tab === 'panel' && (
              <ComponentSection
                title="CascaderPanel — 드롭다운 없이 패널만 단독 사용"
                preview={<PanelDemo />}
                code={[
                  '<CascaderPanel options={options} value={value} onChange={setValue} />',
                  '<CascaderPanel',
                  '  options={options}',
                  '  value={multiple}',
                  '  onChange={setMultiple}',
                  '  config={{multiple: true}}',
                  '/>'
                ]}
                notes={['Cascader와 동일한 options · config · value · renderLabel · onExpandChange 등을 지원']}
              />
            )}
          </>
        )}
      </PropTabs>
    </div>
  )
}
