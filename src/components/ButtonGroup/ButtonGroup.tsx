import {Children, cloneElement, forwardRef, isValidElement} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {BUTTON_GROUP_DEFAULT, BUTTON_GROUP_STATE_CLASS} from '~/components/ButtonGroup/ButtonGroup.constant'
import type {ButtonGroupProps} from '~/components/ButtonGroup/ButtonGroup.type'
import styles from '~/components/ButtonGroup/ButtonGroup.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

/** 하위 Button 에 그룹이 주입하는 prop */
interface InjectableProps {
  size?: string
  disabled?: boolean
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  {
    direction = BUTTON_GROUP_DEFAULT.DIRECTION,
    attached = false,
    size = BUTTON_GROUP_DEFAULT.SIZE,
    disabled = false,
    classNames,
    children,
    ...rest
  },
  ref
) {
  return (
    <div
      {...rest}
      ref={ref}
      role="group"
      className={cx(
        styles.bsButtonGroup,
        styles[`bsButtonGroupDirection${cap(direction)}`],
        attached && styles[BUTTON_GROUP_STATE_CLASS.IS_ATTACHED],
        disabled && styles[BUTTON_GROUP_STATE_CLASS.IS_DISABLED],
        resolveClassNames(classNames)
      )}
    >
      {Children.map(children, (child) => {
        if (!isValidElement<InjectableProps>(child)) return child
        return cloneElement(child, {
          size,
          disabled: disabled || child.props.disabled
        })
      })}
    </div>
  )
})
