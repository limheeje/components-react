import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {CHECKBOX_DEFAULT, CHECKBOX_STATE_CLASS} from '~/components/Checkbox/Checkbox.constant'
import type {CheckboxProps} from '~/components/Checkbox/Checkbox.type'
import styles from '~/components/Checkbox/Checkbox.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {label, size = CHECKBOX_DEFAULT.SIZE, indeterminate = false, error = false, classNames, disabled, ...rest},
  ref
) {
  const innerRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, [])

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <label
      className={cx(
        styles.bsCheckbox,
        styles[`bsCheckboxSize${cap(size)}`],
        disabled && styles[CHECKBOX_STATE_CLASS.IS_DISABLED],
        error && styles[CHECKBOX_STATE_CLASS.IS_ERROR],
        indeterminate && styles[CHECKBOX_STATE_CLASS.IS_INDETERMINATE],
        resolveClassNames(classNames)
      )}
    >
      <input
        {...rest}
        ref={innerRef}
        type="checkbox"
        className={styles.bsCheckboxInput}
        disabled={disabled}
        aria-invalid={error || undefined}
      />
      <span className={styles.bsCheckboxBox} aria-hidden="true">
        <svg className={styles.bsCheckboxCheck} viewBox="0 0 12 12" fill="none">
          <polyline
            points="2,6 5,9 10,3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.bsCheckboxDash} />
      </span>
      {label != null && <span className={styles.bsCheckboxLabel}>{label}</span>}
    </label>
  )
})
