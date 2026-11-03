import Timeline, {TIMELINE_ALIGN, TIMELINE_COLOR, TIMELINE_DIRECTION, TIMELINE_STATUS} from '~/components/Timeline'
import Icon from '~/components/Icon'
import type {TimelineItem} from '~/components/Timeline'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['items', 'direction', 'align', 'pending', 'color']

const ORDER: TimelineItem[] = [
  {
    title: '주문 완료',
    description: '주문이 정상 접수되었습니다.',
    date: '2026.04.01 10:00',
    status: TIMELINE_STATUS['SUCCESS'],
    icon: <Icon name="check" size={9} />
  },
  {
    title: '결제 완료',
    description: '결제가 확인되었습니다.',
    date: '2026.04.01 10:05',
    status: TIMELINE_STATUS['SUCCESS'],
    icon: <Icon name="check" size={9} />
  },
  {
    title: '배송 준비',
    description: '상품을 포장 중입니다.',
    date: '2026.04.02 09:00',
    status: TIMELINE_STATUS['PROCESSING']
  },
  {
    title: '배송 중',
    description: '택배사에 인계되었습니다.',
    date: '2026.04.03 14:00'
  },
  {
    title: '배송 완료',
    description: '상품이 배달되었습니다.',
    date: '2026.04.04 11:30',
    status: TIMELINE_STATUS['GRAY']
  }
]

const STEPS: TimelineItem[] = [
  {title: '기획', description: '요구사항 수집', date: '2026 Q1', status: TIMELINE_STATUS['SUCCESS']},
  {title: '디자인', description: 'UI/UX 설계', date: '2026 Q2', status: TIMELINE_STATUS['SUCCESS']},
  {title: '개발', description: '구현', date: '2026 Q3', status: TIMELINE_STATUS['PROCESSING']},
  {title: 'QA', description: '테스트', date: '2026 Q4', status: TIMELINE_STATUS['GRAY']},
  {title: '출시', description: '배포', date: '2027 Q1', status: TIMELINE_STATUS['GRAY']}
]

export function TimelinePage() {
  return (
    <>
      <PageHeader
        title="Timeline"
        component="Timeline"
        desc="— 주문 배송 조회·승인 절차·연혁 등 시간 흐름을 시각화합니다. 수직/수평, 정렬 방향, 상태 색상을 지원합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'items' && (
              <ComponentSection
                title="items — 데이터 배열"
                preview={<Timeline items={ORDER} />}
                code={[
                  "import Timeline, {TIMELINE_STATUS} from 'm2m-uiux-react/Timeline'",
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'const items = [',
                  "  { title: '주문 완료', description: '접수됨', date: '04.01', status: TIMELINE_STATUS['SUCCESS'], icon: <Icon name=\"check\" size={9} /> },",
                  "  { title: '배송 중', status: TIMELINE_STATUS['PROCESSING'] },",
                  ']',
                  '',
                  'export function Example() {',
                  '  return <Timeline items={items} />',
                  '}'
                ]}
                notes={[
                  "status: 'default'|'success'|'warning'|'error'|'processing'|'gray'",
                  'icon 은 노드 내부에 렌더 (9~14px 권장)'
                ]}
              />
            )}

            {tab === 'direction' && (
              <>
                <ComponentSection
                  title='direction="vertical" (기본)'
                  preview={<Timeline items={STEPS.slice(0, 4)} />}
                  code={[
                    "import Timeline, {TIMELINE_DIRECTION} from 'm2m-uiux-react/Timeline'",
                    '',
                    'export function Example() {',
                    "  return <Timeline direction={TIMELINE_DIRECTION['VERTICAL']} items={items} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='direction="horizontal" — 가로 스크롤'
                  preview={<Timeline items={STEPS} direction={TIMELINE_DIRECTION['HORIZONTAL']} />}
                  code={[
                    "import Timeline, {TIMELINE_DIRECTION} from 'm2m-uiux-react/Timeline'",
                    '',
                    'export function Example() {',
                    "  return <Timeline direction={TIMELINE_DIRECTION['HORIZONTAL']} items={items} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'align' && (
              <>
                <ComponentSection
                  title='align="left" (기본)'
                  preview={<Timeline items={ORDER.slice(0, 3)} align={TIMELINE_ALIGN['LEFT']} />}
                  code={[
                    "import Timeline, {TIMELINE_ALIGN} from 'm2m-uiux-react/Timeline'",
                    '',
                    'export function Example() {',
                    "  return <Timeline align={TIMELINE_ALIGN['LEFT']} items={items} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='align="right"'
                  preview={<Timeline items={ORDER.slice(0, 3)} align={TIMELINE_ALIGN['RIGHT']} />}
                  code={[
                    "import Timeline, {TIMELINE_ALIGN} from 'm2m-uiux-react/Timeline'",
                    '',
                    'export function Example() {',
                    "  return <Timeline align={TIMELINE_ALIGN['RIGHT']} items={items} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='align="alternate" — 지그재그'
                  preview={<Timeline items={STEPS} align={TIMELINE_ALIGN['ALTERNATE']} />}
                  code={[
                    "import Timeline, {TIMELINE_ALIGN} from 'm2m-uiux-react/Timeline'",
                    '',
                    'export function Example() {',
                    "  return <Timeline align={TIMELINE_ALIGN['ALTERNATE']} items={items} />",
                    '}'
                  ]}
                  notes={['짝수 인덱스 → 오른쪽, 홀수 인덱스 → 왼쪽']}
                />
              </>
            )}

            {tab === 'pending' && (
              <>
                <ComponentSection
                  title="pending — 진행 중 노드 추가"
                  preview={<Timeline items={ORDER.slice(0, 3)} pending />}
                  code={[
                    "import Timeline from 'm2m-uiux-react/Timeline'",
                    '',
                    'export function Example() {',
                    '  return <Timeline items={items} pending />',
                    '}'
                  ]}
                  notes={['마지막에 점선 + 펄스 노드가 추가됩니다']}
                />
                <ComponentSection
                  title="pending — 커스텀 문구"
                  preview={
                    <Timeline
                      items={ORDER.slice(0, 3)}
                      align={TIMELINE_ALIGN['ALTERNATE']}
                      pending="배송 정보를 조회 중입니다..."
                    />
                  }
                  code={[
                    "import Timeline from 'm2m-uiux-react/Timeline'",
                    '',
                    'export function Example() {',
                    '  return <Timeline items={items} pending="조회 중입니다..." />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'color' && (
              <>
                {(['PRIMARY', 'SUCCESS', 'GRAY'] as const).map((c) => (
                  <ComponentSection
                    key={c}
                    title={`color="${TIMELINE_COLOR[c]}"${c === 'PRIMARY' ? ' (기본)' : ''}`}
                    preview={<Timeline items={STEPS.slice(0, 3)} color={TIMELINE_COLOR[c]} />}
                    code={[
                      "import Timeline, {TIMELINE_COLOR} from 'm2m-uiux-react/Timeline'",
                      '',
                      'export function Example() {',
                      `  return <Timeline color={TIMELINE_COLOR['${c}']} items={items} />`,
                      '}'
                    ]}
                    notes={c === 'SUCCESS' ? ['개별 항목 status 가 있으면 그 색이 우선'] : undefined}
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
