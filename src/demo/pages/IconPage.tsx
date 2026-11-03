import {useState} from 'react'
import type {CSSProperties, ReactNode} from 'react'

import Icon, {ICON_NAME} from '~/components/Icon'
import Select from '~/components/Select'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['gallery', 'playground', 'named', 'color', 'size', 'rotate', 'register', 'props']

/** 친숙한 별칭 → icon-map 키 */
const ENTRIES = Object.entries(ICON_NAME) as [string, string][]
const NAMES = ENTRIES.map(([alias]) => alias)

/** 아이템마다 임의 색을 순환 배정 — 사용자가 color prop 효과를 눈으로 보게 */
const PALETTE = [
  'var(--m2m-pg-brand)',
  '#6366f1',
  'var(--m2m-pg-success)',
  'var(--m2m-pg-warning)',
  'var(--m2m-pg-error)',
  '#06b6d4',
  '#8b5cf6',
  'var(--m2m-pg-comp-text-muted)'
]
const colorAt = (i: number) => PALETTE[i % PALETTE.length]

/** 아이콘을 감싸는 네모 박스 배경 (기준 앱의 #F8F8FA — 우리 토큰의 테마 대응값) */
const BOX_BG = 'var(--m2m-pg-comp-bg-subtle)'

/* ── 인라인 코드 칩 ─────────────────────────────────── */
function Code({children}: {children: ReactNode}) {
  return (
    <code
      style={{
        fontFamily: "'Fira Mono', 'Consolas', monospace",
        fontSize: 12,
        padding: '1px 6px',
        borderRadius: 4,
        background: BOX_BG,
        border: '1px solid var(--m2m-pg-comp-border)',
        color: 'var(--m2m-pg-brand)'
      }}
    >
      {children}
    </code>
  )
}

const CODE_PRE: CSSProperties = {
  margin: 0,
  padding: '12px 14px',
  background: '#14213d',
  borderRadius: 8,
  fontSize: 11,
  lineHeight: 1.7,
  color: '#e6ebf8',
  fontFamily: "'Fira Mono', 'Consolas', monospace",
  whiteSpace: 'pre',
  overflowX: 'auto'
}

/* ═══════════════════════ gallery ═══════════════════════ */
function Gallery() {
  const [copied, setCopied] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const copy = (name: string) => {
    navigator.clipboard?.writeText(`<Icon name="${name}" />`).catch(() => {})
    setCopied(name)
    setTimeout(() => setCopied(null), 1200)
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
        gap: 8,
        width: '100%'
      }}
    >
      {NAMES.map((name) => {
        const on = hover === name
        return (
          <button
            key={name}
            type="button"
            title={`name="${name}" — 클릭하여 복사`}
            onClick={() => copy(name)}
            onMouseEnter={() => setHover(name)}
            onMouseLeave={() => setHover(null)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              padding: '14px 8px 10px',
              border: `1px solid ${on ? 'var(--m2m-pg-brand)' : 'var(--m2m-pg-comp-border)'}`,
              borderRadius: 10,
              background: on ? 'var(--m2m-pg-brand-light)' : 'var(--m2m-pg-comp-bg)',
              cursor: 'pointer',
              transition: 'border-color 0.15s, background 0.15s'
            }}
          >
            <Icon
              name={copied === name ? 'check' : name}
              size={20}
              color={
                copied === name ? 'var(--m2m-pg-success)' : on ? 'var(--m2m-pg-brand)' : 'var(--m2m-pg-comp-text-sub)'
              }
            />
            <code
              style={{
                fontSize: 10,
                wordBreak: 'break-all',
                textAlign: 'center',
                lineHeight: 1.4,
                color: on ? 'var(--m2m-pg-brand)' : 'var(--m2m-pg-comp-text-muted)'
              }}
            >
              {copied === name ? '복사됨!' : name}
            </code>
          </button>
        )
      })}
    </div>
  )
}

/* ═══════════════════════ playground ═══════════════════════ */
const NAME_OPTIONS = NAMES.map((n) => ({label: n, value: n}))

