import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {Steps} from '~/components/Steps/Steps'

const STEPS = [
  {title: '주문', description: '장바구니 확인'},
  {title: '결제', description: '카드 결제'},
  {title: '완료'}
]

describe('Steps', () => {
  it('모든 단계 제목/설명을 렌더한다', () => {
    render(<Steps steps={STEPS} current={1} />)
    expect(screen.getByText('주문')).toBeInTheDocument()
    expect(screen.getByText('결제')).toBeInTheDocument()
    expect(screen.getByText('완료')).toBeInTheDocument()
    expect(screen.getByText('카드 결제')).toBeInTheDocument()
  })

  it('current 단계에 aria-current="step" 이 붙는다', () => {
    const {container} = render(<Steps steps={STEPS} current={1} />)
    const currentNode = container.querySelector('[aria-current="step"]')
    expect(currentNode).toBeInTheDocument()
    expect(currentNode).toHaveTextContent('결제')
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Steps ref={ref} steps={STEPS} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
