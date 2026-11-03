import {useState} from 'react'
import type {CSSProperties} from 'react'

import Table, {TABLE_ALIGN} from '~/components/Table'
import type {TableAlign, TableColumn, TableHeadCell} from '~/components/Table'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = [
  'columns',
  'data',
  'selectable',
  'sortable',
  'pagination',
  'striped',
  'colspan',
  'rowspan',
  'empty',
  'loading',
  'classNames'
]

interface Person {
  id: number
  name: string
  email?: string
  role: string
  status: string
}

const DATA: Person[] = [
  {id: 1, name: '홍길동', email: 'hong@ex.com', role: '개발자', status: '활성'},
  {id: 2, name: '김철수', email: 'kim@ex.com', role: '디자이너', status: '비활성'},
  {id: 3, name: '이영희', email: 'lee@ex.com', role: '기획자', status: '활성'},
  {id: 4, name: '박민준', email: 'park@ex.com', role: '개발자', status: '활성'},
  {id: 5, name: '최유진', email: 'choi@ex.com', role: '디자이너', status: '비활성'}
]

const PAGE_DATA: Person[] = Array.from({length: 24}, (_, i) => ({
  id: i + 1,
  name: ['홍길동', '김철수', '이영희', '박민준', '최유진'][i % 5],
  role: ['개발자', '디자이너', '기획자'][i % 3],
  status: i % 3 === 1 ? '비활성' : '활성'
}))

function StatusBadge({value}: {value: unknown}) {
  const on = value === '활성'
  return (
    <span
      style={{
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 600,
        background: on ? 'var(--m2m-pg-success-bg)' : 'var(--m2m-pg-comp-bg-hover)',
        color: on ? 'var(--m2m-pg-success)' : 'var(--m2m-pg-comp-text-muted)'
      }}
    >
      {String(value)}
    </span>
  )
}

const COLUMNS: TableColumn<Person>[] = [
  {key: 'id', label: 'ID', width: 60},
  {key: 'name', label: '이름'},
  {key: 'email', label: '이메일'},
  {key: 'role', label: '역할'},
  {key: 'status', label: '상태', render: (v) => <StatusBadge value={v} />}
]

function SelectableDemo() {
  const [selected, setSelected] = useState<(string | number)[]>([])
  return (
    <div className="demo-col">
      <Table
        columns={COLUMNS.filter((c) => c.key !== 'email')}
        data={DATA.slice(0, 3)}
        rowKey="id"
        selectable
        selectedRowKeys={selected}
        onSelectionChange={(keys) => setSelected(keys)}
      />
      <span className="demo-hint">selectedRowKeys: [{selected.join(', ')}]</span>
    </div>
  )
}

function PaginationDemo({align}: {align?: TableAlign}) {
  const [page, setPage] = useState(1)
  return (
    <Table
      columns={[
        {key: 'id', label: 'ID', width: 60},
        {key: 'name', label: '이름'},
        {key: 'role', label: '역할'},
        {key: 'status', label: '상태', render: (v) => <StatusBadge value={v} />}
      ]}
      data={PAGE_DATA}
      rowKey="id"
      pagination={{page, pageSize: 5, align, onChange: setPage}}
    />
  )
}

const QUARTER = [
  {product: '노트북', q1: 120, q2: 145, q3: 98},
  {product: '모니터', q1: 85, q2: 92, q3: 110},
  {product: '키보드', q1: 200, q2: 230, q3: 185}
]
const Q_HEAD: TableHeadCell[][] = [
  [
    {label: '제품명', rowSpan: 2, align: TABLE_ALIGN['LEFT']},
    {label: '1분기', align: TABLE_ALIGN['RIGHT']},
    {label: '2분기', align: TABLE_ALIGN['RIGHT']},
    {label: '3분기', align: TABLE_ALIGN['RIGHT']}
  ]
]

const SCHEDULE = [
  {time: '09:00', owner: '전체팀', task: '스탠드업 미팅'},
  {time: '10:00', owner: '개발팀', task: '기능 개발'},
  {time: '11:00', owner: '개발팀', task: '코드 리뷰'},
  {time: '14:00', owner: '디자인팀', task: '디자인 워크샵'},
  {time: '15:00', owner: '디자인팀', task: '프로토타입 검토'},
  {time: '16:00', owner: '디자인팀', task: '디자인 확정'}
]

const STAFF = [
  {dept: '개발팀', name: '홍길동', position: '팀장'},
  {dept: '개발팀', name: '김철수', position: '선임'},
  {dept: '개발팀', name: '박민준', position: '주니어'},
  {dept: '디자인팀', name: '이영희', position: '팀장'},
  {dept: '디자인팀', name: '최유진', position: '선임'}
]

