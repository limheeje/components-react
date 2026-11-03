import {createRef} from 'react'

import {fireEvent, render, screen} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'

import {Image} from '~/components/Image/Image'

describe('Image', () => {
  it('img 를 alt 와 함께 렌더한다', () => {
    render(<Image src="/a.jpg" alt="산 풍경" />)
    expect(screen.getByAltText('산 풍경')).toBeInTheDocument()
  })

  it('로드 완료 시 onLoad 콜백이 호출된다', () => {
    const onLoad = vi.fn()
    render(<Image src="/a.jpg" alt="a" onLoad={onLoad} />)
    fireEvent.load(screen.getByAltText('a'))
    expect(onLoad).toHaveBeenCalled()
  })

  it('src 실패 시 fallbackSrc 로 교체된다', () => {
    render(<Image src="/broken.jpg" alt="a" fallbackSrc="/fallback.jpg" />)
    const img = screen.getByAltText<HTMLImageElement>('a')
    fireEvent.error(img)
    expect(img.getAttribute('src')).toBe('/fallback.jpg')
  })

  it('fallback 없이 실패하면 오류 플레이스홀더 + onError', () => {
    const onError = vi.fn()
    render(<Image src="/broken.jpg" alt="a" onError={onError} />)
    fireEvent.error(screen.getByAltText('a'))
    expect(screen.getByText('이미지를 불러올 수 없습니다')).toBeInTheDocument()
    expect(onError).toHaveBeenCalled()
  })

  it('loading 속성 기본값은 lazy', () => {
    render(<Image src="/a.jpg" alt="a" />)
    expect(screen.getByAltText('a')).toHaveAttribute('loading', 'lazy')
  })

  it('ref 가 컨테이너 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Image ref={ref} src="/a.jpg" alt="a" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
