import {useEffect, useRef, useState} from 'react'
import type {CSSProperties, ReactNode} from 'react'

import {Button} from '~/components/Button'
import {ProgressBar} from '~/components/ProgressBar'

import {PageHeader} from '~/demo/components/PageHeader'

/** 클릭 복사 배지 */
function Copy({value}: {value: string}) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      title="클릭하여 복사"
      onClick={() => {
        navigator.clipboard?.writeText(value).catch(() => {})
        setDone(true)
        setTimeout(() => setDone(false), 1200)
      }}
      style={{
        fontFamily: "'Fira Mono', 'Consolas', monospace",
        fontSize: 11,
        padding: '2px 7px',
        borderRadius: 5,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        border: `1px solid ${done ? 'var(--m2m-pg-success-border)' : 'var(--m2m-pg-brand-border)'}`,
        background: done ? 'var(--m2m-pg-success-bg)' : 'var(--m2m-pg-brand-light)',
        color: done ? 'var(--m2m-pg-success)' : 'var(--m2m-pg-brand)'
      }}
    >
      {done ? '✓ 복사됨' : value}
    </button>
  )
}

/** CSS 변수의 현재 계산값(hex/rgb) 을 읽어온다. data-theme·시스템 테마 변경에 반응. */
function useResolvedColor(cssVar: string) {
  const [value, setValue] = useState('')
  useEffect(() => {
    const read = () => setValue(getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim())
    read()
    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']})
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', read)
    return () => {
      mo.disconnect()
      mq.removeEventListener('change', read)
    }
  }, [cssVar])
  return value
}

/** hex → 밝은 색이면 true (텍스트 대비 계산용) */
function isLightColor(color: string) {
  let r: number
  let g: number
  let b: number
  const hex = color.trim().replace('#', '')
  if (/^[\da-f]{3}$/i.test(hex)) {
    ;[r, g, b] = [...hex].map((h) => parseInt(h + h, 16))
  } else if (/^[\da-f]{6}$/i.test(hex)) {
    ;[r, g, b] = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((h) => parseInt(h, 16))
  } else {
    const rgb = color.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/)
    if (!rgb) return false
    ;[r, g, b] = [rgb[1], rgb[2], rgb[3]].map(Number)
  }
  return (r * 299 + g * 587 + b * 114) / 1000 > 160
}

function Swatch({cssVar}: {cssVar: string}) {
  const resolved = useResolvedColor(cssVar)
  const light = isLightColor(resolved)
  return (
    <div
      style={{
        border: '1px solid var(--m2m-pg-comp-border)',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--m2m-pg-comp-bg)'
      }}
    >
      <div
        style={{
          height: 52,
          background: `var(${cssVar})`,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '4px 8px'
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 10,
            fontWeight: 600,
            color: light ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.6)'
          }}
        >
          {resolved || '—'}
        </span>
      </div>
      <div style={{padding: '7px 8px'}}>
        <Copy value={cssVar} />
      </div>
    </div>
  )
}

function PaletteSwatch({name, hex, usage}: {name: string; hex: string; usage?: string}) {
  const light = isLightColor(hex)
  return (
    <div
      style={{
        border: '1px solid var(--m2m-pg-comp-border)',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--m2m-pg-comp-bg)'
      }}
    >
      <div
        style={{
          height: 52,
          background: hex,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '4px 8px'
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 10,
            fontWeight: 600,
            color: light ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.6)'
          }}
        >
          {hex}
        </span>
      </div>
      <div style={{padding: '7px 8px'}}>
        <div style={{fontSize: 11, fontWeight: 700, color: 'var(--m2m-pg-comp-text)', marginBottom: 2}}>{name}</div>
        {usage && <div style={{fontSize: 10, lineHeight: 1.4, color: 'var(--m2m-pg-comp-text-muted)'}}>{usage}</div>}
      </div>
    </div>
  )
}

