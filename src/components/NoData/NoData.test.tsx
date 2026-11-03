import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {NoData} from '~/components/NoData/NoData'

describe('NoData', () => {
  it('기본 프리셋 제목을 렌더한다', () => {
    const {container} = render(<NoData />)
    expect(container.querySelector('[class*="bsNoDataTitle"]')).toBeInTheDocument()
  })

  it('title / description 을 렌더한다', () => {
    render(<NoData title="결과 없음" description="다시 검색해보세요" />)
    expect(screen.getByText('결과 없음')).toBeInTheDocument()
    expect(screen.getByText('다시 검색해보세요')).toBeInTheDocument()
  })

  it('onRetry 버튼이 동작한다', async () => {
    const onRetry = vi.fn()
    render(<NoData onRetry={onRetry} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
