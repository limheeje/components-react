import {cx} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {CALENDAR_VIEW, DATE_PICKER_DEFAULT, DAY_CELL_STATE} from '~/components/DatePicker/DatePicker.constant'
import {MONTHS_KR, WEEKDAYS, getDaysInMonth, getFirstDayOfWeek, isSameDay} from '~/components/DatePicker/dateUtils'
import styles from '~/components/DatePicker/DatePicker.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

type CalendarView = (typeof CALENDAR_VIEW)[keyof typeof CALENDAR_VIEW]

export interface CalendarProps {
  year: number
  month: number
  view: CalendarView
  yearPage: number
  showNav: boolean
  showMonthPicker: boolean
  showYearPicker: boolean
  showTodayDot: boolean
  showWeekend: boolean
  isDisabled: (d: Date) => boolean
  isSelected: (d: Date) => boolean
  isRangeStart: (d: Date) => boolean
  isRangeEnd: (d: Date) => boolean
  isInRange: (d: Date) => boolean
  onNavigateMonth: (delta: number) => void
  onSelectDay: (d: Date) => void
  onHoverDay: (d: Date | null) => void
  onViewChange: (v: CalendarView) => void
  onSelectMonth: (m: number) => void
  onSelectYear: (y: number) => void
  onYearPageChange: (delta: number) => void
}

const TODAY = new Date()

