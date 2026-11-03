import {forwardRef, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {TABS_DEFAULT, TABS_STATE_CLASS} from '~/components/Tabs/Tabs.constant'
import type {TabsProps} from '~/components/Tabs/Tabs.type'
import styles from '~/components/Tabs/Tabs.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    items,
    defaultKey,
    activeKey,
    onChange,
    type = TABS_DEFAULT.TYPE,
    size = TABS_DEFAULT.SIZE,
    centered = false,
    fullWidth = false,
    classNames
  },
  ref
) {
  const isControlled = activeKey !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultKey ?? items[0]?.key ?? '')
  const active = isControlled ? activeKey : uncontrolled
  const activeItem = items.find((i) => i.key === active)

  const select = (key: string) => {
    if (!isControlled) setUncontrolled(key)
    onChange?.(key)
  }

  return (
    <div
      ref={ref}
      className={cx(
        styles.bsTabs,
        styles[`bsTabsType${cap(type)}`],
        styles[`bsTabsSize${cap(size)}`],
        centered && styles[TABS_STATE_CLASS.IS_CENTERED],
        fullWidth && styles[TABS_STATE_CLASS.IS_FULL_WIDTH],
        resolveClassNames(classNames)
      )}
    >
      <div className={styles.bsTabsBar} role="tablist">
        {items.map((item) => {
          const isActive = item.key === active
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-disabled={item.disabled || undefined}
              tabIndex={isActive ? 0 : -1}
              className={cx(
                styles.bsTabsTab,
                isActive && styles[TABS_STATE_CLASS.IS_ACTIVE],
                item.disabled && styles[TABS_STATE_CLASS.IS_DISABLED]
              )}
              onClick={() => !item.disabled && select(item.key)}
            >
              {item.icon != null && <span className={styles.bsTabsTabIcon}>{item.icon}</span>}
              {item.label}
              {item.badge !== undefined && <span className={styles.bsTabsBadge}>{item.badge}</span>}
            </button>
          )
        })}
      </div>

      {activeItem?.content != null && (
        <div className={styles.bsTabsPanel} role="tabpanel">
          {activeItem.content}
        </div>
      )}
    </div>
  )
})
