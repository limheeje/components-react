import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {PROGRESS_BAR_DEFAULT, PROGRESS_BAR_STATE_CLASS} from '~/components/ProgressBar/ProgressBar.constant'
import type {ProgressBarProps} from '~/components/ProgressBar/ProgressBar.type'
import styles from '~/components/ProgressBar/ProgressBar.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  {
    value = PROGRESS_BAR_DEFAULT.VALUE,
    showValue = false,
    color = PROGRESS_BAR_DEFAULT.COLOR,
    thickness = PROGRESS_BAR_DEFAULT.THICKNESS,
    animated = false,
    label,
    classNames,
    ...rest
  },
  ref
) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(
        styles.bsProgressBar,
        styles[`bsProgressBarColor${cap(color)}`],
        styles[`bsProgressBarThickness${cap(thickness)}`],
        resolveClassNames(classNames)
      )}
    >
      {(label != null || showValue) && (
        <div className={styles.bsProgressBarHead}>
          {label != null && <span className={styles.bsProgressBarLabel}>{label}</span>}
          {showValue && <span className={styles.bsProgressBarValue}>{Math.round(clamped)}%</span>}
        </div>
      )}
      <div
        className={styles.bsProgressBarTrack}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cx(styles.bsProgressBarFill, animated && styles[PROGRESS_BAR_STATE_CLASS.IS_ANIMATED])}
          style={{width: `${clamped}%`}}
        />
      </div>
    </div>
  )
})
