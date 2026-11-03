import {createRef} from 'react'

import {render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {Grid} from '~/components/Grid/Grid'

describe('Grid', () => {
  it('display: grid 와 숫자 columns → repeat 트랙을 적용한다', () => {
    const {container} = render(
      <Grid columns={3}>
        <div>a</div>
      </Grid>
    )
    const el = container.firstElementChild as HTMLElement
    expect(el.style.display).toBe('grid')
    expect(el.style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))')
  })

  it('문자열 columns 는 그대로 적용된다', () => {
    const {container} = render(
      <Grid columns="200px 1fr">
        <div>a</div>
      </Grid>
    )
    expect((container.firstElementChild as HTMLElement).style.gridTemplateColumns).toBe('200px 1fr')
  })

  it('gap 숫자는 px 로 적용된다', () => {
    const {container} = render(
      <Grid gap={12}>
        <div>a</div>
      </Grid>
    )
    expect((container.firstElementChild as HTMLElement).style.gap).toBe('12px')
  })

  it('Grid.Item 의 colSpan / justifySelf 를 적용한다', () => {
    const {container} = render(
      <Grid>
        <Grid.Item colSpan={2} justifySelf="center">
          x
        </Grid.Item>
      </Grid>
    )
    const item = container.firstElementChild!.firstElementChild as HTMLElement
    expect(item.style.gridColumn).toBe('span 2')
    expect(item.style.justifySelf).toBe('center')
  })

  it('inline 이면 inline-grid', () => {
    const {container} = render(
      <Grid inline>
        <div>a</div>
      </Grid>
    )
    expect((container.firstElementChild as HTMLElement).style.display).toBe('inline-grid')
  })

  it('ref 가 루트 div 로 전달된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Grid ref={ref}>
        <div>a</div>
      </Grid>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
