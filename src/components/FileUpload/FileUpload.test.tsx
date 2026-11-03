import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {FileUpload, formatFileSize} from '~/components/FileUpload/FileUpload'

function makeFile(name: string, size: number, type = 'text/plain') {
  const file = new File(['x'], name, {type})
  Object.defineProperty(file, 'size', {value: size})
  return file
}

describe('formatFileSize', () => {
  it('B / KB / MB 로 변환한다', () => {
    expect(formatFileSize(512)).toBe('512 B')
    expect(formatFileSize(2048)).toBe('2.0 KB')
    expect(formatFileSize(3 * 1024 * 1024)).toBe('3.0 MB')
  })
})

describe('FileUpload', () => {
  it('버튼 모드로 렌더된다', () => {
    render(<FileUpload />)
    expect(screen.getByRole('button', {name: /파일 선택/})).toBeInTheDocument()
  })

  it('drag 모드는 드롭존을 렌더한다', () => {
    render(<FileUpload drag />)
    expect(screen.getByText('파일을 드래그하거나 클릭하여 선택')).toBeInTheDocument()
  })

  it('파일 선택 시 목록과 onChange 가 반영된다', async () => {
    const onChange = vi.fn()
    render(<FileUpload multiple onChange={onChange} />)
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')!
    await userEvent.upload(input, makeFile('a.txt', 100))
    expect(screen.getByText('a.txt')).toBeInTheDocument()
    expect(onChange).toHaveBeenLastCalledWith([expect.any(File)])
  })

  it('maxSize 초과 파일은 에러 상태로 표시된다', async () => {
    render(<FileUpload multiple maxSize={50} />)
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')!
    await userEvent.upload(input, makeFile('big.txt', 5000))
    expect(screen.getByText(/파일 크기 초과/)).toBeInTheDocument()
  })

  it('삭제 버튼으로 항목이 제거된다', async () => {
    render(<FileUpload multiple />)
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')!
    await userEvent.upload(input, makeFile('a.txt', 100))
    await userEvent.click(screen.getByRole('button', {name: 'a.txt 삭제'}))
    expect(screen.queryByText('a.txt')).not.toBeInTheDocument()
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<FileUpload ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('showList=false면 목록을 만들지 않고 이번 선택분만 전달한다', async () => {
    const onChange = vi.fn()
    render(<FileUpload multiple showList={false} onChange={onChange} />)
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')!
    await userEvent.upload(input, [makeFile('a.txt', 10), makeFile('b.txt', 10)])
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(onChange).toHaveBeenLastCalledWith([expect.any(File), expect.any(File)])
  })

  it('showList=false면 검증 실패 파일을 onReject로 전달한다', async () => {
    const onReject = vi.fn()
    render(<FileUpload multiple showList={false} maxCount={1} maxSize={50} onReject={onReject} />)
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')!
    await userEvent.upload(input, [makeFile('big.txt', 100), makeFile('over.txt', 10)])
    expect(onReject).toHaveBeenCalledWith([
      expect.objectContaining({file: expect.any(File), message: expect.stringContaining('크기 초과')}),
      expect.objectContaining({file: expect.any(File), message: expect.stringContaining('최대 1개')})
    ])
  })
})
