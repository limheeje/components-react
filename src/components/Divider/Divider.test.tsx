import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {Divider} from '~/components/Divider/Divider'

describe('Divider', () => {
  it('label 이 있으면 separator role 로 렌더된다', () => {
    render(<Divider label="또는" />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('label 을 렌더한다', () => {
    render(<Divider label="또는" />)
    expect(screen.getByText('또는')).toBeInTheDocument()
  })

  it('label 이 없으면(기본 decorative) separator role 이 없다', () => {
    const {container} = render(<Divider />)
    expect(container.querySelector('[role="separator"]')).toBeNull()
  })

  it('direction 클래스가 적용된다', () => {
    const {container} = render(<Divider direction="vertical" />)
    expect((container.firstElementChild as HTMLElement).className).toMatch(/vertical/)
  })
})
