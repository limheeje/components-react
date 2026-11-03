import {useCallback, useEffect, useRef, useState, useSyncExternalStore} from 'react'
import type {PointerEvent as ReactPointerEvent, ReactNode} from 'react'
import {createPortal} from 'react-dom'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {DIALOG_DEFAULT, DIALOG_KIND, DIALOG_VARIANT} from '~/components/Dialog/Dialog.constant'
import {
  closeDialog,
  getDialogServerSnapshot,
  getDialogSnapshot,
  resolveDialog,
  subscribeDialogs
} from '~/components/Dialog/Dialog.store'
import type {
  DialogInstance,
  DialogProps,
  DialogProviderProps,
  DialogDirection,
  DialogSize,
  DialogTone,
  DialogVariant
} from '~/components/Dialog/Dialog.type'
import styles from '~/components/Dialog/Dialog.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

// 스와이프 속도(px/ms) 가 이 값을 넘고 최소 이동량을 채우면, 임계값(closeThreshold) 거리에
// 못 미쳐도 "빠르게 내림/치기" 로 간주해 닫는다. iOS 시트류가 쓰는 flick 감지와 동일한 개념.
const FLICK_VELOCITY = 0.5 // px/ms (=500px/s)
const FLICK_MIN_OFFSET = 24 // px — 미세한 흔들림이 flick 으로 오인되지 않도록 하는 최소 이동량

// ── body 스크롤 잠금 (lockScroll 을 켠 다이얼로그 수만 카운트) ──────────
let lockCount = 0
let prevOverflow = ''

function acquireScrollLock() {
  if (lockCount === 0) {
    prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  lockCount += 1
}
function releaseScrollLock() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = prevOverflow
  }
}

/** 드로어가 나오는 방향 → 닫히는 축과 부호 */
function axisFor(direction: DialogDirection): {axis: 'x' | 'y'; sign: 1 | -1} {
  switch (direction) {
    case 'top':
      return {axis: 'y', sign: -1}
    case 'left':
      return {axis: 'x', sign: -1}
    case 'right':
      return {axis: 'x', sign: 1}
    default:
      return {axis: 'y', sign: 1}
  }
}

interface ShellProps {
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  footer?: ReactNode
  size: DialogSize
  variant: DialogVariant
  direction: DialogDirection
  lockScroll: boolean
  handle: boolean
  swipeToClose: boolean
  closeThreshold: number
  closeOnBackdrop: boolean
  closeOnEsc: boolean
  hideClose: boolean
  ariaLabel?: string
  classNames?: string | string[]
  children?: ReactNode
}