const CTRL_LABEL: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--m2m-pg-comp-text-sub)'
}

function Playground() {
  const [name, setName] = useState('search')
  const [color, setColor] = useState('#023894')
  const [size, setSize] = useState(32)
  const [rotate, setRotate] = useState(0)

  const code = `<Icon\n  name="${name}"\n  color="${color}"\n  size={${size}}\n  rotate={${rotate}}\n/>`

  return (
    <div style={{display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start'}}>
      <div
        style={{
          width: 120,
          height: 120,
          border: '1px solid var(--m2m-pg-comp-border)',
          borderRadius: 12,
          background: BOX_BG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Icon name={name} color={color} size={size} rotate={rotate} />
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 12, minWidth: 220}}>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <span style={CTRL_LABEL}>name</span>
          <Select options={NAME_OPTIONS} value={name} onChange={setName} searchable size="sm" />
        </label>

        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <span style={CTRL_LABEL}>color</span>
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <input
              type="color"
              value={/^#[0-9a-f]{6}$/i.test(color) ? color : '#023894'}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: 32,
                height: 32,
                padding: 0,
                border: '1px solid var(--m2m-pg-comp-border)',
                borderRadius: 6,
                background: 'none',
                cursor: 'pointer'
              }}
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                flex: 1,
                minWidth: 0,
                padding: '6px 10px',
                border: '1px solid var(--m2m-pg-comp-border)',
                borderRadius: 7,
                background: 'var(--m2m-pg-comp-bg)',
                color: 'var(--m2m-pg-comp-text)',
                fontFamily: 'monospace',
                fontSize: 12
              }}
            />
          </div>
        </label>

        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <span style={CTRL_LABEL}>size — {size}px</span>
          <input
            type="range"
            min={12}
            max={64}
            step={2}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{accentColor: 'var(--m2m-pg-brand)', cursor: 'pointer'}}
          />
        </label>

        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <span style={CTRL_LABEL}>rotate — {rotate}°</span>
          <input
            type="range"
            min={-180}
            max={180}
            step={15}
            value={rotate}
            onChange={(e) => setRotate(Number(e.target.value))}
            style={{accentColor: 'var(--m2m-pg-brand)', cursor: 'pointer'}}
          />
        </label>
      </div>

      <pre style={{...CODE_PRE, flex: 1, minWidth: 200, fontSize: 12, borderRadius: 10, padding: '14px 16px'}}>
        {code}
      </pre>
    </div>
  )
}

