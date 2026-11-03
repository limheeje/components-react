import {useState} from 'react'
import type {CSSProperties} from 'react'

import Button, {BUTTON_SIZE, BUTTON_VARIANT} from '~/components/Button'
import Tabs from '~/components/Tabs'
import ToastProvider, {showToast, TOAST_POSITION, TOAST_TYPE, TOAST_VARIANT} from '~/components/Toast'
import type {ToastType} from '~/components/Toast'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['demo', 'tab-trigger', 'type', 'position', 'dismissible', 'duration', 'action', 'variant', 'usage']

const TYPE_COLOR: Record<string, string> = {
  success: 'var(--m2m-pg-success)',
  error: 'var(--m2m-pg-error)',
  warning: 'var(--m2m-pg-warning)',
  info: 'var(--m2m-pg-info)'
}
const TYPE_LABEL: Record<string, string> = {success: '성공', error: '오류', warning: '경고', info: '정보'}

const groupLabel: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--m2m-pg-comp-text-muted)',
  marginBottom: 10
}
const callout = (tone: 'info' | 'warning'): CSSProperties => ({
  fontSize: 13,
  color: 'var(--m2m-pg-comp-text-muted)',
  padding: '10px 14px',
  borderRadius: 8,
  background: tone === 'info' ? 'var(--m2m-pg-info-bg)' : 'var(--m2m-pg-warning-bg)',
  border: `1px solid ${tone === 'info' ? 'var(--m2m-pg-info-border)' : 'var(--m2m-pg-warning-border)'}`
})

/* ── demo 탭 ── */
function ClickDemo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={callout('info')}>💡 아래 버튼을 클릭하면 화면 우측 상단에 실제 토스트가 나타납니다.</div>

      <div>
        <div style={groupLabel}>타입별 토스트</div>
        <div className="demo-row">
          {Object.values(TOAST_TYPE).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() =>
                showToast({
                  type: t,
                  message: `${TYPE_LABEL[t]} 메시지입니다.`,
                  duration: 3000,
                  position: TOAST_POSITION['TOP_RIGHT']
                })
              }
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: 'none',
                background: TYPE_COLOR[t],
                color: '#fff',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600
              }}
            >
              {TYPE_LABEL[t]} 토스트
            </button>
          ))}
        </div>
      </div>

      <div>
        <div style={groupLabel}>위치별 토스트</div>
        <div className="demo-row">
          {Object.values(TOAST_POSITION).map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() =>
                showToast({type: TOAST_TYPE['INFO'], message: `position: ${pos}`, duration: 2500, position: pos})
              }
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: '1px solid var(--m2m-pg-comp-border-sub)',
                background: 'var(--m2m-pg-comp-bg)',
                color: 'var(--m2m-pg-comp-text-sub)',
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div style={groupLabel}>액션 버튼 · 변형</div>
        <div className="demo-row">
          <Button
            size={BUTTON_SIZE['SM']}
            variant={BUTTON_VARIANT['SECONDARY']}
            onClick={() =>
              showToast({
                type: TOAST_TYPE['INFO'],
                message: '파일이 삭제되었습니다.',
                duration: 4000,
                action: {label: '실행 취소', onClick: () => showToast({type: TOAST_TYPE['SUCCESS'], message: '복원됨'})}
              })
            }
          >
            실행 취소 포함
          </Button>
          <Button
            size={BUTTON_SIZE['SM']}
            variant={BUTTON_VARIANT['GHOST']}
            onClick={() =>
              showToast({
                type: TOAST_TYPE['SUCCESS'],
                message: '저장 완료! 목록으로 이동합니다.',
                duration: 3500,
                variant: TOAST_VARIANT['LIGHT']
              })
            }
          >
            Light 변형
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ── tab-trigger 탭 ── */
const MENU: {key: string; label: string; type: ToastType; msg: string}[] = [
  {key: 'save', label: '저장', type: TOAST_TYPE['SUCCESS'], msg: '저장이 완료되었습니다.'},
  {key: 'delete', label: '삭제', type: TOAST_TYPE['ERROR'], msg: '항목이 삭제되었습니다.'},
  {key: 'warn', label: '경고', type: TOAST_TYPE['WARNING'], msg: '주의: 변경 사항이 있습니다.'},
  {key: 'info', label: '안내', type: TOAST_TYPE['INFO'], msg: '처리 중입니다. 잠시 기다려주세요.'}
]

function TabToastDemo() {
  const [active, setActive] = useState('save')
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 12, width: 420, maxWidth: '100%'}}>
      <div style={callout('warning')}>💡 탭 메뉴를 클릭하면 해당 타입의 토스트가 발생합니다.</div>
      <Tabs
        activeKey={active}
        onChange={(k) => {
          setActive(k)
          const item = MENU.find((m) => m.key === k)
          if (item) showToast({type: item.type, message: item.msg, duration: 2800})
        }}
        items={MENU.map((m) => ({
          key: m.key,
          label: m.label,
          content: (
            <div
              style={{
                padding: 16,
                background: 'var(--m2m-pg-comp-bg-subtle)',
                borderRadius: 8,
                fontSize: 13,
                color: 'var(--m2m-pg-comp-text-muted)',
                minHeight: 60
              }}
            >
              {m.label} 탭: 탭 클릭 시 {m.type} 토스트가 발생합니다.
            </div>
          )
        }))}
      />
    </div>
  )
}

