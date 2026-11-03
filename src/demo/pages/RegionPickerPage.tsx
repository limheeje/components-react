import {useState} from 'react'

import Button from '~/components/Button'
import RegionPicker from '~/components/RegionPicker'
import type {RegionValue} from '~/components/RegionPicker'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['default', 'single', 'value', 'events']

// multiple 기본값이 true 라, prop 없이 써도 다중 선택 UI(체크박스/칩/적용하기)가 노출된다.
function DefaultDemo() {
  const [open, setOpen] = useState(false)
  const [regions, setRegions] = useState<RegionValue[]>([])
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {regions.length > 0 ? `${regions.length}개 지역 선택됨` : '지역 선택'}
      </Button>
      <RegionPicker
        open={open}
        value={regions}
        onChange={(v) => setRegions(v as RegionValue[])}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

function SingleDemo() {
  const [open, setOpen] = useState(false)
  const [region, setRegion] = useState<RegionValue | null>(null)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{region ? `${region.province} ${region.city}` : '지역 선택'}</Button>
      <RegionPicker
        open={open}
        multiple={false}
        value={region}
        onChange={(v) => setRegion(v as RegionValue)}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

function PrefilledDemo() {
  const [open, setOpen] = useState(false)
  const [region, setRegion] = useState<RegionValue | null>({province: '전남', city: '보성군'})
  return (
    <>
      <Button onClick={() => setOpen(true)}>{`${region!.province} ${region!.city}`}</Button>
      <RegionPicker
        open={open}
        multiple={false}
        value={region}
        onChange={(v) => setRegion(v as RegionValue)}
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
      <Button onClick={() => setOpen(true)}>지역 선택</Button>
      <span className="demo-hint" style={{marginLeft: 8}}>
        이벤트: {log}
      </span>
      <RegionPicker
        open={open}
        multiple={false}
        onClose={() => setOpen(false)}
        onConfirm={(v) => {
          const one = v as RegionValue
          setLog(`confirm → ${one.province} ${one.city}`)
        }}
      />
    </>
  )
}

export function RegionPickerPage() {
  return (
    <div>
      <PageHeader
        title="RegionPicker"
        component="RegionPicker"
        desc="— 시/도 → 시군구 2단 선택 바텀시트(상단 15px 여백). 내부적으로 Dialog(variant='drawer') 사용."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'default' && (
              <ComponentSection
                title="기본 사용 — multiple 기본값 true (다중 선택)"
                preview={<DefaultDemo />}
                code={[
                  "import {useState} from 'react'",
                  "import RegionPicker, {type RegionValue} from 'm2m-uiux-react/RegionPicker'",
                  '',
                  'export function Example() {',
                  '  const [open, setOpen] = useState(false)',
                  '  const [regions, setRegions] = useState<RegionValue[]>([])',
                  '  return (',
                  '    <>',
                  '      <Button onClick={() => setOpen(true)}>',
                  "        {regions.length > 0 ? `${regions.length}개 지역 선택됨` : '지역 선택'}",
                  '      </Button>',
                  '      <RegionPicker',
                  '        open={open}',
                  '        value={regions}',
                  '        onChange={(v) => setRegions(v as RegionValue[])}',
                  '        onClose={() => setOpen(false)}',
                  '      />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  'multiple prop 을 생략하면 기본값 true — 별도 설정 없이 다중 선택 UI(체크박스/칩/적용하기)가 노출됨',
                  '시군구 항목을 클릭할 때마다 체크박스가 토글 — 다른 시/도로 이동해도 이전 선택은 유지 (좌측 목록에 개수 뱃지 표시)',
                  '하단에 선택된 항목이 시/도 > 시군구 칩으로 나열되고, 칩의 X 로 개별 해제 · 초기화 버튼으로 전체 해제',
                  '적용하기 클릭 시 onChange / onConfirm 으로 RegionValue[] 전달'
                ]}
              />
            )}

            {tab === 'single' && (
              <ComponentSection
                title="multiple={false} — 단일 선택"
                preview={<SingleDemo />}
                code={[
                  'const [region, setRegion] = useState<RegionValue | null>(null)',
                  '',
                  '<RegionPicker',
                  '  open={open}',
                  '  multiple={false}',
                  '  value={region}',
                  '  onChange={(v) => setRegion(v as RegionValue)}',
                  '  onClose={() => setOpen(false)}',
                  '/>'
                ]}
                notes={[
                  '시군구를 1개만 고를 수 있고, 다시 선택하면 이전 선택을 대체함 (체크박스/칩 UI 없이 하이라이트만)',
                  '확정 시 onChange + onConfirm 이 호출되고 이어서 onClose'
                ]}
              />
            )}

            {tab === 'value' && (
              <ComponentSection
                title="value — 초기 선택 상태 복원 (단일 선택)"
                preview={<PrefilledDemo />}
                code={[
                  "const [region, setRegion] = useState<RegionValue | null>({ province: '전남', city: '보성군' })",
                  '',
                  '<RegionPicker open={open} multiple={false} value={region} onChange={(v) => setRegion(v as RegionValue)} onClose={() => setOpen(false)} />'
                ]}
                notes={['다시 열면 헤더 설명(전남 > 보성군)과 함께 기존 선택이 그대로 하이라이트됨']}
              />
            )}

            {tab === 'events' && (
              <ComponentSection
                title="onClose / onConfirm 콜백 (단일 선택)"
                preview={<EventsDemo />}
                code={[
                  '<RegionPicker',
                  '  open={open}',
                  '  multiple={false}',
                  '  onClose={() => setOpen(false)}',
                  '  onConfirm={(v) => console.log(v.province, v.city)}',
                  '/>'
                ]}
                notes={['onClose 는 확정 없이 닫힐 때도 호출 (뒤로가기 · X 버튼 · 헤더 스와이프 · 배경 클릭 · ESC)']}
              />
            )}
          </>
        )}
      </PropTabs>
    </div>
  )
}
