import {useState} from 'react'

import Button, {BUTTON_VARIANT} from '~/components/Button'
import Dialog, {
  DialogProvider,
  DIALOG_DIRECTION,
  DIALOG_SIZE,
  DIALOG_TONE,
  DIALOG_VARIANT,
  alertDialog,
  confirmDialog,
  openDialog
} from '~/components/Dialog'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = [
  'declarative',
  'size',
  'drawer',
  'direction',
  'swipeToClose',
  'lockScroll',
  'a11y',
  'openDialog',
  'confirm',
  'alert'
]

function DrawerDemo({
  direction = 'bottom',
  swipeToClose,
  handle,
  lockScroll
}: {
  direction?: 'top' | 'right' | 'bottom' | 'left'
  swipeToClose?: boolean
  handle?: boolean
  lockScroll?: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>drawer 열기 ({direction})</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        variant={DIALOG_VARIANT['DRAWER']}
        direction={direction}
        swipeToClose={swipeToClose}
        handle={handle}
        lockScroll={lockScroll}
        title="빠른 필터"
        description="헤더 또는 핸들을 방향 반대로 스와이프하면 닫힙니다."
        footer={
          <Button variant={BUTTON_VARIANT['SECONDARY']} onClick={() => setOpen(false)}>
            적용
          </Button>
        }
      >
        <div style={{display: 'grid', gap: 8}}>
          <p>여기에 폼/리스트 등 임의 콘텐츠를 넣습니다.</p>
          <p style={{color: 'var(--m2m-pg-comp-text-muted)'}}>
            드래그하는 동안 오버레이가 점점 투명해지고, 임계값(closeThreshold, 기본 0.45)을 넘기면 닫힙니다.
          </p>
        </div>
      </Dialog>
    </>
  )
}

function DeclarativeDemo({size}: {size?: 'sm' | 'md' | 'lg' | 'full'}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="회원 삭제"
        description="이 작업은 되돌릴 수 없습니다."
        size={size}
        footer={
          <>
            <Button variant={BUTTON_VARIANT['GHOST']} onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant={BUTTON_VARIANT['SECONDARY']} onClick={() => setOpen(false)}>
              삭제
            </Button>
          </>
        }
      >
        정말 이 회원을 삭제하시겠어요? 관련 데이터가 모두 제거됩니다.
      </Dialog>
    </>
  )
}

function ImperativeDemo({kind}: {kind: 'open' | 'confirm' | 'alert'}) {
  const [log, setLog] = useState('(없음)')

  const trigger =
    kind === 'open' ? (
      <Button
        onClick={() =>
          openDialog({
            title: '프로필',
            content: (
              <div>
                <p>임의 콘텐츠를 넣을 수 있습니다.</p>
                <p style={{color: 'var(--m2m-pg-comp-text-muted)'}}>openDialog() 는 id 를 반환합니다.</p>
              </div>
            ),
            size: DIALOG_SIZE['MD']
          })
        }
      >
        openDialog
      </Button>
    ) : kind === 'confirm' ? (
      <Button
        variant={BUTTON_VARIANT['SECONDARY']}
        onClick={async () => {
          const ok = await confirmDialog({
            title: '삭제 확인',
            message: '3개 항목을 삭제할까요?',
            tone: DIALOG_TONE['DANGER'],
            confirmText: '삭제'
          })
          setLog(`confirm → ${ok}`)
        }}
      >
        confirmDialog
      </Button>
    ) : (
      <Button
        variant={BUTTON_VARIANT['GHOST']}
        onClick={async () => {
          await alertDialog({title: '알림', message: '저장되었습니다.'})
          setLog('alert → 확인됨')
        }}
      >
        alertDialog
      </Button>
    )

  return (
    <DialogProvider>
      <div className="demo-col">
        <div className="demo-row" style={{gap: 8, flexWrap: 'wrap'}}>
          {trigger}
        </div>
        {kind !== 'open' && <span className="demo-hint">결과: {log}</span>}
      </div>
    </DialogProvider>
  )
}

