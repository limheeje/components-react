import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {Breadcrumb} from '~/components/Breadcrumb/Breadcrumb'

const ITEMS = [{label: '홈', href: '/'}, {label: '게시판', href: '/board'}, {label: '글 상세'}]

describe('Breadcrumb', () => {
  it('nav + 항목들을 렌더한다', () => {
    render(<Breadcrumb items={ITEMS} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', {name: '홈'})).toBeInTheDocument()
  })

  it('마지막 항목은 aria-current="page"', () => {
    render(<Breadcrumb items={ITEMS} />)
    expect(screen.getByText('글 상세')).toHaveAttribute('aria-current', 'page')
  })

  it('maxItems 초과 시 축약(…)이 나타난다', () => {
    render(
      <Breadcrumb
        items={[
          {label: 'A', href: '/a'},
          {label: 'B', href: '/b'},
          {label: 'C', href: '/c'},
          {label: 'D', href: '/d'},
          {label: 'E'}
        ]}
        maxItems={3}
      />
    )
    expect(screen.getByText('…')).toBeInTheDocument()
  })
})
