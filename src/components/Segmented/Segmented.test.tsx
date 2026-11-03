import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Segmented} from '~/components/Segmented/Segmented'
import type {SegmentedOption} from '~/components/Segmented/Segmented.type'

const OPTIONS: SegmentedOption[] = [
  {label: '공통', value: 'common'},
  {label: 'B2C', value: 'b2c'},
  {label: 'B2B', value: 'b2b', disabled: true}
]

describe('Segmented', () => {
  it('options 를 radio 로 렌더한다 (문자열/객체 혼용)', () => {
    render(<Segmented options={['A', 'B', 'C']} />)
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('defaultValue 로 초기 선택된다', () => {
    render(<Segmented options={OPTIONS} defaultValue="b2c" />)
    expect(screen.getByRole('radio', {name: 'B2C'})).toHaveAttribute('aria-checked', 'true')
  })

  it('클릭 시 onChange 로 value 와 option 이 전달된다', async () => {
    const onChange = vi.fn()
    render(<Segmented options={OPTIONS} onChange={onChange} />)
    await userEvent.click(screen.getByRole('radio', {name: 'B2C'}))
    expect(onChange).toHaveBeenCalledWith('b2c', OPTIONS[1])
  })

  it('disabled 항목은 선택되지 않는다', async () => {
    const onChange = vi.fn()
    render(<Segmented options={OPTIONS} onChange={onChange} />)
    await userEvent.click(screen.getByRole('radio', {name: 'B2B'}))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('size 클래스를 붙인다', () => {
    const {container} = render(<Segmented options={OPTIONS} size="lg" />)
    expect((container.firstChild as HTMLElement).className).toMatch(/bsSegmentedSizeLg/)
  })
})