function DialogShell({
  onClose,
  title,
  description,
  footer,
  size,
  variant,
  direction,
  lockScroll,
  handle,
  swipeToClose,
  closeThreshold,
  closeOnBackdrop,
  closeOnEsc,
  hideClose,
  ariaLabel,
  classNames,
  children
}: ShellProps) {
  const isDrawer = variant === DIALOG_VARIANT.DRAWER
  const {axis, sign} = axisFor(direction)

  const panelRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{x: number; y: number} | null>(null)
  const lastMove = useRef<{time: number; offset: number} | null>(null)
  const velocity = useRef(0)
  const exitTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [drag, setDrag] = useState<{offset: number; active: boolean}>({offset: 0, active: false})

  // 1) body 스크롤 잠금 (해제는 언마운트 = 애니메이션 종료 후)
  useEffect(() => {
    if (!lockScroll) return
    acquireScrollLock()
    return releaseScrollLock
  }, [lockScroll])

  // 2) 스크롤 잠금 레이아웃이 반영된 뒤에야 진입 애니메이션 시작 (더블 rAF).
  //    그 전까지 오버레이 opacity 0 · 패널은 화면 밖/투명이라 아무것도 안 보임.
  useEffect(() => {
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [])

  // 닫기 요청 — 드로어는 퇴장 애니메이션이 끝난 뒤 onClose (그 후 언마운트 → 스크롤 복원)
  const requestClose = useCallback(() => {
    if (exiting) return
    if (!isDrawer) {
      onClose()
      return
    }
    setExiting(true)
    exitTimer.current = setTimeout(onClose, 340)
  }, [exiting, isDrawer, onClose])

  useEffect(() => () => clearTimeout(exitTimer.current), [])

  // ESC
  useEffect(() => {
    if (!closeOnEsc) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeOnEsc, requestClose])

  // 포커스 트랩 + 열기 전 포커스 복원
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const restore = document.activeElement as HTMLElement | null
    panel.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const nodes = panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (nodes.length === 0) {
        e.preventDefault()
        return
      }
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    panel.addEventListener('keydown', onKeyDown)
    return () => {
      panel.removeEventListener('keydown', onKeyDown)
      restore?.focus?.()
    }
  }, [])

  // ── 스와이프 제스처 (드로어) ──────────────────────────────
  const panelExtent = () => {
    const el = panelRef.current
    if (!el) return 1
    return axis === 'y' ? el.offsetHeight : el.offsetWidth
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (!isDrawer || !swipeToClose) return
    if ((e.target as HTMLElement).closest('button,a,input,textarea,select')) return
    dragStart.current = {x: e.clientX, y: e.clientY}
    lastMove.current = {time: e.timeStamp, offset: 0}
    velocity.current = 0
    e.currentTarget.setPointerCapture(e.pointerId)
    setDrag({offset: 0, active: true})
  }
  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (!dragStart.current) return
    const raw = axis === 'y' ? e.clientY - dragStart.current.y : e.clientX - dragStart.current.x
    const offset = Math.max(0, raw * sign)
    setDrag({offset, active: true})
    if (lastMove.current) {
      const dt = e.timeStamp - lastMove.current.time
      // 너무 촘촘한 샘플(dt≈0)은 속도가 튀므로 스킵하고 다음 샘플에서 계산
      if (dt > 4) {
        velocity.current = (offset - lastMove.current.offset) / dt
        lastMove.current = {time: e.timeStamp, offset}
      }
    }
  }
  const onPointerUp = () => {
    if (!dragStart.current) return
    dragStart.current = null
    const progress = drag.offset / panelExtent()
    // 속도(px/ms) 가 FLICK_VELOCITY 를 넘고 최소 이동량을 채우면, closeThreshold 거리에
    // 못 미쳐도 "빠르게 내림/치기" 로 간주해 닫는다 (iOS 시트류가 쓰는 flick 감지와 동일한 개념).
    const isFlick = velocity.current >= FLICK_VELOCITY && drag.offset >= FLICK_MIN_OFFSET
    setDrag({offset: 0, active: false})
    if (progress >= closeThreshold || isFlick) requestClose()
  }

  // ── 스타일 계산 ──────────────────────────────────────────
  const translate = (v: string) => (axis === 'y' ? `translateY(${v})` : `translateX(${v})`)

  let panelStyle: React.CSSProperties | undefined
  if (isDrawer) {
    let transform: string
    if (!entered || exiting) transform = translate(`${sign * 100}%`)
    else if (drag.active) transform = translate(`${sign * drag.offset}px`)
    else transform = translate('0')
    panelStyle = {transform, transition: drag.active ? 'none' : undefined}
  }

  let overlayOpacity = 1
  if (!entered || exiting) overlayOpacity = 0
  else if (drag.active) overlayOpacity = Math.max(0, 1 - drag.offset / panelExtent())

  const draggable = isDrawer && swipeToClose

  return (
    <div
      className={cx(
        styles.bsDialogBackdrop,
        isDrawer && styles.bsDialogVariantDrawer,
        isDrawer && styles[`bsDialogDirection${cap(direction)}`],
        drag.active && styles['is-dragging']
      )}
      onMouseDown={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) requestClose()
      }}
    >
      <div className={styles.bsDialogOverlay} style={{opacity: overlayOpacity}} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title == null ? ariaLabel : undefined}
        tabIndex={-1}
        style={panelStyle}
        className={cx(
          styles.bsDialogPanel,
          styles[`bsDialogSize${cap(size)}`],
          entered && !exiting && styles['is-open'],
          resolveClassNames(classNames)
        )}
      >
        {isDrawer && handle && (
          <div
            className={styles.bsDialogHandleZone}
            aria-hidden="true"
            onPointerDown={draggable ? onPointerDown : undefined}
            onPointerMove={draggable ? onPointerMove : undefined}
            onPointerUp={draggable ? onPointerUp : undefined}
            onPointerCancel={draggable ? onPointerUp : undefined}
          >
            <span className={styles.bsDialogHandle} />
          </div>
        )}

        {(title != null || !hideClose) && (
          <div
            className={styles.bsDialogHeader}
            onPointerDown={draggable ? onPointerDown : undefined}
            onPointerMove={draggable ? onPointerMove : undefined}
            onPointerUp={draggable ? onPointerUp : undefined}
            onPointerCancel={draggable ? onPointerUp : undefined}
          >
            <div className={styles.bsDialogHeading}>
              {title != null && <h2 className={styles.bsDialogTitle}>{title}</h2>}
              {description != null && <p className={styles.bsDialogDescription}>{description}</p>}
            </div>
            {!hideClose && (
              <button type="button" className={styles.bsDialogClose} aria-label="닫기" onClick={requestClose}>
                <Icon name="close" size={18} />
              </button>
            )}
          </div>
        )}

        {children != null && <div className={styles.bsDialogBody}>{children}</div>}

        {footer != null && <div className={styles.bsDialogFooter}>{footer}</div>}
      </div>
    </div>
  )
}

