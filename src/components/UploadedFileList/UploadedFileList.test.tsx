import {fireEvent, render, screen} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'

import {UploadedFileList} from './UploadedFileList'
import {isImageFile, thumbnailOf} from './UploadedFileList.util'

const files = [
  {name: 'a.png', url: 'https://cdn/files/a.png', size: 2048},
  {name: 'b.pdf', url: 'https://cdn/files/b.pdf', size: 100}
]

describe('UploadedFileList', () => {
  it('서버 URL 이미지와 일반 파일을 표시한다', () => {
    render(<UploadedFileList value={files} />)
    expect(screen.getByRole('img', {name: 'a.png'})).toHaveAttribute('src', files[0].url)
    expect(screen.getByText('2.0 KB')).toBeInTheDocument()
    expect(screen.getByText('b.pdf')).toBeInTheDocument()
  })

  it('삭제를 제어형 onChange로 전달한다', () => {
    const onChange = vi.fn()
    render(<UploadedFileList value={files} onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', {name: 'a.png 삭제'}))
    expect(onChange).toHaveBeenCalledWith([files[1]])
  })

  it('이미지 경로를 판별한다', () => {
    expect(isImageFile({name: 'x', url: 'https://cdn/x.webp?v=1'})).toBe(true)
    expect(isImageFile({name: 'x', url: 'https://cdn/x.pdf'})).toBe(false)
    expect(thumbnailOf({name: 'x', url: 'https://cdn/x.png'})).toBe('https://cdn/x.png')
  })
})
