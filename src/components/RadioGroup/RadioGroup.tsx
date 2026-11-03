import {forwardRef, useId, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Radio} from '~/components/Radio/Radio'
import {RADIO_GROUP_DEFAULT, RADIO_GROUP_STATE_CLASS} from '~/components/RadioGroup/RadioGroup.constant'
import type {RadioGroupProps} from '~/components/RadioGroup/RadioGroup.type'
import styles from '~/components/RadioGroup/RadioGroup.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    options,
    value,
    defaultValue,
    onChange,
    name,
    direction = RADIO_GROUP_DEFAULT.DIRECTION,
    disabled = false,
    size = RADIO_GROUP_DEFAULT.SIZE,
    classNames
  },
  ref
) {
  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '')
  const current = isControlled ? value : uncontrolled

  const reactId = useId()
  const groupName = name ?? reactId

  const select = (val: string) => {
    if (!isControlled) setUncontrolled(val)
    onChange?.(val)
  }

  return (
    <div
      ref={ref}
      role="radiogroup"
      className={cx(
        styles.bsRadioGroup,
        styles[`bsRadioGroupDirection${cap(direction)}`],
        disabled && styles[RADIO_GROUP_STATE_CLASS.IS_DISABLED],
        resolveClassNames(classNames)
      )}
    >
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={groupName}
          value={opt.value}
          label={opt.label}
          size={size}
          checked={current === opt.value}
          disabled={disabled || opt.disabled}
          onChange={() => select(opt.value)}
        />
      ))}
    </div>
  )
})
