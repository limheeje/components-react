import {Children, cloneElement, isValidElement} from 'react'
import type {MouseEvent, ReactElement, ReactNode} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {LIST_DEFAULT, LIST_STATE_CLASS} from '~/components/List/List.constant'
import type {ListProps} from '~/components/List/List.type'
import styles from '~/components/List/List.module.scss'

/** 자식 요소에 clickable / onClick 을 주입 */
function injectProps(node: ReactElement, extra: {clickable?: boolean; onClick?: (e: MouseEvent) => void}) {
  const props = node.props as {
    clickable?: boolean
    onClick?: (e: MouseEvent) => void
  }
  return cloneElement(node, {
    clickable: props.clickable ?? extra.clickable,
    onClick:
      extra.onClick != null
        ? (e: MouseEvent) => {
            props.onClick?.(e)
            extra.onClick?.(e)
          }
        : props.onClick
  } as Partial<typeof props>)
}

export function List<T = unknown>({
  items,
  renderItem,
  onItemClick,
  divided = LIST_DEFAULT.DIVIDED,
  clickable = false,
  loading = false,
  children,
  classNames,
  ...rest
}: ListProps<T>) {
  const rootClass = cx(styles.bsList, divided && styles[LIST_STATE_CLASS.IS_DIVIDED], resolveClassNames(classNames))

  if (loading) {
    return (
      <div {...rest} className={rootClass} aria-busy="true">
        {Array.from({length: LIST_DEFAULT.SKELETON_COUNT}, (_, i) => (
          <div key={i} className={styles.bsListSkeletonRow}>
            <span className={styles.bsListSkeletonAvatar} />
            <div className={styles.bsListSkeletonBody}>
              <span className={styles.bsListSkeletonLine} style={{width: '60%'}} />
              <span className={styles.bsListSkeletonLine} style={{width: '40%'}} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  let content: ReactNode
  if (items != null && renderItem != null) {
    content = items.map((item, index) => {
      const node = renderItem(item, index)
      return injectProps(node, {
        clickable,
        onClick: onItemClick != null ? () => onItemClick(item, index) : undefined
      })
    })
  } else {
    content = Children.map(children, (child) =>
      isValidElement(child) ? injectProps(child as ReactElement, {clickable}) : child
    )
  }

  return (
    <div {...rest} role="list" className={rootClass}>
      {content}
    </div>
  )
}
