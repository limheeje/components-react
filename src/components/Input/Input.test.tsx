import {createRef, useState} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Input} from '~/components/Input/Input'

describe('Input', () => {
  it('placeholder 로 렌더된다', () => {
    render(<Input placeholder="아이디" />)
    expect(screen.getByPlaceholderText('아이디')).toBeInTheDocument()
  })

  it('제어 컴포넌트에서 onChange 가 호출된다', async () => {
    function Wrap() {
      const [v, setV] = useState('')
      return <Input value={v} onChange={(e) => setV(e.target.value)} placeholder="p" />
    }
    render(<Wrap />)
    const input = screen.getByPlaceholderText<HTMLInputElement>('p')
    await userEvent.type(input, 'abc')
    expect(input.value).toBe('abc')
  })

  it('error 문자열이면 하단 메시지를 렌더한다', () => {
    render(<Input error="필수 항목" placeholder="p" />)
    expect(screen.getByText('필수 항목')).toBeInTheDocument()
  })

  it('compound — Input.Password 는 type=password', () => {
    render(<Input.Password placeholder="pw" />)
    expect(screen.getByPlaceholderText('pw')).toHaveAttribute('type', 'password')
  })

  it('Input.Search 는 Enter 로 onSearch 를 호출한다', async () => {
    const onSearch = vi.fn()
    render(<Input.Search placeholder="검색" onSearch={onSearch} />)
    await userEvent.type(screen.getByPlaceholderText('검색'), '키워드{Enter}')
    expect(onSearch).toHaveBeenCalledWith('키워드')
  })

  it('ref 가 input 으로 전달된다', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
