import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Icon} from '~/components/Icon/Icon'

describe('Icon', () => {
  it('aria-label 없으면 aria-hidden 이다', () => {
    const {container} = render(<Icon name="search" />)
    expect(container.querySelector('i')).toHaveAttribute('aria-hidden', 'true')
  })

  it('aria-label 이 있으면 role="img" 이다', () => {
    render(<Icon name="search" aria-label="검색" />)
    expect(screen.getByRole('img', {name: '검색'})).toBeInTheDocument()
  })

  it('size 숫자를 px 로 변환해 style 에 반영한다', () => {
    const {container} = render(<Icon name="search" size={20} />)
    const el = container.querySelector('i') as HTMLElement
    expect(el.style.width).toBe('20px')
    expect(el.style.height).toBe('20px')
  })

  it('onClick 이 있으면 클릭이 동작한다', async () => {
    const onClick = vi.fn()
    render(<Icon name="close" aria-label="닫기" onClick={onClick} />)
    await userEvent.click(screen.getByRole('img', {name: '닫기'}))
    expect(onClick).toHaveBeenCalled()
  })

  it('ref 가 요소로 전달된다', () => {
    const ref = createRef<HTMLElement>()
    render(<Icon ref={ref} name="search" />)
    expect(ref.current?.tagName).toBe('I')
  })
})
