import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {afterEach, describe, expect, it, vi} from 'vitest'

import {ShareSheet} from '~/components/ShareSheet/ShareSheet'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ShareSheet', () => {
  it('open=true 면 title / url / 채널 4개를 렌더한다', () => {
    render(<ShareSheet open onClose={vi.fn()} title="공유하기" url="https://example.com/item/1" />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('공유하기')).toBeInTheDocument()
    expect(screen.getByText('https://example.com/item/1')).toBeInTheDocument()
    expect(screen.getByText('카카오톡')).toBeInTheDocument()
    expect(screen.getByText('페이스북')).toBeInTheDocument()
    expect(screen.getByText('트위터')).toBeInTheDocument()
    expect(screen.getByText('whatsApp')).toBeInTheDocument()
  })

  it('open=false 면 렌더되지 않는다', () => {
    render(<ShareSheet open={false} onClose={vi.fn()} url="https://example.com" />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('링크 복사 버튼 클릭 시 clipboard.writeText 호출 + onCopy 호출', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {clipboard: {writeText}})
    const onCopy = vi.fn()
    render(<ShareSheet open onClose={vi.fn()} url="https://example.com/item/1" onCopy={onCopy} />)
    await userEvent.click(screen.getByRole('button', {name: '링크 복사'}))
    expect(writeText).toHaveBeenCalledWith('https://example.com/item/1')
    expect(onCopy).toHaveBeenCalledWith('https://example.com/item/1')
  })

  it('채널 클릭 시 onShare 가 호출된다 (실제 공유 동작은 소비 앱이 처리 — 컴포넌트는 콜백만 호출)', async () => {
    const onShare = vi.fn()
    render(
      <ShareSheet open onClose={vi.fn()} url="https://example.com/item/1" channels={['facebook']} onShare={onShare} />
    )
    await userEvent.click(screen.getByText('페이스북').closest('button')!)
    expect(onShare).toHaveBeenCalledWith({channel: 'facebook', url: 'https://example.com/item/1'})
  })

  it('X 버튼으로 onClose 가 호출된다', async () => {
    const onClose = vi.fn()
    render(<ShareSheet open onClose={onClose} url="https://example.com" />)
    await userEvent.click(screen.getByRole('button', {name: '닫기'}))
    expect(onClose).toHaveBeenCalled()
  })
})
