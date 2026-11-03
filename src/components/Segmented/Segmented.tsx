import {forwardRef, useId, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {SEGMENTED_DEFAULT, SEGMENTED_STATE_CLASS} from '~/components/Segmented/Segmented.constant'
import type {SegmentedOption, SegmentedProps} from '~/components/Segmented/Segmented.type'
import styles from '~/components/Segmented/Segmented.module.scss'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const normalize = (o: SegmentedOption | string): SegmentedOption => (typeof o === 'string' ? {label: o, value: o} : o)

export const Segmented = forwardRef<HTMLDivElement, SegmentedProps>(function Segmented(
  {
    options,
    value,
    defaultValue,
    onChange,
    name,
    size = SEGMENTED_DEFAULT.SIZE,
    disabled = false,
    block = false,
    classNames
  },
  ref
) {
  const items = options.map(normalize)

  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? items[0]?.value ?? '')
  const current = isControlled ? value : uncontrolled

  const reactId = useId()
  const groupName = name ?? reactId

  const select = (opt: SegmentedOption) => {
    if (disabled || opt.disabled) return
    if (!isControlled) setUncontrolled(opt.value)
    onChange?.(opt.value, opt)
  }

  const move = (dir: 1 | -1) => {
    const enabled = items.filter((o) => !o.disabled)
    if (enabled.length === 0) return
    const idx = enabled.findIndex((o) => o.value === current)
    const next = enabled[(idx + dir + enabled.length) % enabled.length]
    if (next) select(next)
  }

  return (
    <div
      ref={ref}
      role="radiogroup"
      className={cx(
        styles.bsSegmented,
        styles[`bsSegmentedSize${cap(size)}`],
        block && styles.isBlock,
        disabled && styles[SEGMENTED_STATE_CLASS.IS_DISABLED],
        resolveClassNames(classNames)
      )}
    >
      {items.map((opt) => {
        const selected = current === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            name={groupName}
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            disabled={disabled || opt.disabled}
            className={cx(styles.bsSegmentedItem, selected && styles.bsSegmentedItemSelected)}
            onClick={() => select(opt)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault()
                move(1)
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault()
                move(-1)
              }
            }}
          >
            <span className={styles.bsSegmentedItemLabel}>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
})
