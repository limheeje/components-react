import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it} from 'vitest'

import {Textarea} from '~/components/Textarea/Textarea'

describe('Textarea', () => {
  it('placeholder 로 렌더된다', () => {
    render(<Textarea placeholder="내용" />)
    expect(screen.getByPlaceholderText('내용')).toBeInTheDocument()
  })

  it('입력이 반영된다', async () => {
    render(<Textarea placeholder="p" />)
    const el = screen.getByPlaceholderText<HTMLTextAreaElement>('p')
    await userEvent.type(el, '여러 줄\n입력')
    expect(el.value).toBe('여러 줄\n입력')
  })

  it('error 문자열이면 메시지를 렌더한다', () => {
    render(<Textarea error="너무 짧습니다" placeholder="p" />)
    expect(screen.getByText('너무 짧습니다')).toBeInTheDocument()
  })

  it('showCount + maxLength 카운터를 표시한다', () => {
    render(<Textarea showCount maxLength={10} defaultValue="abc" placeholder="p" />)
    expect(screen.getByText('3 / 10')).toBeInTheDocument()
  })

  it('ref 가 textarea 로 전달된다', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })
})
