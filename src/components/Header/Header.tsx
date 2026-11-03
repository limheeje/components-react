import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {HEADER_DEFAULT, HEADER_STATE_CLASS} from '~/components/Header/Header.constant'
import type {HeaderProps} from '~/components/Header/Header.type'
import styles from '~/components/Header/Header.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {type = HEADER_DEFAULT.TYPE, title, back = false, onBack, actions, logo, sticky = false, children, classNames},
  ref
) {
  return (
    <header
      ref={ref}
      className={cx(
        styles.bsHeader,
        styles[`bsHeaderType${cap(type)}`],
        sticky && styles[HEADER_STATE_CLASS.IS_STICKY],
        resolveClassNames(classNames)
      )}
    >
      {children ?? (
        <>
          <div className={styles.bsHeaderLeft}>
            {back && (
              <button type="button" className={styles.bsHeaderBack} aria-label="뒤로 가기" onClick={onBack}>
                <Icon name="chevron-left" size={20} />
              </button>
            )}
            {logo != null && <span className={styles.bsHeaderLogo}>{logo}</span>}
            {title != null && <span className={styles.bsHeaderTitle}>{title}</span>}
          </div>

          {actions != null && actions.length > 0 && (
            <div className={styles.bsHeaderActions}>
              {actions.map((action, i) => (
                <button
                  key={i}
                  type="button"
                  className={styles.bsHeaderAction}
                  aria-label={action.label}
                  onClick={action.onClick}
                >
                  {action.icon}
                  {action.badge != null && <span className={styles.bsHeaderBadge}>{action.badge}</span>}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </header>
  )
})
