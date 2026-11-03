import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {LOADING_DEFAULT, LOADING_STATE_CLASS, LOADING_TYPE} from '~/components/Loading/Loading.constant'
import type {LoadingProps} from '~/components/Loading/Loading.type'
import styles from '~/components/Loading/Loading.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(function Loading(
  {
    type = LOADING_DEFAULT.TYPE,
    size = LOADING_DEFAULT.SIZE,
    color = LOADING_DEFAULT.COLOR,
    text,
    overlay = false,
    classNames,
    ...rest
  },
  ref
) {
  const sizeClass = styles[`bsLoadingSize${cap(size)}`]

  let body

  if (type === LOADING_TYPE.SKELETON) {
    body = (
      <div className={cx(styles.bsLoadingSkeleton, sizeClass)} aria-hidden="true">
        <div className={styles.bsLoadingSkeletonHead}>
          <span className={cx(styles.bsLoadingSkeletonBox, styles.bsLoadingSkeletonAvatar)} />
          <span className={styles.bsLoadingSkeletonLines}>
            <span className={styles.bsLoadingSkeletonBox} />
            <span className={styles.bsLoadingSkeletonBox} />
          </span>
        </div>
        <div className={styles.bsLoadingSkeletonBody}>
          <span className={styles.bsLoadingSkeletonBox} />
          <span className={styles.bsLoadingSkeletonBox} />
          <span className={styles.bsLoadingSkeletonBox} />
        </div>
      </div>
    )
  } else {
    const indicator =
      type === LOADING_TYPE.DOTS ? (
        <span className={styles.bsLoadingDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      ) : (
        <span className={styles.bsLoadingSpinner} aria-hidden="true" />
      )

    body = (
      <div className={cx(styles.bsLoadingInner, sizeClass, styles[`bsLoadingColor${cap(color)}`])}>
        {indicator}
        {text != null && <span className={styles.bsLoadingText}>{text}</span>}
      </div>
    )
  }

  return (
    <div
      {...rest}
      ref={ref}
      role="status"
      aria-live="polite"
      aria-label={typeof text === 'string' ? text : '로딩 중'}
      className={cx(styles.bsLoading, overlay && styles[LOADING_STATE_CLASS.IS_OVERLAY], resolveClassNames(classNames))}
    >
      {body}
    </div>
  )
})
