import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Pagination} from '~/components/Pagination/Pagination'

describe('Pagination', () => {
  it('nav + 현재 페이지 aria-current 를 렌더한다', () => {
    render(<Pagination page={2} totalPages={5} onChange={vi.fn()} />)
    expect(screen.getByRole('navigation', {name: 'pagination'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: '2'})).toHaveAttribute('aria-current', 'page')
  })

  it('페이지 버튼 클릭 시 onChange 가 호출된다', async () => {
    const onChange = vi.fn()
    render(<Pagination page={1} totalPages={5} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', {name: '3'}))
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('이전 버튼은 첫 페이지에서 비활성화된다', () => {
    render(<Pagination page={1} totalPages={5} onChange={vi.fn()} />)
    expect(screen.getByRole('button', {name: '이전 페이지'})).toBeDisabled()
  })

  it('다음 버튼은 마지막 페이지에서 비활성화된다', () => {
    render(<Pagination page={5} totalPages={5} onChange={vi.fn()} />)
    expect(screen.getByRole('button', {name: '다음 페이지'})).toBeDisabled()
  })

  it('total + pageSize 로 페이지 수를 계산한다', () => {
    render(<Pagination page={1} total={30} pageSize={10} onChange={vi.fn()} />)
    expect(screen.getByRole('button', {name: '3'})).toBeInTheDocument()
    expect(screen.queryByRole('button', {name: '4'})).not.toBeInTheDocument()
  })
})
