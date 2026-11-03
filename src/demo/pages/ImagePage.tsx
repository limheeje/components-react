import {useState} from 'react'
import type {CSSProperties, ReactNode} from 'react'

import Image, {IMAGE_LOADING} from '~/components/Image'
import Select from '~/components/Select'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['playground', 'basic', 'fallback', 'skeleton', 'lazy', 'objectFit', '비교', 'props']

const IMGS = {
  mountain: 'https://picsum.photos/id/1015/800/600',
  city: 'https://picsum.photos/id/1016/800/600',
  coffee: 'https://picsum.photos/id/225/800/600',
  cat: 'https://picsum.photos/id/1025/600/600',
  ocean: 'https://picsum.photos/id/1043/800/600',
  food: 'https://picsum.photos/id/292/800/600',
  broken: 'https://this-domain-does-not-exist.invalid/broken.jpg',
  fallback: 'https://picsum.photos/id/1003/400/300'
}

const PG_IMAGES = [
  {label: '산', src: IMGS.mountain},
  {label: '도시', src: IMGS.city},
  {label: '카페', src: IMGS.coffee},
  {label: '고양이', src: IMGS.cat},
  {label: '바다', src: IMGS.ocean},
  {label: '음식', src: IMGS.food}
]

const FITS = ['cover', 'contain', 'fill', 'none', 'scale-down'] as const
type Fit = CSSProperties['objectFit']

const BOX_BG = 'var(--m2m-pg-comp-bg-subtle)'

const CODE_PRE: CSSProperties = {
  flex: 1,
  minWidth: 200,
  margin: 0,
  padding: '14px 16px',
  background: '#14213d',
  borderRadius: 10,
  fontSize: 11,
  lineHeight: 1.7,
  color: '#e6ebf8',
  fontFamily: "'Fira Mono', 'Consolas', monospace",
  whiteSpace: 'pre',
  overflowX: 'auto'
}

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

function Label({children}: {children: ReactNode}) {
  return (
    <p
      style={{
        margin: '0 0 6px',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: 'var(--m2m-pg-comp-text-muted)'
      }}
    >
      {children}
    </p>
  )
}