export function DialogPage() {
  return (
    <>
      <PageHeader
        title="Dialog"
        component="Dialog"
        desc="— 모달. 선언형 <Dialog open onClose> + 명령형 openDialog / confirmDialog / alertDialog."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'declarative' && (
              <ComponentSection
                title="선언형 — <Dialog open onClose>"
                preview={<DeclarativeDemo />}
                code={[
                  "import {useState} from 'react'",
                  "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
                  "import Dialog from 'm2m-uiux-react/Dialog'",
                  '',
                  'export function Example() {',
                  '  const [open, setOpen] = useState(false)',
                  '  return (',
                  '    <>',
                  '      <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>',
                  '      <Dialog',
                  '        open={open}',
                  '        onClose={() => setOpen(false)}',
                  '        title="회원 삭제"',
                  '        description="이 작업은 되돌릴 수 없습니다."',
                  '        footer={',
                  '          <>',
                  "            <Button variant={BUTTON_VARIANT['GHOST']} onClick={() => setOpen(false)}>취소</Button>",
                  "            <Button variant={BUTTON_VARIANT['SECONDARY']} onClick={() => setOpen(false)}>삭제</Button>",
                  '          </>',
                  '        }',
                  '      >',
                  '        정말 이 회원을 삭제하시겠어요?',
                  '      </Dialog>',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['backdrop 클릭 · ESC · X 버튼으로 onClose', '스크롤 잠금 자동']}
              />
            )}

            {tab === 'size' && (
              <>
                {(['SM', 'MD', 'LG', 'FULL'] as const).map((s) => (
                  <ComponentSection
                    key={s}
                    title={`size="${DIALOG_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''}`}
                    preview={<DeclarativeDemo size={DIALOG_SIZE[s]} />}
                    code={[
                      "import {useState} from 'react'",
                      "import Dialog, {DIALOG_SIZE} from 'm2m-uiux-react/Dialog'",
                      '',
                      'export function Example() {',
                      '  const [open, setOpen] = useState(false)',
                      '  return (',
                      `    <Dialog open={open} onClose={() => setOpen(false)} size={DIALOG_SIZE['${s}']} title="제목">`,
                      '      본문',
                      '    </Dialog>',
                      '  )',
                      '}'
                    ]}
                  />
                ))}
              </>
            )}

            {tab === 'drawer' && (
              <ComponentSection
                title='variant="drawer" — 아래에서 올라오는 패널'
                preview={<DrawerDemo direction={DIALOG_DIRECTION['BOTTOM']} />}
                code={[
                  "import {useState} from 'react'",
                  "import Button from 'm2m-uiux-react/Button'",
                  "import Dialog, {DIALOG_VARIANT, DIALOG_DIRECTION} from 'm2m-uiux-react/Dialog'",
                  '',
                  'export function Example() {',
                  '  const [open, setOpen] = useState(false)',
                  '  return (',
                  '    <>',
                  '      <Button onClick={() => setOpen(true)}>drawer 열기</Button>',
                  '      <Dialog',
                  '        open={open}',
                  '        onClose={() => setOpen(false)}',
                  "        variant={DIALOG_VARIANT['DRAWER']}",
                  "        direction={DIALOG_DIRECTION['BOTTOM']}",
                  '        title="빠른 필터"',
                  '      >',
                  '        본문',
                  '      </Dialog>',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  'variant 로 기존 모달과 동일한 컴포넌트에서 형태만 전환 (새 컴포넌트 아님)',
                  '진입/이탈은 cubic-bezier(.22,1,.36,1) 감속으로 미끄러짐',
                  'handle(상단 grab 바)은 기본 표시, handle={false} 로 숨김'
                ]}
              />
            )}

            {tab === 'direction' && (
              <>
                {(['BOTTOM', 'TOP', 'LEFT', 'RIGHT'] as const).map((s) => (
                  <ComponentSection
                    key={s}
                    title={`direction="${DIALOG_DIRECTION[s]}"${s === 'BOTTOM' ? ' (기본)' : ''}`}
                    preview={<DrawerDemo direction={DIALOG_DIRECTION[s]} />}
                    code={[
                      "import {useState} from 'react'",
                      "import Dialog, {DIALOG_VARIANT, DIALOG_DIRECTION} from 'm2m-uiux-react/Dialog'",
                      '',
                      'export function Example() {',
                      '  const [open, setOpen] = useState(false)',
                      '  return (',
                      `    <Dialog open={open} onClose={() => setOpen(false)} variant={DIALOG_VARIANT['DRAWER']} direction={DIALOG_DIRECTION['${s}']} title="제목">`,
                      '      본문',
                      '    </Dialog>',
                      '  )',
                      '}'
                    ]}
                    notes={
                      s === 'LEFT' || s === 'RIGHT'
                        ? ['left/right 폭은 size 로 조정 (sm 320 / md 420 / lg 560 / full 100%)']
                        : ['top/bottom 은 가로 전체 폭']
                    }
                  />
                ))}
              </>
            )}

            {tab === 'swipeToClose' && (
              <>
                <ComponentSection
                  title="swipeToClose — 등장 방향의 반대로 스와이프하면 닫힘 (기본 true)"
                  preview={<DrawerDemo direction={DIALOG_DIRECTION['BOTTOM']} swipeToClose />}
                  code={[
                    "import {useState} from 'react'",
                    "import Dialog, {DIALOG_VARIANT, DIALOG_DIRECTION} from 'm2m-uiux-react/Dialog'",
                    '',
                    'export function Example() {',
                    '  const [open, setOpen] = useState(false)',
                    '  return (',
                    '    <Dialog',
                    '      open={open}',
                    '      onClose={() => setOpen(false)}',
                    "      variant={DIALOG_VARIANT['DRAWER']}",
                    "      direction={DIALOG_DIRECTION['BOTTOM']}",
                    '      swipeToClose',
                    '      closeThreshold={0.45}',
                    '      title="제목"',
                    '    >본문</Dialog>',
                    '  )',
                    '}'
                  ]}
                  notes={[
                    '헤더 또는 핸들에서 드래그 → 패널이 손가락을 따라 이동',
                    '드래그 진행도만큼 오버레이 opacity 가 낮아짐 (움직임에 따라 투명 → 사라짐)',
                    'closeThreshold(패널 길이 대비 비율) 초과 시 닫힘, 미만이면 원위치로 스프링백'
                  ]}
                />
                <ComponentSection
                  title="swipeToClose={false} — 스와이프 비활성"
                  preview={<DrawerDemo direction={DIALOG_DIRECTION['RIGHT']} swipeToClose={false} />}
                  code={[
                    "import {useState} from 'react'",
                    "import Dialog, {DIALOG_VARIANT, DIALOG_DIRECTION} from 'm2m-uiux-react/Dialog'",
                    '',
                    'export function Example() {',
                    '  const [open, setOpen] = useState(false)',
                    '  return (',
                    "    <Dialog open={open} onClose={() => setOpen(false)} variant={DIALOG_VARIANT['DRAWER']} direction={DIALOG_DIRECTION['RIGHT']} swipeToClose={false} title=\"제목\">본문</Dialog>",
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'lockScroll' && (
              <>
                <ComponentSection
                  title="lockScroll (기본 true) — 열려 있는 동안 body 스크롤 잠금"
                  preview={<DeclarativeDemo />}
                  code={[
                    "import {useState} from 'react'",
                    "import Dialog from 'm2m-uiux-react/Dialog'",
                    '',
                    'export function Example() {',
                    '  const [open, setOpen] = useState(false)',
                    '  return <Dialog open={open} onClose={() => setOpen(false)} lockScroll title="제목">본문</Dialog>',
                    '}'
                  ]}
                  notes={[
                    '모달이 떠 있을 때 뒤 페이지 스크롤이 조작되지 않습니다',
                    '스크롤바 폭만큼 body padding-right 을 보정해 레이아웃 밀림 방지',
                    '여러 다이얼로그가 열려도 잠금 유지, 마지막이 닫힐 때 해제'
                  ]}
                />
                <ComponentSection
                  title="lockScroll={false} — 뒤 스크롤 허용"
                  preview={<DrawerDemo direction={DIALOG_DIRECTION['BOTTOM']} lockScroll={false} />}
                  code={[
                    "import {useState} from 'react'",
                    "import Dialog, {DIALOG_VARIANT, DIALOG_DIRECTION} from 'm2m-uiux-react/Dialog'",
                    '',
                    'export function Example() {',
                    '  const [open, setOpen] = useState(false)',
                    '  return (',
                    "    <Dialog open={open} onClose={() => setOpen(false)} variant={DIALOG_VARIANT['DRAWER']} direction={DIALOG_DIRECTION['BOTTOM']} lockScroll={false} title=\"제목\">본문</Dialog>",
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'a11y' && (
              <ComponentSection
                title="접근성 — 포커스 트랩 · 복원"
                preview={<DeclarativeDemo />}
                code={[
                  '// 별도 설정 없이 기본 동작',
                  '// 1) 열리면 포커스가 패널로 이동',
                  '// 2) Tab / Shift+Tab 이 패널 안에서만 순환',
                  '// 3) 닫히면 열기 직전 요소로 포커스 복원',
                  '// 4) role="dialog" aria-modal="true", ESC 로 닫기'
                ]}
                notes={['footer 버튼까지 논리적 탭 순서 유지', 'title 이 없으면 ariaLabel 로 이름 제공']}
              />
            )}

            {tab === 'openDialog' && (
              <ComponentSection
                title="openDialog — 임의 콘텐츠 모달"
                preview={<ImperativeDemo kind="open" />}
                code={[
                  "import {DialogProvider, openDialog, closeDialog, DIALOG_SIZE} from 'm2m-uiux-react/Dialog'",
                  '',
                  '// 1) 앱 최상단을 Provider 로 한 번 감싼다',
                  '//    <DialogProvider><App /></DialogProvider>',
                  '',
                  '// 2) 어디서든 명령형으로 호출',
                  'const id = openDialog({',
                  '  title: "상세",',
                  '  content: <p>임의 콘텐츠</p>,',
                  "  size: DIALOG_SIZE['LG'],",
                  '})',
                  'closeDialog(id)'
                ]}
              />
            )}

            {tab === 'confirm' && (
              <ComponentSection
                title="confirmDialog — Promise<boolean>"
                preview={<ImperativeDemo kind="confirm" />}
                code={[
                  "import {confirmDialog, DIALOG_TONE} from 'm2m-uiux-react/Dialog'",
                  '',
                  'const ok = await confirmDialog({',
                  '  title: "삭제 확인",',
                  '  message: "3개 항목을 삭제할까요?",',
                  "  tone: DIALOG_TONE['DANGER'],",
                  '  confirmText: "삭제",',
                  '});',
                  'if (ok) await remove();'
                ]}
                notes={['확인 → true, 취소·ESC → false', "tone=DIALOG_TONE['DANGER'] → 확인 버튼 빨강"]}
              />
            )}

            {tab === 'alert' && (
              <ComponentSection
                title="alertDialog — Promise<void>"
                preview={<ImperativeDemo kind="alert" />}
                code={[
                  "import {alertDialog} from 'm2m-uiux-react/Dialog'",
                  '',
                  'await alertDialog({ title: "알림", message: "저장되었습니다." })'
                ]}
                notes={['확인 버튼 1개, X 없음', 'title 을 주면 헤더 타이틀이 표시됨 (생략 시 본문만)']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
