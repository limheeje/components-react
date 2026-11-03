import {createContext, useContext, useMemo, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {ACCORDION_DEFAULT, ACCORDION_STATE_CLASS, ACCORDION_TYPE} from '~/components/Accordion/Accordion.constant'
import type {AccordionContextValue, AccordionItemProps, AccordionProps} from '~/components/Accordion/Accordion.type'
import styles from '~/components/Accordion/Accordion.module.scss'

const AccordionContext = createContext<AccordionContextValue | null>(null)

function toArray(value: string | string[] | undefined): string[] {
  if (value == null) return []
  return Array.isArray(value) ? value : [value]
}

function AccordionRoot({
  type = ACCORDION_DEFAULT.TYPE,
  defaultValue,
  value,
  onValueChange,
  classNames,
  children
}: AccordionProps) {
  const isControlled = value !== undefined
  const isMultiple = type === ACCORDION_TYPE.MULTIPLE

  const [uncontrolled, setUncontrolled] = useState<string[]>(toArray(defaultValue))
  const open = isControlled ? toArray(value) : uncontrolled

  const ctx = useMemo<AccordionContextValue>(
    () => ({
      isOpen: (v) => open.includes(v),
      toggle: (v) => {
        const next = open.includes(v) ? open.filter((x) => x !== v) : isMultiple ? [...open, v] : [v]
        if (!isControlled) setUncontrolled(next)
        onValueChange?.(isMultiple ? next : (next[0] ?? ''))
      }
    }),
    [open, isMultiple, isControlled, onValueChange]
  )

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cx(styles.bsAccordion, resolveClassNames(classNames))}>{children}</div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({value, title, disabled = false, classNames, children}: AccordionItemProps) {
  const ctx = useContext(AccordionContext)
  if (ctx == null) {
    throw new Error('Accordion.Item 은 <Accordion> 안에서만 사용할 수 있습니다.')
  }
  const open = ctx.isOpen(value)

  return (
    <div
      className={cx(
        styles.bsAccordionItem,
        open && styles[ACCORDION_STATE_CLASS.IS_OPEN],
        disabled && styles[ACCORDION_STATE_CLASS.IS_DISABLED],
        resolveClassNames(classNames)
      )}
    >
      <button
        type="button"
        className={styles.bsAccordionHeader}
        aria-expanded={open}
        disabled={disabled}
        onClick={() => ctx.toggle(value)}
      >
        <span className={styles.bsAccordionTitle}>{title}</span>
        <Icon name="chevron-down" size={16} classNames={styles.bsAccordionChevron} />
      </button>
      {open && <div className={styles.bsAccordionContent}>{children}</div>}
    </div>
  )
}

export const Accordion = Object.assign(AccordionRoot, {Item: AccordionItem})
