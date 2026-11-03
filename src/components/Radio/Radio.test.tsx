import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Radio} from '~/components/Radio/Radio'

describe('Radio', () => {
  it('label 로 렌더된다', () => {
    render(<Radio name="g" value="a" label="옵션 A" />)
    expect(screen.getByLabelText('옵션 A')).toBeInTheDocument()
  })

  it('클릭하면 선택되고 onChange 가 호출된다', async () => {
    const onChange = vi.fn()
    render(<Radio name="g" value="a" label="A" onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('A'))
    expect(screen.getByLabelText('A')).toBeChecked()
    expect(onChange).toHaveBeenCalledOnce()
  })

  it('disabled 면 클릭되지 않는다', async () => {
    const onChange = vi.fn()
    render(<Radio name="g" value="a" label="A" disabled onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('A'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
