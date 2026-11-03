import {createRef} from 'react'

import {render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {Chart} from '~/components/Chart/Chart'

const DATA = [
  {month: '1월', 방문자: 4200, 매출: 1800},
  {month: '2월', 방문자: 3800, 매출: 1540},
  {month: '3월', 방문자: 5100, 매출: 2210}
]

// recharts 는 ResponsiveContainer 크기 측정을 위해 ResizeObserver 를 쓴다 (jsdom 미구현) → 폴리필
class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as {ResizeObserver?: unknown}).ResizeObserver = RO

describe('Chart', () => {
  it('line — svg 컨테이너를 렌더한다', () => {
    const {container} = render(<Chart type="line" data={DATA} xKey="month" series={['방문자', '매출']} />)
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument()
  })

  it('type 에 따라 클래스/렌더가 바뀐다 (pie)', () => {
    const {container} = render(<Chart type="pie" data={DATA} xKey="month" series={['방문자']} />)
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument()
  })

  it('height 를 루트 스타일에 반영한다', () => {
    const {container} = render(<Chart data={DATA} xKey="month" series={['방문자']} height={320} />)
    expect((container.firstElementChild as HTMLElement).style.height).toBe('320px')
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Chart ref={ref} data={DATA} xKey="month" series={['방문자']} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
