import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {RADIO_DEFAULT, RADIO_STATE_CLASS} from '~/components/Radio/Radio.constant'
import type {RadioProps} from '~/components/Radio/Radio.type'
import styles from '~/components/Radio/Radio.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {label, size = RADIO_DEFAULT.SIZE, error = false, classNames, disabled, ...rest},
  ref
) {
  return (
    <label
      className={cx(
        styles.bsRadio,
        styles[`bsRadioSize${cap(size)}`],
        disabled && styles[RADIO_STATE_CLASS.IS_DISABLED],
        error && styles[RADIO_STATE_CLASS.IS_ERROR],
        resolveClassNames(classNames)
      )}
    >
      <input
        {...rest}
        ref={ref}
        type="radio"
        className={styles.bsRadioInput}
        disabled={disabled}
        aria-invalid={error || undefined}
      />
      <span className={styles.bsRadioCircle} aria-hidden="true">
        <span className={styles.bsRadioDot} />
      </span>
      {label != null && <span className={styles.bsRadioLabel}>{label}</span>}
    </label>
  )
})
