import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Swiper} from '~/components/Swiper/Swiper'

const SLIDES = [1, 2, 3, 4].map((n) => <div key={n}>슬라이드 {n}</div>)

describe('Swiper', () => {
  it('items 를 렌더한다', () => {
    render(<Swiper items={SLIDES} />)
    expect(screen.getByText('슬라이드 1')).toBeInTheDocument()
    expect(screen.getByText('슬라이드 4')).toBeInTheDocument()
  })

  it('다음 화살표로 이동하고 onChange 가 호출된다', async () => {
    const onChange = vi.fn()
    render(<Swiper items={SLIDES} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', {name: '다음 슬라이드'}))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('loop=false 면 첫 슬라이드에서 이전 버튼이 비활성', () => {
    render(<Swiper items={SLIDES} />)
    expect(screen.getByRole('button', {name: '이전 슬라이드'})).toBeDisabled()
  })

  it('navigation={false} 면 화살표가 없다', () => {
    render(<Swiper items={SLIDES} navigation={false} />)
    expect(screen.queryByRole('button', {name: '다음 슬라이드'})).not.toBeInTheDocument()
  })

  it('pagination="fraction" — 1 / N 표시', () => {
    render(<Swiper items={SLIDES} pagination="fraction" navigation={false} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('bullets 개수는 maxIdx+1 (slidesPerView 반영)', () => {
    render(<Swiper items={SLIDES} slidesPerView={2} navigation={false} pagination="bullets" />)
    expect(screen.getAllByRole('button', {name: /슬라이드로 이동/})).toHaveLength(3)
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Swiper ref={ref} items={SLIDES} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
