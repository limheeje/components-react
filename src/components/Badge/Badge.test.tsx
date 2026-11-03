import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {Badge} from '~/components/Badge/Badge'

describe('Badge', () => {
  it('children 을 렌더한다', () => {
    render(<Badge>NEW</Badge>)
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('type / size 클래스가 적용된다', () => {
    render(
      <Badge type="danger" size="lg">
        3
      </Badge>
    )
    const cls = screen.getByText('3').className
    expect(cls).toMatch(/bsBadgeTypeDanger/)
    expect(cls).toMatch(/bsBadgeSizeLg/)
  })

  it('dot 모드는 점 + 평문을 렌더한다', () => {
    const {container} = render(<Badge dot>대기</Badge>)
    expect(screen.getByText('대기')).toBeInTheDocument()
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })
})