/** renderRow 로 tbody colspan (카테고리 헤더 행 + 소계 행) */
const QUOTE: {type: 'item' | 'category' | 'subtotal'; label: string; qty?: number; amount: number}[] = [
  {type: 'category', label: '하드웨어', amount: 0},
  {type: 'item', label: '노트북', qty: 2, amount: 2400000},
  {type: 'item', label: '모니터', qty: 3, amount: 900000},
  {type: 'subtotal', label: '소계', amount: 3300000},
  {type: 'category', label: '소프트웨어', amount: 0},
  {type: 'item', label: '라이선스', qty: 5, amount: 1500000},
  {type: 'subtotal', label: '소계', amount: 1500000}
]

const won = (n: number) => `${n.toLocaleString()}원`
const qtd: CSSProperties = {padding: '9px 12px', borderTop: '1px solid var(--m2m-pg-comp-border)'}

function QuoteTable() {
  return (
    <Table
      columns={[
        {key: 'label', label: '항목'},
        {key: 'qty', label: '수량', align: TABLE_ALIGN['CENTER'], width: 70},
        {key: 'amount', label: '금액', align: TABLE_ALIGN['RIGHT'], render: (v) => won(v as number)}
      ]}
      data={QUOTE}
      renderRow={(row, i) => {
        if (row.type === 'category')
          return (
            <tr key={i}>
              <td colSpan={3} style={{...qtd, fontWeight: 700, background: 'var(--m2m-pg-comp-bg-subtle)'}}>
                {row.label}
              </td>
            </tr>
          )
        if (row.type === 'subtotal')
          return (
            <tr key={i}>
              <td colSpan={2} style={{...qtd, textAlign: 'right', fontWeight: 700}}>
                소계
              </td>
              <td style={{...qtd, textAlign: 'right', fontWeight: 700, color: 'var(--m2m-pg-brand)'}}>
                {won(row.amount)}
              </td>
            </tr>
          )
        return null
      }}
    />
  )
}

