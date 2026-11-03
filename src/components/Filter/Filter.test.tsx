import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {DEFAULT_FILTER_SECTIONS} from '~/components/Filter/Filter.constant'
import {Filter} from '~/components/Filter/Filter'
import type {FilterValue} from '~/components/Filter/Filter.type'

describe('Filter', () => {
  it('open=true 면 기본 섹션들과 초기화/적용하기 버튼을 렌더한다', () => {
    render(<Filter open onClose={vi.fn()} sections={DEFAULT_FILTER_SECTIONS} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('전체 필터')).toBeInTheDocument()
    expect(screen.getByText('브랜드')).toBeInTheDocument()
    expect(screen.getByText('가격대')).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /초기화/})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /적용하기/})).toBeInTheDocument()
  })

  it('체크박스 섹션을 클릭하면 onChange / onConfirm 이 호출된다', async () => {
    const onChange = vi.fn()
    const onConfirm = vi.fn()
    render(
      <Filter open onClose={vi.fn()} sections={DEFAULT_FILTER_SECTIONS} onChange={onChange} onConfirm={onConfirm} />
    )
    await userEvent.click(screen.getByRole('checkbox', {name: '중고'}))
    await userEvent.click(screen.getByRole('button', {name: /적용하기/}))
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({condition: ['used']}))
    expect(onConfirm).toHaveBeenCalledWith(expect.objectContaining({condition: ['used']}))
  })

  it('브랜드 검색어를 입력하면 해당 브랜드만 노출된다', async () => {
    render(<Filter open onClose={vi.fn()} sections={DEFAULT_FILTER_SECTIONS} />)
    expect(screen.getByText('Canon')).toBeInTheDocument()
    await userEvent.type(screen.getByPlaceholderText('브랜드 검색'), 'canon')
    expect(screen.getByText('Canon')).toBeInTheDocument()
    expect(screen.queryByText('Advantest')).not.toBeInTheDocument()
  })

  it('초기화 버튼을 클릭하면 선택값이 모두 비워진다', async () => {
    const onChange = vi.fn()
    render(<Filter open onClose={vi.fn()} sections={DEFAULT_FILTER_SECTIONS} onChange={onChange} />)
    await userEvent.click(screen.getByRole('checkbox', {name: '중고'}))
    await userEvent.click(screen.getByRole('button', {name: /초기화/}))
    await userEvent.click(screen.getByRole('button', {name: /적용하기/}))
    expect(onChange).toHaveBeenCalledWith({})
  })

  it('가격대 최소/최대 입력이 value.priceRange 에 반영된다', async () => {
    const onConfirm = vi.fn()
    render(<Filter open onClose={vi.fn()} sections={DEFAULT_FILTER_SECTIONS} onConfirm={onConfirm} />)
    await userEvent.type(screen.getByPlaceholderText('최소 금액'), '1000')
    await userEvent.type(screen.getByPlaceholderText('최대 금액'), '5000')
    await userEvent.click(screen.getByRole('button', {name: /적용하기/}))
    const value = onConfirm.mock.calls[0]![0] as FilterValue
    expect(value.priceRange).toEqual({min: '1000', max: '5000'})
  })
})
