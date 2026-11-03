import Chart, {CHART_PALETTE, CHART_SERIES_TYPE, CHART_TYPE} from '~/components/Chart'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['line', 'bar', 'area', 'pie', 'composed', 'radar', 'scatter', 'color', 'responsive']

/** 각 preview 코드 블록 상단에 함께 노출할 data 형태 스니펫 */
const D_MONTHLY = [
  'const data = [',
  "  { month: '1월', 방문자: 4200, 전환: 320, 매출: 1800 },",
  "  { month: '2월', 방문자: 3800, 전환: 290, 매출: 1540 },",
  '  // …',
  ']',
  ''
]
const D_CATEGORY = [
  'const data = [',
  "  { category: '의류', 금액: 3800 },",
  "  { category: '전자', 금액: 5200 },",
  '  // …',
  ']',
  ''
]
const D_WEEKLY = [
  'const data = [',
  "  { day: 'Mon', A팀: 82, B팀: 74 },",
  "  { day: 'Tue', A팀: 91, B팀: 68 },",
  '  // …',
  ']',
  ''
]
const D_SOURCE = [
  'const data = [',
  "  { name: '검색', value: 38 },",
  "  { name: 'SNS', value: 27 },",
  '  // …',
  ']',
  ''
]
const D_RADAR = [
  'const data = [',
  "  { subject: '기획', A팀: 88, B팀: 72 },",
  "  { subject: '디자인', A팀: 92, B팀: 85 },",
  '  // …',
  ']',
  ''
]
const D_SCATTER = ['const data = [{ x: 42, y: 71 }, { x: 18, y: 25 }, /* … */]', '']

const monthly = [
  {month: '1월', 방문자: 4200, 전환: 320, 매출: 1800},
  {month: '2월', 방문자: 3800, 전환: 290, 매출: 1540},
  {month: '3월', 방문자: 5100, 전환: 410, 매출: 2210},
  {month: '4월', 방문자: 4700, 전환: 375, 매출: 1980},
  {month: '5월', 방문자: 6300, 전환: 520, 매출: 2750},
  {month: '6월', 방문자: 5800, 전환: 470, 매출: 2490}
]

const category = [
  {category: '의류', 금액: 3800},
  {category: '전자', 금액: 5200},
  {category: '식품', 금액: 2900},
  {category: '가구', 금액: 1800},
  {category: '도서', 금액: 960},
  {category: '스포츠', 금액: 2400}
]

const weekly = [
  {day: 'Mon', A팀: 82, B팀: 74},
  {day: 'Tue', A팀: 91, B팀: 68},
  {day: 'Wed', A팀: 78, B팀: 85},
  {day: 'Thu', A팀: 95, B팀: 79},
  {day: 'Fri', A팀: 88, B팀: 92}
]

const source = [
  {name: '검색', value: 38},
  {name: 'SNS', value: 27},
  {name: '직접', value: 18},
  {name: '이메일', value: 11},
  {name: '기타', value: 6}
]

const radar = [
  {subject: '기획', A팀: 88, B팀: 72},
  {subject: '디자인', A팀: 92, B팀: 85},
  {subject: '개발', A팀: 76, B팀: 94},
  {subject: 'QA', A팀: 84, B팀: 78},
  {subject: '배포', A팀: 70, B팀: 88},
  {subject: '문서화', A팀: 95, B팀: 65}
]

const scatter = Array.from({length: 24}, () => ({
  x: Math.round(20 + Math.random() * 80),
  y: Math.round(10 + Math.random() * 90)
}))

