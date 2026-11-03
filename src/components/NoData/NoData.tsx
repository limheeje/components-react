import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {NO_DATA_DEFAULT, NO_DATA_PRESET, NO_DATA_STATE_CLASS} from '~/components/NoData/NoData.constant'
import type {NoDataProps} from '~/components/NoData/NoData.type'
import styles from '~/components/NoData/NoData.module.scss'

export const NoData = forwardRef<HTMLDivElement, NoDataProps>(function NoData(
  {type = NO_DATA_DEFAULT.TYPE, icon, title, description, action, onRetry, classNames, ...rest},
  ref
) {
  const preset = NO_DATA_PRESET[type]
  // icon={null} → 아이콘 미표시, 생략 → 프리셋 아이콘
  const iconNode = icon === null ? null : (icon ?? <Icon name={preset.icon} size={40} />)
  const resolvedTitle = title ?? preset.title
  const resolvedDesc = description ?? preset.description
  const resolvedAction =
    action ??
    (onRetry != null ? (
      <button type="button" className={styles.bsNoDataRetry} onClick={onRetry}>
        {NO_DATA_DEFAULT.RETRY_LABEL}
      </button>
    ) : null)

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(
        styles.bsNoData,
        resolvedAction != null && styles[NO_DATA_STATE_CLASS.HAS_ACTION],
        resolveClassNames(classNames)
      )}
    >
      {iconNode != null && <span className={styles.bsNoDataIcon}>{iconNode}</span>}
      {resolvedTitle != null && <span className={styles.bsNoDataTitle}>{resolvedTitle}</span>}
      {resolvedDesc != null && resolvedDesc !== '' && (
        <span className={styles.bsNoDataDescription}>{resolvedDesc}</span>
      )}
      {resolvedAction != null && <div className={styles.bsNoDataAction}>{resolvedAction}</div>}
    </div>
  )
})
