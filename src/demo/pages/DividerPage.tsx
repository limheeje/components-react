import Divider, {DIVIDER_DIRECTION, DIVIDER_LABEL_ALIGN} from '~/components/Divider'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['direction', 'color', 'thickness', 'label', 'dashed', 'classNames']

const W = {width: 300}
const hint = {fontSize: 14, color: 'var(--m2m-pg-comp-text-sub)'}

const COLORS: {name: string; value: string}[] = [
  {name: 'default', value: 'var(--m2m-pg-comp-border)'},
  {name: 'primary', value: 'var(--m2m-pg-brand)'},
  {name: 'muted', value: 'var(--m2m-pg-comp-bg-hover)'}
]

export function DividerPage() {
  return (
    <>
      <PageHeader
        title="Divider"
        component="Divider"
        desc="— 구분선 컴포넌트. 수평/수직 분리선과 가운데/좌측 라벨을 지원합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'direction' && (
              <>
                <ComponentSection
                  title="horizontal (기본)"
                  preview={
                    <div style={W}>
                      <div style={{marginBottom: 12, ...hint}}>위 섹션</div>
                      <Divider />
                      <div style={{marginTop: 12, ...hint}}>아래 섹션</div>
                    </div>
                  }
                  code={[
                    "import Divider, {DIVIDER_DIRECTION} from 'm2m-uiux-react/Divider'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <>',
                    '      <Divider />',
                    '      {/* 또는 */}',
                    "      <Divider direction={DIVIDER_DIRECTION['HORIZONTAL']} />",
                    '    </>',
                    '  )',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="vertical"
                  preview={
                    <div style={{display: 'flex', alignItems: 'center', gap: 12, height: 32}}>
                      <span style={hint}>텍스트 A</span>
                      <Divider direction={DIVIDER_DIRECTION['VERTICAL']} />
                      <span style={hint}>텍스트 B</span>
                      <Divider direction={DIVIDER_DIRECTION['VERTICAL']} />
                      <span style={hint}>텍스트 C</span>
                    </div>
                  }
                  code={[
                    "import Divider, {DIVIDER_DIRECTION} from 'm2m-uiux-react/Divider'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <div style={{display: "flex", alignItems: "center"}}>',
                    '      <span>텍스트 A</span>',
                    "      <Divider direction={DIVIDER_DIRECTION['VERTICAL']} />",
                    '      <span>텍스트 B</span>',
                    '    </div>',
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'color' &&
              COLORS.map((c) => (
                <ComponentSection
                  key={c.name}
                  title={`color="${c.name}"`}
                  preview={
                    <div style={W}>
                      <Divider color={c.value} />
                    </div>
                  }
                  code={[
                    "import Divider from 'm2m-uiux-react/Divider'",
                    '',
                    'export function Example() {',
                    `  return <Divider color="${c.value}" />`,
                    '}'
                  ]}
                />
              ))}

            {tab === 'thickness' &&
              (
                [
                  [1, '1px (기본)'],
                  [2, '2px'],
                  [4, '4px']
                ] as const
              ).map(([size, label]) => (
                <ComponentSection
                  key={size}
                  title={`thickness={${size}} — ${label}`}
                  preview={
                    <div style={W}>
                      <Divider thickness={size} />
                    </div>
                  }
                  code={[
                    "import Divider from 'm2m-uiux-react/Divider'",
                    '',
                    'export function Example() {',
                    `  return <Divider thickness={${size}} />`,
                    '}'
                  ]}
                />
              ))}

            {tab === 'label' && (
              <>
                <ComponentSection
                  title="label — 중앙 텍스트"
                  preview={
                    <div style={W}>
                      <Divider label="또는" />
                    </div>
                  }
                  code={[
                    "import Divider from 'm2m-uiux-react/Divider'",
                    '',
                    'export function Example() {',
                    '  return <Divider label="또는" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="label — 좌측 정렬"
                  preview={
                    <div style={W}>
                      <Divider label="섹션 제목" labelAlign={DIVIDER_LABEL_ALIGN['LEFT']} />
                    </div>
                  }
                  code={[
                    "import Divider, {DIVIDER_LABEL_ALIGN} from 'm2m-uiux-react/Divider'",
                    '',
                    'export function Example() {',
                    '  return <Divider label="섹션 제목" labelAlign={DIVIDER_LABEL_ALIGN[\'LEFT\']} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'dashed' && (
              <>
                <ComponentSection
                  title="dashed={true}"
                  preview={
                    <div style={W}>
                      <Divider dashed />
                    </div>
                  }
                  code={[
                    "import Divider from 'm2m-uiux-react/Divider'",
                    '',
                    'export function Example() {',
                    '  return <Divider dashed={true} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="dashed={false} (기본)"
                  preview={
                    <div style={W}>
                      <Divider dashed={false} />
                    </div>
                  }
                  code={[
                    "import Divider from 'm2m-uiux-react/Divider'",
                    '',
                    'export function Example() {',
                    '  return <Divider dashed={false} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="dashed + label"
                  preview={
                    <div style={W}>
                      <Divider dashed label="구분" />
                    </div>
                  }
                  code={[
                    "import Divider from 'm2m-uiux-react/Divider'",
                    '',
                    'export function Example() {',
                    '  return <Divider dashed label="구분" />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={
                  <div style={W}>
                    <Divider classNames="demo-hint" color="var(--m2m-pg-brand)" thickness={2} />
                  </div>
                }
                code={[
                  "import Divider from 'm2m-uiux-react/Divider'",
                  '',
                  'export function Example() {',
                  '  return <Divider classNames="my-4 border-primary" />',
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
