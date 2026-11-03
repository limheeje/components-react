import {useState} from 'react'

import Button, {BUTTON_SIZE, BUTTON_VARIANT} from '~/components/Button'
import {Icon} from '~/components/Icon'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['variant', 'size', 'round', 'disabled', 'loading', 'fullWidth', 'icon', 'onClick', 'classNames']

// 데모/코드예시 모두 하드코딩 문자열 대신 export 상수(BUTTON_VARIANT · BUTTON_SIZE)를 사용
const VARIANTS: {k: keyof typeof BUTTON_VARIANT; v: string; label?: string; note?: string}[] = [
  {k: 'PRIMARY', v: BUTTON_VARIANT.PRIMARY, note: 'variant 없으면 자동으로 primary'},
  {k: 'SECONDARY', v: BUTTON_VARIANT.SECONDARY},
  {k: 'GHOST', v: BUTTON_VARIANT.GHOST},
  {k: 'EMPHASIS', v: BUTTON_VARIANT.EMPHASIS},
  {k: 'INACTIVE', v: BUTTON_VARIANT.INACTIVE, note: '클릭 이벤트가 동작하지 않는 시각적 비활성 상태'},
  {k: 'NONE', v: BUTTON_VARIANT.NONE, label: '텍스트 버튼'},
  {k: 'SUCCESS', v: BUTTON_VARIANT.SUCCESS},
  {k: 'WARNING', v: BUTTON_VARIANT.WARNING},
  {k: 'DANGER', v: BUTTON_VARIANT.DANGER},
  {k: 'INFO', v: BUTTON_VARIANT.INFO},
  {k: 'PRIMARY_LIGHT', v: BUTTON_VARIANT.PRIMARY_LIGHT},
  {k: 'SUCCESS_LIGHT', v: BUTTON_VARIANT.SUCCESS_LIGHT},
  {k: 'WARNING_LIGHT', v: BUTTON_VARIANT.WARNING_LIGHT},
  {k: 'DANGER_LIGHT', v: BUTTON_VARIANT.DANGER_LIGHT},
  {k: 'INFO_LIGHT', v: BUTTON_VARIANT.INFO_LIGHT}
]

const row = {display: 'flex', gap: 10, flexWrap: 'wrap' as const}

function ClickCounter() {
  const [count, setCount] = useState(0)
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
      <Button onClick={() => setCount((c) => c + 1)}>클릭해보세요</Button>
      {count > 0 && <span style={{fontSize: 13, fontWeight: 600, color: 'var(--m2m-pg-brand)'}}>{count}번 클릭됨</span>}
    </div>
  )
}

