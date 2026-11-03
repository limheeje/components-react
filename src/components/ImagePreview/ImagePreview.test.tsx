import {createRef} from 'react'

import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it} from 'vitest'

import {ImagePreview} from '~/components/ImagePreview/ImagePreview'

const IMGS = ['/a.jpg', '/b.jpg', '/c.jpg']

describe('ImagePreview', () => {
  it('썸네일 이미지를 렌더한다', () => {
    render(<ImagePreview src="/a.jpg" alt="사진" />)
    expect(screen.getByAltText('사진')).toBeInTheDocument()
  })

  it('클릭하면 라이트박스가 열린다', async () => {
    render(<ImagePreview src="/a.jpg" alt="사진" />)
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('dialog', {name: '이미지 미리보기'})).toBeInTheDocument()
  })

  it('preview={false} 면 클릭해도 열리지 않는다', async () => {
    render(<ImagePreview src="/a.jpg" alt="사진" preview={false} />)
    await userEvent.click(screen.getByAltText('사진'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('group 을 주면 라이트박스가 해당 인덱스에서 열린다', async () => {
    render(<ImagePreview src="/b.jpg" alt="b" group={IMGS} />)
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('로드 실패 시 fallback 으로 교체된다', () => {
    render(<ImagePreview src="/broken.jpg" alt="x" fallback="/fb.jpg" />)
    const img = screen.getByAltText<HTMLImageElement>('x')
    fireEvent.error(img)
    expect(img.getAttribute('src')).toBe('/fb.jpg')
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ImagePreview ref={ref} src="/a.jpg" alt="x" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
