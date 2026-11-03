import {render, screen, waitFor, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {RegionPicker} from '~/components/RegionPicker/RegionPicker'
import type {RegionValue} from '~/components/RegionPicker/RegionPicker.type'

function columns() {
  return screen.getAllByRole('listbox').map((el) => el.parentElement as HTMLElement)
}

describe('RegionPicker (단일 선택, multiple=false)', () => {
  it('open=true 면 시/도 목록과 안내 문구를 렌더한다', () => {
    render(<RegionPicker open onClose={vi.fn()} multiple={false} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('시군구 선택')).toBeInTheDocument()
    // 헤더 설명 + 시군구 컬럼 안내문 2곳에 동일 문구가 노출됨
    expect(screen.getAllByText('행정구역을 선택하세요.')).toHaveLength(2)
    expect(within(columns()[0]!).getByText('전남')).toBeInTheDocument()
  })

  it('시/도 선택 시 시군구 목록이 채워지고, 선택 전엔 확정 버튼이 disabled', async () => {
    render(<RegionPicker open onClose={vi.fn()} multiple={false} />)
    expect(screen.getByRole('button', {name: '선택'})).toBeDisabled()
    await userEvent.click(within(columns()[0]!).getByText('전남'))
    expect(within(columns()[1]!).getByText('보성군')).toBeInTheDocument()
    expect(screen.getByRole('button', {name: '선택'})).toBeDisabled()
  })

  it('시/도 + 시군구 선택 후 확정 클릭 시 onChange / onConfirm / onClose 가 호출된다', async () => {
    const onChange = vi.fn()
    const onConfirm = vi.fn()
    const onClose = vi.fn()
    render(<RegionPicker open onClose={onClose} multiple={false} onChange={onChange} onConfirm={onConfirm} />)
    await userEvent.click(within(columns()[0]!).getByText('전남'))
    await userEvent.click(within(columns()[1]!).getByText('보성군'))
    expect(screen.getByText('전남 > 보성군')).toBeInTheDocument()
    const confirmBtn = screen.getByRole('button', {name: '선택'})
    expect(confirmBtn).not.toBeDisabled()
    await userEvent.click(confirmBtn)
    expect(onChange).toHaveBeenCalledWith({province: '전남', city: '보성군'})
    expect(onConfirm).toHaveBeenCalledWith({province: '전남', city: '보성군'})
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('value 로 초기 선택 상태를 복원한다', () => {
    render(<RegionPicker open onClose={vi.fn()} multiple={false} value={{province: '전남', city: '보성군'}} />)
    expect(screen.getByText('전남 > 보성군')).toBeInTheDocument()
    expect(screen.getByRole('button', {name: '선택'})).not.toBeDisabled()
  })

  it('뒤로가기 버튼으로 onClose 가 호출된다 (즉시)', async () => {
    const onClose = vi.fn()
    render(<RegionPicker open onClose={onClose} multiple={false} />)
    await userEvent.click(screen.getByRole('button', {name: '뒤로가기'}))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Dialog 자체 X 버튼으로도 onClose 가 호출된다 (drawer 는 퇴장 애니메이션 뒤 호출)', async () => {
    const onClose = vi.fn()
    render(<RegionPicker open onClose={onClose} multiple={false} />)
    await userEvent.click(screen.getByRole('button', {name: '닫기'}))
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1), {timeout: 1000})
  })
})

describe('RegionPicker (기본값)', () => {
  it('multiple prop 을 생략하면 기본값 true — 다중 선택 UI(체크박스/칩/적용하기)가 노출된다', async () => {
    render(<RegionPicker open onClose={vi.fn()} />)
    await userEvent.click(within(columns()[0]!).getByText('전남'))
    await userEvent.click(within(columns()[1]!).getByText('보성군'))
    expect(screen.getByRole('button', {name: '선택 해제'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: '적용하기'})).toBeInTheDocument()
  })
})

describe('RegionPicker (multiple)', () => {
  it('여러 시군구를 토글 선택할 수 있고, 선택 칩이 표시된다', async () => {
    render(<RegionPicker open onClose={vi.fn()} multiple />)
    await userEvent.click(within(columns()[0]!).getByText('전남'))
    await userEvent.click(within(columns()[1]!).getByText('보성군'))
    await userEvent.click(within(columns()[1]!).getByText('여수시'))
    expect(screen.getAllByRole('button', {name: '선택 해제'})).toHaveLength(2)
    expect(screen.getByRole('button', {name: '적용하기'})).toBeInTheDocument()

    // 다시 클릭하면 선택 해제
    await userEvent.click(within(columns()[1]!).getByText('여수시'))
    expect(screen.getAllByRole('button', {name: '선택 해제'})).toHaveLength(1)
  })

  it('칩의 X 로 개별 선택을 해제할 수 있다', async () => {
    render(<RegionPicker open onClose={vi.fn()} multiple value={[{province: '전남', city: '보성군'}]} />)
    expect(screen.getByRole('button', {name: '적용하기'})).not.toBeDisabled()
    await userEvent.click(screen.getByRole('button', {name: '선택 해제'}))
    expect(screen.getByRole('button', {name: '적용하기'})).toBeDisabled()
  })

  it('초기화 버튼으로 전체 선택을 지운다', async () => {
    const initial: RegionValue[] = [
      {province: '전남', city: '보성군'},
      {province: '전남', city: '여수시'}
    ]
    render(<RegionPicker open onClose={vi.fn()} multiple value={initial} />)
    expect(screen.getAllByRole('button', {name: '선택 해제'})).toHaveLength(2)
    await userEvent.click(screen.getByRole('button', {name: '초기화'}))
    expect(screen.queryAllByRole('button', {name: '선택 해제'})).toHaveLength(0)
    expect(screen.getByRole('button', {name: '적용하기'})).toBeDisabled()
  })

  it('다른 시/도로 이동해도 이전 선택이 유지된다 (시/도 목록에 개수 표시)', async () => {
    render(<RegionPicker open onClose={vi.fn()} multiple />)
    await userEvent.click(within(columns()[0]!).getByText('전남'))
    await userEvent.click(within(columns()[1]!).getByText('보성군'))
    await userEvent.click(within(columns()[0]!).getByText('경기'))
    expect(screen.getAllByRole('button', {name: '선택 해제'})).toHaveLength(1)
    const jeonnamBtn = within(columns()[0]!).getByText('전남').closest('button')!
    expect(within(jeonnamBtn).getByText('1')).toBeInTheDocument()
  })

  it('확정 시 RegionValue[] 로 onChange / onConfirm 이 호출된다', async () => {
    const onChange = vi.fn()
    render(<RegionPicker open onClose={vi.fn()} multiple onChange={onChange} />)
    await userEvent.click(within(columns()[0]!).getByText('전남'))
    await userEvent.click(within(columns()[1]!).getByText('보성군'))
    await userEvent.click(within(columns()[1]!).getByText('여수시'))
    await userEvent.click(screen.getByRole('button', {name: '적용하기'}))
    expect(onChange).toHaveBeenCalledWith([
      {province: '전남', city: '보성군'},
      {province: '전남', city: '여수시'}
    ])
  })
})
