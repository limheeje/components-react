import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Accordion} from '~/components/Accordion/Accordion'

function Basic(props: Partial<Parameters<typeof Accordion>[0]>) {
  return (
    <Accordion {...props}>
      <Accordion.Item value="a" title="첫 번째">
        내용 A
      </Accordion.Item>
      <Accordion.Item value="b" title="두 번째">
        내용 B
      </Accordion.Item>
    </Accordion>
  )
}

describe('Accordion', () => {
  it('제목을 렌더하고 클릭 시 열린다', async () => {
    render(<Basic />)
    const btn = screen.getByRole('button', {name: '첫 번째'})
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
  })

  it('single(기본) — 하나 열면 다른 건 닫힌다', async () => {
    render(<Basic defaultValue="a" />)
    await userEvent.click(screen.getByRole('button', {name: '두 번째'}))
    expect(screen.getByRole('button', {name: '첫 번째'})).toHaveAttribute('aria-expanded', 'false')
  })

  it('onValueChange 가 호출된다', async () => {
    const onValueChange = vi.fn()
    render(<Basic onValueChange={onValueChange} />)
    await userEvent.click(screen.getByRole('button', {name: '첫 번째'}))
    expect(onValueChange).toHaveBeenCalledWith('a')
  })

  it('<Accordion.Item> 을 밖에서 쓰면 throw', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(
        <Accordion.Item value="x" title="x">
          y
        </Accordion.Item>
      )
    ).toThrow()
    spy.mockRestore()
  })
})
