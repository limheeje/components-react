import Badge, {BADGE_SIZE, BADGE_TYPE} from '~/components/Badge'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['type', 'size', 'round', 'dot', 'classNames']

// 데모/코드예시 모두 하드코딩 문자열 대신 export 상수(BADGE_TYPE · BADGE_SIZE) 키로 관리
const SOLID: (keyof typeof BADGE_TYPE)[] = ['PRIMARY', 'SECONDARY', 'SUCCESS', 'WARNING', 'DANGER', 'INFO', 'GHOST']
const LIGHT: (keyof typeof BADGE_TYPE)[] = [
  'PRIMARY_LIGHT',
  'SUCCESS_LIGHT',
  'WARNING_LIGHT',
  'DANGER_LIGHT',
  'INFO_LIGHT'
]
const SIZES: (keyof typeof BADGE_SIZE)[] = ['SM', 'MD', 'LG']
const lightLabel = (t: string) => t.replace('-light', '').toUpperCase()
const sizeLabel = (s: string) => (s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large')

export function BadgePage() {
  return (
    <>
      <PageHeader title="Badge" component="Badge" desc="— 상태 표시 배지 컴포넌트." />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'type' && (
              <>
                {SOLID.map((t) => (
                  <ComponentSection
                    key={t}
                    title={`type="${BADGE_TYPE[t]}"`}
                    preview={<Badge type={BADGE_TYPE[t]}>{BADGE_TYPE[t].toUpperCase()}</Badge>}
                    code={[
                      "import Badge, {BADGE_TYPE} from 'm2m-uiux-react/Badge'",
                      '',
                      'export function Example() {',
                      `  return <Badge type={BADGE_TYPE['${t}']}>${BADGE_TYPE[t].toUpperCase()}</Badge>`,
                      '}'
                    ]}
                  />
                ))}
                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: '1px dashed var(--m2m-pg-comp-border)',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--m2m-pg-comp-text-disabled)'
                  }}
                >
                  Light Variants
                </div>
                {LIGHT.map((t) => (
                  <ComponentSection
                    key={t}
                    title={`type="${BADGE_TYPE[t]}"`}
                    preview={<Badge type={BADGE_TYPE[t]}>{lightLabel(BADGE_TYPE[t])}</Badge>}
                    code={[
                      "import Badge, {BADGE_TYPE} from 'm2m-uiux-react/Badge'",
                      '',
                      'export function Example() {',
                      `  return <Badge type={BADGE_TYPE['${t}']}>${lightLabel(BADGE_TYPE[t])}</Badge>`,
                      '}'
                    ]}
                  />
                ))}
              </>
            )}

            {tab === 'size' &&
              SIZES.map((s) => (
                <ComponentSection
                  key={s}
                  title={`size="${BADGE_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''}`}
                  preview={<Badge size={BADGE_SIZE[s]}>{sizeLabel(BADGE_SIZE[s])}</Badge>}
                  code={[
                    "import Badge, {BADGE_SIZE} from 'm2m-uiux-react/Badge'",
                    '',
                    'export function Example() {',
                    `  return <Badge size={BADGE_SIZE['${s}']}>${sizeLabel(BADGE_SIZE[s])}</Badge>`,
                    '}'
                  ]}
                />
              ))}

            {tab === 'round' && (
              <>
                <ComponentSection
                  title="round={true} — 캡슐형"
                  preview={<Badge round>캡슐 배지</Badge>}
                  code={[
                    "import Badge from 'm2m-uiux-react/Badge'",
                    '',
                    'export function Example() {',
                    '  return <Badge round={true}>캡슐 배지</Badge>',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="round={false} (기본) — 사각형"
                  preview={<Badge round={false}>사각 배지</Badge>}
                  code={[
                    "import Badge from 'm2m-uiux-react/Badge'",
                    '',
                    'export function Example() {',
                    '  return <Badge round={false}>사각 배지</Badge>',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'dot' && (
              <ComponentSection
                title="dot={true} — 색상 점 + 평문"
                preview={
                  <div className="demo-col">
                    <Badge dot type={BADGE_TYPE['SUCCESS']}>
                      온라인
                    </Badge>
                    <Badge dot type={BADGE_TYPE['DANGER']}>
                      오프라인
                    </Badge>
                    <Badge dot type={BADGE_TYPE['WARNING']}>
                      자리 비움
                    </Badge>
                  </div>
                }
                code={[
                  "import Badge, {BADGE_TYPE} from 'm2m-uiux-react/Badge'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  "      <Badge dot type={BADGE_TYPE['SUCCESS']}>온라인</Badge>",
                  "      <Badge dot type={BADGE_TYPE['DANGER']}>오프라인</Badge>",
                  "      <Badge dot type={BADGE_TYPE['WARNING']}>자리 비움</Badge>",
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['dot 이면 채운 배지가 아니라 작은 점 + 텍스트로 표시']}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={<Badge classNames="demo-hint">커스텀</Badge>}
                code={[
                  "import Badge from 'm2m-uiux-react/Badge'",
                  '',
                  'export function Example() {',
                  '  return <Badge classNames="uppercase tracking-wider">커스텀</Badge>',
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