export function ToastPage() {
  return (
    <>
      <ToastProvider position={TOAST_POSITION['TOP_RIGHT']} maxCount={5} />
      <PageHeader
        title="Toast Popup"
        component="Toast"
        desc="— 사용자 알림 토스트 팝업 컴포넌트. 버튼 클릭 또는 이벤트 발생 시 화면에 띄웁니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'demo' && (
              <ComponentSection
                title="인터랙티브 Demo — 버튼 클릭으로 실제 Toast 발생"
                preview={<ClickDemo />}
                code={[
                  'import ToastProvider, {showToast, TOAST_TYPE} from "m2m-uiux-react/Toast";',
                  '',
                  'const handleSave = async () => {',
                  '  try {',
                  '    await saveData();',
                  '    showToast({ type: TOAST_TYPE[\'SUCCESS\'], message: "저장되었습니다.", duration: 3000 });',
                  '  } catch {',
                  '    showToast({ type: TOAST_TYPE[\'ERROR\'], message: "저장에 실패했습니다." });',
                  '  }',
                  '};'
                ]}
                notes={['화면 우측 상단에 실제 Toast 표시', '3초 후 자동 사라짐, X 버튼으로 즉시 닫기 가능']}
              />
            )}

            {tab === 'tab-trigger' && (
              <ComponentSection
                title="탭 클릭 → Toast — 메뉴 탭 전환 시 토스트 발생"
                preview={<TabToastDemo />}
                code={[
                  "import {showToast, TOAST_TYPE} from 'm2m-uiux-react/Toast'",
                  '',
                  'const handleTabChange = (key: string) => {',
                  '  setActiveTab(key);',
                  '  if (key === "settings") showToast({ type: TOAST_TYPE[\'INFO\'], message: "설정 페이지로 이동했습니다." });',
                  '  if (key === "delete") showToast({ type: TOAST_TYPE[\'WARNING\'], message: "삭제 모드입니다. 주의하세요." });',
                  '};'
                ]}
                notes={['탭을 클릭할 때마다 해당 타입의 Toast 가 발생', '페이지 이동·모드 전환 등 상황에 맞게 활용']}
              />
            )}

            {tab === 'type' &&
              (Object.keys(TOAST_TYPE) as (keyof typeof TOAST_TYPE)[]).map((tk) => (
                <ComponentSection
                  key={tk}
                  title={`type="${TOAST_TYPE[tk]}"`}
                  preview={
                    <Button
                      size={BUTTON_SIZE['SM']}
                      onClick={() =>
                        showToast({type: TOAST_TYPE[tk], message: `${TYPE_LABEL[TOAST_TYPE[tk]]} 메시지입니다.`})
                      }
                    >
                      {TOAST_TYPE[tk]} 토스트 띄우기
                    </Button>
                  }
                  code={[
                    "import ToastProvider, {showToast, TOAST_TYPE} from 'm2m-uiux-react/Toast'",
                    '',
                    `showToast({ type: TOAST_TYPE['${tk}'], message: "${TYPE_LABEL[TOAST_TYPE[tk]]} 메시지입니다." });`
                  ]}
                />
              ))}

            {tab === 'position' &&
              (Object.keys(TOAST_POSITION) as (keyof typeof TOAST_POSITION)[]).map((pk) => (
                <ComponentSection
                  key={pk}
                  title={`position="${TOAST_POSITION[pk]}"`}
                  preview={
                    <Button
                      size={BUTTON_SIZE['SM']}
                      variant={BUTTON_VARIANT['GHOST']}
                      onClick={() =>
                        showToast({
                          type: TOAST_TYPE['SUCCESS'],
                          message: `${TOAST_POSITION[pk]} 위치!`,
                          position: TOAST_POSITION[pk],
                          duration: 2000
                        })
                      }
                    >
                      {TOAST_POSITION[pk]}
                    </Button>
                  }
                  code={[
                    "import ToastProvider, {showToast, TOAST_TYPE, TOAST_POSITION} from 'm2m-uiux-react/Toast'",
                    '',
                    `showToast({ type: TOAST_TYPE['SUCCESS'], message: "완료", position: TOAST_POSITION['${pk}'] });`
                  ]}
                />
              ))}

            {tab === 'dismissible' && (
              <>
                <ComponentSection
                  title="dismissible={true} (기본) — X 닫기 버튼"
                  preview={
                    <Button
                      size={BUTTON_SIZE['SM']}
                      onClick={() => showToast({message: 'X 버튼 있음', duration: Infinity})}
                    >
                      dismissible: true
                    </Button>
                  }
                  code={[
                    "import {showToast} from 'm2m-uiux-react/Toast'",
                    '',
                    'showToast({ message: "저장되었습니다.", dismissible: true });'
                  ]}
                />
                <ComponentSection
                  title="dismissible={false} — X 버튼 숨김"
                  preview={
                    <Button
                      size={BUTTON_SIZE['SM']}
                      variant={BUTTON_VARIANT['GHOST']}
                      onClick={() =>
                        showToast({message: 'X 버튼 없음 (2초 후 자동)', dismissible: false, duration: 2000})
                      }
                    >
                      dismissible: false
                    </Button>
                  }
                  code={[
                    "import {showToast} from 'm2m-uiux-react/Toast'",
                    '',
                    'showToast({ message: "저장되었습니다.", dismissible: false });'
                  ]}
                />
              </>
            )}

            {tab === 'duration' && (
              <>
                <ComponentSection
                  title="duration — 자동 닫힘 (ms)"
                  preview={
                    <Button
                      size={BUTTON_SIZE['SM']}
                      onClick={() => showToast({message: '1초 후 사라짐', duration: 1000})}
                    >
                      duration 1000
                    </Button>
                  }
                  code={[
                    "import {showToast} from 'm2m-uiux-react/Toast'",
                    '',
                    'showToast({ message: "저장되었습니다.", duration: 1000 });'
                  ]}
                />
                <ComponentSection
                  title="duration Infinity — 자동으로 닫히지 않음"
                  preview={
                    <Button
                      size={BUTTON_SIZE['SM']}
                      variant={BUTTON_VARIANT['GHOST']}
                      onClick={() =>
                        showToast({
                          type: TOAST_TYPE['WARNING'],
                          message: '자동으로 닫히지 않음 (X 클릭)',
                          duration: Infinity
                        })
                      }
                    >
                      duration Infinity
                    </Button>
                  }
                  code={[
                    "import {showToast} from 'm2m-uiux-react/Toast'",
                    '',
                    'showToast({ message: "저장되었습니다.", duration: Infinity });'
                  ]}
                />
              </>
            )}

            {tab === 'action' && (
              <ComponentSection
                title="action — 액션 버튼"
                preview={
                  <Button
                    size={BUTTON_SIZE['SM']}
                    onClick={() =>
                      showToast({
                        type: TOAST_TYPE['INFO'],
                        message: '파일이 삭제되었습니다.',
                        duration: 5000,
                        action: {
                          label: '실행 취소',
                          onClick: () => showToast({type: TOAST_TYPE['SUCCESS'], message: '복원됨'})
                        }
                      })
                    }
                  >
                    실행 취소 포함
                  </Button>
                }
                code={[
                  'showToast({',
                  '  message: "파일이 삭제되었습니다.",',
                  '  action: { label: "실행 취소", onClick: () => restore() },',
                  '});'
                ]}
                notes={['action.onClick 실행 후 토스트가 자동으로 닫힙니다']}
              />
            )}

            {tab === 'variant' && (
              <>
                <ComponentSection
                  title='variant="filled" (기본)'
                  preview={
                    <Button
                      size={BUTTON_SIZE['SM']}
                      onClick={() =>
                        showToast({type: TOAST_TYPE['SUCCESS'], message: 'filled', variant: TOAST_VARIANT['FILLED']})
                      }
                    >
                      filled
                    </Button>
                  }
                  code={[
                    "import ToastProvider, {showToast, TOAST_VARIANT} from 'm2m-uiux-react/Toast'",
                    '',
                    'showToast({ message: "저장되었습니다.", variant: TOAST_VARIANT[\'FILLED\'] });'
                  ]}
                />
                <ComponentSection
                  title='variant="light" — 흰 배경 + 컬러 보더'
                  preview={
                    <Button
                      size={BUTTON_SIZE['SM']}
                      variant={BUTTON_VARIANT['GHOST']}
                      onClick={() =>
                        showToast({type: TOAST_TYPE['SUCCESS'], message: 'light', variant: TOAST_VARIANT['LIGHT']})
                      }
                    >
                      light
                    </Button>
                  }
                  code={[
                    "import ToastProvider, {showToast, TOAST_VARIANT} from 'm2m-uiux-react/Toast'",
                    '',
                    'showToast({ message: "저장되었습니다.", variant: TOAST_VARIANT[\'LIGHT\'] });'
                  ]}
                  notes={['light = 흰 배경 + 컬러 보더 (좌측 4px 강조)']}
                />
              </>
            )}

            {tab === 'usage' && (
              <ComponentSection
                title="설정 — ToastProvider"
                preview={<span className="demo-hint">앱 최상단에 한 번만 배치하면 됩니다.</span>}
                code={[
                  '// App.tsx',
                  "import ToastProvider, {TOAST_POSITION} from 'm2m-uiux-react/Toast'",
                  '',
                  'export function App() {',
                  '  return (',
                  "    <ToastProvider position={TOAST_POSITION['TOP_RIGHT']} maxCount={5}>",
                  '      <Routes />',
                  '    </ToastProvider>',
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
