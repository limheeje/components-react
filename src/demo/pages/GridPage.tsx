import {useState} from 'react'

import Grid, {GRID_ALIGN} from '~/components/Grid'
import type {GridAlign} from '~/components/Grid'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['columns', 'gap', 'justifyItems', 'alignItems', 'cellAlign']

type JA = GridAlign
// 하드코딩 문자열 대신 export 상수(GRID_ALIGN) 사용
const JA_OPTS: JA[] = [GRID_ALIGN.START, GRID_ALIGN.CENTER, GRID_ALIGN.END, GRID_ALIGN.STRETCH]
const COLORS = ['#FF5A00', '#6366F1', '#059669', '#F59E0B', '#EC4899', '#3B82F6']
const ALPHA = 'ABCDEF'

/* ── 공통 UI 헬퍼 ─────────────────────────────────────── */
function AlignBtn({label, active, onClick}: {label: string; active: boolean; onClick: () => void}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '4px 10px',
        fontSize: 11,
        borderRadius: 5,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontWeight: active ? 700 : 400,
        border: `1px solid ${active ? 'var(--m2m-pg-brand)' : 'var(--m2m-pg-comp-border)'}`,
        background: active ? 'var(--m2m-pg-brand)' : 'var(--m2m-pg-comp-bg)',
        color: active ? '#fff' : 'var(--m2m-pg-comp-text-sub)',
        transition: 'all 0.12s'
      }}
    >
      {label}
    </button>
  )
}

function AlignRow({label, value, onChange}: {label: string; value: JA; onChange: (v: JA) => void}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap'}}>
      <code style={{fontSize: 12, color: 'var(--m2m-pg-comp-text-muted)', minWidth: 112}}>{label}</code>
      <div style={{display: 'flex', gap: 4, flexWrap: 'wrap'}}>
        {JA_OPTS.map((o) => (
          <AlignBtn key={o} label={o} active={value === o} onClick={() => onChange(o)} />
        ))}
      </div>
    </div>
  )
}

/** 시각화 셀 — 점선이 셀 경계, 색상 박스가 아이템. flex 로 정렬을 명확히 표시 */
function VisCell({idx, hAlign, vAlign, label}: {idx: number; hAlign: JA; vAlign: JA; label?: string}) {
  const c = COLORS[idx % COLORS.length]
  const jc = hAlign === 'end' ? 'flex-end' : hAlign === 'center' ? 'center' : 'flex-start'
  const ai = vAlign === 'end' ? 'flex-end' : vAlign === 'center' ? 'center' : 'flex-start'
  return (
    <div
      style={{
        background: 'var(--m2m-pg-comp-bg)',
        border: '1px dashed var(--m2m-pg-comp-border)',
        borderRadius: 6,
        height: 90,
        display: 'flex',
        justifyContent: jc,
        alignItems: ai,
        padding: 4,
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          background: `${c}1E`,
          border: `1.5px solid ${c}66`,
          borderRadius: 5,
          padding: '6px 12px',
          fontSize: 12,
          fontWeight: 700,
          color: c,
          boxSizing: 'border-box',
          width: hAlign === 'stretch' ? 'calc(100% - 8px)' : undefined,
          height: vAlign === 'stretch' ? 'calc(100% - 8px)' : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.25s ease'
        }}
      >
        {label ?? ALPHA[idx]}
      </div>
    </div>
  )
}

function MiniAlignPicker({axis, value, onChange}: {axis: 'H' | 'V'; value: JA; onChange: (v: JA) => void}) {
  const short: Record<JA, string> = {start: 'S', center: 'C', end: 'E', stretch: 'St'}
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
      <span style={{fontSize: 9, fontWeight: 700, color: 'var(--m2m-pg-comp-text-disabled)'}}>{axis}</span>
      {JA_OPTS.map((o) => (
        <button
          key={o}
          type="button"
          title={o}
          onClick={() => onChange(o)}
          style={{
            padding: '2px 5px',
            fontSize: 9,
            borderRadius: 3,
            cursor: 'pointer',
            lineHeight: 1.4,
            fontWeight: value === o ? 700 : 400,
            border: `1px solid ${value === o ? 'var(--m2m-pg-brand)' : 'var(--m2m-pg-comp-border)'}`,
            background: value === o ? 'var(--m2m-pg-brand)' : 'var(--m2m-pg-comp-bg)',
            color: value === o ? '#fff' : 'var(--m2m-pg-comp-text-muted)'
          }}
        >
          {short[o]}
        </button>
      ))}
    </div>
  )
}

