import {useState} from 'react'

import ProgressBar, {PROGRESS_BAR_COLOR, PROGRESS_BAR_THICKNESS} from '~/components/ProgressBar'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['value', 'showValue', 'color', 'thickness', 'animated', 'label']

const wrap = {width: 320, maxWidth: '100%'}

function Slider({showValue = true}: {showValue?: boolean}) {
  const [v, setV] = useState(60)
  return (
    <div className="demo-col" style={wrap}>
      <ProgressBar value={v} showValue={showValue} />
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <input
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          style={{flex: 1, accentColor: 'var(--m2m-pg-brand)'}}
        />
        <span style={{fontSize: 13, fontWeight: 700, color: 'var(--m2m-pg-brand)', minWidth: 36}}>{v}%</span>
      </div>
    </div>
  )
}

export function ProgressBarPage() {
  return (
    <>
      <PageHeader
        title="Progress.Bar"
        component="ProgressBar"
        desc="— 수치형 진행바. 파일 업로드, 설문 완료율 등 연속적인 진행 상태를 표시합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'value' && (
              <ComponentSection
                title="value — 현재 진행률 (0~100, 슬라이더로 조절)"
                preview={<Slider />}
                code={[
                  "import {useState} from 'react'",
                  "import ProgressBar from 'm2m-uiux-react/ProgressBar'",
                  '',
                  'export function Example() {',
                  '  const [progress] = useState(60)',
                  '  return <ProgressBar value={progress} showValue />',
                  '}'
                ]}
                notes={['value 는 0~100 사이의 숫자, 범위 초과 시 자동 클램핑']}
              />
            )}

            {tab === 'showValue' && (
              <>
                <ComponentSection
                  title="showValue={true} — 진행률 텍스트 표시"
                  preview={<Slider />}
                  code={[
                    "import ProgressBar from 'm2m-uiux-react/ProgressBar'",
                    '',
                    'export function Example() {',
                    '  return <ProgressBar value={75} showValue />',
                    '}'
                  ]}
                  notes={['우측에 N% 형태로 표시됩니다']}
                />
                <ComponentSection
                  title="showValue={false} (기본)"
                  preview={<Slider showValue={false} />}
                  code={[
                    "import ProgressBar from 'm2m-uiux-react/ProgressBar'",
                    '',
                    'export function Example() {',
                    '  return <ProgressBar value={75} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'color' &&
              (['PRIMARY', 'SUCCESS', 'WARNING', 'DANGER'] as const).map((c) => (
                <ComponentSection
                  key={c}
                  title={`color="${PROGRESS_BAR_COLOR[c]}"`}
                  preview={
                    <div style={wrap}>
                      <ProgressBar value={65} color={PROGRESS_BAR_COLOR[c]} showValue />
                    </div>
                  }
                  code={[
                    "import ProgressBar, {PROGRESS_BAR_COLOR} from 'm2m-uiux-react/ProgressBar'",
                    '',
                    'export function Example() {',
                    `  return <ProgressBar value={65} color={PROGRESS_BAR_COLOR['${c}']} />`,
                    '}'
                  ]}
                />
              ))}

            {tab === 'thickness' &&
              (
                [
                  ['SM', ' — 얇은 바'],
                  ['MD', ' (기본)'],
                  ['LG', ' — 두꺼운 바']
                ] as const
              ).map(([t, suffix]) => (
                <ComponentSection
                  key={t}
                  title={`thickness="${PROGRESS_BAR_THICKNESS[t]}"${suffix}`}
                  preview={
                    <div style={wrap}>
                      <ProgressBar value={70} thickness={PROGRESS_BAR_THICKNESS[t]} showValue />
                    </div>
                  }
                  code={[
                    "import ProgressBar, {PROGRESS_BAR_THICKNESS} from 'm2m-uiux-react/ProgressBar'",
                    '',
                    'export function Example() {',
                    `  return <ProgressBar value={70} thickness={PROGRESS_BAR_THICKNESS['${t}']} />`,
                    '}'
                  ]}
                />
              ))}

            {tab === 'animated' && (
              <ComponentSection
                title="animated={true} — 흐르는 그라데이션"
                preview={
                  <div className="demo-col" style={wrap}>
                    <ProgressBar value={55} animated showValue label="파일 업로드 중…" />
                    <ProgressBar value={30} animated color={PROGRESS_BAR_COLOR['SUCCESS']} showValue label="처리 중…" />
                    <ProgressBar value={78} animated color={PROGRESS_BAR_COLOR['WARNING']} showValue label="변환 중…" />
                  </div>
                }
                code={[
                  "import ProgressBar from 'm2m-uiux-react/ProgressBar'",
                  '',
                  'export function Example() {',
                  '  return <ProgressBar value={55} animated label="파일 업로드 중..." />',
                  '}'
                ]}
                notes={['진행 중일 때 사용, 완료 시 animated={false} 로 전환 권장']}
              />
            )}

            {tab === 'label' && (
              <ComponentSection
                title="label — 막대 위 라벨"
                preview={
                  <div style={wrap}>
                    <ProgressBar value={80} label="디스크 사용량" showValue />
                  </div>
                }
                code={[
                  "import ProgressBar from 'm2m-uiux-react/ProgressBar'",
                  '',
                  'export function Example() {',
                  '  return <ProgressBar value={80} label="디스크 사용량" showValue />',
                  '}'
                ]}
                notes={['label 과 showValue 를 함께 쓰면 좌: 라벨 / 우: N%']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