export function ButtonPage() {
  return (
    <>
      <PageHeader
        title="Button"
        component="Button"
        desc="— 공통 버튼 컴포넌트. variant prop 으로 스타일을 지정합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'variant' &&
              VARIANTS.map(({k, v, label, note}) => (
                <ComponentSection
                  key={v}
                  title={`variant="${v}"`}
                  preview={<Button variant={BUTTON_VARIANT[k]}>{label ?? 'Button'}</Button>}
                  code={[
                    "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
                    '',
                    'export function Example() {',
                    `  return <Button variant={BUTTON_VARIANT['${k}']}>${label ?? 'Button'}</Button>`,
                    '}'
                  ]}
                  notes={note ? [note] : undefined}
                />
              ))}

            {tab === 'size' &&
              (
                [
                  ['LG', 'lg', ''],
                  ['MD', 'md', ' (기본)'],
                  ['SM', 'sm', '']
                ] as const
              ).map(([k, s, suffix]) => (
                <ComponentSection
                  key={s}
                  title={`size="${s}"${suffix}`}
                  preview={<Button size={BUTTON_SIZE[k]}>Button</Button>}
                  code={[
                    "import Button, {BUTTON_SIZE} from 'm2m-uiux-react/Button'",
                    '',
                    'export function Example() {',
                    `  return <Button size={BUTTON_SIZE['${k}']}>Button</Button>`,
                    '}'
                  ]}
                  notes={s === 'md' ? ['size 없으면 자동으로 md'] : undefined}
                />
              ))}

            {tab === 'round' && (
              <>
                <ComponentSection
                  title="round={true} — 캡슐형"
                  preview={
                    <div style={row}>
                      <Button round>Button</Button>
                      <Button round variant={BUTTON_VARIANT['GHOST']}>
                        ghost
                      </Button>
                    </div>
                  }
                  code={[
                    "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <>',
                    '      <Button round={true}>Button</Button>',
                    "      <Button round={true} variant={BUTTON_VARIANT['GHOST']}>ghost</Button>",
                    '    </>',
                    '  )',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="round={false} (기본)"
                  preview={<Button round={false}>Button</Button>}
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    '',
                    'export function Example() {',
                    '  return <Button round={false}>Button</Button>',
                    '}'
                  ]}
                  notes={['기본값은 false (8px border-radius)']}
                />
              </>
            )}

            {tab === 'disabled' && (
              <>
                <ComponentSection
                  title="disabled={true}"
                  preview={
                    <div style={row}>
                      <Button disabled>Button</Button>
                      <Button disabled variant={BUTTON_VARIANT['GHOST']}>
                        ghost
                      </Button>
                    </div>
                  }
                  code={[
                    "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <>',
                    '      <Button disabled={true}>Button</Button>',
                    "      <Button disabled={true} variant={BUTTON_VARIANT['GHOST']}>ghost</Button>",
                    '    </>',
                    '  )',
                    '}'
                  ]}
                  notes={['HTML disabled 속성 적용, 클릭 이벤트 차단']}
                />
                <ComponentSection
                  title="disabled={false} (기본)"
                  preview={<Button disabled={false}>Button</Button>}
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    '',
                    'export function Example() {',
                    '  return <Button disabled={false}>Button</Button>',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'loading' && (
              <>
                <ComponentSection
                  title="loading={true} — 로딩 스피너"
                  preview={<Button loading>저장 중…</Button>}
                  code={[
                    "import {useState} from 'react'",
                    "import Button from 'm2m-uiux-react/Button'",
                    '',
                    'export function Example() {',
                    '  const [isLoading, setIsLoading] = useState(false)',
                    '  return (',
                    '    <Button',
                    '      loading={isLoading}',
                    '      onClick={async () => {',
                    '        setIsLoading(true)',
                    '        await saveData()',
                    '        setIsLoading(false)',
                    '      }}',
                    '    >',
                    '      저장 중...',
                    '    </Button>',
                    '  )',
                    '}'
                  ]}
                  notes={['loading 상태에서는 onClick 이 차단됨', 'API 호출·파일 업로드 등 비동기 작업 중 사용']}
                />
                <ComponentSection
                  title="loading={true} — 각 variant"
                  preview={
                    <div style={row}>
                      <Button variant={BUTTON_VARIANT['PRIMARY']} loading>
                        처리 중
                      </Button>
                      <Button variant={BUTTON_VARIANT['SECONDARY']} loading>
                        처리 중
                      </Button>
                      <Button variant={BUTTON_VARIANT['GHOST']} loading>
                        처리 중
                      </Button>
                    </div>
                  }
                  code={[
                    "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <>',
                    "      <Button variant={BUTTON_VARIANT['PRIMARY']} loading>처리 중</Button>",
                    "      <Button variant={BUTTON_VARIANT['SECONDARY']} loading>처리 중</Button>",
                    "      <Button variant={BUTTON_VARIANT['GHOST']} loading>처리 중</Button>",
                    '    </>',
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'fullWidth' && (
              <>
                <ComponentSection
                  title="fullWidth={true}"
                  preview={
                    <div style={{width: 300}}>
                      <Button fullWidth>Button</Button>
                    </div>
                  }
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    '',
                    'export function Example() {',
                    '  return <Button fullWidth={true}>Button</Button>',
                    '}'
                  ]}
                  notes={['부모 너비에 맞게 100% 확장']}
                />
                <ComponentSection
                  title="fullWidth={false} (기본)"
                  preview={<Button fullWidth={false}>Button</Button>}
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    '',
                    'export function Example() {',
                    '  return <Button fullWidth={false}>Button</Button>',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'icon' && (
              <>
                <ComponentSection
                  title="아이콘 왼쪽 — Icon 을 children 앞에"
                  description="iconPosition prop 없이, Icon 을 원하는 위치에 직접 children 으로 넣습니다."
                  preview={
                    <div style={row}>
                      <Button>
                        <Icon name="search" size={14} />
                        검색
                      </Button>
                      <Button variant={BUTTON_VARIANT['GHOST']}>
                        <Icon name="filter" size={14} />
                        필터
                      </Button>
                      <Button variant={BUTTON_VARIANT['SECONDARY']}>
                        <Icon name="download" size={14} />
                        다운로드
                      </Button>
                    </div>
                  }
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    "import Icon from 'm2m-uiux-react/Icon'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Button>',
                    '      <Icon name="search" size={14} />',
                    '      검색',
                    '    </Button>',
                    '  )',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="아이콘 오른쪽 — Icon 을 children 뒤에"
                  preview={
                    <div style={row}>
                      <Button>
                        이전
                        <Icon name="arrow-left" size={14} />
                      </Button>
                      <Button>
                        다음
                        <Icon name="arrow-right" size={14} />
                      </Button>
                      <Button variant={BUTTON_VARIANT['GHOST']}>
                        더보기
                        <Icon name="chevron-down" size={14} />
                      </Button>
                    </div>
                  }
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    "import Icon from 'm2m-uiux-react/Icon'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Button>',
                    '      다음',
                    '      <Icon name="arrow-right" size={14} />',
                    '    </Button>',
                    '  )',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="아이콘만 (icon only)"
                  preview={
                    <div style={row}>
                      <Button>
                        <Icon name="plus" size={16} />
                      </Button>
                      <Button variant={BUTTON_VARIANT['GHOST']}>
                        <Icon name="search" size={16} />
                      </Button>
                      <Button variant={BUTTON_VARIANT['SECONDARY']}>
                        <Icon name="settings" size={16} />
                      </Button>
                      <Button round>
                        <Icon name="edit" size={16} />
                      </Button>
                    </div>
                  }
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    "import Icon from 'm2m-uiux-react/Icon'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <>',
                    '      <Button>',
                    '        <Icon name="plus" size={16} />',
                    '      </Button>',
                    '      <Button round>',
                    '        <Icon name="edit" size={16} />',
                    '      </Button>',
                    '    </>',
                    '  )',
                    '}'
                  ]}
                  notes={[
                    '별도 iconPosition prop 없이 children 순서로 위치를 제어',
                    'Icon size 는 버튼 size 에 맞게 조절 권장 (sm:12, md:14~16, lg:18~20)'
                  ]}
                />
                <ComponentSection
                  title="아이콘 + 텍스트 — 다양한 조합"
                  preview={
                    <div style={row}>
                      <Button size={BUTTON_SIZE['SM']}>
                        <Icon name="upload" size={12} />
                        업로드
                      </Button>
                      <Button size={BUTTON_SIZE['MD']}>
                        <Icon name="plus" size={14} />
                        추가하기
                      </Button>
                      <Button size={BUTTON_SIZE['LG']}>
                        <Icon name="check" size={18} />
                        확인
                      </Button>
                      <Button variant={BUTTON_VARIANT['GHOST']}>
                        <Icon name="trash" size={14} />
                        삭제
                      </Button>
                      <Button variant={BUTTON_VARIANT['EMPHASIS']} round>
                        <Icon name="bell" size={14} />
                        알림
                      </Button>
                    </div>
                  }
                  code={[
                    "import Button, {BUTTON_SIZE} from 'm2m-uiux-react/Button'",
                    "import Icon from 'm2m-uiux-react/Icon'",
                    '',
                    'export function Example() {',
                    '  return (',
                    "    <Button size={BUTTON_SIZE['SM']}>",
                    '      <Icon name="upload" size={12} />',
                    '      업로드',
                    '    </Button>',
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'onClick' && (
              <ComponentSection
                title="onClick 이벤트 핸들러"
                preview={<ClickCounter />}
                code={[
                  "import Button from 'm2m-uiux-react/Button'",
                  '',
                  'export function Example() {',
                  '  const handleClick = () => {',
                  "    console.log('button clicked')",
                  '  }',
                  '  return <Button onClick={handleClick}>클릭해보세요</Button>',
                  '}'
                ]}
                notes={['disabled / loading / inactive 상태에서는 onClick 이 실행되지 않음']}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={<Button classNames="demo-hint">커스텀 버튼</Button>}
                code={[
                  "import Button from 'm2m-uiux-react/Button'",
                  '',
                  'export function Example() {',
                  '  return <Button classNames="mt-2 shadow-orange">커스텀 버튼</Button>',
                  '}'
                ]}
                notes={['classNames prop 은 문자열 또는 배열 허용', '기존 스타일을 덮어쓸 때 사용']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