export function ChartPage() {
  return (
    <>
      <PageHeader
        title="Chart / Graph"
        component="recharts"
        desc="— Line · Bar · Area · Pie · Donut · Composed · Radar · Scatter 차트. recharts 기반, ResponsiveContainer 로 반응형 지원."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'line' && (
              <>
                <ComponentSection
                  title="Line — 기본 단일 라인"
                  preview={<Chart type={CHART_TYPE['LINE']} data={monthly} xKey="month" series={['방문자']} />}
                  code={[
                    ...D_MONTHLY,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return <Chart type={CHART_TYPE[\'LINE\']} data={data} xKey="month" series={["방문자"]} />',
                    '}'
                  ]}
                  notes={[
                    'data: 평평한 객체 배열 (Record<string, unknown>[]) — 객체 1개 = x축 위의 한 지점',
                    'xKey: 가로축 라벨로 쓸 키 / series: y값으로 그릴 키 (나머지 키는 무시)'
                  ]}
                />
                <ComponentSection
                  title="Line — 멀티 라인 + 점선"
                  preview={
                    <Chart
                      type={CHART_TYPE['LINE']}
                      data={monthly}
                      xKey="month"
                      series={[{key: '방문자'}, {key: '매출', dashed: true}]}
                    />
                  }
                  code={[
                    ...D_MONTHLY,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Chart type={CHART_TYPE[\'LINE\']} data={data} xKey="month"',
                    "      series={[{ key: '방문자' }, { key: '매출', dashed: true }]} />",
                    '  )',
                    '}'
                  ]}
                  notes={[
                    'series 원소는 문자열 또는 { key, label?, color?, type?, dashed? }',
                    'series[].dashed: true → 점선'
                  ]}
                />
                <ComponentSection
                  title="Line — referenceLines 기준선"
                  preview={
                    <Chart
                      type={CHART_TYPE['LINE']}
                      data={monthly}
                      xKey="month"
                      series={['방문자']}
                      referenceLines={[{value: 5000, label: '목표 5,000', color: 'var(--m2m-pg-error)'}]}
                    />
                  }
                  code={[
                    ...D_MONTHLY,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Chart type={CHART_TYPE[\'LINE\']} data={data} xKey="month" series={["방문자"]}',
                    "      referenceLines={[{ value: 5000, label: '목표 5,000' }]} />",
                    '  )',
                    '}'
                  ]}
                  notes={['y축 기준선 (목표선·임계값 등) — line/bar/area 지원']}
                />
              </>
            )}

            {tab === 'bar' && (
              <>
                <ComponentSection
                  title="Bar — 수직 (기본)"
                  preview={<Chart type={CHART_TYPE['BAR']} data={category} xKey="category" series={['금액']} />}
                  code={[
                    ...D_CATEGORY,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return <Chart type={CHART_TYPE[\'BAR\']} data={data} xKey="category" series={["금액"]} />',
                    '}'
                  ]}
                  notes={['line 과 동일한 data 형태 — 카테고리 키 + 값 키']}
                />
                <ComponentSection
                  title={'Bar — 수평 (layout="vertical")'}
                  preview={
                    <Chart
                      type={CHART_TYPE['BAR']}
                      data={category}
                      xKey="category"
                      series={['금액']}
                      layout="vertical"
                    />
                  }
                  code={[
                    ...D_CATEGORY,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Chart type={CHART_TYPE[\'BAR\']} data={data} xKey="category" series={["금액"]} layout="vertical" />',
                    '  )',
                    '}'
                  ]}
                  notes={['카테고리가 많거나 라벨이 길 때 가독성이 좋습니다']}
                />
                <ComponentSection
                  title="Bar — 그룹형 (Grouped)"
                  preview={<Chart type={CHART_TYPE['BAR']} data={weekly} xKey="day" series={['A팀', 'B팀']} />}
                  code={[
                    ...D_WEEKLY,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return <Chart type={CHART_TYPE[\'BAR\']} data={data} xKey="day" series={["A팀", "B팀"]} />',
                    '}'
                  ]}
                  notes={['series 를 2개 이상 넣으면 그룹형 막대 (같은 x 에 나란히)']}
                />
                <ComponentSection
                  title="Bar — 누적형 (Stacked)"
                  preview={<Chart type={CHART_TYPE['BAR']} data={weekly} xKey="day" series={['A팀', 'B팀']} stacked />}
                  code={[
                    ...D_WEEKLY,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return <Chart type={CHART_TYPE[\'BAR\']} data={data} xKey="day" series={["A팀", "B팀"]} stacked />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'area' && (
              <>
                <ComponentSection
                  title="Area — 그라디언트 채우기"
                  preview={<Chart type={CHART_TYPE['AREA']} data={monthly} xKey="month" series={['방문자']} />}
                  code={[
                    ...D_MONTHLY,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return <Chart type={CHART_TYPE[\'AREA\']} data={data} xKey="month" series={["방문자"]} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="Area — 누적 스택 (stackId 공유)"
                  preview={
                    <Chart type={CHART_TYPE['AREA']} data={monthly} xKey="month" series={['방문자', '매출']} stacked />
                  }
                  code={[
                    ...D_MONTHLY,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Chart type={CHART_TYPE[\'AREA\']} data={data} xKey="month" series={["방문자", "매출"]} stacked />',
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'pie' && (
              <>
                <ComponentSection
                  title="Pie — 원형 (레이블 내부 퍼센트)"
                  preview={<Chart type={CHART_TYPE['PIE']} data={source} xKey="name" series={['value']} height={240} />}
                  code={[
                    ...D_SOURCE,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return <Chart type={CHART_TYPE[\'PIE\']} data={data} xKey="name" series={["value"]} />',
                    '}'
                  ]}
                  notes={['pie/donut: 객체 1개 = 조각 1개', 'xKey = 조각 이름, series 는 값 키 딱 1개']}
                />
                <ComponentSection
                  title="Pie — 도넛 (innerRadius + paddingAngle)"
                  preview={
                    <Chart type={CHART_TYPE['DONUT']} data={source} xKey="name" series={['value']} height={240} />
                  }
                  code={[
                    ...D_SOURCE,
                    "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                    '',
                    'export function Example() {',
                    '  return <Chart type={CHART_TYPE[\'DONUT\']} data={data} xKey="name" series={["value"]} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'composed' && (
              <ComponentSection
                title="Composed — Bar + Line + Area 혼합"
                preview={
                  <Chart
                    data={monthly}
                    xKey="month"
                    series={[
                      {key: '방문자', type: CHART_SERIES_TYPE['BAR']},
                      {key: '매출', type: CHART_SERIES_TYPE['AREA']},
                      {key: '전환', type: CHART_SERIES_TYPE['LINE']}
                    ]}
                  />
                }
                code={[
                  ...D_MONTHLY,
                  "import Chart, {CHART_SERIES_TYPE} from 'm2m-uiux-react/Chart'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <Chart data={data} xKey="month"',
                  '      series={[',
                  "        { key: '방문자', type: CHART_SERIES_TYPE['BAR'] },",
                  "        { key: '매출', type: CHART_SERIES_TYPE['AREA'] },",
                  "        { key: '전환', type: CHART_SERIES_TYPE['LINE'] },",
                  '      ]} />',
                  '  )',
                  '}'
                ]}
                notes={['series[i].type 으로 Bar/Line/Area 를 자유 조합']}
              />
            )}

            {tab === 'radar' && (
              <ComponentSection
                title="Radar — 방사형 (다중 지표 비교)"
                preview={
                  <Chart type={CHART_TYPE['RADAR']} data={radar} xKey="subject" series={['A팀', 'B팀']} height={300} />
                }
                code={[
                  ...D_RADAR,
                  "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <Chart type={CHART_TYPE[\'RADAR\']} data={data} xKey="subject"',
                  '      series={["A팀", "B팀"]} />',
                  '  )',
                  '}'
                ]}
                notes={['각 data 행 = 축(꼭짓점) 하나, 각 series = 폴리곤 하나']}
              />
            )}

            {tab === 'scatter' && (
              <ComponentSection
                title="Scatter — 분포 (2축 상관관계)"
                preview={<Chart type={CHART_TYPE['SCATTER']} data={scatter} xKey="x" series={['y']} height={280} />}
                code={[
                  ...D_SCATTER,
                  "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                  '',
                  'export function Example() {',
                  '  return <Chart type={CHART_TYPE[\'SCATTER\']} data={data} xKey="x" series={["y"]} />',
                  '}'
                ]}
                notes={['객체 1개 = 점 1개', 'xKey = x 좌표 키, series 는 y 좌표 키 1개']}
              />
            )}

            {tab === 'color' && (
              <ComponentSection
                title="컬러 팔레트 & Cell 개별 색상 적용"
                preview={
                  <div className="demo-col">
                    <div className="demo-row" style={{gap: 8, flexWrap: 'wrap'}}>
                      {CHART_PALETTE.map((c) => (
                        <div key={c} style={{textAlign: 'center'}}>
                          <div
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 8,
                              background: c
                            }}
                          />
                          <code style={{fontSize: 9}}>{c}</code>
                        </div>
                      ))}
                    </div>
                    <Chart
                      type={CHART_TYPE['BAR']}
                      data={category}
                      xKey="category"
                      series={['금액']}
                      colors={['#8B5CF6']}
                    />
                  </div>
                }
                code={[
                  ...D_CATEGORY,
                  "import Chart, {CHART_TYPE, CHART_PALETTE} from 'm2m-uiux-react/Chart'",
                  '',
                  '// CHART_PALETTE: 기본 8색 팔레트. colors prop 으로 교체',
                  'export function Example() {',
                  '  return (',
                  '    // series[i].color 로 개별 지정도 가능',
                  '    <Chart',
                  "      type={CHART_TYPE['BAR']}",
                  '      data={data}',
                  '      xKey="category"',
                  '      series={["금액"]}',
                  '      colors={["#8B5CF6", "#06B6D4"]}',
                  '    />',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'responsive' && (
              <ComponentSection
                title="ResponsiveContainer — 반응형 자동 리사이즈"
                preview={
                  <div style={{maxWidth: 380}}>
                    <Chart type={CHART_TYPE['AREA']} data={monthly} xKey="month" series={['방문자']} height={200} />
                  </div>
                }
                code={[
                  ...D_MONTHLY,
                  "import Chart, {CHART_TYPE} from 'm2m-uiux-react/Chart'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    // 컨테이너 폭에 맞춰 자동 스케일 (viewBox + width 100%)',
                  '    <div style={{ maxWidth: 380 }}>',
                  `      <Chart type={CHART_TYPE['AREA']} data={data} xKey="month" series={["방문자"]} height={200} />`,
                  '    </div>',
                  '  )',
                  '}'
                ]}
                notes={['height 는 px 고정, 가로는 컨테이너에 맞춰 스케일']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
