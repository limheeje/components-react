import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Button} from '~/components/Button/Button'
import {BUTTON_VARIANT} from '~/components/Button/Button.constant'

describe('Button', () => {
  it('children 을 렌더한다', () => {
    render(<Button>저장</Button>)
    expect(screen.getByRole('button', {name: '저장'})).toBeInTheDocument()
  })

  it('onClick 이 호출된다', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>클릭</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('loading 이면 클릭이 차단되고 aria-busy 가 붙는다', async () => {
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        로딩
      </Button>
    )
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-busy', 'true')
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('variant / size 클래스가 적용된다', () => {
    render(
      <Button variant={BUTTON_VARIANT.SECONDARY} size="lg">
        x
      </Button>
    )
    const cls = screen.getByRole('button').className
    expect(cls).toMatch(/bsButtonVariantSecondary/)
    expect(cls).toMatch(/bsButtonSizeLg/)
  })

  it('상태 색상 variant 클래스가 적용된다', () => {
    render(<Button variant={BUTTON_VARIANT.DANGER_LIGHT}>위험</Button>)
    expect(screen.getByRole('button').className).toMatch(/bsButtonVariantDangerLight/)
  })

  it('htmlType 을 button type 으로 전달한다', () => {
    render(<Button htmlType="submit">전송</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('ref 가 button 으로 전달된다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>x</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
