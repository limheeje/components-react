import '~/assets/styles/tokens.css'

import {Timeline} from '~/components/Timeline/Timeline'

export {Timeline}
export default Timeline
export {
  TIMELINE_DIRECTION,
  TIMELINE_ALIGN,
  TIMELINE_STATUS,
  TIMELINE_COLOR,
  TIMELINE_DEFAULT
} from '~/components/Timeline/Timeline.constant'
export type {
  TimelineProps,
  TimelineItem,
  TimelineDirection,
  TimelineAlign,
  TimelineStatus,
  TimelineColor
} from '~/components/Timeline/Timeline.type'