export function TablePage() {
  return (
    <>
      <PageHeader
        title="Table (Datagrid)"
        component="Table"
        desc="— 데이터 그리드 테이블 컴포넌트. columns/data 배열로 구성합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'columns' && (
              <ComponentSection
                title="columns — 컬럼 정의"
                preview={<Table columns={COLUMNS} data={DATA.slice(0, 3)} rowKey="id" />}
                code={[
                  "import Table from 'm2m-uiux-react/Table'",
                  '',
                  'const columns = [',
                  "  { key: 'id', label: 'ID', width: 60 },",
                  "  { key: 'name', label: '이름' },",
                  "  { key: 'status', label: '상태', render: (v) => <StatusBadge value={v} /> },",
                  ']',
                  "const data = [{ id: 1, name: '홍길동', status: '활성' }]",
                  '',
                  'export function Example() {',
                  '  return <Table columns={columns} data={data} rowKey="id" />',
                  '}'
                ]}
                notes={['render 함수로 셀 커스터마이징']}
              />
            )}

            {tab === 'data' && (
              <ComponentSection
                title="data — 데이터 배열"
                preview={<Table columns={COLUMNS} data={DATA} rowKey="id" />}
                code={[
                  "import Table from 'm2m-uiux-react/Table'",
                  '',
                  'export function Example() {',
                  '  return <Table columns={columns} data={data} rowKey="id" />',
                  '}'
                ]}
                notes={['rowKey 는 필드명 또는 (row, i) => key 함수']}
              />
            )}

            {tab === 'selectable' && (
              <ComponentSection
                title="selectable={true} — 행 선택 (클릭해보세요)"
                preview={<SelectableDemo />}
                code={[
                  "import {useState} from 'react'",
                  "import Table from 'm2m-uiux-react/Table'",
                  '',
                  'export function Example() {',
                  '  const [selected, setSelected] = useState([])',
                  '  return (',
                  '    <Table',
                  '      columns={columns}',
                  '      data={data}',
                  '      rowKey="id"',
                  '      selectable',
                  '      selectedRowKeys={selected}',
                  '      onSelectionChange={(keys) => setSelected(keys)}',
                  '    />',
                  '  )',
                  '}'
                ]}
                notes={['헤더 체크박스 = 전체 선택 · 행 클릭으로도 토글']}
              />
            )}

            {tab === 'sortable' && (
              <ComponentSection
                title="sortable — 컬럼 정렬 (헤더 클릭)"
                preview={
                  <Table
                    columns={[
                      {key: 'id', label: 'ID', width: 60, sortable: true},
                      {key: 'name', label: '이름', sortable: true},
                      {key: 'role', label: '역할', sortable: true},
                      {key: 'status', label: '상태', render: (v) => <StatusBadge value={v} />}
                    ]}
                    data={DATA}
                    rowKey="id"
                  />
                }
                code={[
                  "import Table from 'm2m-uiux-react/Table'",
                  '',
                  "const columns = [{ key: 'name', label: '이름', sortable: true }]",
                  '',
                  'export function Example() {',
                  '  return <Table columns={columns} data={data} onSortChange={(sort) => console.log(sort)} />',
                  '}'
                ]}
                notes={['1클릭 asc → 2클릭 desc → 3클릭 해제', 'sort prop 없으면 클라이언트에서 정렬']}
              />
            )}

            {tab === 'pagination' && (
              <>
                {([TABLE_ALIGN['RIGHT'], TABLE_ALIGN['CENTER'], TABLE_ALIGN['LEFT']] as const).map((align) => (
                  <ComponentSection
                    key={align}
                    title={
                      align === TABLE_ALIGN['RIGHT']
                        ? "pagination.align='right' — 기본값 (총 개수 위 / 페이저 아래 오른쪽)"
                        : `pagination.align='${align}' — 페이저 ${align === TABLE_ALIGN['CENTER'] ? '중앙' : '왼쪽'} 정렬`
                    }
                    preview={<PaginationDemo align={align} />}
                    code={[
                      "import {useState} from 'react'",
                      "import Table from 'm2m-uiux-react/Table'",
                      '',
                      'export function Example() {',
                      '  const [page, setPage] = useState(1)',
                      '  return (',
                      '    <Table',
                      '      columns={columns}',
                      '      data={data}',
                      '      rowKey="id"',
                      `      pagination={{ page, pageSize: 5, align: '${align}', onChange: setPage }}`,
                      '    />',
                      '  )',
                      '}'
                    ]}
                    notes={
                      align === TABLE_ALIGN['RIGHT']
                        ? ['align: left · center · right — 총 개수는 항상 위 줄, 페이저는 아래 줄']
                        : []
                    }
                  />
                ))}
              </>
            )}

            {tab === 'striped' && (
              <>
                <ComponentSection
                  title="striped={true} — 줄무늬 스타일"
                  preview={<Table columns={COLUMNS} data={DATA} rowKey="id" striped />}
                  code={[
                    "import Table from 'm2m-uiux-react/Table'",
                    '',
                    'export function Example() {',
                    '  return <Table columns={columns} data={data} striped={true} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="striped={false} (기본)"
                  preview={<Table columns={COLUMNS} data={DATA} rowKey="id" />}
                  code={[
                    "import Table from 'm2m-uiux-react/Table'",
                    '',
                    'export function Example() {',
                    '  return <Table columns={columns} data={data} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="hover — 행 hover 하이라이트"
                  preview={<Table columns={COLUMNS} data={DATA} rowKey="id" hover />}
                  code={[
                    "import Table from 'm2m-uiux-react/Table'",
                    '',
                    'export function Example() {',
                    '  return <Table columns={columns} data={data} hover />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'colspan' && (
              <>
                <ComponentSection
                  title="thead colspan — 분기별 매출 현황 (다중 헤더 그룹)"
                  preview={
                    <Table
                      headGroups={Q_HEAD}
                      columns={[
                        {key: 'product', label: '제품명'},
                        {key: 'q1', label: '1분기', align: TABLE_ALIGN['RIGHT']},
                        {key: 'q2', label: '2분기', align: TABLE_ALIGN['RIGHT']},
                        {key: 'q3', label: '3분기', align: TABLE_ALIGN['RIGHT']}
                      ]}
                      data={QUARTER}
                      rowKey="product"
                    />
                  }
                  code={[
                    "import Table from 'm2m-uiux-react/Table'",
                    '',
                    'const headGroups = [',
                    '  [',
                    "    { label: '제품명', rowSpan: 2 },",
                    "    { label: '실적', colSpan: 3 },",
                    '  ],',
                    "  [{ label: '1분기' }, { label: '2분기' }, { label: '3분기' }],",
                    ']',
                    '',
                    'export function Example() {',
                    '  return <Table headGroups={headGroups} columns={columns} data={data} />',
                    '}'
                  ]}
                  notes={['headGroups 가 있으면 헤더는 headGroups, 데이터 행은 columns 로 렌더']}
                />
                <ComponentSection
                  title="tbody colspan — 견적서 (카테고리·소계 행 병합)"
                  preview={<QuoteTable />}
                  code={[
                    "import Table from 'm2m-uiux-react/Table'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Table',
                    '      columns={columns}',
                    '      data={data}',
                    '      renderRow={(row, i) => {',
                    "        if (row.type === 'category')",
                    '          return <tr key={i}><td colSpan={3}>{row.label}</td></tr>',
                    "        if (row.type === 'subtotal')",
                    '          return <tr key={i}><td colSpan={2}>소계</td><td>{row.amount}</td></tr>',
                    '        return null // 기본 렌더로 fallback',
                    '      }}',
                    '    />',
                    '  )',
                    '}'
                  ]}
                  notes={['renderRow 가 null 을 반환하면 기본 행 렌더로 fallback']}
                />
              </>
            )}

            {tab === 'rowspan' && (
              <>
                <ComponentSection
                  title="tbody rowspan — 업무 스케줄 (담당자 자동 병합)"
                  preview={
                    <Table
                      columns={[
                        {key: 'time', label: '시간', width: 80},
                        {
                          key: 'owner',
                          label: '담당자',
                          rowSpanKey: 'owner',
                          align: TABLE_ALIGN['CENTER'],
                          cellStyle: () => ({background: 'var(--m2m-pg-comp-bg-subtle)', fontWeight: 700})
                        },
                        {key: 'task', label: '업무'}
                      ]}
                      data={SCHEDULE}
                      rowKey="time"
                    />
                  }
                  code={[
                    "import Table from 'm2m-uiux-react/Table'",
                    '',
                    "const columns = [{ key: 'owner', label: '담당자', rowSpanKey: 'owner' }]",
                    '',
                    'export function Example() {',
                    '  // 데이터를 병합 기준 값 순서로 정렬해서 전달',
                    '  return <Table columns={columns} data={data} rowKey="time" />',
                    '}'
                  ]}
                  notes={['연속된 동일 owner 셀이 rowspan 으로 합쳐집니다']}
                />
                <ComponentSection
                  title="tbody rowspan — 부서별 직원 현황 (그룹 자동 병합)"
                  preview={
                    <Table
                      columns={[
                        {
                          key: 'dept',
                          label: '부서',
                          width: 100,
                          rowSpanKey: 'dept',
                          align: TABLE_ALIGN['CENTER'],
                          cellStyle: () => ({background: 'var(--m2m-pg-comp-bg-subtle)', fontWeight: 700})
                        },
                        {key: 'name', label: '이름'},
                        {key: 'position', label: '직급'}
                      ]}
                      data={STAFF}
                      rowKey="name"
                    />
                  }
                  code={[
                    "import Table from 'm2m-uiux-react/Table'",
                    '',
                    "const columns = [{ key: 'dept', label: '부서', rowSpanKey: 'dept' }]",
                    '',
                    'export function Example() {',
                    '  return <Table columns={columns} data={data} rowKey="name" />',
                    '}'
                  ]}
                  notes={['부서 값이 같은 연속 행이 하나의 셀로 병합됩니다']}
                />
              </>
            )}

            {tab === 'empty' && (
              <ComponentSection
                title="데이터 없음 — 빈 상태"
                preview={<Table columns={COLUMNS} data={[]} emptyText="표시할 데이터가 없습니다." />}
                code={[
                  "import Table from 'm2m-uiux-react/Table'",
                  '',
                  'export function Example() {',
                  '  return <Table columns={columns} data={[]} emptyText="데이터 없음" />',
                  '}'
                ]}
                notes={['emptyContent 로 커스텀 노드 지정 가능']}
              />
            )}

            {tab === 'loading' && (
              <ComponentSection
                title="loading={true} — 로딩 상태"
                preview={<Table columns={COLUMNS} data={DATA.slice(0, 3)} rowKey="id" loading />}
                code={[
                  "import {useState} from 'react'",
                  "import Table from 'm2m-uiux-react/Table'",
                  '',
                  'export function Example() {',
                  '  const [isLoading] = useState(true)',
                  '  return <Table columns={columns} data={data} loading={isLoading} />',
                  '}'
                ]}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={<Table columns={COLUMNS} data={DATA.slice(0, 3)} rowKey="id" classNames="my-table" />}
                code={[
                  "import Table from 'm2m-uiux-react/Table'",
                  '',
                  'export function Example() {',
                  '  return <Table columns={columns} data={data} classNames="my-table" />',
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
