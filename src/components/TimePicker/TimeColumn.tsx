import {useEffect, useRef} from 'react'

import {cx} from '~/lib/cx'

import styles from '~/components/TimePicker/TimePicker.module.scss'

interface TimeColumnProps {
  label: string
  values: string[]
  selected: string
  onSelect: (value: string) => void
}

/** 시/분/초 스크롤 컬럼 (선택값 자동 중앙 스크롤) */
export function TimeColumn({label, values, selected, onSelect}: TimeColumnProps) {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const idx = values.indexOf(selected)
    const el = list.children[idx] as HTMLElement | undefined
    if (el) {
      list.scrollTop = el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2
    }
  }, [selected, values])

  return (
    <div className={styles.bsTimePickerColumn}>
      <div className={styles.bsTimePickerColumnLabel}>{label}</div>
      <div className={styles.bsTimePickerColumnBox}>
        <div ref={listRef} className={styles.bsTimePickerColumnList} role="listbox" aria-label={label}>
          {values.map((v) => (
            <div
              key={v}
              role="option"
              aria-selected={v === selected}
              className={cx(styles.bsTimePickerCell, v === selected && styles.bsTimePickerCellSelected)}
              onClick={() => onSelect(v)}
            >
              {v}
            </div>
          ))}
        </div>
        <span className={styles.bsTimePickerFadeTop} aria-hidden="true" />
        <span className={styles.bsTimePickerFadeBottom} aria-hidden="true" />
      </div>
    </div>
  )
}