/* ═══════════════════════ playground ═══════════════════════ */
function PlaygroundDemo() {
  const [imgIdx, setImgIdx] = useState(0)
  const [w, setW] = useState(260)
  const [h, setH] = useState(180)
  const [rounded, setRounded] = useState(12)
  const [fit, setFit] = useState<Fit>('cover')
  const [loading, setLoading] = useState<'lazy' | 'eager'>(IMAGE_LOADING.LAZY)
  const [skeleton, setSkeleton] = useState(true)
  const [fadeIn, setFadeIn] = useState(true)
  const [nonce, setNonce] = useState(0)

  const code = `<Image
  src="..."
  alt="${PG_IMAGES[imgIdx].label}"
  width={${w}}
  height={${h}}
  objectFit="${fit}"
  rounded={${rounded}}
  skeleton={${skeleton}}
  fadeIn={${fadeIn}}
  loading={IMAGE_LOADING['${loading.toUpperCase()}']}
/>`

  const row = (label: string, ctrl: ReactNode) => (
    <label style={{display: 'flex', alignItems: 'center', gap: 10}}>
      <span
        style={{
          width: 76,
          flexShrink: 0,
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--m2m-pg-comp-text-sub)'
        }}
      >
        {label}
      </span>
      {ctrl}
    </label>
  )

  return (
    <div style={{display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start'}}>
        <Image
          key={nonce}
          src={`${PG_IMAGES[imgIdx].src}?_=${nonce}`}
          alt={PG_IMAGES[imgIdx].label}
          width={w}
          height={h}
          objectFit={fit}
          rounded={rounded}
          skeleton={skeleton}
          fadeIn={fadeIn}
          loading={loading}
        />
        <button
          type="button"
          onClick={() => setNonce((n) => n + 1)}
          style={{
            padding: '6px 14px',
            borderRadius: 7,
            fontSize: 11,
            cursor: 'pointer',
            border: '1px solid var(--m2m-pg-comp-border)',
            background: 'var(--m2m-pg-comp-bg)',
            color: 'var(--m2m-pg-comp-text)'
          }}
        >
          ↺ 새로고침 (스켈레톤 재현)
        </button>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 12, minWidth: 240}}>
        {row(
          'src',
          <div style={{flex: 1}}>
            <Select
              size="sm"
              value={String(imgIdx)}
              onChange={(v) => {
                setImgIdx(Number(v))
                setNonce((n) => n + 1)
              }}
              options={PG_IMAGES.map((p, i) => ({label: p.label, value: String(i)}))}
            />
          </div>
        )}
        {row(
          `width ${w}px`,
          <input
            type="range"
            min={100}
            max={400}
            step={10}
            value={w}
            onChange={(e) => setW(+e.target.value)}
            style={{flex: 1, accentColor: 'var(--m2m-pg-brand)'}}
          />
        )}
        {row(
          `height ${h}px`,
          <input
            type="range"
            min={80}
            max={300}
            step={10}
            value={h}
            onChange={(e) => setH(+e.target.value)}
            style={{flex: 1, accentColor: 'var(--m2m-pg-brand)'}}
          />
        )}
        {row(
          `rounded ${rounded}`,
          <input
            type="range"
            min={0}
            max={100}
            step={2}
            value={rounded}
            onChange={(e) => setRounded(+e.target.value)}
            style={{flex: 1, accentColor: 'var(--m2m-pg-brand)'}}
          />
        )}
        {row(
          'objectFit',
          <div style={{flex: 1}}>
            <Select
              size="sm"
              value={fit ?? 'cover'}
              onChange={(v) => setFit(v as Fit)}
              options={FITS.map((f) => ({label: f, value: f}))}
            />
          </div>
        )}
        {row(
          'loading',
          <div style={{flex: 1}}>
            <Select
              size="sm"
              value={loading}
              onChange={(v) => setLoading(v as 'lazy' | 'eager')}
              options={[
                {label: 'lazy', value: IMAGE_LOADING['LAZY']},
                {label: 'eager', value: IMAGE_LOADING['EAGER']}
              ]}
            />
          </div>
        )}
        <div style={{display: 'flex', gap: 14}}>
          <label style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, cursor: 'pointer'}}>
            <input
              type="checkbox"
              checked={skeleton}
              onChange={(e) => setSkeleton(e.target.checked)}
              style={{accentColor: 'var(--m2m-pg-brand)'}}
            />
            skeleton
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, cursor: 'pointer'}}>
            <input
              type="checkbox"
              checked={fadeIn}
              onChange={(e) => setFadeIn(e.target.checked)}
              style={{accentColor: 'var(--m2m-pg-brand)'}}
            />
            fadeIn
          </label>
        </div>
      </div>

      <pre style={CODE_PRE}>{code}</pre>
    </div>
  )
}

