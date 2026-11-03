import {useState} from 'react'

import Accordion, {ACCORDION_TYPE} from '~/components/Accordion'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['single', 'multiple', 'disabled', 'defaultOpen', 'onChange', 'classNames']

const CONTENT = '아코디언 내부 콘텐츠가 여기에 표시됩니다. 자세한 설명이나 추가 정보를 담을 수 있습니다.'

function Sample({type, defaultValue}: {type?: 'single' | 'multiple'; defaultValue?: string | string[]}) {
  return (
    <div style={{width: 340}}>
      <Accordion type={type} defaultValue={defaultValue}>
        <Accordion.Item value="item-1" title="항목 1">
          {CONTENT}
        </Accordion.Item>
        <Accordion.Item value="item-2" title="항목 2">
          {CONTENT}
        </Accordion.Item>
        <Accordion.Item value="item-3" title="항목 3">
          {CONTENT}
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export function AccordionPage() {
  const [open, setOpen] = useState('item-1')

  return (
    <>
      <PageHeader
        title="Accordion"
        component="Accordion"
        desc="— 접기/펼치기 컴포넌트. single/multiple 모드를 지원합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'single' && (
              <ComponentSection
                title='type="single" (기본) — 하나만 열림'
                preview={<Sample type={ACCORDION_TYPE['SINGLE']} defaultValue="item-1" />}
                code={[
                  "import Accordion, {ACCORDION_TYPE} from 'm2m-uiux-react/Accordion'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <Accordion type={ACCORDION_TYPE[\'SINGLE\']} defaultValue="item-1">',
                  '      <Accordion.Item value="item-1" title="항목 1">내부 콘텐츠</Accordion.Item>',
                  '      <Accordion.Item value="item-2" title="항목 2">내부 콘텐츠</Accordion.Item>',
                  '    </Accordion>',
                  '  )',
                  '}'
                ]}
                notes={['type=single 이면 하나만 열리고 나머지 자동 닫힘']}
              />
            )}

            {tab === 'multiple' && (
              <ComponentSection
                title='type="multiple" — 여러 개 동시 열림'
                preview={<Sample type={ACCORDION_TYPE['MULTIPLE']} defaultValue={['item-1', 'item-2']} />}
                code={[
                  "import Accordion, {ACCORDION_TYPE} from 'm2m-uiux-react/Accordion'",
                  '',
                  'export function Example() {',
                  '  return (',
                  "    <Accordion type={ACCORDION_TYPE['MULTIPLE']} defaultValue={['item-1', 'item-2']}>",
                  '      <Accordion.Item value="item-1" title="항목 1">…</Accordion.Item>',
                  '      <Accordion.Item value="item-2" title="항목 2">…</Accordion.Item>',
                  '    </Accordion>',
                  '  )',
                  '}'
                ]}
                notes={['여러 패널을 동시에 열 수 있음']}
              />
            )}

            {tab === 'disabled' && (
              <ComponentSection
                title="disabled 항목"
                preview={
                  <div style={{width: 340}}>
                    <Accordion type={ACCORDION_TYPE['SINGLE']} defaultValue="item-1">
                      <Accordion.Item value="item-1" title="활성 항목">
                        {CONTENT}
                      </Accordion.Item>
                      <Accordion.Item value="item-2" title="비활성 항목" disabled>
                        {CONTENT}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                }
                code={[
                  "import Accordion from 'm2m-uiux-react/Accordion'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <Accordion defaultValue="item-1">',
                  '      <Accordion.Item value="item-1" title="활성 항목">…</Accordion.Item>',
                  '      <Accordion.Item value="item-2" title="비활성 항목" disabled>…</Accordion.Item>',
                  '    </Accordion>',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'defaultOpen' && (
              <ComponentSection
                title="defaultValue — 기본 열린 항목"
                preview={<Sample type={ACCORDION_TYPE['SINGLE']} defaultValue="item-2" />}
                code={[
                  "import Accordion, {ACCORDION_TYPE} from 'm2m-uiux-react/Accordion'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {/* 단일 — string */}',
                  '      <Accordion type={ACCORDION_TYPE[\'SINGLE\']} defaultValue="item-1">…</Accordion>',
                  '      {/* 다중 — string[] */}',
                  "      <Accordion type={ACCORDION_TYPE['MULTIPLE']} defaultValue={['item-1', 'item-2']}>…</Accordion>",
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['비제어 초기값, 이후 사용자 조작에 따라 변경됨']}
              />
            )}

            {tab === 'onChange' && (
              <ComponentSection
                title="value / onValueChange (제어)"
                preview={
                  <div className="demo-col" style={{width: 340}}>
                    <Accordion type={ACCORDION_TYPE['SINGLE']} value={open} onValueChange={(v) => setOpen(v as string)}>
                      <Accordion.Item value="item-1" title="항목 1">
                        {CONTENT}
                      </Accordion.Item>
                      <Accordion.Item value="item-2" title="항목 2">
                        {CONTENT}
                      </Accordion.Item>
                    </Accordion>
                    <span className="demo-hint">열린 항목: {open || '(없음)'}</span>
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import Accordion, {ACCORDION_TYPE} from 'm2m-uiux-react/Accordion'",
                  '',
                  'export function Example() {',
                  "  const [openItem, setOpenItem] = useState('item-1')",
                  '  return (',
                  "    <Accordion type={ACCORDION_TYPE['SINGLE']} value={openItem} onValueChange={setOpenItem}>",
                  '      <Accordion.Item value="item-1" title="항목 1">…</Accordion.Item>',
                  '      <Accordion.Item value="item-2" title="항목 2">…</Accordion.Item>',
                  '    </Accordion>',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames"
                preview={
                  <div style={{width: 340}}>
                    <Accordion type={ACCORDION_TYPE['SINGLE']} classNames="demo-hint">
                      <Accordion.Item value="item-1" title="항목 1">
                        {CONTENT}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                }
                code={[
                  "import Accordion, {ACCORDION_TYPE} from 'm2m-uiux-react/Accordion'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <Accordion classNames="w-full" type={ACCORDION_TYPE[\'SINGLE\']}>',
                  '      <Accordion.Item value="item-1" title="항목 1">…</Accordion.Item>',
                  '    </Accordion>',
                  '  )',
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
