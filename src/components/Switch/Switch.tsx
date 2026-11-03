import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {SWITCH_DEFAULT, SWITCH_STATE_CLASS} from '~/components/Switch/Switch.constant'
import type {SwitchProps} from '~/components/Switch/Switch.type'
import styles from '~/components/Switch/Switch.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {label, size = SWITCH_DEFAULT.SIZE, error = false, classNames, disabled, ...rest},
  ref
) {
  return (
    <label
      className={cx(
        styles.bsSwitch,
        styles[`bsSwitchSize${cap(size)}`],
        disabled && styles[SWITCH_STATE_CLASS.IS_DISABLED],
        error && styles[SWITCH_STATE_CLASS.IS_ERROR],
        resolveClassNames(classNames)
      )}
    >
      <input
        {...rest}
        ref={ref}
        type="checkbox"
        role="switch"
        className={styles.bsSwitchInput}
        disabled={disabled}
        aria-invalid={error || undefined}
      />
      <span className={styles.bsSwitchTrack} aria-hidden="true">
        <span className={styles.bsSwitchThumb} />
      </span>
      {label != null && <span className={styles.bsSwitchLabel}>{label}</span>}
    </label>
  )
})
