import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {Button} from '~/components/Button/Button'
import {ButtonGroup} from '~/components/ButtonGroup/ButtonGroup'

describe('ButtonGroup', () => {
  it('role="group" 으로 렌더된다', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('disabled 를 하위 버튼 전체에 전파한다', () => {
    render(
      <ButtonGroup disabled>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    for (const btn of screen.getAllByRole('button')) expect(btn).toBeDisabled()
  })

  it('개별 버튼의 disabled 는 유지된다', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
        <Button disabled>B</Button>
      </ButtonGroup>
    )
    const [a, b] = screen.getAllByRole('button')
    expect(a).toBeEnabled()
    expect(b).toBeDisabled()
  })

  it('size 를 하위 버튼에 주입한다', () => {
    render(
      <ButtonGroup size="lg">
        <Button>A</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('button').className).toMatch(/bsButtonSizeLg/)
  })
})
