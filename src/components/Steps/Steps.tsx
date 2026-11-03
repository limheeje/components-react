import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {
  STEPS_DEFAULT,
  STEPS_DIRECTION,
  STEPS_NODE_STATE,
  STEPS_STATE_CLASS,
  STEPS_STATUS
} from '~/components/Steps/Steps.constant'
import type {StepsProps} from '~/components/Steps/Steps.type'
import styles from '~/components/Steps/Steps.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const Steps = forwardRef<HTMLDivElement, StepsProps>(function Steps(
  {
    steps,
    current = STEPS_DEFAULT.CURRENT,
    direction = STEPS_DEFAULT.DIRECTION,
    status = STEPS_DEFAULT.STATUS,
    classNames,
    ...rest
  },
  ref
) {
  const isVertical = direction === STEPS_DIRECTION.VERTICAL

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(
        styles.bsSteps,
        isVertical && styles[STEPS_STATE_CLASS.IS_VERTICAL],
        status === STEPS_STATUS.ERROR && styles[STEPS_STATE_CLASS.STATUS_ERROR],
        status === STEPS_STATUS.FINISH && styles[STEPS_STATE_CLASS.STATUS_FINISH],
        resolveClassNames(classNames)
      )}
    >
      {steps.map((step, index) => {
        const nodeState =
          index < current
            ? STEPS_NODE_STATE.DONE
            : index === current
              ? STEPS_NODE_STATE.CURRENT
              : STEPS_NODE_STATE.UPCOMING
        const isLast = index === steps.length - 1

        const showCheck =
          nodeState === STEPS_NODE_STATE.DONE ||
          (nodeState === STEPS_NODE_STATE.CURRENT && status === STEPS_STATUS.FINISH)
        const showError = nodeState === STEPS_NODE_STATE.CURRENT && status === STEPS_STATUS.ERROR

        return (
          <div
            key={index}
            className={cx(styles.bsStepsStep, styles[`bsStepsNode${cap(nodeState)}`])}
            aria-current={nodeState === STEPS_NODE_STATE.CURRENT ? 'step' : undefined}
          >
            <div className={styles.bsStepsRail}>
              <span className={styles.bsStepsLine} data-lead />
              <span className={styles.bsStepsNode}>
                {showCheck ? (
                  <Icon name="check" size={12} />
                ) : showError ? (
                  <Icon name="alert-circle" size={12} />
                ) : (
                  index + 1
                )}
              </span>
              {!isLast && <span className={styles.bsStepsLine} data-trail />}
            </div>
            <div className={styles.bsStepsLabel}>
              <span className={styles.bsStepsTitle}>{step.title}</span>
              {step.description != null && <span className={styles.bsStepsDescription}>{step.description}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
})
