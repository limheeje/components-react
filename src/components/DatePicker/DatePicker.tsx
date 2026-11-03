import {forwardRef, useEffect, useId, useMemo, useRef, useState} from 'react'
import type {MouseEvent as ReactMouseEvent} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {Calendar} from '~/components/DatePicker/Calendar'
import {
  CALENDAR_VIEW,
  DATE_PICKER_DEFAULT,
  DATE_PICKER_MODE,
  DATE_PICKER_STATE_CLASS
} from '~/components/DatePicker/DatePicker.constant'
import type {DatePickerProps, DateRange} from '~/components/DatePicker/DatePicker.type'
import {formatDate, isAfterDay, isBeforeDay, isBetweenDay, isSameDay} from '~/components/DatePicker/dateUtils'
import styles from '~/components/DatePicker/DatePicker.module.scss'

type CalendarView = (typeof CALENDAR_VIEW)[keyof typeof CALENDAR_VIEW]

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    mode = DATE_PICKER_DEFAULT.MODE,
    value,
    defaultValue = null,
    defaultRange = [null, null],
    onChange,
    format = DATE_PICKER_DEFAULT.FORMAT,
    placeholder,
    minDate,
    maxDate,
    showTime = false,
    clearable = false,
    disabled = false,
    error = false,
    helperText,
    showMonthPicker = true,
    showYearPicker = true,
    showTodayDot = false,
    showWeekend = false,
    name,
    id,
    classNames
  },
  ref
) {
  const isRange = mode === DATE_PICKER_MODE.RANGE
  const isControlled = value !== undefined

  const [uncSingle, setUncSingle] = useState<Date | null>(defaultValue)
  const [uncRange, setUncRange] = useState<DateRange>(defaultRange)

  const single = isControlled ? ((value as Date | null) ?? null) : uncSingle
  const range: DateRange = isControlled ? ((value as DateRange) ?? [null, null]) : uncRange

  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState<Date | null>(null)
  const [step, setStep] = useState<0 | 1>(0)
  const [view, setView] = useState<CalendarView>(CALENDAR_VIEW.DAYS)

  const seed = single ?? range[0] ?? new Date()
  const [vy, setVy] = useState(seed.getFullYear())
  const [vm, setVm] = useState(seed.getMonth())
  const [yearPage, setYearPage] = useState(
    Math.floor(seed.getFullYear() / DATE_PICKER_DEFAULT.YEAR_PAGE_SIZE) * DATE_PICKER_DEFAULT.YEAR_PAGE_SIZE
  )
  const [timeH, setTimeH] = useState(single?.getHours() ?? 0)
  const [timeM, setTimeM] = useState(single?.getMinutes() ?? 0)

  const rootRef = useRef<HTMLDivElement>(null)
  const reactId = useId()
  const triggerId = id ?? reactId
  const errorMessage = typeof error === 'string' ? error : ''
  const hasError = error === true || errorMessage.length > 0

  useEffect(() => {
    if (!open) return
    const onDocDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
        setView(CALENDAR_VIEW.DAYS)
      }
    }
    document.addEventListener('mousedown', onDocDown)
    return () => document.removeEventListener('mousedown', onDocDown)
  }, [open])

  const isDisabled = useMemo(
    () => (d: Date) => {
      if (minDate && isBeforeDay(d, minDate)) return true
      if (maxDate && isAfterDay(d, maxDate)) return true
      return false
    },
    [minDate, maxDate]
  )

  const effectiveFormat = showTime ? `${format} HH:mm` : format

  const display = (() => {
    if (isRange) {
      const [s, e] = range
      if (s && e) return `${formatDate(s, format)} ~ ${formatDate(e, format)}`
      if (s) return `${formatDate(s, format)} ~ ...`
      return ''
    }
    return single ? formatDate(single, effectiveFormat, timeH, timeM) : ''
  })()

  const placeholderText = Array.isArray(placeholder)
    ? isRange
      ? `${placeholder[0]} ~ ${placeholder[1]}`
      : placeholder[0]
    : (placeholder ??
      (isRange ? DATE_PICKER_DEFAULT.RANGE_PLACEHOLDER.join(' ~ ') : DATE_PICKER_DEFAULT.SINGLE_PLACEHOLDER))

  const emit = (next: Date | null | DateRange) => onChange?.(next)

  const handleSelectDay = (d: Date) => {
    if (isDisabled(d)) return
    if (!isRange) {
      const withTime = showTime ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), timeH, timeM) : d
      if (!isControlled) setUncSingle(withTime)
      emit(withTime)
      if (!showTime) setOpen(false)
      return
    }
    if (step === 0) {
      const nextRange: DateRange = [d, null]
      if (!isControlled) setUncRange(nextRange)
      setStep(1)
    } else {
      const start = range[0]!
      const sorted: DateRange = isBeforeDay(d, start) ? [d, start] : [start, d]
      if (!isControlled) setUncRange(sorted)
      setStep(0)
      emit(sorted)
      setOpen(false)
    }
  }

  const handleClear = (e: ReactMouseEvent) => {
    e.stopPropagation()
    setStep(0)
    if (!isControlled) {
      setUncSingle(null)
      setUncRange([null, null])
    }
    emit(isRange ? [null, null] : null)
  }

  const confirmTime = () => {
    const base = single ?? new Date(vy, vm, new Date().getDate())
    const next = new Date(base.getFullYear(), base.getMonth(), base.getDate(), timeH, timeM)
    if (!isControlled) setUncSingle(next)
    emit(next)
    setOpen(false)
  }

  const navigateMonth = (delta: number) => {
    const d = new Date(vy, vm + delta, 1)
    setVy(d.getFullYear())
    setVm(d.getMonth())
  }

  const isSelected = (d: Date) =>
    isRange
      ? Boolean((range[0] && isSameDay(d, range[0])) || (range[1] && isSameDay(d, range[1])))
      : Boolean(single && isSameDay(d, single))

  const isRangeStart = (d: Date) => isRange && Boolean(range[0] && isSameDay(d, range[0]))
  const isRangeEnd = (d: Date) => isRange && Boolean(range[1] && isSameDay(d, range[1]))
  const isInRange = (d: Date) => {
    if (!isRange || !range[0]) return false
    if (range[1]) return isBetweenDay(d, range[0], range[1])
    if (step === 1 && hover) return isBetweenDay(d, range[0], hover)
    return false
  }

  const calProps = {
    view,
    yearPage,
    showMonthPicker,
    showYearPicker,
    showTodayDot,
    showWeekend,
    isDisabled,
    isSelected,
    isRangeStart,
    isRangeEnd,
    isInRange,
    onNavigateMonth: navigateMonth,
    onSelectDay: handleSelectDay,
    onHoverDay: setHover,
    onViewChange: setView,
    onSelectMonth: (m: number) => {
      setVm(m)
      setView(CALENDAR_VIEW.DAYS)
    },
    onSelectYear: (y: number) => {
      setVy(y)
      setView(CALENDAR_VIEW.DAYS)
    },
    onYearPageChange: (delta: number) => setYearPage((p) => p + delta * DATE_PICKER_DEFAULT.YEAR_PAGE_SIZE)
  }

  const next = new Date(vy, vm + 1, 1)

  return (
    <div
      ref={(node) => {
        rootRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={cx(styles.bsDatePicker, isRange && styles.isRangeMode, resolveClassNames(classNames))}
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
          styles.bsDatePickerTrigger,
          open && styles[DATE_PICKER_STATE_CLASS.IS_OPEN],
          hasError && styles[DATE_PICKER_STATE_CLASS.IS_ERROR],
          disabled && styles[DATE_PICKER_STATE_CLASS.IS_DISABLED],
          !display && styles[DATE_PICKER_STATE_CLASS.IS_PLACEHOLDER]
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
        <Icon name="calendar" size="1em" classNames={styles.bsDatePickerCalIcon} />
        <span className={styles.bsDatePickerValue}>{display || placeholderText}</span>
        {clearable && display && !disabled && (
          <button
            type="button"
            tabIndex={-1}
            className={styles.bsDatePickerClearButton}
            aria-label="선택 초기화"
            onClick={handleClear}
          >
            <Icon name="close" size="1em" />
          </button>
        )}
      </div>

      {name != null && <input type="hidden" name={name} value={display} />}

      {open && !disabled && (
        <div className={styles.bsDatePickerPopup} role="dialog" aria-label="날짜 선택">
          {isRange ? (
            <div className={styles.bsDatePickerRangePanels}>
              <div>
                <div className={cx(styles.bsDatePickerRangeLabel, styles.bsDatePickerRangeLabelStart)}>시작일</div>
                <Calendar {...calProps} year={vy} month={vm} showNav />
              </div>
              <span className={styles.bsDatePickerRangeDivider} />
              <div>
                <div className={cx(styles.bsDatePickerRangeLabel, styles.bsDatePickerRangeLabelEnd)}>종료일</div>
                <Calendar {...calProps} year={next.getFullYear()} month={next.getMonth()} showNav={false} />
              </div>
            </div>
          ) : (
            <div>
              <Calendar {...calProps} year={vy} month={vm} showNav />
              {showTime && (
                <div className={styles.bsDatePickerTimeBar}>
                  <Icon name="clock" size={13} color="var(--m2m-pg-brand)" />
                  <span className={styles.bsDatePickerTimeLabel}>시간</span>
                  <div className={styles.bsDatePickerTimeSteppers}>
                    <TimeStepper
                      value={timeH}
                      onUp={() => setTimeH((h) => (h + 1) % 24)}
                      onDown={() => setTimeH((h) => (h + 23) % 24)}
                    />
                    <span className={styles.bsDatePickerTimeColon}>:</span>
                    <TimeStepper
                      value={timeM}
                      onUp={() => setTimeM((m) => (m + 5) % 60)}
                      onDown={() => setTimeM((m) => (m + 55) % 60)}
                    />
                    <button type="button" className={styles.bsDatePickerTimeConfirm} onClick={confirmTime}>
                      확인
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {(hasError || helperText != null) && (
        <div className={styles.bsDatePickerMeta}>
          {hasError ? (
            <span id={`${triggerId}-error`} className={styles.bsDatePickerError}>
              {errorMessage || DATE_PICKER_DEFAULT.ERROR_TEXT}
            </span>
          ) : (
            <span id={`${triggerId}-helper`} className={styles.bsDatePickerHelper}>
              {helperText}
            </span>
          )}
        </div>
      )}
    </div>
  )
})

function TimeStepper({value, onUp, onDown}: {value: number; onUp: () => void; onDown: () => void}) {
  const pad = String(value).padStart(2, '0')
  return (
    <span className={styles.bsDatePickerStepper}>
      <button type="button" className={styles.bsDatePickerStepBtn} aria-label="증가" onClick={onUp}>
        <Icon name="chevron-up" size={11} />
      </button>
      <span className={styles.bsDatePickerStepValue}>{pad}</span>
      <button type="button" className={styles.bsDatePickerStepBtn} aria-label="감소" onClick={onDown}>
        <Icon name="chevron-down" size={11} />
      </button>
    </span>
  )
}
