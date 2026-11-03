import {useState} from 'react'

import Button from '~/components/Button'
import Filter, {DEFAULT_FILTER_SECTIONS} from '~/components/Filter'
import type {FilterValue} from '~/components/Filter'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['default', 'events']

function countActive(value: FilterValue): number {
  return Object.values(value).reduce((sum: number, v) => {
    if (Array.isArray(v)) return sum + v.length
    if (v && typeof v === 'object') return sum + (v.min || v.max ? 1 : 0)
    return sum + (v ? 1 : 0)
  }, 0)
}

function DefaultDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<FilterValue>({})
  const active = countActive(value)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{active > 0 ? `필터 (${active})` : '필터'}</Button>
      <Filter
        open={open}
        value={value}
        sections={DEFAULT_FILTER_SECTIONS}
        onChange={setValue}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

function EventsDemo() {
  const [open, setOpen] = useState(false)
  const [log, setLog] = useState('(없음)')
  return (
    <>
      <Button onClick={() => setOpen(true)}>필터</Button>
      <span className="demo-hint" style={{marginLeft: 8}}>
        이벤트: {log}
      </span>
      <Filter
        open={open}
        sections={DEFAULT_FILTER_SECTIONS}
        onClose={() => setOpen(false)}
        onConfirm={(v) => setLog(`confirm → 활성 필터 ${countActive(v)}개`)}
      />
    </>
  )
}

export function FilterPage() {
  return (
    <div>
      <PageHeader
        title="Filter"
        component="Filter"
        desc="— e-커머스 목록 필터 풀팝업. RegionPicker 와 동일하게 Dialog(variant='drawer')를 사용하는 상단 여백 있는 바텀시트."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'default' && (
              <ComponentSection
                title="기본 사용 — sections 는 부모(소비 앱)가 필수로 전달"
                preview={<DefaultDemo />}
                code={[
                  "import {useState} from 'react'",
                  "import Filter, {DEFAULT_FILTER_SECTIONS, type FilterValue} from 'm2m-uiux-react/Filter'",
                  '',
                  'export function Example() {',
                  '  const [open, setOpen] = useState(false)',
                  '  const [value, setValue] = useState<FilterValue>({})',
                  '  // sections 는 필수 prop — 컴포넌트가 항목을 정하지 않음. 예시로 내장 데모 구성을 그대로 사용',
                  '  const sections = DEFAULT_FILTER_SECTIONS',
                  '  return (',
                  '    <>',
                  '      <Button onClick={() => setOpen(true)}>필터</Button>',
                  '      <Filter',
                  '        open={open}',
                  '        value={value}',
                  '        sections={sections}',
                  '        onChange={setValue}',
                  '        onClose={() => setOpen(false)}',
                  '      />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  'Filter 컴포넌트 자체는 필터 항목(브랜드~가격대)을 전혀 정의하지 않고, sections prop 을 필수로 받아 렌더만 담당',
                  '이 데모는 참고용으로 내장 DEFAULT_FILTER_SECTIONS(판매 방식·브랜드·상품 상태·배송 방법·반품 가능·보증 기간·테스트 여부·가격대)를 그대로 전달',
                  "브랜드처럼 옵션이 많은 섹션은 type: 'brand' 로 선언하면 검색창 + 첫 글자 탐색 탭 + 페이지네이션이 자동으로 붙음",
                  '적용하기 클릭 시 onChange / onConfirm 으로 FilterValue 전달, 초기화 버튼으로 전체 선택 해제'
                ]}
              />
            )}

            {tab === 'events' && (
              <ComponentSection
                title="onClose / onConfirm 콜백"
                preview={<EventsDemo />}
                code={[
                  '<Filter',
                  '  open={open}',
                  '  sections={sections}',
                  '  onClose={() => setOpen(false)}',
                  '  onConfirm={(v) => console.log(v)}',
                  '/>'
                ]}
                notes={['onClose 는 확정 없이 닫힐 때도 호출 (X 버튼 · 헤더 스와이프 · 배경 클릭 · ESC)']}
              />
            )}
          </>
        )}
      </PropTabs>
    </div>
  )
}
