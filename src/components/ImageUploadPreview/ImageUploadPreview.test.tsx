import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {ImageUploadPreview} from '~/components/ImageUploadPreview/ImageUploadPreview'

function makeImage(name: string, size: number) {
  const file = new File(['x'], name, {type: 'image/png'})
  Object.defineProperty(file, 'size', {value: size})
  return file
}

describe('ImageUploadPreview', () => {
  it('그리드 모드에서 추가 카드를 렌더한다', () => {
    render(<ImageUploadPreview maxCount={3} />)
    expect(screen.getByText('0/3')).toBeInTheDocument()
  })

  it('drag 모드는 드롭존을 렌더한다', () => {
    render(<ImageUploadPreview drag />)
    expect(screen.getByText('이미지를 드래그하거나 클릭하여 선택')).toBeInTheDocument()
  })

  it('이미지를 추가하면 onChange 로 파일 배열이 전달된다', async () => {
    const onChange = vi.fn()
    render(<ImageUploadPreview onChange={onChange} />)
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')!
    await userEvent.upload(input, makeImage('a.png', 100))
    expect(onChange).toHaveBeenLastCalledWith([expect.any(File)])
  })

  it('크기 초과 이미지는 에러 카드로 표시된다', async () => {
    render(<ImageUploadPreview maxSize={50} />)
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')!
    await userEvent.upload(input, makeImage('big.png', 5000))
    expect(await screen.findByText(/크기 초과/)).toBeInTheDocument()
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ImageUploadPreview ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('showList=false면 썸네일을 누적하지 않고 선택 파일만 전달한다', async () => {
    const onChange = vi.fn()
    render(<ImageUploadPreview showList={false} onChange={onChange} />)
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')!
    await userEvent.upload(input, [makeImage('a.png', 10), makeImage('b.png', 10)])
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(onChange).toHaveBeenLastCalledWith([expect.any(File), expect.any(File)])
  })
})
