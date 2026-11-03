import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Lightbox} from '~/components/Lightbox/Lightbox'

const IMGS = ['/a.jpg', '/b.jpg', '/c.jpg']

describe('Lightbox', () => {
  it('현재 이미지와 카운터를 렌더한다', () => {
    render(<Lightbox images={IMGS} index={1} onClose={vi.fn()} onChange={vi.fn()} />)
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('닫기 버튼 / ESC 로 onClose 가 호출된다', async () => {
    const onClose = vi.fn()
    render(<Lightbox images={IMGS} index={0} onClose={onClose} onChange={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', {name: '닫기'}))
    expect(onClose).toHaveBeenCalled()
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('다음 버튼으로 onChange(index+1)', async () => {
    const onChange = vi.fn()
    render(<Lightbox images={IMGS} index={0} onClose={vi.fn()} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', {name: '다음'}))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('첫 이미지에서는 이전 버튼이 없다', () => {
    render(<Lightbox images={IMGS} index={0} onClose={vi.fn()} onChange={vi.fn()} />)
    expect(screen.queryByRole('button', {name: '이전'})).not.toBeInTheDocument()
  })

  it('downloadable={false} 면 다운로드 버튼이 없다', () => {
    render(<Lightbox images={IMGS} index={0} onClose={vi.fn()} onChange={vi.fn()} downloadable={false} />)
    expect(screen.queryByRole('button', {name: '다운로드'})).not.toBeInTheDocument()
  })

  it('확대 시 실제 캔버스 크기를 늘려 스크롤 영역을 만든다', async () => {
    const {container} = render(<Lightbox images={IMGS} index={0} onClose={vi.fn()} onChange={vi.fn()} />)
    const image = container.querySelector('img[src="/a.jpg"]') as HTMLImageElement
    Object.defineProperty(image, 'naturalWidth', {value: 1000})
    Object.defineProperty(image, 'naturalHeight', {value: 500})
    fireEvent.load(image)

    await userEvent.click(screen.getByRole('button', {name: '확대'}))

    const canvas = image.parentElement as HTMLElement
    expect(Number.parseFloat(canvas.style.width)).toBeGreaterThan(Number.parseFloat(image.style.width) / 1.25)
    expect(canvas.parentElement?.className).toMatch(/bsLightboxStage/)
  })
})
