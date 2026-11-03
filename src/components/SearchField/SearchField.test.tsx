import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {SearchField} from '~/components/SearchField/SearchField'

describe('SearchField', () => {
  it('입력 후 Enter 로 onSearch 가 호출된다', async () => {
    const onSearch = vi.fn()
    render(<SearchField onSearch={onSearch} placeholder="검색어" />)
    const input = screen.getByPlaceholderText('검색어')
    await userEvent.type(input, '커피{Enter}')
    expect(onSearch).toHaveBeenCalledWith('커피')
  })

  it('돋보기 버튼 클릭 시 현재 값으로 onSearch 가 호출된다', async () => {
    const onSearch = vi.fn()
    render(<SearchField onSearch={onSearch} placeholder="검색어" />)
    await userEvent.type(screen.getByPlaceholderText('검색어'), '차')
    await userEvent.click(screen.getByRole('button', {name: '검색'}))
    expect(onSearch).toHaveBeenCalledWith('차')
  })

  it('clearable — 값이 있으면 지우기 버튼이 나타나고 클릭 시 onClear', async () => {
    const onClear = vi.fn()
    render(<SearchField clearable onClear={onClear} placeholder="검색어" />)
    await userEvent.type(screen.getByPlaceholderText('검색어'), 'abc')
    await userEvent.click(screen.getByRole('button', {name: '입력 내용 지우기'}))
    expect(onClear).toHaveBeenCalled()
  })

  it('ref 가 input 으로 전달된다', () => {
    const ref = createRef<HTMLInputElement>()
    render(<SearchField ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
  })
})
