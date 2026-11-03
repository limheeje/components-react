import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {LIST_ITEM_STATE_CLASS} from '~/components/ListItem/ListItem.constant'
import type {ListItemProps} from '~/components/ListItem/ListItem.type'
import styles from '~/components/ListItem/ListItem.module.scss'

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
  {title, description, avatar, extra, clickable = false, classNames, onClick, ...rest},
  ref
) {
  return (
    <div
      {...rest}
      ref={ref}
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      className={cx(
        styles.bsListItemItem,
        clickable && styles[LIST_ITEM_STATE_CLASS.IS_CLICKABLE],
        resolveClassNames(classNames)
      )}
    >
      {avatar != null && <span className={styles.bsListItemAvatar}>{avatar}</span>}
      <div className={styles.bsListItemBody}>
        <span className={styles.bsListItemTitle}>{title}</span>
        {description != null && <span className={styles.bsListItemDescription}>{description}</span>}
      </div>
      {extra != null && <span className={styles.bsListItemExtra}>{extra}</span>}
      {clickable && <Icon name="chevron-right" size={14} classNames={styles.bsListItemChevron} />}
    </div>
  )
})
