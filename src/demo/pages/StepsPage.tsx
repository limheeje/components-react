import {useState} from 'react'

import Button from '~/components/Button'
import Steps, {STEPS_DIRECTION, STEPS_STATUS} from '~/components/Steps'
import type {StepItem} from '~/components/Steps'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['steps', 'current', 'direction', 'status']

const SIGNUP: StepItem[] = [
  {title: '약관 동의', description: '이용약관 확인'},
  {title: '정보 입력', description: '기본 정보 입력'},
  {title: '인증', description: '이메일 인증'},
  {title: '완료', description: '가입 완료'}
]

const ORDER: StepItem[] = [{title: '장바구니'}, {title: '주문 정보'}, {title: '결제'}, {title: '완료'}]

function Interactive({steps = SIGNUP, start = 1}: {steps?: StepItem[]; start?: number}) {
  const [cur, setCur] = useState(start)
  return (
    <div className="demo-col" style={{width: '100%'}}>
      <Steps steps={steps} current={cur} />
      <div className="demo-row">
        <Button size="sm" variant="ghost" disabled={cur === 0} onClick={() => setCur((c) => Math.max(0, c - 1))}>
          이전
        </Button>
        <Button
          size="sm"
          disabled={cur === steps.length - 1}
          onClick={() => setCur((c) => Math.min(steps.length - 1, c + 1))}
        >
          다음
        </Button>
        <span className="demo-hint">
          {cur + 1} / {steps.length} 단계
        </span>
      </div>
    </div>
  )
}

export function StepsPage() {
  return (
    <>
      <PageHeader
        title="Progress.Steps"
        component="Steps"
        desc="— 단계형 상태 표시기. 회원가입·주문·승인 절차 등 불연속적인 단계를 안내합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'steps' && (
              <ComponentSection
                title="steps — 단계 배열"
                preview={<Interactive steps={ORDER} start={1} />}
                code={[
                  "import {useState} from 'react'",
                  "import Steps from 'm2m-uiux-react/Steps'",
                  '',
                  'const steps = [',
                  "  { title: '장바구니' },",
                  "  { title: '주문 정보' },",
                  "  { title: '결제' },",
                  "  { title: '완료' },",
                  ']',
                  '',
                  'export function Example() {',
                  '  const [current, setCurrent] = useState(1)',
                  '  return <Steps steps={steps} current={current} onChange={setCurrent} />',
                  '}'
                ]}
                notes={['이전/다음 버튼으로 단계를 이동해보세요']}
              />
            )}

            {tab === 'current' && (
              <ComponentSection
                title="current — 현재 단계 (0-base)"
                preview={<Interactive />}
                code={[
                  "import {useState} from 'react'",
                  "import Steps from 'm2m-uiux-react/Steps'",
                  '',
                  'export function Example() {',
                  '  const [current, setCurrent] = useState(1)',
                  '  return <Steps steps={steps} current={current} onChange={setCurrent} />',
                  '}'
                ]}
                notes={['완료된 단계는 초록 체크, 현재 단계는 브랜드색, 미완료는 회색']}
              />
            )}

            {tab === 'direction' && (
              <>
                <ComponentSection
                  title='direction="horizontal" (기본)'
                  preview={<Steps steps={SIGNUP} current={2} />}
                  code={[
                    "import Steps, {STEPS_DIRECTION} from 'm2m-uiux-react/Steps'",
                    '',
                    'export function Example() {',
                    "  return <Steps direction={STEPS_DIRECTION['HORIZONTAL']} steps={steps} current={2} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='direction="vertical"'
                  preview={<Steps steps={SIGNUP} current={2} direction={STEPS_DIRECTION['VERTICAL']} />}
                  code={[
                    "import Steps, {STEPS_DIRECTION} from 'm2m-uiux-react/Steps'",
                    '',
                    'export function Example() {',
                    "  return <Steps direction={STEPS_DIRECTION['VERTICAL']} steps={steps} current={2} />",
                    '}'
                  ]}
                  notes={['좁은 화면이나 사이드바 내 진행 상태에 적합']}
                />
              </>
            )}

            {tab === 'status' && (
              <>
                <ComponentSection
                  title='status="process" (기본) — 진행 중'
                  preview={<Steps steps={SIGNUP} current={1} status={STEPS_STATUS['PROCESS']} />}
                  code={[
                    "import Steps, {STEPS_STATUS} from 'm2m-uiux-react/Steps'",
                    '',
                    'export function Example() {',
                    "  return <Steps steps={steps} current={1} status={STEPS_STATUS['PROCESS']} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='status="finish" — 현재 단계 완료 처리'
                  preview={<Steps steps={SIGNUP} current={1} status={STEPS_STATUS['FINISH']} />}
                  code={[
                    "import Steps, {STEPS_STATUS} from 'm2m-uiux-react/Steps'",
                    '',
                    'export function Example() {',
                    "  return <Steps steps={steps} current={1} status={STEPS_STATUS['FINISH']} />",
                    '}'
                  ]}
                  notes={['현재 단계를 강제로 완료 상태로 표시']}
                />
                <ComponentSection
                  title='status="error" — 현재 단계 오류 상태'
                  preview={<Steps steps={SIGNUP} current={2} status={STEPS_STATUS['ERROR']} />}
                  code={[
                    "import Steps, {STEPS_STATUS} from 'm2m-uiux-react/Steps'",
                    '',
                    'export function Example() {',
                    "  return <Steps steps={steps} current={2} status={STEPS_STATUS['ERROR']} />",
                    '}'
                  ]}
                  notes={['현재 단계에 빨간 오류 아이콘이 표시됩니다']}
                />
                <ComponentSection
                  title='status="wait" — 대기 상태'
                  preview={<Steps steps={SIGNUP} current={0} status={STEPS_STATUS['WAIT']} />}
                  code={[
                    "import Steps, {STEPS_STATUS} from 'm2m-uiux-react/Steps'",
                    '',
                    'export function Example() {',
                    "  return <Steps steps={steps} current={0} status={STEPS_STATUS['WAIT']} />",
                    '}'
                  ]}
                />
              </>
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