/** 선언형 다이얼로그. `open` / `onClose` 로 제어. */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = DIALOG_DEFAULT.SIZE,
  variant = DIALOG_DEFAULT.VARIANT,
  direction = DIALOG_DEFAULT.DIRECTION,
  lockScroll = DIALOG_DEFAULT.LOCK_SCROLL,
  handle = DIALOG_DEFAULT.HANDLE,
  swipeToClose = DIALOG_DEFAULT.SWIPE_TO_CLOSE,
  closeThreshold = DIALOG_DEFAULT.CLOSE_THRESHOLD,
  closeOnBackdrop = DIALOG_DEFAULT.CLOSE_ON_BACKDROP,
  closeOnEsc = DIALOG_DEFAULT.CLOSE_ON_ESC,
  hideClose = false,
  ariaLabel,
  classNames
}: DialogProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!open || !mounted) return null

  return createPortal(
    <DialogShell
      onClose={onClose}
      title={title}
      description={description}
      footer={footer}
      size={size}
      variant={variant}
      direction={direction}
      lockScroll={lockScroll}
      handle={handle}
      swipeToClose={swipeToClose}
      closeThreshold={closeThreshold}
      closeOnBackdrop={closeOnBackdrop}
      closeOnEsc={closeOnEsc}
      hideClose={hideClose}
      ariaLabel={ariaLabel}
      classNames={classNames}
    >
      {children}
    </DialogShell>,
    document.body
  )
}

function toneClass(tone: DialogTone) {
  return tone === 'danger' ? styles.bsDialogConfirmDanger : styles.bsDialogConfirm
}

function InstanceView({dialog}: {dialog: DialogInstance}) {
  const isChoice = dialog.kind === DIALOG_KIND.CONFIRM || dialog.kind === DIALOG_KIND.ALERT

  const footer = isChoice ? (
    <>
      {dialog.kind === DIALOG_KIND.CONFIRM && (
        <button type="button" className={styles.bsDialogBtnGhost} onClick={() => resolveDialog(dialog.id, false)}>
          {dialog.cancelText}
        </button>
      )}
      <button type="button" className={toneClass(dialog.tone)} onClick={() => resolveDialog(dialog.id, true)}>
        {dialog.confirmText}
      </button>
    </>
  ) : (
    dialog.footer
  )

  return (
    <DialogShell
      onClose={() => closeDialog(dialog.id)}
      title={dialog.title}
      description={dialog.description}
      footer={footer}
      size={dialog.size}
      variant={dialog.variant}
      direction={dialog.direction}
      lockScroll={dialog.lockScroll}
      handle={dialog.handle}
      swipeToClose={dialog.swipeToClose}
      closeThreshold={dialog.closeThreshold}
      closeOnBackdrop={dialog.closeOnBackdrop}
      closeOnEsc={dialog.closeOnEsc}
      hideClose={dialog.hideClose}
      ariaLabel={dialog.ariaLabel}
    >
      {isChoice ? <p className={styles.bsDialogMessage}>{dialog.message}</p> : dialog.content}
    </DialogShell>
  )
}

/** 앱 최상단에 1회 배치. `openDialog` / `confirmDialog` / `alertDialog` 를 어디서든 호출. */
export function DialogProvider({children}: DialogProviderProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const dialogs = useSyncExternalStore(subscribeDialogs, getDialogSnapshot, getDialogServerSnapshot)

  return (
    <>
      {children}
      {mounted &&
        dialogs.length > 0 &&
        createPortal(
          <>
            {dialogs.map((d) => (
              <InstanceView key={d.id} dialog={d} />
            ))}
          </>,
          document.body
        )}
    </>
  )
}
