import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {DatePicker} from '~/components/DatePicker/DatePicker'

describe('DatePicker', () => {
  it('클릭 시 캘린더 팝업이 열린다', async () => {
    render(<DatePicker />)
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('dialog', {name: '날짜 선택'})).toBeInTheDocument()
  })

  it('value 를 포맷해 표시한다', () => {
    render(<DatePicker value={new Date(2026, 0, 15)} format="YYYY-MM-DD" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('2026-01-15')
  })

  it('single 모드 — 날짜 클릭 시 onChange 호출 후 닫힌다', async () => {
    const onChange = vi.fn()
    render(<DatePicker value={new Date(2026, 0, 15)} onChange={onChange} />)
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('20'))
    expect(onChange).toHaveBeenCalled()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('range 모드 — 시작일/종료일 패널을 렌더한다', async () => {
    render(<DatePicker mode="range" />)
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByText('시작일')).toBeInTheDocument()
    expect(screen.getByText('종료일')).toBeInTheDocument()
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<DatePicker ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
