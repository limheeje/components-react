import {forwardRef} from 'react'
import type {ReactNode} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {TIMELINE_ALIGN, TIMELINE_DEFAULT, TIMELINE_DIRECTION} from '~/components/Timeline/Timeline.constant'
import type {TimelineItem, TimelineProps} from '~/components/Timeline/Timeline.type'
import styles from '~/components/Timeline/Timeline.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

function Node({item}: {item: TimelineItem}) {
  return (
    <span
      className={cx(
        styles.bsTimelineNode,
        item.status && styles[`bsTimelineStatus${cap(item.status)}`],
        item.icon != null && styles.bsTimelineNodeFilled
      )}
    >
      {item.icon}
    </span>
  )
}

function Content({item}: {item: TimelineItem}) {
  return (
    <div className={styles.bsTimelineContent}>
      <div className={styles.bsTimelineTitle}>{item.title}</div>
      {item.description != null && <div className={styles.bsTimelineDesc}>{item.description}</div>}
      {item.date != null && <div className={styles.bsTimelineDate}>{item.date}</div>}
    </div>
  )
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(function Timeline(
  {
    items,
    direction = TIMELINE_DEFAULT.DIRECTION,
    align = TIMELINE_DEFAULT.ALIGN,
    pending = false,
    color = TIMELINE_DEFAULT.COLOR,
    classNames
  },
  ref
) {
  const isHorizontal = direction === TIMELINE_DIRECTION.HORIZONTAL
  const hasPending = pending !== false && pending != null && pending !== ''
  const pendingContent: ReactNode = pending === true ? '처리 중...' : (pending as ReactNode)

  return (
    <div
      ref={ref}
      className={cx(
        styles.bsTimeline,
        styles[`bsTimelineDirection${cap(direction)}`],
        !isHorizontal && styles[`bsTimelineAlign${cap(align)}`],
        styles[`bsTimelineColor${cap(color)}`],
        resolveClassNames(classNames)
      )}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1 && !hasPending
        return (
          <div
            key={i}
            className={cx(
              styles.bsTimelineItem,
              !isHorizontal &&
                align === TIMELINE_ALIGN.ALTERNATE &&
                (i % 2 === 0 ? styles.bsTimelineSideA : styles.bsTimelineSideB)
            )}
          >
            <div className={styles.bsTimelineRail}>
              <Node item={item} />
              {!last && <span className={styles.bsTimelineLine} />}
            </div>
            <Content item={item} />
          </div>
        )
      })}

      {hasPending && (
        <div className={cx(styles.bsTimelineItem, styles.bsTimelineItemPending)}>
          <div className={styles.bsTimelineRail}>
            <span className={styles.bsTimelinePendingDot} />
          </div>
          <div className={styles.bsTimelineContent}>
            <div className={styles.bsTimelinePendingText}>{pendingContent}</div>
          </div>
        </div>
      )}
    </div>
  )
})
