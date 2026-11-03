import {useEffect, useId, useRef, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {TOOLTIP_DEFAULT, TOOLTIP_STATE_CLASS, TOOLTIP_TRIGGER} from '~/components/Tooltip/Tooltip.constant'
import type {TooltipProps} from '~/components/Tooltip/Tooltip.type'
import styles from '~/components/Tooltip/Tooltip.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export function Tooltip({
  content,
  children,
  placement = TOOLTIP_DEFAULT.PLACEMENT,
  trigger = TOOLTIP_DEFAULT.TRIGGER,
  arrow = TOOLTIP_DEFAULT.ARROW,
  delay = TOOLTIP_DEFAULT.DELAY,
  disabled = false,
  classNames
}: TooltipProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const tooltipId = useId()

  const isHover = trigger === TOOLTIP_TRIGGER.HOVER

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const show = () => {
    if (disabled) return
    clearTimer()
    if (delay > 0) {
      timerRef.current = setTimeout(() => setOpen(true), delay)
    } else {
      setOpen(true)
    }
  }

  const hide = () => {
    clearTimer()
    setOpen(false)
  }

  useEffect(() => clearTimer, [])

  useEffect(() => {
    if (!open || isHover) return
    const onDocDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocDown)
    return () => document.removeEventListener('mousedown', onDocDown)
  }, [open, isHover])

  const hoverHandlers = isHover
    ? {
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide
      }
    : {
        onClick: () => (open ? hide() : show())
      }

  return (
    <span
      ref={wrapRef}
      className={styles.bsTooltipWrapper}
      {...hoverHandlers}
      aria-describedby={open ? tooltipId : undefined}
    >
      {children}
      {open && content != null && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cx(
            styles.bsTooltip,
            styles[`bsTooltipPlacement${cap(placement)}`],
            arrow && styles[TOOLTIP_STATE_CLASS.HAS_ARROW],
            resolveClassNames(classNames)
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}