/** 원시 색상 파레트 — 시맨틱 토큰(--m2m-pg-*)의 근간이 되는 스케일 (문서용). */
const PALETTE: {group: string; desc: string; colors: {name: string; hex: string; usage: string}[]}[] = [
  {
    group: 'Blue (브랜드)',
    desc: '딥 네이비 #023894 를 500 으로 하는 브랜드 스케일',
    colors: [
      {name: 'blue-50', hex: '#eef3fb', usage: '연한 배경 · hover 영역 (brand-light)'},
      {name: 'blue-100', hex: '#d9e4f5', usage: '선택 영역 배경 (brand-sub)'},
      {name: 'blue-200', hex: '#a8c0e6', usage: '테두리 · 비활성 (brand-border)'},
      {name: 'blue-300', hex: '#6f9bd6', usage: '보조 강조'},
      {name: 'blue-400', hex: '#2f66b8', usage: 'hover 근처'},
      {name: 'blue-500', hex: '#023894', usage: 'Primary 기본 (brand)'},
      {name: 'blue-600', hex: '#012f7a', usage: 'hover (brand-hover 계열)'},
      {name: 'blue-700', hex: '#01285f', usage: 'active / pressed (brand-active)'},
      {name: 'blue-800', hex: '#001d47', usage: '강한 강조'},
      {name: 'blue-900', hex: '#00132f', usage: '텍스트용 극강조'}
    ]
  },
  {
    group: 'Gray (중립)',
    desc: '텍스트 · 배경 · 경계선용 중립 스케일',
    colors: [
      {name: 'gray-0', hex: '#ffffff', usage: '카드 · 흰 배경'},
      {name: 'gray-50', hex: '#f6f8fb', usage: '페이지 배경 (bg-page)'},
      {name: 'gray-100', hex: '#eef1f6', usage: '비활성 영역 · 헤더 (bg-subtle)'},
      {name: 'gray-200', hex: '#dde2ec', usage: '경계선 기본 (border)'},
      {name: 'gray-300', hex: '#c3cbdb', usage: '경계선 진한 (border-sub)'},
      {name: 'gray-400', hex: '#99a2ba', usage: 'placeholder (text-placeholder)'},
      {name: 'gray-500', hex: '#667089', usage: '보조 텍스트 · 아이콘 (text-muted)'},
      {name: 'gray-600', hex: '#414a63', usage: '일반 텍스트 (text-sub)'},
      {name: 'gray-700', hex: '#2c3550', usage: '강조 텍스트'},
      {name: 'gray-800', hex: '#14213d', usage: '헤딩 (text-primary)'},
      {name: 'gray-900', hex: '#0b1226', usage: '최강조'}
    ]
  },
  {
    group: 'Status',
    desc: '성공 · 경고 · 오류 · 정보',
    colors: [
      {name: 'success-500', hex: '#16a34a', usage: '성공 기본'},
      {name: 'success-700', hex: '#15803d', usage: '성공 진한 (-dark)'},
      {name: 'warning-500', hex: '#f59e0b', usage: '경고 기본'},
      {name: 'warning-700', hex: '#d97706', usage: '경고 진한 (-dark)'},
      {name: 'error-500', hex: '#ef4444', usage: '오류 기본'},
      {name: 'error-700', hex: '#dc2626', usage: '오류 진한 (-dark)'},
      {name: 'info-500', hex: '#008cd6', usage: '정보 기본'},
      {name: 'info-700', hex: '#0272ab', usage: '정보 진한 (-dark)'}
    ]
  }
]

