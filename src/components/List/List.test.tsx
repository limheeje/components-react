import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {List} from '~/components/List/List'
import {ListItem} from '~/components/ListItem/ListItem'

describe('List', () => {
  it('items + renderItem 으로 렌더한다', () => {
    render(
      <List
        items={[
          {id: 1, name: '사과'},
          {id: 2, name: '바나나'}
        ]}
        renderItem={(it) => <ListItem key={it.id} title={it.name} />}
      />
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('사과')).toBeInTheDocument()
    expect(screen.getByText('바나나')).toBeInTheDocument()
  })

  it('onItemClick 이 항목/인덱스와 함께 호출된다', async () => {
    const onItemClick = vi.fn()
    render(
      <List
        items={[{id: 1, name: '사과'}]}
        onItemClick={onItemClick}
        renderItem={(it) => <ListItem key={it.id} title={it.name} />}
      />
    )
    await userEvent.click(screen.getByText('사과'))
    expect(onItemClick).toHaveBeenCalledWith({id: 1, name: '사과'}, 0)
  })

  it('loading 이면 aria-busy 스켈레톤을 렌더한다', () => {
    const {container} = render(<List loading />)
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })

  it('children 으로 ListItem 을 직접 넣을 수 있다', () => {
    render(
      <List>
        <ListItem title="직접" />
      </List>
    )
    expect(screen.getByText('직접')).toBeInTheDocument()
  })
})
