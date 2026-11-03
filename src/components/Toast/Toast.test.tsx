import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {afterEach, describe, expect, it} from 'vitest'

import {ToastProvider} from '~/components/Toast/Toast'
import {clearToasts, dismissToast, showToast} from '~/components/Toast/Toast.store'

afterEach(() => {
  clearToasts()
})

describe('Toast', () => {
  it('showToast 로 메시지를 표시한다', async () => {
    render(<ToastProvider />)
    showToast({message: '저장되었습니다', duration: Infinity})
    expect(await screen.findByText('저장되었습니다')).toBeInTheDocument()
  })

  it('dismissible 닫기 버튼으로 제거된다', async () => {
    render(<ToastProvider />)
    showToast({message: '닫아보기', duration: Infinity, dismissible: true})
    await screen.findByText('닫아보기')
    await userEvent.click(screen.getByRole('button', {name: '닫기'}))
    await waitFor(() => expect(screen.queryByText('닫아보기')).not.toBeInTheDocument())
  })

  it('dismissToast(id) 로 특정 토스트를 닫는다', async () => {
    render(<ToastProvider />)
    const id = showToast({message: '아이디닫기', duration: Infinity})
    await screen.findByText('아이디닫기')
    dismissToast(id)
    await waitFor(() => expect(screen.queryByText('아이디닫기')).not.toBeInTheDocument())
  })
})
