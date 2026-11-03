import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {ICON_DEFAULT, ICON_NAME} from '~/components/Icon/Icon.constant'
import type {IconProps} from '~/components/Icon/Icon.type'
import styles from '~/components/Icon/Icon.module.scss'

const ALIAS = ICON_NAME as Record<string, string>

export const Icon = forwardRef<HTMLElement, IconProps>(function Icon(
  {
    name,
    color = ICON_DEFAULT.COLOR,
    size = ICON_DEFAULT.SIZE,
    rotate = ICON_DEFAULT.ROTATE,
    spin = false,
    style,
    onClick,
    classNames,
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) {
  const key = ALIAS[name] ?? name
  const dimension = typeof size === 'number' ? `${size}px` : size

  return (
    <i
      {...rest}
      ref={ref}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      onClick={onClick}
      className={cx(
        styles.bsIcon,
        styles[`i-${key}`],
        spin && styles.bsIconSpin,
        onClick != null && styles.bsIconClickable,
        resolveClassNames(classNames)
      )}
      style={{
        width: dimension,
        height: dimension,
        color,
        transform: !spin && rotate ? `rotate(${rotate}deg)` : undefined,
        ...style
      }}
    />
  )
})
