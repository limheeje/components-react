import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Select} from '~/components/Select/Select'

const OPTIONS = [
  {label: '서울', value: 'seoul'},
  {label: '부산', value: 'busan'},
  {label: '대구', value: 'daegu', disabled: true}
]

describe('Select', () => {
  it('placeholder 를 표시하고 클릭 시 옵션이 열린다', async () => {
    render(<Select options={OPTIONS} placeholder="도시 선택" />)
    await userEvent.click(screen.getByText('도시 선택'))
    expect(screen.getByText('서울')).toBeInTheDocument()
    expect(screen.getByText('부산')).toBeInTheDocument()
  })

  it('옵션 선택 시 onChange(value) 가 호출된다', async () => {
    const onChange = vi.fn()
    render(<Select options={OPTIONS} onChange={onChange} placeholder="p" />)
    await userEvent.click(screen.getByText('p'))
    await userEvent.click(screen.getByText('서울'))
    expect(onChange).toHaveBeenCalledWith('seoul')
  })

  it('disabled 옵션은 선택되지 않는다', async () => {
    const onChange = vi.fn()
    render(<Select options={OPTIONS} onChange={onChange} placeholder="p" />)
    await userEvent.click(screen.getByText('p'))
    await userEvent.click(screen.getByText(/대구/))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('disabled 면 열리지 않는다', async () => {
    render(<Select options={OPTIONS} placeholder="p" disabled />)
    await userEvent.click(screen.getByText('p'))
    expect(screen.queryByText('서울')).not.toBeInTheDocument()
  })

  it('multiple 이면 onChange(value[]) 로 누적/토글되고 드롭다운이 유지된다', async () => {
    const onChange = vi.fn()
    render(<Select multiple options={OPTIONS} onChange={onChange} placeholder="p" />)
    await userEvent.click(screen.getByText('p'))
    await userEvent.click(screen.getByText('서울'))
    expect(onChange).toHaveBeenLastCalledWith(['seoul'])
    await userEvent.click(screen.getByText('부산'))
    expect(onChange).toHaveBeenLastCalledWith(['seoul', 'busan'])
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('multiple 태그의 제거 버튼으로 개별 해제된다', async () => {
    const onChange = vi.fn()
    render(<Select multiple options={OPTIONS} value={['seoul', 'busan']} onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('서울 제거'))
    expect(onChange).toHaveBeenCalledWith(['busan'])
  })
})
