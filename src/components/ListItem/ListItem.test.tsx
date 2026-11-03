import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {ListItem} from '~/components/ListItem/ListItem'

describe('ListItem', () => {
  it('title / description / extra 를 렌더한다', () => {
    render(<ListItem title="제목" description="설명" extra={<span>부가</span>} />)
    expect(screen.getByText('제목')).toBeInTheDocument()
    expect(screen.getByText('설명')).toBeInTheDocument()
    expect(screen.getByText('부가')).toBeInTheDocument()
  })

  it('clickable 이면 role="button" 이고 클릭이 동작한다', async () => {
    const onClick = vi.fn()
    render(<ListItem title="클릭" clickable onClick={onClick} />)
    const el = screen.getByRole('button', {name: /클릭/})
    expect(el).toHaveAttribute('tabindex', '0')
    await userEvent.click(el)
    expect(onClick).toHaveBeenCalled()
  })

  it('clickable 이 아니면 role 이 없다', () => {
    render(<ListItem title="일반" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ListItem ref={ref} title="x" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
