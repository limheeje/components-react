import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Tabs} from '~/components/Tabs/Tabs'

const ITEMS = [
  {key: 'a', label: '탭 A', content: <div>내용 A</div>},
  {key: 'b', label: '탭 B', content: <div>내용 B</div>},
  {key: 'c', label: '탭 C', content: <div>내용 C</div>, disabled: true}
]

describe('Tabs', () => {
  it('tab role 목록과 첫 탭 내용을 렌더한다', () => {
    render(<Tabs items={ITEMS} />)
    expect(screen.getAllByRole('tab')).toHaveLength(3)
    expect(screen.getByText('내용 A')).toBeInTheDocument()
  })

  it('다른 탭 클릭 시 전환되고 onChange 가 호출된다', async () => {
    const onChange = vi.fn()
    render(<Tabs items={ITEMS} onChange={onChange} />)
    await userEvent.click(screen.getByRole('tab', {name: '탭 B'}))
    expect(screen.getByText('내용 B')).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('disabled 탭은 전환되지 않는다', async () => {
    render(<Tabs items={ITEMS} />)
    await userEvent.click(screen.getByRole('tab', {name: '탭 C'}))
    expect(screen.getByText('내용 A')).toBeInTheDocument()
  })

  it('defaultKey 로 초기 탭을 지정한다', () => {
    render(<Tabs items={ITEMS} defaultKey="b" />)
    expect(screen.getByText('내용 B')).toBeInTheDocument()
  })
})
