import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Header} from '~/components/Header/Header'
import {Icon} from '~/components/Icon/Icon'

describe('Header', () => {
  it('title 을 렌더한다', () => {
    render(<Header title="회원 목록" />)
    expect(screen.getByText('회원 목록')).toBeInTheDocument()
  })

  it('back 버튼 클릭 시 onBack 이 호출된다', async () => {
    const onBack = vi.fn()
    render(<Header title="상세" back onBack={onBack} />)
    await userEvent.click(screen.getByRole('button', {name: '뒤로 가기'}))
    expect(onBack).toHaveBeenCalled()
  })

  it('actions 배열을 버튼으로 렌더하고 badge 를 표시한다', () => {
    render(
      <Header
        title="홈"
        actions={[
          {icon: <Icon name="search" />, label: '검색'},
          {icon: <Icon name="info" />, label: '알림', badge: 3}
        ]}
      />
    )
    expect(screen.getByRole('button', {name: '검색'})).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('type="primary" 클래스가 적용된다', () => {
    const {container} = render(<Header title="홈" type="primary" />)
    expect(container.querySelector('header')?.className).toMatch(/bsHeaderTypePrimary/)
  })

  it('ref 가 header 엘리먼트로 전달된다', () => {
    const ref = createRef<HTMLElement>()
    render(<Header ref={ref} title="홈" />)
    expect(ref.current?.tagName).toBe('HEADER')
  })
})