/* ═══════════════════════ named ═══════════════════════ */
function NamedTable() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 8,
        width: '100%'
      }}
    >
      {ENTRIES.map(([alias, key], i) => (
        <div
          key={alias}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '9px 12px',
            border: '1px solid var(--m2m-pg-comp-border)',
            borderRadius: 8,
            background: 'var(--m2m-pg-comp-bg)'
          }}
        >
          <Icon name={alias} size={20} color={colorAt(i)} />
          <span style={{minWidth: 0}}>
            <span
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--m2m-pg-comp-text)',
                fontFamily: 'monospace'
              }}
            >
              {alias}
            </span>
            <span
              style={{
                display: 'block',
                fontSize: 10,
                color: 'var(--m2m-pg-comp-text-muted)',
                fontFamily: 'monospace',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              → {key}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════ color ═══════════════════════ */
const COLOR_SWATCHES: [string, string][] = [
  ['Brand', '#023894'],
  ['Indigo', '#6366f1'],
  ['Green', '#16a34a'],
  ['Amber', '#f59e0b'],
  ['Red', '#ef4444'],
  ['Cyan', '#06b6d4'],
  ['Gray', '#667089'],
  ['Ink', '#14213d']
]

function ColorDemo() {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 20}}>
      {COLOR_SWATCHES.map(([label, hex]) => (
        <div key={label} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: BOX_BG,
              border: '1px solid var(--m2m-pg-comp-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name="arrow-right" size={22} color={hex} />
          </div>
          <span style={{fontSize: 10, color: 'var(--m2m-pg-comp-text-sub)'}}>{label}</span>
          <code style={{fontSize: 9, fontFamily: 'monospace', color: 'var(--m2m-pg-comp-text-muted)'}}>{hex}</code>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════ size ═══════════════════════ */
function SizeDemo() {
  return (
    <div style={{display: 'flex', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap'}}>
      {[12, 16, 20, 24, 32, 40, 48].map((s) => (
        <div key={s} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
          <Icon name="arrow-right" size={s} color="var(--m2m-pg-brand)" />
          <span style={{fontSize: 10, color: 'var(--m2m-pg-comp-text-sub)'}}>{s}px</span>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════ rotate ═══════════════════════ */
function RotateDemo() {
  return (
    <div>
      <div style={{display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16}}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div key={deg} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: BOX_BG,
                border: '1px solid var(--m2m-pg-comp-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon name="arrow-right" size={20} rotate={deg} color="var(--m2m-pg-brand)" />
            </div>
            <span style={{fontSize: 10, color: 'var(--m2m-pg-comp-text-sub)'}}>{deg}°</span>
          </div>
        ))}
      </div>
      <p style={{fontSize: 12, color: 'var(--m2m-pg-comp-text-sub)', margin: '0 0 8px'}}>
        아이콘 하나(<Code>chevron-right</Code>)로 4방향 화살표 구현:
      </p>
      <div style={{display: 'flex', gap: 4}}>
        {[0, 90, 180, 270].map((d) => (
          <div
            key={d}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--m2m-pg-brand-light)',
              border: '1px solid var(--m2m-pg-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name="chevron-right" size={16} rotate={d} color="var(--m2m-pg-brand)" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════ register ═══════════════════════ */
function Step({
  n,
  tone = 'brand',
  title,
  children
}: {
  n: string
  tone?: 'brand' | 'ok'
  title: ReactNode
  children: ReactNode
}) {
  return (
    <div style={{display: 'flex', gap: 16}}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 800,
          color: '#fff',
          background: tone === 'ok' ? 'var(--m2m-pg-success)' : 'var(--m2m-pg-brand)'
        }}
      >
        {n}
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{fontSize: 13, fontWeight: 700, color: 'var(--m2m-pg-comp-text)', marginBottom: 6}}>{title}</div>
        {children}
      </div>
    </div>
  )
}

function RegisterGuide() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
      <Step
        n="1"
        title={
          <>
            <Code>src/assets/styles/_icons.scss</Code> 의 <Code>icon-map()</Code> 에 SVG 한 줄 추가
          </>
        }
      >
        <p style={{fontSize: 12, color: 'var(--m2m-pg-comp-text-sub)', margin: '0 0 8px', lineHeight: 1.7}}>
          SVG 는 CSS 마스크로만 쓰이므로 <Code>fill</Code>/<Code>stroke</Code> 색은 무의미합니다 (alpha 만 사용).
        </p>
        <pre style={CODE_PRE}>{`// icon-map() 맵에 항목 추가
'icon_star_line':
  '<svg viewBox="0 0 24 24" ...><path d="..."/></svg>',`}</pre>
      </Step>

      <div style={{height: 1, background: 'var(--m2m-pg-comp-border)'}} />

      <Step
        n="2"
        title={
          <>
            SCSS 가 <Code>.i-icon_star_line</Code> 마스크 클래스를 자동 생성
          </>
        }
      >
        <p style={{fontSize: 12, color: 'var(--m2m-pg-comp-text-sub)', margin: '0 0 8px', lineHeight: 1.7}}>
          <Code>Icon.module.scss</Code> 의 <Code>@each $key, $svg in icon-map()</Code> 루프가 모든 키에 대해
          <Code>.i-&lt;key&gt;</Code> 를 생성하므로 별도 작업이 없습니다.
        </p>
        <pre style={CODE_PRE}>{`@each $key, $svg in icon-map() {
  .i-#{$key} {
    @include get-background-svg('#{$key}', currentColor);
  }
}`}</pre>
      </Step>

      <div style={{height: 1, background: 'var(--m2m-pg-comp-border)'}} />

      <Step
        n="3"
        title={
          <>
            (선택) <Code>Icon.constant.ts</Code> 의 <Code>ICON_NAME</Code> 에 친숙한 별칭 추가
          </>
        }
      >
        <pre style={CODE_PRE}>{`export const ICON_NAME = Object.freeze({
  // …
  star: 'icon_star_line',
} as const)`}</pre>
      </Step>

      <div style={{height: 1, background: 'var(--m2m-pg-comp-border)'}} />

      <Step n="✓" tone="ok" title="바로 사용">
        <pre style={CODE_PRE}>{`<Icon name="icon_star_line" />   // 원시 키
<Icon name="star" />             // 별칭 등록 시`}</pre>
      </Step>
    </div>
  )
}

/* ═══════════════════════ props ═══════════════════════ */
const PROPS: [string, string, string, string][] = [
  ['name', 'string', '—', 'ICON_NAME 별칭 또는 icon-map 원시 키'],
  ['color', 'string', "'currentColor'", 'CSS color 값 (마스크 background-color 로 적용)'],
  ['size', 'number | string', '24', 'width = height'],
  ['rotate', 'number', '0', '회전 각도(deg). spin 이 true 면 무시'],
  ['spin', 'boolean', 'false', '무한 회전 애니메이션'],
  ['onClick', 'MouseEventHandler', '—', '있으면 role="button" + cursor:pointer'],
  ['aria-label', 'string', '—', '있으면 role="img", 없으면 aria-hidden'],
  ['classNames', 'string | string[]', '—', '추가 클래스']
]

function PropsTable() {
  return (
    <div style={{overflowX: 'auto', width: '100%'}}>
      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 12}}>
        <thead>
          <tr style={{background: BOX_BG, borderBottom: '2px solid var(--m2m-pg-comp-border)'}}>
            {['Prop', 'Type', 'Default', '설명'].map((h) => (
              <th
                key={h}
                style={{
                  padding: '10px 14px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  fontWeight: 700,
                  color: 'var(--m2m-pg-comp-text-sub)'
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PROPS.map(([n, t, d, desc], i) => (
            <tr
              key={n}
              style={{
                borderBottom: '1px solid var(--m2m-pg-comp-border)',
                background: i % 2 === 1 ? BOX_BG : 'transparent'
              }}
            >
              <td style={{padding: '9px 14px'}}>
                <Code>{n}</Code>
              </td>
              <td style={{padding: '9px 14px', fontFamily: 'monospace', fontSize: 11, color: 'var(--m2m-pg-info)'}}>
                {t}
              </td>
              <td style={{padding: '9px 14px', fontFamily: 'monospace', fontSize: 11, color: 'var(--m2m-pg-brand)'}}>
                {d}
              </td>
              <td style={{padding: '9px 14px', color: 'var(--m2m-pg-comp-text-sub)', lineHeight: 1.6}}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ═══════════════════════ page ═══════════════════════ */
export function IconPage() {
  return (
    <>
      <PageHeader
        title="SvgIcon"
        component="Icon"
        desc="— 빈 <i> + CSS 마스크로 렌더하는 단일 아이콘 컴포넌트. name / color / size / rotate / spin 지원."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'gallery' && (
              <ComponentSection
                title={`아이콘 갤러리 — ${NAMES.length}개 별칭`}
                description={'카드 클릭 시 <Icon name="..." /> 코드 복사'}
                preview={<Gallery />}
                code={[
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      <Icon name="search" />',
                  '      <Icon name="check-circle" />',
                  '      <Icon name="chevron-down" />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  '친숙한 별칭(ICON_NAME) 또는 icon-map 원시 키를 name 으로 전달',
                  '호버 시 브랜드 테두리 + 색상 변경으로 선택 상태 표시'
                ]}
              />
            )}

            {tab === 'playground' && (
              <ComponentSection
                title="인터랙티브 플레이그라운드"
                preview={<Playground />}
                code={[
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'export function Example() {',
                  '  // name, color, size, rotate 를 조합해 실시간 미리보기',
                  '  return <Icon name="search" color="var(--m2m-pg-brand)" size={32} rotate={0} />',
                  '}'
                ]}
                notes={[
                  'color — CSS color 값이면 무엇이든 사용 가능 (hex, rgb, var(--m2m-pg-*) …)',
                  'rotate — 음수 허용. -45 = 왼쪽 위 대각선'
                ]}
              />
            )}

            {tab === 'named' && (
              <ComponentSection
                title="별칭 → icon-map 키 매핑 (ICON_NAME)"
                preview={<NamedTable />}
                code={[
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'export function Example() {',
                  "  // 'close' → 'icon_close', 'chevron-left' → 'icon_arrow_s_before_line' …",
                  '  return (',
                  '    <>',
                  '      <Icon name="close" />',
                  '      {/* 원시 키도 동일하게 동작 */}',
                  '      <Icon name="icon_close" />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['별칭이 없으면 name 을 그대로 icon-map 키로 사용']}
              />
            )}

            {tab === 'color' && (
              <ComponentSection
                title="color — currentColor 를 통한 색상 제어"
                preview={<ColorDemo />}
                code={[
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      <Icon name="arrow-right" color="var(--m2m-pg-brand)" />',
                  '      <Icon name="arrow-right" color="var(--m2m-pg-success)" />',
                  '      <Icon name="arrow-right" color="var(--m2m-pg-error)" />',
                  '      <Icon name="arrow-right" color="#06b6d4" />',
                  '      <Icon name="arrow-right" color="inherit" />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  '마스크 background-color 를 color prop 으로 지정 — SVG 자체 색은 무시',
                  'CSS 변수 · inherit · currentColor 모두 사용 가능'
                ]}
              />
            )}

            {tab === 'size' && (
              <ComponentSection
                title="size — 너비 = 높이 (px)"
                preview={<SizeDemo />}
                code={[
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      <Icon name="arrow-right" size={16} />',
                  '      <Icon name="arrow-right" size={24} />',
                  '      <Icon name="arrow-right" size={48} />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['size 는 숫자(px) 또는 문자열. width = height 정사각 유지']}
              />
            )}

            {tab === 'rotate' && (
              <ComponentSection
                title="rotate — 회전 (deg)"
                preview={<RotateDemo />}
                code={[
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'export function Example() {',
                  '  // arrow 아이콘 하나로 모든 방향 표현',
                  '  return (',
                  '    <>',
                  '      <Icon name="arrow-right" rotate={0} />',
                  '      <Icon name="arrow-right" rotate={90} />',
                  '      <Icon name="arrow-right" rotate={180} />',
                  '      <Icon name="arrow-right" rotate={-45} />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  'CSS transform: rotate() — 상태 변화 시 자연스럽게 트랜지션',
                  '무한 회전이 필요하면 컴포넌트의 spin prop 사용 (<Icon spin />)'
                ]}
              />
            )}

            {tab === 'register' && (
              <ComponentSection
                title="새 아이콘 등록 방법"
                preview={<RegisterGuide />}
                code={[
                  '// 파일 1개(+선택 1개)만 수정',
                  '',
                  '// 1. src/assets/styles/_icons.scss  →  icon-map()',
                  "//    'icon_star_line': '<svg …></svg>',",
                  '',
                  '// 2. (선택) src/components/Icon/Icon.constant.ts  →  ICON_NAME',
                  "//    star: 'icon_star_line',"
                ]}
                notes={[
                  'React SVG 컴포넌트를 만들지 않는다 — 전부 icon-map + CSS 마스크',
                  'Icon 컴포넌트 본체는 수정 불필요'
                ]}
              />
            )}

            {tab === 'props' && (
              <ComponentSection
                title="Icon Props"
                preview={<PropsTable />}
                code={[
                  'interface IconProps {',
                  '  name: string;',
                  "  color?: string;   // 'currentColor'",
                  '  size?: number | string;   // 24',
                  '  rotate?: number;  // 0',
                  '  spin?: boolean;',
                  '  onClick?: MouseEventHandler<HTMLElement>;',
                  '  classNames?: string | string[];',
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
