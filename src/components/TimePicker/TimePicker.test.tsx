import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {TimePicker} from '~/components/TimePicker/TimePicker'

describe('TimePicker', () => {
  it('placeholder 를 표시하고 클릭 시 팝업이 열린다', async () => {
    render(<TimePicker placeholder="시간 선택" />)
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveTextContent('시간 선택')
    await userEvent.click(trigger)
    expect(screen.getByRole('dialog', {name: '시간 선택'})).toBeInTheDocument()
  })

  it('value 를 표시값으로 반영한다', () => {
    render(<TimePicker value="09:30" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('09:30')
  })

  it("'확인' 을 눌러야 onChange 가 호출된다", async () => {
    const onChange = vi.fn()
    render(<TimePicker value="09:30" onChange={onChange} />)
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByRole('button', {name: '확인'}))
    expect(onChange).toHaveBeenCalledWith('09:30')
  })

  it("'취소' 는 onChange 없이 닫힌다", async () => {
    const onChange = vi.fn()
    render(<TimePicker value="09:30" onChange={onChange} />)
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByRole('button', {name: '취소'}))
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<TimePicker ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
