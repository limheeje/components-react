import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it} from 'vitest'

import {Tooltip} from '~/components/Tooltip/Tooltip'

describe('Tooltip', () => {
  it('트리거를 렌더하고 초기엔 tooltip 이 없다', () => {
    render(
      <Tooltip content="도움말">
        <button>버튼</button>
      </Tooltip>
    )
    expect(screen.getByRole('button', {name: '버튼'})).toBeInTheDocument()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('hover 시 tooltip 이 나타난다', async () => {
    render(
      <Tooltip content="도움말" delay={0}>
        <button>버튼</button>
      </Tooltip>
    )
    await userEvent.hover(screen.getByRole('button'))
    expect(await screen.findByRole('tooltip')).toHaveTextContent('도움말')
  })

  it('disabled 면 hover 해도 안 나타난다', async () => {
    render(
      <Tooltip content="도움말" delay={0} disabled>
        <button>버튼</button>
      </Tooltip>
    )
    await userEvent.hover(screen.getByRole('button'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
