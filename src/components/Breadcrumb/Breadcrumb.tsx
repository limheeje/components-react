import {Fragment, forwardRef, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {BREADCRUMB_DEFAULT, BREADCRUMB_STATE_CLASS} from '~/components/Breadcrumb/Breadcrumb.constant'
import type {BreadcrumbItem, BreadcrumbProps} from '~/components/Breadcrumb/Breadcrumb.type'
import styles from '~/components/Breadcrumb/Breadcrumb.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

const ELLIPSIS = Symbol('ellipsis')
type Displayed = BreadcrumbItem | typeof ELLIPSIS

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  {items, separator, maxItems, size = BREADCRUMB_DEFAULT.SIZE, classNames},
  ref
) {
  const [expanded, setExpanded] = useState(false)

  const sep = separator ?? <Icon name="chevron-right" size={13} />

  let displayed: Displayed[] = items
  if (
    maxItems != null &&
    items.length > maxItems &&
    !expanded &&
    items.length > BREADCRUMB_DEFAULT.HEAD_COUNT + BREADCRUMB_DEFAULT.TAIL_COUNT
  ) {
    displayed = [
      ...items.slice(0, BREADCRUMB_DEFAULT.HEAD_COUNT),
      ELLIPSIS,
      ...items.slice(-BREADCRUMB_DEFAULT.TAIL_COUNT)
    ]
  }

  return (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cx(styles.bsBreadcrumb, styles[`bsBreadcrumbSize${cap(size)}`], resolveClassNames(classNames))}
    >
      <ol className={styles.bsBreadcrumbList}>
        {displayed.map((item, index) => {
          const isLast = index === displayed.length - 1
          const key = item === ELLIPSIS ? 'ellipsis' : index

          return (
            <Fragment key={key}>
              <li className={styles.bsBreadcrumbItem}>
                {item === ELLIPSIS ? (
                  <button
                    type="button"
                    className={styles.bsBreadcrumbExpand}
                    aria-label="생략된 경로 펼치기"
                    onClick={() => setExpanded(true)}
                  >
                    …
                  </button>
                ) : isLast ? (
                  <span
                    className={cx(styles.bsBreadcrumbLabel, styles[BREADCRUMB_STATE_CLASS.IS_CURRENT])}
                    aria-current="page"
                  >
                    {item.icon}
                    {item.label}
                  </span>
                ) : (
                  <a href={item.href ?? '#'} className={styles.bsBreadcrumbLink} onClick={item.onClick}>
                    {item.icon}
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && (
                <li className={styles.bsBreadcrumbSeparator} aria-hidden="true">
                  {sep}
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
})