/* ── columns ──────────────────────────────────────────── */
function ColumnsDemo() {
  const EXAMPLES: {cols: number | string; label: string; desc: string}[] = [
    {cols: 3, label: 'repeat(3, 1fr)', desc: '균등 3열'},
    {cols: '1fr 2fr 1fr', label: '1fr 2fr 1fr', desc: '1:2:1 비율 3열'},
    {cols: '200px 1fr', label: '200px 1fr', desc: '고정 + 유동'},
    {
      cols: 'repeat(auto-fill, minmax(120px, 1fr))',
      label: 'repeat(auto-fill, minmax(120px, 1fr))',
      desc: '반응형 자동 열'
    }
  ]
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
      {EXAMPLES.map(({cols, label, desc}) => (
        <div key={label} style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
            <code
              style={{
                fontSize: 11,
                color: 'var(--m2m-pg-brand)',
                background: 'var(--m2m-pg-comp-bg-hover)',
                padding: '2px 8px',
                borderRadius: 4
              }}
            >
              {label}
            </code>
            <span style={{fontSize: 12, color: 'var(--m2m-pg-comp-text-muted)'}}>{desc}</span>
          </div>
          <Grid
            columns={cols}
            gap="1px"
            style={{
              background: 'var(--m2m-pg-comp-border)',
              border: '1px solid var(--m2m-pg-comp-border)',
              borderRadius: 8,
              overflow: 'hidden'
            }}
          >
            {Array.from({length: 4}, (_, i) => (
              <div
                key={i}
                style={{
                  background: `${COLORS[i]}18`,
                  padding: '12px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                  color: COLORS[i],
                  textAlign: 'center'
                }}
              >
                {ALPHA[i]}
              </div>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  )
}

/* ── gap ──────────────────────────────────────────────── */
function GapDemo() {
  const [gap, setGap] = useState(12)
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <span style={{fontSize: 12, color: 'var(--m2m-pg-comp-text-muted)', minWidth: 40}}>gap</span>
        <input
          type="range"
          min={0}
          max={32}
          value={gap}
          onChange={(e) => setGap(+e.target.value)}
          style={{flex: 1, accentColor: 'var(--m2m-pg-brand)'}}
        />
        <code style={{fontSize: 12, color: 'var(--m2m-pg-brand)', minWidth: 36}}>{gap}px</code>
      </div>
      <Grid
        columns={3}
        gap={gap}
        style={{
          border: '1px solid var(--m2m-pg-comp-border)',
          borderRadius: 8,
          background: 'var(--m2m-pg-comp-bg-subtle)',
          padding: gap > 0 ? gap / 2 : 0
        }}
      >
        {Array.from({length: 6}, (_, i) => (
          <div
            key={i}
            style={{
              background: `${COLORS[i]}22`,
              border: `1.5px solid ${COLORS[i]}55`,
              borderRadius: 6,
              padding: '14px 8px',
              fontSize: 12,
              fontWeight: 700,
              color: COLORS[i],
              textAlign: 'center',
              transition: 'all 0.15s'
            }}
          >
            {ALPHA[i]}
          </div>
        ))}
      </Grid>
    </div>
  )
}

/* ── justifyItems / alignItems ────────────────────────── */
function AxisDemo({axis}: {axis: 'justifyItems' | 'alignItems'}) {
  const [v, setV] = useState<JA>(GRID_ALIGN.STRETCH)
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <AlignRow label={axis} value={v} onChange={setV} />
      <Grid
        columns={3}
        gap="1px"
        style={{
          background: 'var(--m2m-pg-comp-border)',
          border: '1px solid var(--m2m-pg-comp-border)',
          borderRadius: 8,
          overflow: 'hidden'
        }}
      >
        {Array.from({length: 6}, (_, i) => (
          <VisCell
            key={i}
            idx={i}
            hAlign={axis === 'justifyItems' ? v : GRID_ALIGN['STRETCH']}
            vAlign={axis === 'alignItems' ? v : GRID_ALIGN['STRETCH']}
          />
        ))}
      </Grid>
      <p style={{fontSize: 12, color: 'var(--m2m-pg-comp-text-muted)', margin: 0}}>
        현재 모든 셀:{' '}
        <code>
          {axis === 'justifyItems' ? 'justifySelf' : 'alignSelf'}: &quot;{v}&quot;
        </code>{' '}
        — 점선 테두리가 셀 경계, 색상 박스가 아이템입니다.
      </p>
    </div>
  )
}

/* ── cellAlign ────────────────────────────────────────── */
const INIT_CELL: {h: JA; v: JA}[] = [
  {h: GRID_ALIGN.START, v: GRID_ALIGN.START},
  {h: GRID_ALIGN.CENTER, v: GRID_ALIGN.CENTER},
  {h: GRID_ALIGN.END, v: GRID_ALIGN.END},
  {h: GRID_ALIGN.STRETCH, v: GRID_ALIGN.START},
  {h: GRID_ALIGN.CENTER, v: GRID_ALIGN.END},
  {h: GRID_ALIGN.END, v: GRID_ALIGN.STRETCH}
]

function CellAlignDemo() {
  const [cells, setCells] = useState(INIT_CELL)
  const update = (idx: number, k: 'h' | 'v', val: JA) =>
    setCells((prev) => prev.map((c, i) => (i === idx ? {...c, [k]: val} : c)))

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
      <p style={{fontSize: 12, color: 'var(--m2m-pg-comp-text-muted)', margin: 0}}>
        각 셀마다 H(가로) · V(세로) 정렬을 독립적으로 설정합니다. S=start, C=center, E=end, St=stretch
      </p>
      <Grid columns={3} gap={8}>
        {cells.map((cell, i) => (
          <div key={i} style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            <VisCell idx={i} hAlign={cell.h} vAlign={cell.v} />
            <div
              style={{
                background: 'var(--m2m-pg-comp-bg-subtle)',
                border: '1px solid var(--m2m-pg-comp-border)',
                borderRadius: 6,
                padding: '6px 8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              <MiniAlignPicker axis="H" value={cell.h} onChange={(x) => update(i, 'h', x)} />
              <MiniAlignPicker axis="V" value={cell.v} onChange={(x) => update(i, 'v', x)} />
            </div>
            <code style={{fontSize: 10, color: 'var(--m2m-pg-comp-text-disabled)', textAlign: 'center'}}>
              {cell.h} / {cell.v}
            </code>
          </div>
        ))}
      </Grid>
    </div>
  )
}

/* ── page ─────────────────────────────────────────────── */
export function GridPage() {
  return (
    <>
      <PageHeader
        title="Grid"
        component="Grid"
        desc="— CSS Grid 레이아웃 래퍼. 열 구성·간격·정렬을 조합해 복잡한 격자 구조를 구현합니다. Grid.Item 으로 셀 병합/개별 정렬."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'columns' && (
              <ComponentSection
                title="columns — 열 구성"
                preview={<ColumnsDemo />}
                code={[
                  "import Grid from 'm2m-uiux-react/Grid'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {/* 균등 3열 */}',
                  '      <Grid columns={3}><div>A</div><div>B</div><div>C</div></Grid>',
                  '      {/* 1:2:1 비율 */}',
                  '      <Grid columns="1fr 2fr 1fr"><div>A</div><div>B</div><div>C</div></Grid>',
                  '      {/* 고정 + 유동 */}',
                  '      <Grid columns="200px 1fr"><div>A</div><div>B</div></Grid>',
                  '      {/* 반응형 자동 열 */}',
                  '      <Grid columns="repeat(auto-fill, minmax(120px, 1fr))"><div>A</div><div>B</div></Grid>',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  '숫자 → repeat(n, minmax(0, 1fr)) · 문자열 → grid-template-columns 그대로',
                  'auto-fill + minmax — 컨테이너 너비에 따라 열 수가 자동 조절'
                ]}
              />
            )}

            {tab === 'gap' && (
              <ComponentSection
                title="gap — 셀 간격 (슬라이더로 조절)"
                preview={<GapDemo />}
                code={[
                  "import Grid from 'm2m-uiux-react/Grid'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {/* 행·열 동일 */}',
                  '      <Grid columns={3} gap={12}><div>A</div><div>B</div><div>C</div></Grid>',
                  '      {/* 행·열 개별 */}',
                  '      <Grid columns={3} rowGap={16} columnGap={8}><div>A</div><div>B</div><div>C</div></Grid>',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['gap 은 rowGap + columnGap 단축 속성', "gap='16px 8px' — 행 16px, 열 8px"]}
              />
            )}

            {tab === 'justifyItems' && (
              <ComponentSection
                title="justifyItems — 전체 셀 가로 정렬"
                description="그리드 컨테이너에 적용. 모든 셀의 콘텐츠를 수평 방향으로 일괄 정렬합니다."
                preview={<AxisDemo axis="justifyItems" />}
                code={[
                  "import Grid, {GRID_ALIGN} from 'm2m-uiux-react/Grid'",
                  '',
                  'export function Example() {',
                  '  return (',
                  "    <Grid columns={3} justifyItems={GRID_ALIGN['CENTER']}>",
                  '      <div>A</div>',
                  '      <div>B</div>',
                  '      <div>C</div>',
                  '    </Grid>',
                  '  )',
                  '}'
                ]}
                notes={[
                  'stretch (기본값) — 아이템이 셀 전체 너비를 채웁니다',
                  'start / center / end — 아이템이 자연 너비로 축소되어 정렬됩니다',
                  '개별 셀 오버라이드: Grid.Item 의 justifySelf 사용 (cellAlign 탭 참고)'
                ]}
              />
            )}

            {tab === 'alignItems' && (
              <ComponentSection
                title="alignItems — 전체 셀 세로 정렬"
                description="그리드 컨테이너에 적용. 모든 셀의 콘텐츠를 수직 방향으로 일괄 정렬합니다."
                preview={<AxisDemo axis="alignItems" />}
                code={[
                  "import Grid, {GRID_ALIGN} from 'm2m-uiux-react/Grid'",
                  '',
                  'export function Example() {',
                  '  return (',
                  "    <Grid columns={3} autoRows={90} alignItems={GRID_ALIGN['CENTER']}>",
                  '      <div>A</div>',
                  '      <div>B</div>',
                  '    </Grid>',
                  '  )',
                  '}'
                ]}
                notes={[
                  '수직 정렬이 보이려면 셀 높이(autoRows)가 콘텐츠보다 커야 합니다',
                  'stretch (기본값) — 아이템이 셀 전체 높이를 채웁니다'
                ]}
              />
            )}

            {tab === 'cellAlign' && (
              <ComponentSection
                title="Grid.Item — justifySelf + alignSelf 셀 개별 정렬"
                description="각 Grid.Item 에 직접 적용. 컨테이너의 justifyItems/alignItems 를 셀 단위로 오버라이드합니다."
                preview={<CellAlignDemo />}
                code={[
                  "import Grid, {GRID_ALIGN} from 'm2m-uiux-react/Grid'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <Grid columns={3}>',
                  '      {/* 가로: 시작, 세로: 끝 */}',
                  "      <Grid.Item justifySelf={GRID_ALIGN['START']} alignSelf={GRID_ALIGN['END']}>A</Grid.Item>",
                  '      {/* 가로·세로 모두 중앙 */}',
                  "      <Grid.Item justifySelf={GRID_ALIGN['CENTER']} alignSelf={GRID_ALIGN['CENTER']}>B</Grid.Item>",
                  '      {/* 기본값 유지 (stretch) */}',
                  '      <Grid.Item>C</Grid.Item>',
                  '    </Grid>',
                  '  )',
                  '}'
                ]}
                notes={[
                  'justifySelf — 해당 셀만 가로 정렬을 오버라이드',
                  'alignSelf — 해당 셀만 세로 정렬을 오버라이드',
                  '컨테이너의 justifyItems/alignItems 보다 우선 적용됩니다',
                  'H=가로(justify), V=세로(align) / S=start C=center E=end St=stretch'
                ]}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
