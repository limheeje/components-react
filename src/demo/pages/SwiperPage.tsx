import Swiper, {SWIPER_PAGINATION} from '~/components/Swiper'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['items', 'autoplay', 'loop', 'navigation', 'pagination', 'slidesPerView', 'spaceBetween']

const COLORS = [
  ['#FFF5F0', '#FF5A00'],
  ['#EFF6FF', '#3B82F6'],
  ['#F0FDF4', '#22C55E'],
  ['#FEF9C3', '#F59E0B'],
  ['#FDF4FF', '#A855F7']
]

function Slide({i, h = 180}: {i: number; h?: number}) {
  const [bg, accent] = COLORS[i % COLORS.length]
  return (
    <div
      style={{
        height: h,
        background: bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6
      }}
    >
      <div style={{fontSize: 24, fontWeight: 800, color: accent}}>Slide {i + 1}</div>
      <div style={{fontSize: 12, color: `${accent}99`}}>{['첫', '두', '세', '네', '다섯'][i % 5]} 번째 슬라이드</div>
    </div>
  )
}

const S5 = Array.from({length: 5}, (_, i) => <Slide key={i} i={i} />)
const S5sm = Array.from({length: 5}, (_, i) => <Slide key={i} i={i} h={130} />)

export function SwiperPage() {
  return (
    <>
      <PageHeader
        title="Swiper / Carousel"
        component="Swiper"
        desc="— 이미지 배너·카드 등을 좌우 슬라이드로 넘기는 컴포넌트. 자동재생·무한루프·다중 슬라이드를 지원합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'items' && (
              <ComponentSection
                title="items (또는 children) — 슬라이드 배열"
                preview={<Swiper items={S5} />}
                code={[
                  "import Swiper from 'm2m-uiux-react/Swiper'",
                  '',
                  'export function Example() {',
                  '  const slides = [<img src="/a.jpg" />, <img src="/b.jpg" />]',
                  '  return (',
                  '    <>',
                  '      {/* items prop 으로 ReactNode 배열 전달 */}',
                  '      <Swiper items={slides} />',
                  '      {/* 또는 children 으로 전달 */}',
                  '      <Swiper><img src="/a.jpg" /><img src="/b.jpg" /></Swiper>',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['children 또는 items prop 모두 허용', '각 슬라이드는 임의의 ReactNode']}
              />
            )}

            {tab === 'autoplay' && (
              <>
                <ComponentSection
                  title="autoplay={true} — 기본 2800ms 자동 재생"
                  preview={<Swiper items={S5} autoplay loop />}
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} autoplay loop />',
                    '}'
                  ]}
                  notes={['loop 없이 쓰면 마지막 슬라이드에서 자동 정지']}
                />
                <ComponentSection
                  title="autoplay={1500} — ms 단위로 속도 지정"
                  preview={<Swiper items={S5} autoplay={1500} loop />}
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} autoplay={1500} loop />',
                    '}'
                  ]}
                  notes={['숫자를 전달하면 해당 ms 간격으로 넘어갑니다']}
                />
              </>
            )}

            {tab === 'loop' && (
              <>
                <ComponentSection
                  title="loop={true} — 무한 반복"
                  preview={<Swiper items={S5} loop autoplay={2500} />}
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} loop autoplay />',
                    '}'
                  ]}
                  notes={['마지막 슬라이드 → 다음 → 첫 번째로 돌아갑니다']}
                />
                <ComponentSection
                  title="loop={false} (기본) — 끝에서 정지"
                  preview={<Swiper items={S5} />}
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} />',
                    '}'
                  ]}
                  notes={['양 끝 화살표가 비활성화됩니다']}
                />
              </>
            )}

            {tab === 'navigation' && (
              <>
                <ComponentSection
                  title="navigation={true} (기본) — 화살표 버튼"
                  preview={<Swiper items={S5} navigation />}
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} navigation />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="navigation={false} — 화살표 숨김"
                  preview={<Swiper items={S5} navigation={false} pagination={SWIPER_PAGINATION['BULLETS']} />}
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} navigation={false} />',
                    '}'
                  ]}
                  notes={['터치·드래그 전용 환경에서 사용']}
                />
              </>
            )}

            {tab === 'pagination' && (
              <>
                {(['BULLETS', 'FRACTION', 'PROGRESSBAR'] as const).map((p) => (
                  <ComponentSection
                    key={p}
                    title={`pagination="${SWIPER_PAGINATION[p]}"${p === 'BULLETS' ? ' (기본)' : ''}`}
                    preview={<Swiper items={S5} pagination={SWIPER_PAGINATION[p]} navigation={false} />}
                    code={[
                      "import Swiper, {SWIPER_PAGINATION} from 'm2m-uiux-react/Swiper'",
                      '',
                      'export function Example() {',
                      `  return <Swiper items={slides} pagination={SWIPER_PAGINATION['${p}']} />`,
                      '}'
                    ]}
                    notes={p === 'BULLETS' ? ['현재 슬라이드 점이 브랜드색으로 늘어납니다'] : undefined}
                  />
                ))}
                <ComponentSection
                  title="pagination={false} — 숨김"
                  preview={<Swiper items={S5} pagination={false} />}
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} pagination={false} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'slidesPerView' && (
              <>
                <ComponentSection
                  title="slidesPerView={1} (기본)"
                  preview={<Swiper items={S5} slidesPerView={1} />}
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} slidesPerView={1} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="slidesPerView={2} — 2개씩 노출"
                  preview={<Swiper items={S5sm} slidesPerView={2} spaceBetween={12} />}
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} slidesPerView={2} spaceBetween={12} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="slidesPerView={3} — 3개씩 노출"
                  preview={
                    <Swiper
                      items={S5sm}
                      slidesPerView={3}
                      spaceBetween={10}
                      pagination={SWIPER_PAGINATION['FRACTION']}
                    />
                  }
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} slidesPerView={3} spaceBetween={10} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="slidesPerView={1.3} — 다음 슬라이드 살짝 노출"
                  preview={<Swiper items={S5sm} slidesPerView={1.3} spaceBetween={12} />}
                  code={[
                    "import Swiper from 'm2m-uiux-react/Swiper'",
                    '',
                    'export function Example() {',
                    '  return <Swiper items={slides} slidesPerView={1.3} spaceBetween={12} />',
                    '}'
                  ]}
                  notes={['소수값을 넣으면 다음 슬라이드가 살짝 걸쳐 보입니다']}
                />
              </>
            )}

            {tab === 'spaceBetween' && (
              <>
                {[0, 16, 24].map((g) => (
                  <ComponentSection
                    key={g}
                    title={`spaceBetween={${g}}`}
                    preview={<Swiper items={S5sm} slidesPerView={2} spaceBetween={g} />}
                    code={[`<Swiper items={slides} slidesPerView={2} spaceBetween={${g}} />`]}
                    notes={g === 24 ? ['슬라이드 사이의 간격(px)을 지정합니다'] : undefined}
                  />
                ))}
              </>
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
