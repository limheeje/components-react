import {TOAST_DEFAULT} from '~/components/Toast/Toast.constant'
import type {ToastData, ToastOptions, ToastPosition} from '~/components/Toast/Toast.type'

/** 외부 스토어 — showToast 로 전역에서 조작, ToastProvider 가 구독 */
const EMPTY: ToastData[] = []

let toasts: ToastData[] = EMPTY
let counter = 0
const listeners = new Set<() => void>()
let config = {
  position: TOAST_DEFAULT.POSITION as ToastPosition,
  maxCount: TOAST_DEFAULT.MAX_COUNT as number
}

function notify() {
  listeners.forEach((fn) => fn())
}

export function subscribeToasts(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function getToastSnapshot(): ToastData[] {
  return toasts
}

export function getToastServerSnapshot(): ToastData[] {
  return EMPTY
}

export function configureToast(next: Partial<typeof config>): void {
  config = {...config, ...next}
}

/** 토스트 표시. 생성된 id 를 반환한다. */
export function showToast(options: ToastOptions): number {
  const id = ++counter
  const toast: ToastData = {
    id,
    type: options.type ?? TOAST_DEFAULT.TYPE,
    message: options.message,
    duration: options.duration ?? TOAST_DEFAULT.DURATION,
    position: options.position ?? config.position,
    variant: options.variant ?? TOAST_DEFAULT.VARIANT,
    dismissible: options.dismissible ?? TOAST_DEFAULT.DISMISSIBLE,
    action: options.action
  }

  let next = [...toasts, toast]
  // 같은 위치 기준 최대 개수 제한
  const samePos = next.filter((t) => t.position === toast.position)
  if (samePos.length > config.maxCount) {
    const drop = samePos.slice(0, samePos.length - config.maxCount)
    const dropIds = new Set(drop.map((t) => t.id))
    next = next.filter((t) => !dropIds.has(t.id))
  }
  toasts = next
  notify()

  if (Number.isFinite(toast.duration)) {
    setTimeout(() => dismissToast(id), toast.duration)
  }
  return id
}

/** 특정 토스트 즉시 닫기 */
export function dismissToast(id: number): void {
  const next = toasts.filter((t) => t.id !== id)
  if (next.length === toasts.length) return
  toasts = next.length === 0 ? EMPTY : next
  notify()
}

/** 전체 닫기 */
export function clearToasts(): void {
  if (toasts.length === 0) return
  toasts = EMPTY
  notify()
}
