import {useState} from 'react'

import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Table} from '~/components/Table/Table'
import type {TableColumn} from '~/components/Table/Table.type'

interface Row {
  id: number
  name: string
  role: string
}

const DATA: Row[] = [
  {id: 1, name: '홍길동', role: '개발자'},
  {id: 2, name: '김철수', role: '디자이너'},
  {id: 3, name: '이영희', role: '기획자'}
]

const COLUMNS: TableColumn<Row>[] = [
  {key: 'id', label: 'ID', sortable: true},
  {key: 'name', label: '이름', sortable: true},
  {key: 'role', label: '역할', render: (v) => `[${v}]`}
]

describe('Table', () => {
  it('columns / data 를 렌더하고 render 함수를 적용한다', () => {
    render(<Table columns={COLUMNS} data={DATA} rowKey="id" />)
    expect(screen.getByText('홍길동')).toBeInTheDocument()
    expect(screen.getByText('[개발자]')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(4)
  })

  it('emptyText 를 표시한다', () => {
    render(<Table columns={COLUMNS} data={[]} emptyText="비었음" />)
    expect(screen.getByText('비었음')).toBeInTheDocument()
  })

  it('sortable 헤더 클릭으로 정렬된다 (asc → desc)', async () => {
    render(<Table columns={COLUMNS} data={DATA} rowKey="id" />)
    const nameHeader = screen.getByText('이름')
    await userEvent.click(nameHeader)
    let cells = screen.getAllByRole('cell')
    expect(cells[1]).toHaveTextContent('김철수')
    await userEvent.click(nameHeader)
    cells = screen.getAllByRole('cell')
    expect(cells[1]).toHaveTextContent('홍길동')
  })

  it('selectable — 헤더 체크박스로 전체 선택', async () => {
    const onSel = vi.fn()
    render(<Table columns={COLUMNS} data={DATA} rowKey="id" selectable onSelectionChange={onSel} />)
    await userEvent.click(screen.getByLabelText('전체 선택'))
    expect(onSel).toHaveBeenLastCalledWith([1, 2, 3], expect.any(Array))
  })

  it('pagination — data 를 슬라이스하고 페이지 이동', async () => {
    function Wrap() {
      const [page, setPage] = useState(1)
      return (
        <Table
          columns={COLUMNS}
          data={[...DATA, {id: 4, name: '박민준', role: '개발자'}, {id: 5, name: '최유진', role: '디자이너'}]}
          rowKey="id"
          pagination={{page, pageSize: 2, onChange: setPage}}
        />
      )
    }
    render(<Wrap />)
    expect(screen.getAllByRole('row')).toHaveLength(3)
    await userEvent.click(screen.getByRole('button', {name: '다음 페이지'}))
    expect(screen.getByText('이영희')).toBeInTheDocument()
  })

  it('headGroups 로 다중 헤더를 렌더한다', () => {
    render(
      <Table
        headGroups={[
          [
            {label: '기본', colSpan: 2},
            {label: '기타', rowSpan: 2}
          ],
          [{label: 'ID'}, {label: '이름'}]
        ]}
        columns={COLUMNS}
        data={DATA}
        rowKey="id"
      />
    )
    const rows = screen.getAllByRole('row')
    expect(within(rows[0]).getByText('기본')).toBeInTheDocument()
  })
})