/* ═══════════════════════ basic ═══════════════════════ */
function BasicDemo() {
  return (
    <div style={{display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start'}}>
      <div>
        <Label>기본 (cover, rounded=12)</Label>
        <Image src={IMGS.mountain} alt="산 풍경" width={220} height={160} rounded={12} />
      </div>
      <div>
        <Label>rounded=&quot;50%&quot; (원형)</Label>
        <Image src={IMGS.cat} alt="고양이" width={160} height={160} rounded="50%" />
      </div>
      <div>
        <Label>objectFit=&quot;contain&quot;</Label>
        <div
          style={{
            width: 200,
            height: 160,
            background: BOX_BG,
            borderRadius: 12,
            border: '1px solid var(--m2m-pg-comp-border)',
            overflow: 'hidden'
          }}
        >
          <Image src={IMGS.food} alt="음식" width={200} height={160} objectFit="contain" skeleton={false} />
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════ fallback ═══════════════════════ */
function FallbackDemo() {
  const [broken, setBroken] = useState(false)
  const [k, setK] = useState(0)

  return (
    <div style={{display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start'}}>
      <div>
        <Label>fallbackSrc 있음 — 대체 이미지로 교체</Label>
        <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
          <div>
            <p style={{margin: '0 0 6px', fontSize: 11, color: 'var(--m2m-pg-comp-text-muted)'}}>정상 src</p>
            <Image
              key={`ok-${k}`}
              src={broken ? IMGS.broken : IMGS.city}
              alt="도시 건물"
              fallbackSrc={IMGS.fallback}
              width={160}
              height={120}
              rounded={10}
            />
          </div>
          <div style={{display: 'flex', alignItems: 'center', paddingTop: 44}}>
            <ArrowGlyph />
          </div>
          <div>
            <p style={{margin: '0 0 6px', fontSize: 11, color: 'var(--m2m-pg-comp-text-muted)'}}>
              src 깨짐 → fallbackSrc 자동 표시
            </p>
            <Image
              key={`err-${k}`}
              src={IMGS.broken}
              alt="깨진 이미지"
              fallbackSrc={IMGS.fallback}
              width={160}
              height={120}
              rounded={10}
            />
          </div>
        </div>
        <div style={{display: 'flex', gap: 8, marginTop: 12}}>
          <button
            type="button"
            onClick={() => {
              setBroken(true)
              setK((v) => v + 1)
            }}
            style={{
              padding: '7px 14px',
              borderRadius: 7,
              fontSize: 12,
              cursor: 'pointer',
              border: 'none',
              background: 'var(--m2m-pg-error)',
              color: '#fff'
            }}
          >
            🔴 src 깨트리기
          </button>
          <button
            type="button"
            onClick={() => {
              setBroken(false)
              setK((v) => v + 1)
            }}
            style={{
              padding: '7px 14px',
              borderRadius: 7,
              fontSize: 12,
              cursor: 'pointer',
              border: '1px solid var(--m2m-pg-comp-border)',
              background: 'var(--m2m-pg-comp-bg)',
              color: 'var(--m2m-pg-comp-text)'
            }}
          >
            ↺ 초기화
          </button>
        </div>
      </div>

      <div>
        <Label>fallbackSrc 없음 — 오류 플레이스홀더 표시</Label>
        <Image src={IMGS.broken} alt="깨진 이미지" width={200} height={160} rounded={10} />
        <p style={{margin: '8px 0 0', fontSize: 11, color: 'var(--m2m-pg-comp-text-muted)'}}>
          아이콘 + 안내 메시지로 UX 보호
        </p>
      </div>
    </div>
  )
}

function ArrowGlyph() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="var(--m2m-pg-comp-text-muted)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ═══════════════════════ skeleton ═══════════════════════ */
function SkeletonDemo() {
  const [nonce, setNonce] = useState(0)
  const list = [IMGS.mountain, IMGS.city, IMGS.coffee, IMGS.cat, IMGS.ocean, IMGS.food]
  return (
    <div>
      <div style={{display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16}}>
        <button
          type="button"
          onClick={() => setNonce((n) => n + 1)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            background: 'var(--m2m-pg-brand)',
            color: '#fff'
          }}
        >
          ↺ 새로고침 — 스켈레톤 다시 보기
        </button>
        <span style={{fontSize: 11, color: 'var(--m2m-pg-comp-text-muted)'}}>캐시 우회로 로딩 상태를 재현합니다</span>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 600}}>
        {list.map((src, i) => (
          <Image
            key={`${nonce}-${i}`}
            src={`${src}?_=${nonce}-${i}`}
            alt={`이미지 ${i + 1}`}
            width="100%"
            height={120}
            rounded={10}
            skeleton
            fadeIn
          />
        ))}
      </div>

      <div style={{marginTop: 20, display: 'flex', gap: 20}}>
        <div>
          <Label>skeleton=true (기본)</Label>
          <Image
            key={`sk-${nonce}`}
            src={`${IMGS.mountain}?_=${nonce}-a`}
            alt="스켈레톤 O"
            width={180}
            height={120}
            rounded={10}
            skeleton
          />
        </div>
        <div>
          <Label>skeleton=false</Label>
          <Image
            key={`nosk-${nonce}`}
            src={`${IMGS.mountain}?_=${nonce}-b`}
            alt="스켈레톤 X"
            width={180}
            height={120}
            rounded={10}
            skeleton={false}
          />
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════ lazy ═══════════════════════ */
const LAZY_IMGS = [
  {src: IMGS.mountain, alt: '산 풍경'},
  {src: IMGS.city, alt: '도시'},
  {src: IMGS.coffee, alt: '카페'},
  {src: IMGS.cat, alt: '고양이'},
  {src: IMGS.ocean, alt: '바다'},
  {src: IMGS.food, alt: '음식'},
  {src: IMGS.mountain, alt: '산 풍경 2'},
  {src: IMGS.city, alt: '도시 2'}
]

function LazyDemo() {
  return (
    <div>
      <p style={{margin: '0 0 12px', fontSize: 12, color: 'var(--m2m-pg-comp-text-sub)', lineHeight: 1.7}}>
        <Code>loading=&quot;lazy&quot;</Code> 기본 적용. 스크롤해서 뷰포트에 진입할 때 이미지를 로드합니다. DevTools →
        Network 탭에서 확인할 수 있습니다.
      </p>
      <div
        style={{
          height: 320,
          overflowY: 'auto',
          border: '1px solid var(--m2m-pg-comp-border)',
          borderRadius: 12,
          padding: 16,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12
        }}
      >
        {LAZY_IMGS.map((img, i) => (
          <div key={i}>
            <p
              style={{margin: '0 0 4px', fontSize: 10, fontFamily: 'monospace', color: 'var(--m2m-pg-comp-text-muted)'}}
            >
              loading=&quot;lazy&quot; — #{i + 1}
            </p>
            <Image src={img.src} alt={img.alt} width="100%" height={140} rounded={10} loading={IMAGE_LOADING['LAZY']} />
          </div>
        ))}
      </div>
      <p style={{margin: '10px 0 0', fontSize: 11, color: 'var(--m2m-pg-comp-text-muted)'}}>
        ↑ 스크롤하여 하단 이미지 로딩 확인
      </p>
    </div>
  )
}

/* ═══════════════════════ objectFit ═══════════════════════ */
function ObjectFitDemo() {
  const [fit, setFit] = useState<Fit>('cover')
  return (
    <div>
      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16}}>
        {FITS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFit(f)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              cursor: 'pointer',
              border: `1px solid ${fit === f ? 'var(--m2m-pg-brand)' : 'var(--m2m-pg-comp-border)'}`,
              background: fit === f ? 'var(--m2m-pg-brand)' : 'var(--m2m-pg-comp-bg)',
              color: fit === f ? '#fff' : 'var(--m2m-pg-comp-text)'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
        {[
          {src: IMGS.cat, label: '세로 비율 (고양이)'},
          {src: IMGS.mountain, label: '가로 비율 (산)'}
        ].map((it, i) => (
          <div key={i}>
            <p style={{margin: '0 0 6px', fontSize: 11, color: 'var(--m2m-pg-comp-text-muted)'}}>{it.label}</p>
            <div
              style={{
                width: 200,
                height: 160,
                border: '2px dashed var(--m2m-pg-comp-border)',
                borderRadius: 10,
                overflow: 'hidden',
                background: BOX_BG
              }}
            >
              <Image src={it.src} alt="objectFit 예시" width={200} height={160} objectFit={fit} skeleton={false} />
            </div>
          </div>
        ))}
      </div>

      <p style={{margin: '12px 0 0', fontSize: 12, color: 'var(--m2m-pg-comp-text-sub)'}}>
        현재 적용 중: <Code>{`objectFit="${fit}"`}</Code>
      </p>
    </div>
  )
}

/* ═══════════════════════ 비교 ═══════════════════════ */
const COMPARE_ROWS: [string, string, string][] = [
  ['에러 처리', '❌ 엑스박스 그대로 표시', '✅ fallbackSrc 또는 플레이스홀더 자동 표시'],
  ['로딩 UX', '❌ 빈 화면 → 이미지 갑작스레 등장', '✅ Shimmer 스켈레톤 → 페이드인'],
  ['지연 로딩', "⚠️ loading='lazy' 직접 추가 필요", '✅ 기본값으로 적용됨'],
  ['alt 강제', '❌ 빠뜨려도 에러 없음', '✅ TypeScript props 로 필수 지정'],
  ['일관된 스타일', '❌ 프로젝트마다 CSS 반복', '✅ rounded · objectFit 등 props 로 통일'],
  ['상태 관리', '❌ 컴포넌트마다 useState 작성', '✅ 로딩 / 에러 상태 내부 관리']
]

function CompareDemo() {
  return (
    <div style={{overflowX: 'auto', width: '100%'}}>
      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 12}}>
        <thead>
          <tr style={{background: BOX_BG, borderBottom: '2px solid var(--m2m-pg-comp-border)'}}>
            {['기능', '단순 <img>', 'Image 컴포넌트'].map((h, i) => (
              <th
                key={h}
                style={{
                  padding: '10px 14px',
                  textAlign: 'left',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  color: i === 2 ? 'var(--m2m-pg-brand)' : 'var(--m2m-pg-comp-text-sub)'
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map(([feat, img, app], i) => (
            <tr
              key={feat}
              style={{
                borderBottom: '1px solid var(--m2m-pg-comp-border)',
                background: i % 2 === 1 ? BOX_BG : 'transparent'
              }}
            >
              <td style={{padding: '9px 14px', fontWeight: 600, color: 'var(--m2m-pg-comp-text)'}}>{feat}</td>
              <td style={{padding: '9px 14px', color: 'var(--m2m-pg-comp-text-muted)'}}>{img}</td>
              <td style={{padding: '9px 14px', color: 'var(--m2m-pg-comp-text)'}}>{app}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ═══════════════════════ props ═══════════════════════ */
const PROPS: {name: string; type: string; req: boolean; def: string; desc: string}[] = [
  {name: 'src', type: 'string', req: true, def: '—', desc: '이미지 URL'},
  {name: 'alt', type: 'string', req: true, def: '—', desc: '대체 텍스트 (TS 필수 · 장식용은 빈 문자열)'},
  {name: 'fallbackSrc', type: 'string', req: false, def: '—', desc: 'src 실패 시 대체 URL. 없으면 오류 플레이스홀더'},
  {name: 'width', type: 'number | string', req: false, def: "'100%'", desc: '컨테이너 너비'},
  {name: 'height', type: 'number | string', req: false, def: "'auto'", desc: '컨테이너 높이'},
  {name: 'objectFit', type: "CSSProperties['objectFit']", req: false, def: "'cover'", desc: '이미지 크기 조정 방식'},
  {name: 'rounded', type: 'number | string', req: false, def: '0', desc: 'border-radius (숫자 → px)'},
  {name: 'skeleton', type: 'boolean', req: false, def: 'true', desc: '로딩 중 shimmer 스켈레톤'},
  {name: 'fadeIn', type: 'boolean', req: false, def: 'true', desc: '로드 완료 페이드인'},
  {name: 'loading', type: "'lazy' | 'eager'", req: false, def: "'lazy'", desc: '브라우저 로딩 전략'},
  {name: 'imgStyle', type: 'CSSProperties', req: false, def: '—', desc: '내부 <img> 에 직접 스타일'},
  {name: 'style', type: 'CSSProperties', req: false, def: '—', desc: '컨테이너 <div> 스타일'},
  {name: 'classNames', type: 'string | string[]', req: false, def: '—', desc: '추가 클래스'},
  {name: 'onLoad', type: '() => void', req: false, def: '—', desc: '로드 완료 콜백'},
  {name: 'onError', type: '() => void', req: false, def: '—', desc: '로드 실패 콜백 (fallback 없을 때)'}
]

function PropsTable() {
  return (
    <div style={{overflowX: 'auto', width: '100%'}}>
      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 12}}>
        <thead>
          <tr style={{background: BOX_BG, borderBottom: '2px solid var(--m2m-pg-comp-border)'}}>
            {['Prop', 'Type', 'Req', 'Default', '설명'].map((h) => (
              <th
                key={h}
                style={{
                  padding: '10px 14px',
                  textAlign: 'left',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  color: 'var(--m2m-pg-comp-text-sub)'
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PROPS.map((p, i) => (
            <tr
              key={p.name}
              style={{
                borderBottom: '1px solid var(--m2m-pg-comp-border)',
                background: i % 2 === 1 ? BOX_BG : 'transparent'
              }}
            >
              <td style={{padding: '9px 14px'}}>
                <Code>{p.name}</Code>
              </td>
              <td style={{padding: '9px 14px', fontFamily: 'monospace', fontSize: 11, color: 'var(--m2m-pg-info)'}}>
                {p.type}
              </td>
              <td style={{padding: '9px 14px', textAlign: 'center'}}>
                {p.req ? (
                  <span style={{color: 'var(--m2m-pg-brand)', fontWeight: 700}}>✓</span>
                ) : (
                  <span style={{color: 'var(--m2m-pg-comp-text-disabled)'}}>—</span>
                )}
              </td>
              <td style={{padding: '9px 14px', fontFamily: 'monospace', fontSize: 11, color: 'var(--m2m-pg-brand)'}}>
                {p.def}
              </td>
              <td style={{padding: '9px 14px', color: 'var(--m2m-pg-comp-text-sub)', lineHeight: 1.6}}>{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ═══════════════════════ page ═══════════════════════ */
export function ImagePage() {
  return (
    <>
      <PageHeader
        title="Image"
        component="Image"
        desc="— 단순 <img> 를 넘어, Fallback · Skeleton · Fade-in · Lazy loading · alt 강제를 내장한 이미지 컴포넌트."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'playground' && (
              <ComponentSection
                title="인터랙티브 플레이그라운드"
                preview={<PlaygroundDemo />}
                code={[
                  "import Image, {IMAGE_LOADING} from 'm2m-uiux-react/Image'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <Image',
                  '      src="/path/to/image.jpg"',
                  '      alt="설명 텍스트"',
                  '      width={260}',
                  '      height={180}',
                  '      objectFit="cover"',
                  '      rounded={12}',
                  '      skeleton',
                  '      fadeIn',
                  "      loading={IMAGE_LOADING['LAZY']}",
                  '    />',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'basic' && (
              <ComponentSection
                title="기본 사용법"
                preview={<BasicDemo />}
                code={[
                  "import Image from 'm2m-uiux-react/Image'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      <Image src={url} alt="산 풍경" width={220} height={160} rounded={12} />',
                  '      <Image src={url} alt="프로필" width={160} height={160} rounded="50%" />',
                  '      <Image src={url} alt="상품" width={200} height={160} objectFit="contain" />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  'rounded 는 숫자(px) 또는 문자열("50%", "8px 16px") 모두 허용',
                  'width/height 미지정 시 부모 요소 크기에 맞춤'
                ]}
              />
            )}

            {tab === 'fallback' && (
              <ComponentSection
                title="Fallback — 에러 처리"
                description="src 로드 실패 시 fallbackSrc 로 자동 교체. fallbackSrc 도 없으면 아이콘 플레이스홀더 표시."
                preview={<FallbackDemo />}
                code={[
                  "import Image from 'm2m-uiux-react/Image'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      <Image src={url} alt="이미지" fallbackSrc="/images/default.png" />',
                  '      {/* fallbackSrc 없으면 내장 플레이스홀더 */}',
                  '      <Image src={brokenUrl} alt="이미지" />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  'src 실패 → fallbackSrc 시도 → 그것도 실패 → 오류 플레이스홀더',
                  'fallbackSrc 는 로컬 경로 · 외부 URL 모두 허용'
                ]}
              />
            )}

            {tab === 'skeleton' && (
              <ComponentSection
                title="Skeleton — 로딩 상태 UX"
                description="이미지 로드 중 Shimmer 스켈레톤을 표시하고, 완료 시 페이드인 전환합니다."
                preview={<SkeletonDemo />}
                code={[
                  "import Image from 'm2m-uiux-react/Image'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {/* skeleton · fadeIn 둘 다 기본값 true */}',
                  '      <Image src={url} alt="이미지" skeleton fadeIn />',
                  '      <Image src={url} alt="이미지" skeleton={false} fadeIn={false} />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['Shimmer 키프레임은 스타일시트에 1회만 주입 (성능 영향 없음)', 'fadeIn 은 opacity 0 → 1 전환']}
              />
            )}

            {tab === 'lazy' && (
              <ComponentSection
                title="Lazy Loading — 지연 로딩"
                description="loading='lazy' 가 기본값. 뷰포트에 진입할 때 이미지를 로드해 초기 성능을 개선합니다."
                preview={<LazyDemo />}
                code={[
                  "import Image, {IMAGE_LOADING} from 'm2m-uiux-react/Image'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {/* LAZY 가 기본값 */}',
                  '      <Image src={url} alt="이미지" loading={IMAGE_LOADING[\'LAZY\']} />',
                  '      <Image src={url} alt="히어로" loading={IMAGE_LOADING[\'EAGER\']} />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['native lazy loading 활용', "Above the fold 이미지는 IMAGE_LOADING['EAGER'] 권장"]}
              />
            )}

            {tab === 'objectFit' && (
              <ComponentSection
                title="objectFit — 이미지 크기 조정"
                preview={<ObjectFitDemo />}
                code={[
                  "import Image from 'm2m-uiux-react/Image'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {/* cover: 잘라서 채움 (기본) */}',
                  '      <Image src={url} alt="예시" objectFit="cover" />',
                  '      {/* contain: 비율 유지, 여백 생김 */}',
                  '      <Image src={url} alt="예시" objectFit="contain" />',
                  '      {/* fill: 비율 무시, 꽉 채움 */}',
                  '      <Image src={url} alt="예시" objectFit="fill" />',
                  '      {/* none: 원본 크기 그대로 */}',
                  '      <Image src={url} alt="예시" objectFit="none" />',
                  '      {/* scale-down: contain vs none 중 작은 것 */}',
                  '      <Image src={url} alt="예시" objectFit="scale-down" />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['cover — 썸네일 · 카드 · 아바타에 주로 사용']}
              />
            )}

            {tab === '비교' && (
              <ComponentSection
                title="<img> vs Image 비교"
                preview={<CompareDemo />}
                code={[
                  "import Image from 'm2m-uiux-react/Image'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {/* 단순 img */}',
                  '      <img src={url} />',
                  '      {/* Image 컴포넌트 — alt 필수, fallback · skeleton · fadeIn 내장 */}',
                  '      <Image src={url} alt="필수" fallbackSrc="/fallback.png" skeleton fadeIn />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  '규모가 있는 프로젝트일수록 Image 사용 권장',
                  'alt 누락 시 TypeScript 컴파일 에러 (접근성 강제)'
                ]}
              />
            )}

            {tab === 'props' && (
              <ComponentSection
                title="Image Props"
                preview={<PropsTable />}
                code={[
                  'interface ImageProps {',
                  '  src: string;   // 필수',
                  '  alt: string;   // 필수 (접근성)',
                  '  fallbackSrc?: string;',
                  '  width?: number | string;',
                  '  height?: number | string;',
                  "  objectFit?: CSSProperties['objectFit'];",
                  '  rounded?: number | string;',
                  '  skeleton?: boolean;   // 기본 true',
                  '  fadeIn?: boolean;     // 기본 true',
                  "  loading?: 'lazy' | 'eager';   // 기본 'lazy'",
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
