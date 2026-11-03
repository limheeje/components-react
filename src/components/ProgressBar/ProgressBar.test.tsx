import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {ProgressBar} from '~/components/ProgressBar/ProgressBar'

describe('ProgressBar', () => {
  it('progressbar role + aria-valuenow 를 노출한다', () => {
    render(<ProgressBar value={42} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '42')
  })

  it('value 를 0~100 으로 클램프한다', () => {
    render(<ProgressBar value={150} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('showValue 면 퍼센트 텍스트를 표시한다', () => {
    render(<ProgressBar value={37} showValue />)
    expect(screen.getByText('37%')).toBeInTheDocument()
  })

  it('label 을 렌더한다', () => {
    render(<ProgressBar value={10} label="업로드" />)
    expect(screen.getByText('업로드')).toBeInTheDocument()
  })
})
