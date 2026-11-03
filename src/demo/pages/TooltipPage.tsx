import Tooltip, {TOOLTIP_PLACEMENT, TOOLTIP_TRIGGER} from '~/components/Tooltip'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['placement', 'trigger', 'content', 'arrow', 'delay', 'classNames']

const PAD = {padding: '40px 80px'}

function TriggerBtn({children = '툴팁 대상'}: {children?: string}) {
  return (
    <button
      type="button"
      style={{
        padding: '8px 16px',
        border: '1px solid var(--m2m-pg-comp-border-sub)',
        borderRadius: 8,
        background: 'var(--m2m-pg-comp-bg)',
        color: 'var(--m2m-pg-comp-text)',
        cursor: 'pointer',
        font: 'inherit'
      }}
    >
      {children}
    </button>
  )
}

export function TooltipPage() {
  return (
    <>
      <PageHeader title="Tooltip" component="Tooltip" desc="— 마우스 오버 시 팝업되는 도움말 컴포넌트." />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'placement' &&
              (['TOP', 'BOTTOM', 'LEFT', 'RIGHT'] as const).map((p) => (
                <ComponentSection
                  key={p}
                  title={`placement="${TOOLTIP_PLACEMENT[p]}"`}
                  preview={
                    <div style={PAD}>
                      <Tooltip placement={TOOLTIP_PLACEMENT[p]} content={`${TOOLTIP_PLACEMENT[p]} 방향 툴팁`}>
                        <TriggerBtn />
                      </Tooltip>
                    </div>
                  }
                  code={[
                    "import Tooltip, {TOOLTIP_PLACEMENT} from 'm2m-uiux-react/Tooltip'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Tooltip',
                    `      placement={TOOLTIP_PLACEMENT['${p}']}`,
                    '      content="툴팁 내용"',
                    '    >',
                    '      <button>툴팁 대상</button>',
                    '    </Tooltip>',
                    '  )',
                    '}'
                  ]}
                />
              ))}

            {tab === 'trigger' && (
              <>
                <ComponentSection
                  title='trigger="hover" (기본)'
                  preview={
                    <div style={{padding: 40}}>
                      <Tooltip content="마우스를 올려보세요">
                        <TriggerBtn>마우스 오버</TriggerBtn>
                      </Tooltip>
                    </div>
                  }
                  code={[
                    "import Tooltip, {TOOLTIP_TRIGGER} from 'm2m-uiux-react/Tooltip'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Tooltip trigger={TOOLTIP_TRIGGER[\'HOVER\']} content="마우스를 올려보세요">',
                    '      <button>마우스 오버</button>',
                    '    </Tooltip>',
                    '  )',
                    '}'
                  ]}
                  notes={['hover 는 키보드 focus 도 트리거로 동작']}
                />
                <ComponentSection
                  title='trigger="click"'
                  preview={
                    <div style={{padding: 40}}>
                      <Tooltip trigger={TOOLTIP_TRIGGER['CLICK']} content="클릭해서 토글">
                        <TriggerBtn>클릭</TriggerBtn>
                      </Tooltip>
                    </div>
                  }
                  code={[
                    "import Tooltip, {TOOLTIP_TRIGGER} from 'm2m-uiux-react/Tooltip'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Tooltip trigger={TOOLTIP_TRIGGER[\'CLICK\']} content="클릭해서 토글">',
                    '      <button>클릭</button>',
                    '    </Tooltip>',
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'content' && (
              <>
                <ComponentSection
                  title="content — 텍스트"
                  preview={
                    <div style={{padding: 40}}>
                      <Tooltip content="간단한 도움말 텍스트">
                        <TriggerBtn>?</TriggerBtn>
                      </Tooltip>
                    </div>
                  }
                  code={[
                    "import Tooltip from 'm2m-uiux-react/Tooltip'",
                    '',
                    'export function Example() {',
                    '  return <Tooltip content="간단한 도움말 텍스트"><button>?</button></Tooltip>',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="content — ReactNode"
                  preview={
                    <div style={{padding: 40}}>
                      <Tooltip
                        content={
                          <span>
                            <strong>제목</strong> · 설명 텍스트
                          </span>
                        }
                      >
                        <TriggerBtn>?</TriggerBtn>
                      </Tooltip>
                    </div>
                  }
                  code={[
                    "import Tooltip from 'm2m-uiux-react/Tooltip'",
                    '',
                    'export function Example() {',
                    '  return <Tooltip content={<b>제목</b>}><button>?</button></Tooltip>',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'arrow' && (
              <>
                <ComponentSection
                  title="arrow={true} (기본)"
                  preview={
                    <div style={{padding: 40}}>
                      <Tooltip content="화살표 있음">
                        <TriggerBtn />
                      </Tooltip>
                    </div>
                  }
                  code={[
                    "import Tooltip from 'm2m-uiux-react/Tooltip'",
                    '',
                    'export function Example() {',
                    '  return <Tooltip arrow={true} content="화살표 있음"><button>대상</button></Tooltip>',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="arrow={false}"
                  preview={
                    <div style={{padding: 40}}>
                      <Tooltip arrow={false} content="화살표 없음">
                        <TriggerBtn />
                      </Tooltip>
                    </div>
                  }
                  code={[
                    "import Tooltip from 'm2m-uiux-react/Tooltip'",
                    '',
                    'export function Example() {',
                    '  return <Tooltip arrow={false} content="화살표 없음"><button>대상</button></Tooltip>',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'delay' && (
              <ComponentSection
                title="delay — 등장 지연 (ms)"
                preview={
                  <div style={{padding: 40}}>
                    <Tooltip delay={500} content="0.5초 후 등장">
                      <TriggerBtn>마우스 오버</TriggerBtn>
                    </Tooltip>
                  </div>
                }
                code={[
                  "import Tooltip from 'm2m-uiux-react/Tooltip'",
                  '',
                  'export function Example() {',
                  '  return <Tooltip delay={500} content="0.5초 후 등장"><button>마우스 오버</button></Tooltip>',
                  '}'
                ]}
                notes={['delay 기본값은 0ms']}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={
                  <div style={{padding: 40}}>
                    <Tooltip classNames="demo-hint" content="커스텀">
                      <TriggerBtn />
                    </Tooltip>
                  </div>
                }
                code={[
                  "import Tooltip from 'm2m-uiux-react/Tooltip'",
                  '',
                  'export function Example() {',
                  '  return <Tooltip classNames="max-w-xs" content="커스텀"><button>대상</button></Tooltip>',
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
