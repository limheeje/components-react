import {useState} from 'react'

import Button, {BUTTON_SIZE} from '~/components/Button'
import Loading, {LOADING_COLOR, LOADING_SIZE, LOADING_TYPE} from '~/components/Loading'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['type', 'size', 'color', 'text', 'overlay']

const dark = {background: '#374151', padding: '20px 24px', borderRadius: 10}

function OverlayDemo() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="demo-col">
      <div
        style={{
          position: 'relative',
          width: 300,
          minHeight: 140,
          padding: 20,
          border: '1px solid var(--m2m-pg-comp-border)',
          borderRadius: 12,
          background: 'var(--m2m-pg-comp-bg-subtle)',
          color: 'var(--m2m-pg-comp-text-sub)',
          fontSize: 13,
          lineHeight: 1.8
        }}
      >
        콘텐츠 영역입니다. 버튼을 누르면 2.5초간 로딩 오버레이가 덮습니다.
        {loading && <Loading overlay text="데이터를 불러오는 중…" />}
      </div>
      <Button
        size={BUTTON_SIZE['SM']}
        disabled={loading}
        onClick={() => {
          setLoading(true)
          setTimeout(() => setLoading(false), 2500)
        }}
      >
        {loading ? '로딩 중…' : '▶ 로딩 시작 (2.5s)'}
      </Button>
    </div>
  )
}

