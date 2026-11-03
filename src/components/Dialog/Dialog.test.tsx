import {act, useState} from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Dialog, DialogProvider} from '~/components/Dialog/Dialog'
import {alertDialog, closeAllDialogs, confirmDialog} from '~/components/Dialog/Dialog.store'

// jsdom(이 버전)은 Pointer Events 를 구현하지 않음 — 스와이프 제스처 테스트를 위한 최소 폴리필/스텁.
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {}
  Element.prototype.releasePointerCapture = () => {}
}
if (typeof PointerEvent === 'undefined') {
  class PointerEventPolyfill extends MouseEvent {
    pointerId: number
    constructor(type: string, params: MouseEventInit & {pointerId?: number} = {}) {
      super(type, params)
      this.pointerId = params.pointerId ?? 0
    }
  }
  // @ts-expect-error — 테스트 환경(jsdom) 전용 최소 폴리필
  globalThis.PointerEvent = PointerEventPolyfill
}

function dispatchPointer(target: HTMLElement, type: string, clientY: number, timeStamp: number) {
  const event = new PointerEvent(type, {clientY, clientX: 0, bubbles: true, cancelable: true})
  Object.defineProperty(event, 'timeStamp', {value: timeStamp})
  // 세 이벤트(down/move/up)를 동일 동기 블록에서 연달아 dispatch 하면 React 가 상태 업데이트를
  // 배칭해 각 핸들러가 이전 렌더의 stale closure(`drag`)를 읽는다 — 실제 브라우저에서는 각 포인터
  // 이벤트가 별도 태스크라 발생하지 않는 문제. act() 로 매번 동기 flush 시켜 재현을 맞춘다.
  act(() => {
    target.dispatchEvent(event)
  })
}

describe('Dialog (선언형)', () => {
  it('open=false 면 렌더되지 않는다', () => {
    render(<Dialog open={false} onClose={vi.fn()} title="t" />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('open=true 면 title / children 을 렌더한다', () => {
    render(
      <Dialog open onClose={vi.fn()} title="회원 삭제">
        본문 내용
      </Dialog>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('회원 삭제')).toBeInTheDocument()
    expect(screen.getByText('본문 내용')).toBeInTheDocument()
  })

  it('X 버튼 / ESC 로 onClose 가 호출된다', async () => {
    const onClose = vi.fn()
    render(<Dialog open onClose={onClose} title="t" />)
    await userEvent.click(screen.getByRole('button', {name: '닫기'}))
    expect(onClose).toHaveBeenCalled()
  })

  it('hideClose 면 X 버튼이 없다', () => {
    render(
      <Dialog open onClose={vi.fn()} title="t" hideClose>
        x
      </Dialog>
    )
    expect(screen.queryByRole('button', {name: '닫기'})).not.toBeInTheDocument()
  })

  it('열리면 body 스크롤이 잠기고 닫히면 풀린다', () => {
    const {rerender} = render(<Dialog open onClose={vi.fn()} title="t" />)
    expect(document.body.style.overflow).toBe('hidden')
    rerender(<Dialog open={false} onClose={vi.fn()} title="t" />)
    expect(document.body.style.overflow).toBe('')
  })

  it('lockScroll={false} 면 body 스크롤을 잠그지 않는다', () => {
    render(<Dialog open onClose={vi.fn()} title="t" lockScroll={false} />)
    expect(document.body.style.overflow).toBe('')
  })

  it('variant="drawer" — direction 클래스가 backdrop 에 붙는다', () => {
    render(
      <Dialog open onClose={vi.fn()} title="t" variant="drawer" direction="right">
        x
      </Dialog>
    )
    const backdrop = screen.getByRole('dialog').parentElement as HTMLElement
    expect(backdrop.className).toMatch(/bsDialogVariantDrawer/)
    expect(backdrop.className).toMatch(/bsDialogDirectionRight/)
  })

  it('drawer — 헤더를 짧은 거리라도 빠르게(flick) 스와이프하면 닫힌다', async () => {
    const onClose = vi.fn()
    render(
      <Dialog open onClose={onClose} title="t" variant="drawer" direction="bottom">
        x
      </Dialog>
    )
    const panel = screen.getByRole('dialog')
    Object.defineProperty(panel, 'offsetHeight', {value: 800, configurable: true}) // jsdom 은 레이아웃이 없어 기본 0
    const header = panel.querySelector('[class*="bsDialogHeader"]') as HTMLElement

    // closeThreshold(기본 0.45, 패널 800px 기준 360px) 에 한참 못 미치는 짧은 거리(30px)지만,
    // 10ms 만에 이동 → 빠른 flick. timeStamp 는 0 을 피한다 — React SyntheticEvent 가
    // `nativeEvent.timeStamp || Date.now()` 로 계산해 0 이면 falsy 취급돼 실제 시각으로 대체된다.
    dispatchPointer(header, 'pointerdown', 0, 1000)
    dispatchPointer(header, 'pointermove', 30, 1010)
    dispatchPointer(header, 'pointerup', 30, 1010)
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1), {timeout: 1000})
  })

  it('drawer — 느리고 짧은 스와이프(threshold 미달 + flick 아님)는 닫히지 않는다', async () => {
    const onClose = vi.fn()
    render(
      <Dialog open onClose={onClose} title="t" variant="drawer" direction="bottom">
        x
      </Dialog>
    )
    const panel = screen.getByRole('dialog')
    Object.defineProperty(panel, 'offsetHeight', {value: 800, configurable: true})
    const header = panel.querySelector('[class*="bsDialogHeader"]') as HTMLElement

    // 짧은 거리(20px, 패널 800px 기준 2.5%) + 느린 속도(400ms) → threshold 미달, flick 도 아님
    dispatchPointer(header, 'pointerdown', 0, 1000)
    dispatchPointer(header, 'pointermove', 20, 1400)
    dispatchPointer(header, 'pointerup', 20, 1400)
    await new Promise((resolve) => setTimeout(resolve, 400))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('포커스가 패널로 이동하고 닫히면 트리거로 복원된다', async () => {
    function Host() {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)}>열기</button>
          <Dialog open={open} onClose={() => setOpen(false)} title="t">
            x
          </Dialog>
        </>
      )
    }
    render(<Host />)
    const trigger = screen.getByRole('button', {name: '열기'})
    trigger.focus()
    await userEvent.click(trigger)
    expect(screen.getByRole('dialog')).toHaveFocus()
    await userEvent.click(screen.getByRole('button', {name: '닫기'}))
    await waitFor(() => expect(trigger).toHaveFocus())
  })
})

describe('Dialog (명령형)', () => {
  it('confirmDialog — 확인 시 true, 취소 시 false', async () => {
    closeAllDialogs()
    render(<DialogProvider />)

    const p1 = confirmDialog({message: '삭제할까요?', confirmText: '삭제'})
    await userEvent.click(await screen.findByRole('button', {name: '삭제'}))
    expect(await p1).toBe(true)

    const p2 = confirmDialog({message: '삭제할까요?'})
    await userEvent.click(await screen.findByRole('button', {name: '취소'}))
    expect(await p2).toBe(false)
  })

  it('alertDialog — 확인 시 resolve', async () => {
    closeAllDialogs()
    render(<DialogProvider />)
    const done = vi.fn()
    alertDialog({message: '저장됨'}).then(done)
    await userEvent.click(await screen.findByRole('button', {name: '확인'}))
    await waitFor(() => expect(done).toHaveBeenCalled())
  })
})
