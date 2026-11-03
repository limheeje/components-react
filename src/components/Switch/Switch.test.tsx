import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Switch} from '~/components/Switch/Switch'

describe('Switch', () => {
  it('switch role 로 렌더된다', () => {
    render(<Switch label="알림" />)
    expect(screen.getByRole('switch', {name: '알림'})).toBeInTheDocument()
  })

  it('토글 시 onChange 가 호출된다', async () => {
    const onChange = vi.fn()
    render(<Switch label="s" onChange={onChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledOnce()
  })

  it('disabled 면 토글되지 않는다', async () => {
    const onChange = vi.fn()
    render(<Switch label="s" disabled onChange={onChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