export function LoadingPage() {
  return (
    <>
      <PageHeader
        title="Loading"
        component="Loading"
        desc="— 데이터 처리 중 시각적 피드백을 제공합니다. Spinner·Dots·Skeleton 세 가지 타입과 Overlay 모드를 지원합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'type' && (
              <>
                <ComponentSection
                  title='type="spinner" — 회전 스피너'
                  preview={<Loading type={LOADING_TYPE['SPINNER']} />}
                  code={[
                    "import Loading, {LOADING_TYPE} from 'm2m-uiux-react/Loading'",
                    '',
                    'export function Example() {',
                    "  return <Loading type={LOADING_TYPE['SPINNER']} />",
                    '}'
                  ]}
                  notes={['가장 범용적인 로딩 표시']}
                />
                <ComponentSection
                  title='type="dots" — 점 세 개 바운스'
                  preview={<Loading type={LOADING_TYPE['DOTS']} />}
                  code={[
                    "import Loading, {LOADING_TYPE} from 'm2m-uiux-react/Loading'",
                    '',
                    'export function Example() {',
                    "  return <Loading type={LOADING_TYPE['DOTS']} />",
                    '}'
                  ]}
                  notes={['버튼 내부나 인라인 로딩에 적합']}
                />
                <ComponentSection
                  title='type="skeleton" — 스켈레톤 UI'
                  preview={<Loading type={LOADING_TYPE['SKELETON']} />}
                  code={[
                    "import Loading, {LOADING_TYPE} from 'm2m-uiux-react/Loading'",
                    '',
                    'export function Example() {',
                    "  return <Loading type={LOADING_TYPE['SKELETON']} />",
                    '}'
                  ]}
                  notes={['콘텐츠 레이아웃을 미리 보여주는 형태', 'shimmer 애니메이션 포함 (color prop 무시)']}
                />
              </>
            )}

            {tab === 'size' &&
              (['SM', 'MD', 'LG'] as const).map((s) => (
                <ComponentSection
                  key={s}
                  title={`size="${LOADING_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''}`}
                  preview={
                    <div className="demo-row" style={{gap: 32, alignItems: 'flex-start', flexWrap: 'wrap'}}>
                      <Loading type={LOADING_TYPE['SPINNER']} size={LOADING_SIZE[s]} />
                      <Loading type={LOADING_TYPE['DOTS']} size={LOADING_SIZE[s]} />
                      <Loading type={LOADING_TYPE['SKELETON']} size={LOADING_SIZE[s]} />
                    </div>
                  }
                  code={[
                    "import Loading, {LOADING_TYPE, LOADING_SIZE} from 'm2m-uiux-react/Loading'",
                    '',
                    'export function Example() {',
                    `  return <Loading type={LOADING_TYPE['SPINNER']} size={LOADING_SIZE['${s}']} />`,
                    '}'
                  ]}
                />
              ))}

            {tab === 'color' && (
              <>
                <ComponentSection
                  title='color="primary" (기본)'
                  preview={
                    <div className="demo-row" style={{gap: 32, alignItems: 'center'}}>
                      <Loading color={LOADING_COLOR['PRIMARY']} />
                      <Loading type={LOADING_TYPE['DOTS']} color={LOADING_COLOR['PRIMARY']} />
                    </div>
                  }
                  code={[
                    "import Loading, {LOADING_COLOR} from 'm2m-uiux-react/Loading'",
                    '',
                    'export function Example() {',
                    "  return <Loading color={LOADING_COLOR['PRIMARY']} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='color="neutral" — 회색'
                  preview={
                    <div className="demo-row" style={{gap: 32, alignItems: 'center'}}>
                      <Loading color={LOADING_COLOR['NEUTRAL']} />
                      <Loading type={LOADING_TYPE['DOTS']} color={LOADING_COLOR['NEUTRAL']} />
                    </div>
                  }
                  code={[
                    "import Loading, {LOADING_COLOR} from 'm2m-uiux-react/Loading'",
                    '',
                    'export function Example() {',
                    "  return <Loading color={LOADING_COLOR['NEUTRAL']} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='color="white" — 흰색 (어두운 배경용)'
                  preview={
                    <div className="demo-row" style={{gap: 32, alignItems: 'center', ...dark}}>
                      <Loading color={LOADING_COLOR['WHITE']} />
                      <Loading type={LOADING_TYPE['DOTS']} color={LOADING_COLOR['WHITE']} />
                    </div>
                  }
                  code={[
                    "import Loading, {LOADING_COLOR} from 'm2m-uiux-react/Loading'",
                    '',
                    'export function Example() {',
                    "  return <Loading color={LOADING_COLOR['WHITE']} />",
                    '}'
                  ]}
                  notes={['어두운 배경 위에서 overlay 와 함께 사용합니다']}
                />
              </>
            )}

            {tab === 'text' && (
              <>
                <ComponentSection
                  title="text — 안내 문구"
                  preview={<Loading text="데이터를 불러오는 중입니다…" />}
                  code={[
                    "import Loading, {LOADING_TYPE} from 'm2m-uiux-react/Loading'",
                    '',
                    'export function Example() {',
                    '  return <Loading type={LOADING_TYPE[\'SPINNER\']} text="데이터를 불러오는 중입니다..." />',
                    '}'
                  ]}
                  notes={['스피너 하단에 안내 문구가 표시됩니다']}
                />
                <ComponentSection
                  title="Dots + text"
                  preview={<Loading type={LOADING_TYPE['DOTS']} text="잠시만 기다려주세요" />}
                  code={[
                    "import Loading, {LOADING_TYPE} from 'm2m-uiux-react/Loading'",
                    '',
                    'export function Example() {',
                    '  return <Loading type={LOADING_TYPE[\'DOTS\']} text="잠시만 기다려주세요" />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'overlay' && (
              <ComponentSection
                title="overlay={true} — 컨테이너 딤 처리 (버튼 클릭)"
                preview={<OverlayDemo />}
                code={[
                  "import {useState} from 'react'",
                  "import Loading from 'm2m-uiux-react/Loading'",
                  '',
                  'export function Example() {',
                  '  const [isLoading] = useState(false)',
                  '  return (',
                  "    <div style={{ position: 'relative' }}>",
                  '      <ContentArea />',
                  '      {isLoading && <Loading overlay text="데이터를 불러오는 중..." />}',
                  '    </div>',
                  '  )',
                  '}'
                ]}
                notes={['부모 요소에 position: relative 필수', '전체 페이지 딤 처리 시 body 에 직접 적용']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
