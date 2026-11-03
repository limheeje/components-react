import {DIALOG_DEFAULT, DIALOG_KIND, DIALOG_DIRECTION, DIALOG_VARIANT} from '~/components/Dialog/Dialog.constant'
import type {
  DialogAlertOptions,
  DialogConfirmOptions,
  DialogInstance,
  DialogModalOptions
} from '~/components/Dialog/Dialog.type'

/** 명령형 다이얼로그 외부 스토어 — DialogProvider 가 구독 */
const EMPTY: DialogInstance[] = []

let dialogs: DialogInstance[] = EMPTY
let counter = 0
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((fn) => fn())
}

export function subscribeDialogs(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function getDialogSnapshot(): DialogInstance[] {
  return dialogs
}

export function getDialogServerSnapshot(): DialogInstance[] {
  return EMPTY
}

function push(instance: DialogInstance) {
  dialogs = [...dialogs, instance]
  notify()
}

/** confirm/alert 등 중앙 모달 고정 인스턴스의 표현 관련 기본값 */
const MODAL_PRESENTATION = {
  variant: DIALOG_VARIANT.MODAL,
  direction: DIALOG_DIRECTION.BOTTOM,
  lockScroll: DIALOG_DEFAULT.LOCK_SCROLL,
  handle: DIALOG_DEFAULT.HANDLE,
  swipeToClose: DIALOG_DEFAULT.SWIPE_TO_CLOSE,
  closeThreshold: DIALOG_DEFAULT.CLOSE_THRESHOLD
} as const

/** 특정(또는 마지막) 다이얼로그 닫기 */
export function closeDialog(id?: number): void {
  const target = id != null ? dialogs.find((d) => d.id === id) : dialogs[dialogs.length - 1]
  if (!target) return
  dialogs = dialogs.filter((d) => d.id !== target.id)
  dialogs = dialogs.length === 0 ? EMPTY : dialogs
  notify()
  target.onClose?.()
  target.resolve?.(false)
}

/** 전부 닫기 */
export function closeAllDialogs(): void {
  if (dialogs.length === 0) return
  const all = dialogs
  dialogs = EMPTY
  notify()
  for (const d of all) {
    d.onClose?.()
    d.resolve?.(false)
  }
}

/** confirm/alert 버튼 클릭 결과 처리 */
export function resolveDialog(id: number, value: boolean): void {
  const target = dialogs.find((d) => d.id === id)
  if (!target) return
  dialogs = dialogs.filter((d) => d.id !== id)
  dialogs = dialogs.length === 0 ? EMPTY : dialogs
  notify()
  target.onClose?.()
  target.resolve?.(value)
}

/** 임의 콘텐츠 모달. id 반환 */
export function openDialog(options: DialogModalOptions): number {
  const id = ++counter
  push({
    id,
    kind: DIALOG_KIND.MODAL,
    title: options.title,
    description: options.description,
    content: options.content,
    footer: options.footer,
    size: options.size ?? DIALOG_DEFAULT.SIZE,
    variant: options.variant ?? DIALOG_DEFAULT.VARIANT,
    direction: options.direction ?? DIALOG_DEFAULT.DIRECTION,
    lockScroll: options.lockScroll ?? DIALOG_DEFAULT.LOCK_SCROLL,
    handle: options.handle ?? DIALOG_DEFAULT.HANDLE,
    swipeToClose: options.swipeToClose ?? DIALOG_DEFAULT.SWIPE_TO_CLOSE,
    closeThreshold: options.closeThreshold ?? DIALOG_DEFAULT.CLOSE_THRESHOLD,
    tone: DIALOG_DEFAULT.TONE,
    confirmText: DIALOG_DEFAULT.CONFIRM_TEXT,
    cancelText: DIALOG_DEFAULT.CANCEL_TEXT,
    closeOnBackdrop: options.closeOnBackdrop ?? DIALOG_DEFAULT.CLOSE_ON_BACKDROP,
    closeOnEsc: options.closeOnEsc ?? DIALOG_DEFAULT.CLOSE_ON_ESC,
    hideClose: options.hideClose ?? false,
    ariaLabel: options.ariaLabel,
    onClose: options.onClose
  })
  return id
}

/** 확인/취소. Promise<boolean> */
export function confirmDialog(options: DialogConfirmOptions): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const id = ++counter
    push({
      id,
      kind: DIALOG_KIND.CONFIRM,
      title: options.title,
      message: options.message,
      size: options.size ?? DIALOG_DEFAULT.SIZE,
      ...MODAL_PRESENTATION,
      tone: options.tone ?? DIALOG_DEFAULT.TONE,
      confirmText: options.confirmText ?? DIALOG_DEFAULT.CONFIRM_TEXT,
      cancelText: options.cancelText ?? DIALOG_DEFAULT.CANCEL_TEXT,
      closeOnBackdrop: false,
      closeOnEsc: true,
      hideClose: false,
      resolve
    })
  })
}

/** 알림. Promise<void> (확인 시 resolve) */
export function alertDialog(options: DialogAlertOptions): Promise<void> {
  return new Promise<void>((resolve) => {
    const id = ++counter
    push({
      id,
      kind: DIALOG_KIND.ALERT,
      title: options.title,
      message: options.message,
      size: options.size ?? DIALOG_DEFAULT.SIZE,
      ...MODAL_PRESENTATION,
      tone: DIALOG_DEFAULT.TONE,
      confirmText: options.confirmText ?? DIALOG_DEFAULT.CONFIRM_TEXT,
      cancelText: DIALOG_DEFAULT.CANCEL_TEXT,
      closeOnBackdrop: false,
      closeOnEsc: true,
      hideClose: true,
      resolve: () => resolve()
    })
  })
}
