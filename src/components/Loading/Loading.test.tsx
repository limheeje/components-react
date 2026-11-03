import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {Loading} from '~/components/Loading/Loading'

describe('Loading', () => {
  it('text 를 렌더한다', () => {
    render(<Loading text="불러오는 중" />)
    expect(screen.getByText('불러오는 중')).toBeInTheDocument()
  })

  it('type / size 클래스가 적용된다', () => {
    const {container} = render(<Loading type="dots" size="lg" />)
    expect(container.querySelector('[class*="bsLoadingDots"]')).toBeInTheDocument()
    expect(container.querySelector('[class*="bsLoadingSizeLg"]')).toBeInTheDocument()
  })

  it('기본은 오버레이가 아니다', () => {
    const {container} = render(<Loading />)
    expect((container.firstElementChild as HTMLElement).className).not.toMatch(/overlay/)
  })
})