export function Calendar(props: CalendarProps) {
  const {
    year,
    month,
    view,
    yearPage,
    showNav,
    showMonthPicker,
    showYearPicker,
    showTodayDot,
    showWeekend,
    isDisabled,
    isSelected,
    isRangeStart,
    isRangeEnd,
    isInRange,
    onNavigateMonth,
    onSelectDay,
    onHoverDay,
    onViewChange,
    onSelectMonth,
    onSelectYear,
    onYearPageChange
  } = props

  const renderDays = () => {
    const total = getDaysInMonth(year, month)
    const offset = getFirstDayOfWeek(year, month)
    const cells: React.ReactNode[] = []
    for (let i = 0; i < offset; i++) cells.push(<span key={`e${i}`} />)

    for (let d = 1; d <= total; d++) {
      const date = new Date(year, month, d)
      const dow = date.getDay()
      const dis = isDisabled(date)
      cells.push(
        <button
          key={d}
          type="button"
          disabled={dis}
          className={cx(
            styles.bsDatePickerDay,
            isSelected(date) && styles[`bsDatePickerDay${cap(DAY_CELL_STATE.SELECTED)}`],
            isRangeStart(date) && styles[`bsDatePickerDay${cap(DAY_CELL_STATE.RANGE_START)}`],
            isRangeEnd(date) && styles[`bsDatePickerDay${cap(DAY_CELL_STATE.RANGE_END)}`],
            isInRange(date) && styles[`bsDatePickerDay${cap(DAY_CELL_STATE.IN_RANGE)}`],
            isSameDay(date, TODAY) && styles[`bsDatePickerDay${cap(DAY_CELL_STATE.TODAY)}`],
            dis && styles[`bsDatePickerDay${cap(DAY_CELL_STATE.DISABLED)}`],
            showWeekend && dow === 0 && styles[`bsDatePickerDay${cap(DAY_CELL_STATE.SUN)}`],
            showWeekend && dow === 6 && styles[`bsDatePickerDay${cap(DAY_CELL_STATE.SAT)}`]
          )}
          onClick={() => onSelectDay(date)}
          onMouseEnter={() => onHoverDay(date)}
        >
          {d}
          {showTodayDot && isSameDay(date, TODAY) && !isSelected(date) && (
            <span className={styles.bsDatePickerTodayDot} />
          )}
        </button>
      )
    }
    return cells
  }

  return (
    <div className={styles.bsDatePickerCalendar}>
      <div className={styles.bsDatePickerCalHeader}>
        {showNav ? (
          <button
            type="button"
            className={styles.bsDatePickerNavBtn}
            aria-label="이전 달"
            onClick={() => onNavigateMonth(-1)}
          >
            <Icon name="chevron-left" size={14} />
          </button>
        ) : (
          <span className={styles.bsDatePickerNavBtn} aria-hidden="true" />
        )}

        <div className={styles.bsDatePickerCalTitle}>
          <button
            type="button"
            className={styles.bsDatePickerCalTitleBtn}
            disabled={!showYearPicker}
            onClick={() => onViewChange(view === CALENDAR_VIEW.YEARS ? CALENDAR_VIEW.DAYS : CALENDAR_VIEW.YEARS)}
          >
            {year}년
          </button>
          <button
            type="button"
            className={styles.bsDatePickerCalTitleBtn}
            disabled={!showMonthPicker}
            onClick={() => onViewChange(view === CALENDAR_VIEW.MONTHS ? CALENDAR_VIEW.DAYS : CALENDAR_VIEW.MONTHS)}
          >
            {month + 1}월
          </button>
        </div>

        {showNav ? (
          <button
            type="button"
            className={styles.bsDatePickerNavBtn}
            aria-label="다음 달"
            onClick={() => onNavigateMonth(1)}
          >
            <Icon name="chevron-right" size={14} />
          </button>
        ) : (
          <span className={styles.bsDatePickerNavBtn} aria-hidden="true" />
        )}
      </div>

      {view === CALENDAR_VIEW.DAYS && (
        <>
          <div className={styles.bsDatePickerWeekRow}>
            {WEEKDAYS.map((w, i) => (
              <span
                key={w}
                className={cx(
                  styles.bsDatePickerWeekName,
                  showWeekend && i === 0 && styles[`bsDatePickerDay${cap(DAY_CELL_STATE.SUN)}`],
                  showWeekend && i === 6 && styles[`bsDatePickerDay${cap(DAY_CELL_STATE.SAT)}`]
                )}
              >
                {w}
              </span>
            ))}
          </div>
          <div className={styles.bsDatePickerDayGrid} onMouseLeave={() => onHoverDay(null)}>
            {renderDays()}
          </div>
        </>
      )}

      {view === CALENDAR_VIEW.MONTHS && showMonthPicker && (
        <div className={styles.bsDatePickerPickGrid} data-cols="3">
          {MONTHS_KR.map((mn, mi) => (
            <button
              key={mn}
              type="button"
              className={cx(styles.bsDatePickerPickCell, mi === month && styles.bsDatePickerPickCurrent)}
              onClick={() => onSelectMonth(mi)}
            >
              {mn}
            </button>
          ))}
        </div>
      )}

      {view === CALENDAR_VIEW.YEARS && showYearPicker && (
        <>
          <div className={styles.bsDatePickerYearNav}>
            <button
              type="button"
              className={styles.bsDatePickerNavBtn}
              aria-label="이전 연도 범위"
              onClick={() => onYearPageChange(-1)}
            >
              <Icon name="chevron-left" size={14} />
            </button>
            <span className={styles.bsDatePickerYearRange}>
              {yearPage} – {yearPage + DATE_PICKER_DEFAULT.YEAR_PAGE_SIZE - 1}
            </span>
            <button
              type="button"
              className={styles.bsDatePickerNavBtn}
              aria-label="다음 연도 범위"
              onClick={() => onYearPageChange(1)}
            >
              <Icon name="chevron-right" size={14} />
            </button>
          </div>
          <div className={styles.bsDatePickerPickGrid} data-cols="4">
            {Array.from({length: DATE_PICKER_DEFAULT.YEAR_PAGE_SIZE}, (_, i) => yearPage + i).map((y) => (
              <button
                key={y}
                type="button"
                className={cx(styles.bsDatePickerPickCell, y === year && styles.bsDatePickerPickCurrent)}
                onClick={() => onSelectYear(y)}
              >
                {y}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
