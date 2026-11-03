import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {BADGE_DEFAULT, BADGE_STATE_CLASS} from '~/components/Badge/Badge.constant'
import type {BadgeProps} from '~/components/Badge/Badge.type'
import styles from '~/components/Badge/Badge.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {type = BADGE_DEFAULT.TYPE, size = BADGE_DEFAULT.SIZE, round = false, dot = false, classNames, children, ...rest},
  ref
) {
  if (dot) {
    return (
      <span
        {...rest}
        ref={ref}
        className={cx(styles.bsBadge, styles.isDot, styles[`bsBadgeSize${cap(size)}`], resolveClassNames(classNames))}
      >
        <span className={cx(styles.bsBadgeDot, styles[`bsBadgeType${cap(type)}`])} aria-hidden="true" />
        {children}
      </span>
    )
  }

  return (
    <span
      {...rest}
      ref={ref}
      className={cx(
        styles.bsBadge,
        styles[`bsBadgeType${cap(type)}`],
        styles[`bsBadgeSize${cap(size)}`],
        round && styles[BADGE_STATE_CLASS.IS_ROUND],
        resolveClassNames(classNames)
      )}
    >
      {children}
    </span>
  )
})
