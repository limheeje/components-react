import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Cascader} from './Cascader'
import type {CascaderOption} from './Cascader.type'

const OPTIONS: CascaderOption[] = [
  {value: 'seoul', label: '서울', children: [{value: 'gangnam', label: '강남구'}]},
  {value: 'jeju', label: '제주'}
]

describe('Cascader', () => {
  it('계층 메뉴에서 leaf 경로를 선택한다', async () => {
    const onChange = vi.fn()
    render(<Cascader options={OPTIONS} onChange={onChange} />)
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('서울'))
    await userEvent.click(screen.getByText('강남구'))
    expect(onChange).toHaveBeenCalledWith(['seoul', 'gangnam'], expect.any(Array))
  })

  it('disabled 옵션은 선택하지 않는다', async () => {
    const onChange = vi.fn()
    render(<Cascader options={[{value: 'x', label: '비활성', disabled: true}]} onChange={onChange} />)
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('비활성'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
