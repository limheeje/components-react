import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Checkbox} from '~/components/Checkbox/Checkbox'

describe('Checkbox', () => {
  it('label 로 렌더되고 클릭 시 토글된다', async () => {
    const onChange = vi.fn()
    render(<Checkbox label="약관 동의" onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('약관 동의'))
    expect(onChange).toHaveBeenCalledOnce()
  })

  it('indeterminate 를 input 에 반영한다', () => {
    render(<Checkbox label="부분" indeterminate />)
    expect(screen.getByLabelText<HTMLInputElement>('부분').indeterminate).toBe(true)
  })

  it('disabled 면 클릭되지 않는다', async () => {
    const onChange = vi.fn()
    render(<Checkbox label="x" disabled onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('x'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('ref 가 input 으로 전달된다', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Checkbox ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
