import {forwardRef} from 'react'
import type {CSSProperties} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {
  DIVIDER_DEFAULT,
  DIVIDER_DIRECTION,
  DIVIDER_LABEL_ALIGN,
  DIVIDER_STATE_CLASS
} from '~/components/Divider/Divider.constant'
import type {DividerProps} from '~/components/Divider/Divider.type'
import styles from '~/components/Divider/Divider.module.scss'

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    direction = DIVIDER_DEFAULT.DIRECTION,
    color,
    thickness = DIVIDER_DEFAULT.THICKNESS,
    label,
    labelAlign = DIVIDER_DEFAULT.LABEL_ALIGN,
    dashed = false,
    decorative,
    classNames,
    style,
    ...rest
  },
  ref
) {
  const isVertical = direction === DIVIDER_DIRECTION.VERTICAL
  const hasLabel = !isVertical && label != null
  const isDecorative = decorative ?? !hasLabel

  const cssVars = {
    '--divider-color': color ?? 'var(--m2m-pg-comp-border)',
    '--divider-thickness': `${thickness}px`,
    ...style
  } as CSSProperties

  const a11y = isDecorative ? ({role: 'none'} as const) : ({role: 'separator', 'aria-orientation': direction} as const)

  return (
    <div
      {...rest}
      {...a11y}
      ref={ref}
      style={cssVars}
      className={cx(
        styles.bsDivider,
        isVertical && styles[DIVIDER_STATE_CLASS.IS_VERTICAL],
        dashed && styles[DIVIDER_STATE_CLASS.IS_DASHED],
        hasLabel && styles[DIVIDER_STATE_CLASS.HAS_LABEL],
        hasLabel && labelAlign === DIVIDER_LABEL_ALIGN.LEFT && styles[DIVIDER_STATE_CLASS.LABEL_LEFT],
        resolveClassNames(classNames)
      )}
    >
      {hasLabel && <span className={styles.bsDividerLabel}>{label}</span>}
    </div>
  )
})
