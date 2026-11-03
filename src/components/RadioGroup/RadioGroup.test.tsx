import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {RadioGroup} from '~/components/RadioGroup/RadioGroup'
import type {RadioGroupOption} from '~/components/RadioGroup/RadioGroup.type'

const OPTIONS: RadioGroupOption[] = [
  {label: '서울', value: 'seoul'},
  {label: '부산', value: 'busan'},
  {label: '인천', value: 'incheon', disabled: true}
]

describe('RadioGroup', () => {
  it('options 를 라디오로 렌더한다', () => {
    render(<RadioGroup options={OPTIONS} />)
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('defaultValue 로 초기 선택된다', () => {
    render(<RadioGroup options={OPTIONS} defaultValue="busan" />)
    expect(screen.getByLabelText('부산')).toBeChecked()
  })

  it('클릭 시 onChange 로 value 가 전달된다', async () => {
    const onChange = vi.fn()
    render(<RadioGroup options={OPTIONS} onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('서울'))
    expect(onChange).toHaveBeenCalledWith('seoul')
  })

  it('disabled 항목은 선택되지 않는다', async () => {
    const onChange = vi.fn()
    render(<RadioGroup options={OPTIONS} onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('인천'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('같은 name 으로 그룹핑된다', () => {
    render(<RadioGroup options={OPTIONS} name="city" />)
    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toHaveAttribute('name', 'city')
    }
  })
})
