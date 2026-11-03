import {useEffect, useState, useSyncExternalStore} from 'react'
import {createPortal} from 'react-dom'

import {cx} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {TOAST_ICON, TOAST_POSITION} from '~/components/Toast/Toast.constant'
import {
  configureToast,
  dismissToast,
  getToastServerSnapshot,
  getToastSnapshot,
  subscribeToasts
} from '~/components/Toast/Toast.store'
import type {ToastData, ToastProviderProps} from '~/components/Toast/Toast.type'
import styles from '~/components/Toast/Toast.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

function ToastCard({toast}: {toast: ToastData}) {
  return (
    <div
      className={cx(
        styles.bsToast,
        styles[`bsToastType${cap(toast.type)}`],
        styles[`bsToastVariant${cap(toast.variant)}`]
      )}
      role="status"
      aria-live="polite"
    >
      <Icon name={TOAST_ICON[toast.type]} size={16} classNames={styles.bsToastIcon} />
      <span className={styles.bsToastMessage}>{toast.message}</span>
      {toast.action != null && (
        <button
          type="button"
          className={styles.bsToastAction}
          onClick={() => {
            toast.action?.onClick()
            dismissToast(toast.id)
          }}
        >
          {toast.action.label}
        </button>
      )}
      {toast.dismissible && (
        <button type="button" className={styles.bsToastClose} aria-label="닫기" onClick={() => dismissToast(toast.id)}>
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  )
}

function ToastViewport({toasts}: {toasts: ToastData[]}) {
  const grouped = new Map<string, ToastData[]>()
  for (const t of toasts) {
    grouped.set(t.position, [...(grouped.get(t.position) ?? []), t])
  }

  return (
    <>
      {[...grouped.entries()].map(([pos, list]) => (
        <div key={pos} className={cx(styles.bsToastViewport, styles[`bsToastPos${cap(pos)}`])}>
          {list.map((t) => (
            <ToastCard key={t.id} toast={t} />
          ))}
        </div>
      ))}
    </>
  )
}

/** 앱 최상단에 1회 배치. `showToast()` 는 어디서든 호출 가능. */
export function ToastProvider({position = TOAST_POSITION.TOP_RIGHT, maxCount = 5, children}: ToastProviderProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    configureToast({position, maxCount})
  }, [position, maxCount])

  const toasts = useSyncExternalStore(subscribeToasts, getToastSnapshot, getToastServerSnapshot)

  return (
    <>
      {children}
      {mounted && createPortal(<ToastViewport toasts={toasts} />, document.body)}
    </>
  )
}

/** ToastProvider 별칭 (원본 호환) */
export const ToastContainer = ToastProvider
