import {forwardRef, useEffect, useId, useMemo, useRef, useState} from 'react'
import type {MouseEvent as ReactMouseEvent} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {TimeColumn} from '~/components/TimePicker/TimeColumn'
import {
  TIME_PICKER_DEFAULT,
  TIME_PICKER_FORMAT,
  TIME_PICKER_STATE_CLASS
} from '~/components/TimePicker/TimePicker.constant'
import type {TimePickerProps} from '~/components/TimePicker/TimePicker.type'
import styles from '~/components/TimePicker/TimePicker.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

const pad = (n: number) => String(n).padStart(2, '0')
const HOURS = Array.from({length: 24}, (_, i) => pad(i))
const SECONDS = Array.from({length: 60}, (_, i) => pad(i))
const genMinutes = (step: number) => Array.from({length: Math.ceil(60 / Math.max(1, step))}, (_, i) => pad(i * step))

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(function TimePicker(
  {
    value,
    defaultValue,
    onChange,
    format = TIME_PICKER_DEFAULT.FORMAT,
    size = TIME_PICKER_DEFAULT.SIZE,
    placeholder = TIME_PICKER_DEFAULT.PLACEHOLDER,
    step = TIME_PICKER_DEFAULT.STEP,
    clearable = false,
    disabled = false,
    error = false,
    helperText,
    name,
    id,
    classNames
  },
  ref
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const showSec = format === TIME_PICKER_FORMAT.HMS

  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '')
  const committed = isControlled ? (value ?? '') : uncontrolled

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(() => splitParts(committed))

  const reactId = useId()
  const triggerId = id ?? reactId
  const errorMessage = typeof error === 'string' ? error : ''
  const hasError = error === true || errorMessage.length > 0

  const minutes = useMemo(() => genMinutes(step), [step])

  // 팝업 열릴 때 draft 를 현재 확정값으로 시드
  useEffect(() => {
    if (open) setDraft(splitParts(committed))
  }, [open, committed])

  useEffect(() => {
    if (!open) return
    const onDocDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocDown)
    return () => document.removeEventListener('mousedown', onDocDown)
  }, [open])

  const display = committed
    ? showSec
      ? committed.split(':').slice(0, 3).join(':')
      : committed.split(':').slice(0, 2).join(':')
    : ''

  const commit = () => {
    const next = showSec ? `${draft.h}:${draft.m}:${draft.s}` : `${draft.h}:${draft.m}`
    if (!isControlled) setUncontrolled(next)
    onChange?.(next)
    setOpen(false)
  }

  const clear = (e: ReactMouseEvent) => {
    e.stopPropagation()
    if (!isControlled) setUncontrolled('')
    setDraft(splitParts(''))
    onChange?.('')
  }

  return (
    <div
      ref={(node) => {
        rootRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={cx(styles.bsTimePicker, styles[`bsTimePickerSize${cap(size)}`], resolveClassNames(classNames))}
    >
      <div
        id={triggerId}
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-disabled={disabled || undefined}
        aria-invalid={hasError || undefined}
        tabIndex={disabled ? -1 : 0}
        className={cx(
          styles.bsTimePickerTrigger,
          open && styles[TIME_PICKER_STATE_CLASS.IS_OPEN],
          hasError && styles[TIME_PICKER_STATE_CLASS.IS_ERROR],
          disabled && styles[TIME_PICKER_STATE_CLASS.IS_DISABLED],
          !display && styles[TIME_PICKER_STATE_CLASS.IS_PLACEHOLDER]
        )}
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((v) => !v)
          } else if (e.key === 'Escape') {
            setOpen(false)
          }
        }}
      >
        <Icon name="clock" size="1em" classNames={styles.bsTimePickerClockIcon} />
        <span className={styles.bsTimePickerValue}>{display || placeholder}</span>
        {clearable && display && !disabled && (
          <button
            type="button"
            tabIndex={-1}
            className={styles.bsTimePickerClearButton}
            aria-label="시간 초기화"
            onClick={clear}
          >
            <Icon name="close" size="1em" />
          </button>
        )}
      </div>

      {name != null && <input type="hidden" name={name} value={committed} />}

      {open && !disabled && (
        <div className={styles.bsTimePickerPopup} role="dialog" aria-label="시간 선택">
          <div className={styles.bsTimePickerColumns}>
            <TimeColumn label="시" values={HOURS} selected={draft.h} onSelect={(h) => setDraft((d) => ({...d, h}))} />
            <span className={styles.bsTimePickerColon}>:</span>
            <TimeColumn label="분" values={minutes} selected={draft.m} onSelect={(m) => setDraft((d) => ({...d, m}))} />
            {showSec && (
              <>
                <span className={styles.bsTimePickerColon}>:</span>
                <TimeColumn
                  label="초"
                  values={SECONDS}
                  selected={draft.s}
                  onSelect={(s) => setDraft((d) => ({...d, s}))}
                />
              </>
            )}
          </div>
          <div className={styles.bsTimePickerFooter}>
            <button type="button" className={styles.bsTimePickerCancelButton} onClick={() => setOpen(false)}>
              취소
            </button>
            <button type="button" className={styles.bsTimePickerConfirmButton} onClick={commit}>
              확인
            </button>
          </div>
        </div>
      )}

      {(hasError || helperText != null) && (
        <div className={styles.bsTimePickerMeta}>
          {hasError ? (
            <span id={`${triggerId}-error`} className={styles.bsTimePickerError}>
              {errorMessage || TIME_PICKER_DEFAULT.ERROR_TEXT}
            </span>
          ) : (
            <span id={`${triggerId}-helper`} className={styles.bsTimePickerHelper}>
              {helperText}
            </span>
          )}
        </div>
      )}
    </div>
  )
})

function splitParts(v: string) {
  const [h, m, s] = v.split(':')
  return {
    h: h || TIME_PICKER_DEFAULT.FALLBACK_HOUR,
    m: m || TIME_PICKER_DEFAULT.FALLBACK_MIN,
    s: s || TIME_PICKER_DEFAULT.FALLBACK_SEC
  }
}
