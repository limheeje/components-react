import '~/assets/styles/tokens.css'

import {ProgressBar} from '~/components/ProgressBar/ProgressBar'

export {ProgressBar}
export default ProgressBar
export {
  PROGRESS_BAR_COLOR,
  PROGRESS_BAR_THICKNESS,
  PROGRESS_BAR_STATE_CLASS,
  PROGRESS_BAR_DEFAULT
} from '~/components/ProgressBar/ProgressBar.constant'
export type {ProgressBarProps, ProgressBarColor, ProgressBarThickness} from '~/components/ProgressBar/ProgressBar.type'
