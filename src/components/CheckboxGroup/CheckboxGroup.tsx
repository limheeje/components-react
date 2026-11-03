import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Checkbox} from '~/components/Checkbox/Checkbox'
import {CHECKBOX_GROUP_DEFAULT, CHECKBOX_GROUP_STATE_CLASS} from '~/components/CheckboxGroup/CheckboxGroup.constant'
import type {CheckboxGroupProps} from '~/components/CheckboxGroup/CheckboxGroup.type'
import styles from '~/components/CheckboxGroup/CheckboxGroup.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  {
    options,
    value,
    onChange,
    direction = CHECKBOX_GROUP_DEFAULT.DIRECTION,
    disabled = false,
    size = CHECKBOX_GROUP_DEFAULT.SIZE,
    min,
    max,
    name,
    classNames
  },
  ref
) {
  const toggle = (val: string) => {
    if (value.includes(val)) {
      if (min !== undefined && value.length <= min) return
      onChange(value.filter((v) => v !== val))
    } else {
      if (max !== undefined && value.length >= max) return
      onChange([...value, val])
    }
  }

  return (
    <div
      ref={ref}
      role="group"
      className={cx(
        styles.bsCheckboxGroup,
        styles[`bsCheckboxGroupDirection${cap(direction)}`],
        disabled && styles[CHECKBOX_GROUP_STATE_CLASS.IS_DISABLED],
        resolveClassNames(classNames)
      )}
    >
      {options.map((opt) => {
        const checked = value.includes(opt.value)
        const atMax = !checked && max !== undefined && value.length >= max
        return (
          <Checkbox
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            size={size}
            checked={checked}
            disabled={disabled || opt.disabled || atMax}
            onChange={() => toggle(opt.value)}
          />
        )
      })}
    </div>
  )
})
