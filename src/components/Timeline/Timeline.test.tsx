import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {Timeline} from '~/components/Timeline/Timeline'
import type {TimelineItem} from '~/components/Timeline/Timeline.type'

const ITEMS: TimelineItem[] = [
  {title: '주문 완료', description: '접수됨', date: '04.01', status: 'success'},
  {title: '배송 중', status: 'processing'},
  {title: '배송 완료', status: 'gray'}
]

describe('Timeline', () => {
  it('items 를 제목/설명/날짜와 함께 렌더한다', () => {
    render(<Timeline items={ITEMS} />)
    expect(screen.getByText('주문 완료')).toBeInTheDocument()
    expect(screen.getByText('접수됨')).toBeInTheDocument()
    expect(screen.getByText('04.01')).toBeInTheDocument()
  })

  it('pending 이 true 면 기본 "처리 중..." 노드를 추가한다', () => {
    render(<Timeline items={ITEMS} pending />)
    expect(screen.getByText('처리 중...')).toBeInTheDocument()
  })

  it('pending 에 텍스트를 주면 그 텍스트를 표시한다', () => {
    render(<Timeline items={ITEMS} pending="조회 중입니다" />)
    expect(screen.getByText('조회 중입니다')).toBeInTheDocument()
  })

  it('direction / color 클래스가 적용된다', () => {
    const {container} = render(<Timeline items={ITEMS} direction="horizontal" color="success" />)
    const root = container.firstElementChild as HTMLElement
    expect(root.className).toMatch(/bsTimelineDirectionHorizontal/)
    expect(root.className).toMatch(/bsTimelineColorSuccess/)
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Timeline ref={ref} items={ITEMS} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