function Section({title, desc, children}: {title: string; desc?: string; children: ReactNode}) {
  return (
    <section style={{marginTop: 40}}>
      <div
        style={{
          borderBottom: '1px solid var(--m2m-pg-border)',
          paddingBottom: 10,
          marginBottom: 20
        }}
      >
        <h3 style={{margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--m2m-pg-text-primary)'}}>{title}</h3>
        {desc && (
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 12,
              lineHeight: 1.6,
              color: 'var(--m2m-pg-text-muted)'
            }}
          >
            {desc}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}

const COLOR_GROUPS: {group: string; vars: string[]}[] = [
  {
    group: 'Brand',
    vars: [
      '--m2m-pg-brand',
      '--m2m-pg-brand-hover',
      '--m2m-pg-brand-active',
      '--m2m-pg-brand-light',
      '--m2m-pg-brand-border'
    ]
  },
  {
    group: 'Surface',
    vars: ['--m2m-pg-comp-bg', '--m2m-pg-comp-bg-subtle', '--m2m-pg-comp-bg-hover', '--m2m-pg-comp-bg-disabled']
  },
  {
    group: 'Border',
    vars: ['--m2m-pg-comp-border', '--m2m-pg-comp-border-sub']
  },
  {
    group: 'Text',
    vars: ['--m2m-pg-comp-text', '--m2m-pg-comp-text-sub', '--m2m-pg-comp-text-muted', '--m2m-pg-comp-text-disabled']
  },
  {
    group: 'Status',
    vars: ['--m2m-pg-success', '--m2m-pg-warning', '--m2m-pg-error', '--m2m-pg-info']
  }
]

const TYPO: [string, string][] = [
  ['Title1/Bold', '22 / 30 · 700'],
  ['Title2/Bold', '18 / 26 · 700'],
  ['Title3/Semibold', '16 / 24 · 600'],
  ['Head/Semibold', '14 / 20 · 600'],
  ['Body/Regular', '13 / 19 · 400'],
  ['Sub/Regular', '12 / 17 · 400'],
  ['Caption/Regular', '11 / 15 · 400'],
  ['Micro/Bold', '10 / 14 · 700']
]

const SCALE = [1, 2, 4, 6, 8, 12, 16, 24, 32, 48]

const BASE_FONT_SIZE = 16
const remPx = (fontSize: number, px: number) => (fontSize / 16) * px

const MIN_FONT_SIZE = 12
const MAX_FONT_SIZE = 22

export function TokenPage() {
  const [fontSize, setFontSize] = useState(BASE_FONT_SIZE)
  const trackRef = useRef<HTMLDivElement>(null)

  const scalePct = ((fontSize - MIN_FONT_SIZE) / (MAX_FONT_SIZE - MIN_FONT_SIZE)) * 100
  const delta = Math.round((fontSize / 16) * 100)

  const setFromClientX = (clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    setFontSize(Math.round(MIN_FONT_SIZE + ratio * (MAX_FONT_SIZE - MIN_FONT_SIZE)))
  }

  return (
    <>
      <PageHeader
        title="Token"
        component="--m2m-*"
        desc="— 프로젝트 전체가 공유하는 디자인 토큰. 컴포넌트는 --m2m-pg-* CSS 변수만 참조하고, 크기는 rem()·typo() 로 --m2m-font-size 에 비례 스케일됩니다."
      />

      <div className="demo-token">
        <Section
          title="--m2m-font-size — 스케일 기준"
          desc="이 값을 바꾸면 rem() 으로 감싼 모든 치수(폰트·패딩·테두리·반경)가 같은 비율로 커지고 줄어듭니다."
        >
          {/* ProgressBar 를 슬라이더로 — 클릭/드래그로 --m2m-font-size 조절 */}
          <div style={{display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8}}>
            <div
              ref={trackRef}
              role="slider"
              tabIndex={0}
              aria-label="--m2m-font-size"
              aria-valuemin={MIN_FONT_SIZE}
              aria-valuemax={MAX_FONT_SIZE}
              aria-valuenow={fontSize}
              aria-valuetext={`${fontSize}px`}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId)
                setFromClientX(e.clientX)
              }}
              onPointerMove={(e) => {
                if (e.buttons === 1) setFromClientX(e.clientX)
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setFontSize((v) => Math.max(MIN_FONT_SIZE, v - 1))
                if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setFontSize((v) => Math.min(MAX_FONT_SIZE, v + 1))
              }}
              style={{width: 280, maxWidth: '100%', cursor: 'pointer', touchAction: 'none'}}
            >
              <ProgressBar value={scalePct} color="primary" thickness="md" />
            </div>
            <Copy value={`--m2m-font-size: ${fontSize}px`} />
            {fontSize !== BASE_FONT_SIZE && (
              <button
                type="button"
                onClick={() => setFontSize(BASE_FONT_SIZE)}
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  border: '1px solid var(--m2m-pg-comp-border)',
                  background: 'transparent',
                  color: 'var(--m2m-pg-comp-text-muted)'
                }}
              >
                16px 리셋
              </button>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 280,
              maxWidth: '100%',
              fontSize: 10,
              fontFamily: 'monospace',
              color: 'var(--m2m-pg-comp-text-muted)',
              marginBottom: 20
            }}
          >
            <span>{MIN_FONT_SIZE}px</span>
            <span>16px (기준) · {delta}%</span>
            <span>{MAX_FONT_SIZE}px</span>
          </div>

          {/* 아래 bsButton 하나 — --m2m-font-size 를 바꾸면 이 버튼이 비례해서 커진다 */}
          <div style={{'--m2m-font-size': `${fontSize}px`} as CSSProperties}>
            <Button variant="primary">rem() 로 스케일되는 버튼 · 현재 {fontSize}px</Button>
          </div>
          <p style={{margin: '10px 0 0', fontSize: 11, color: 'var(--m2m-pg-comp-text-muted)'}}>
            이 버튼은 스타일을 하드코딩하지 않고 <code>rem()</code> · <code>typo()</code> 만 쓰기 때문에, 위 슬라이더로{' '}
            <code>--m2m-font-size</code> 를 조절하면 폰트·패딩·높이·반경이 그대로 {delta}% 로 스케일됩니다 (
            <code>rem(16px) = {remPx(fontSize, 16).toFixed(1)}px</code>).
          </p>
        </Section>

        <Section
          title="Palette — 원시 색상"
          desc="시맨틱 토큰의 근간이 되는 색상 스케일. 컴포넌트는 직접 쓰지 않고 아래 --m2m-pg-* 를 통해 참조합니다."
        >
          {PALETTE.map((g) => (
            <div key={g.group} style={{marginBottom: 20}}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--m2m-pg-comp-text-sub)',
                  marginBottom: 8
                }}
              >
                {g.group}
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 10,
                    fontWeight: 400,
                    textTransform: 'none',
                    letterSpacing: 0,
                    color: 'var(--m2m-pg-comp-text-muted)'
                  }}
                >
                  {g.desc}
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: 8
                }}
              >
                {g.colors.map((c) => (
                  <PaletteSwatch key={c.name} name={c.name} hex={c.hex} usage={c.usage} />
                ))}
              </div>
            </div>
          ))}
        </Section>

        <Section title="Color Tokens — 시맨틱" desc="컴포넌트는 이 --m2m-pg-* 변수만 사용합니다.">
          {COLOR_GROUPS.map((g) => (
            <div key={g.group} style={{marginBottom: 20}}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--m2m-pg-comp-text-sub)',
                  marginBottom: 8
                }}
              >
                {g.group}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                  gap: 8
                }}
              >
                {g.vars.map((v) => (
                  <Swatch key={v} cssVar={v} />
                ))}
              </div>
            </div>
          ))}
          <p style={{fontSize: 11, color: 'var(--m2m-pg-comp-text-muted)'}}>
            status 계열은 <code>-bg</code> / <code>-border</code> / <code>-dark</code> 변형도 있습니다 (예:{' '}
            <code>--m2m-pg-error-bg</code>).
          </p>
        </Section>

        <Section
          title="Typography — @include typo('Scale/Weight')"
          desc="_theme.scss $typo-map. 폰트는 하드코딩하지 않고 이 믹스인으로."
        >
          <div
            style={{
              border: '1px solid var(--m2m-pg-comp-border)',
              borderRadius: 10,
              overflow: 'hidden'
            }}
          >
            {TYPO.map(([name, meta], i) => (
              <div
                key={name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 120px 1fr',
                  alignItems: 'center',
                  padding: '10px 14px',
                  borderTop: i === 0 ? 'none' : '1px solid var(--m2m-pg-comp-border)'
                }}
              >
                <Copy value={name} />
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    color: 'var(--m2m-pg-comp-text-muted)'
                  }}
                >
                  {meta}
                </span>
                <span
                  style={{
                    fontSize: Number(meta.split(' / ')[0]),
                    fontWeight: Number(meta.split('·')[1]),
                    color: 'var(--m2m-pg-comp-text)'
                  }}
                >
                  다람쥐 헌 쳇바퀴에 타고파 Aa Bb 123
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Spacing / Radius — rem($px)"
          desc="모든 px 는 rem() 으로 감쌉니다. calc(var(--m2m-font-size, 16px) / 16 * N)"
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            {SCALE.map((n) => (
              <div key={n} style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <Copy value={`rem(${n}px)`} />
                <div
                  style={{
                    height: 10,
                    width: n * 4,
                    background: 'var(--m2m-pg-brand)',
                    opacity: 0.7,
                    borderRadius: 3
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--m2m-pg-comp-text-muted)',
                    fontFamily: 'monospace'
                  }}
                >
                  {n}px @16
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
