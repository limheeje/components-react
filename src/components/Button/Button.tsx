import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {BUTTON_DEFAULT, BUTTON_STATE_CLASS} from '~/components/Button/Button.constant'
import type {ButtonProps} from '~/components/Button/Button.type'
import styles from '~/components/Button/Button.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = BUTTON_DEFAULT.VARIANT,
    size = BUTTON_DEFAULT.SIZE,
    round = false,
    loading = false,
    fullWidth = false,
    htmlType = 'button',
    disabled,
    classNames,
    children,
    onClick,
    ...rest
  },
  ref
) {
  const isInactive = variant === 'inactive'
  const isDisabled = disabled || loading || isInactive

  return (
    <button
      {...rest}
      ref={ref}
      type={htmlType}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={loading || isInactive ? undefined : onClick}
      className={cx(
        styles.bsButton,
        styles[`bsButtonVariant${cap(variant)}`],
        styles[`bsButtonSize${cap(size)}`],
        round && styles[BUTTON_STATE_CLASS.IS_ROUND],
        loading && styles[BUTTON_STATE_CLASS.IS_LOADING],
        fullWidth && styles[BUTTON_STATE_CLASS.IS_FULL_WIDTH],
        resolveClassNames(classNames)
      )}
    >
      {loading && <span className={styles.bsButtonSpinner} aria-hidden="true" />}
      <span className={styles.bsButtonLabel}>{children}</span>
    </button>
  )
})
