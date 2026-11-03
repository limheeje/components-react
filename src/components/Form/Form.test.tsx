import {createRef} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {Form} from '~/components/Form/Form'

describe('Form', () => {
  it('form + fieldset 을 렌더하고 onSubmit 이 동작한다', async () => {
    const onSubmit = vi.fn((e) => e.preventDefault())
    render(
      <Form onSubmit={onSubmit}>
        <Form.Field label="이름">
          <input aria-label="이름" />
        </Form.Field>
        <Form.Actions>
          <button type="submit">저장</button>
        </Form.Actions>
      </Form>
    )
    await userEvent.click(screen.getByRole('button', {name: '저장'}))
    expect(onSubmit).toHaveBeenCalled()
  })

  it('required 는 * 를 표시한다', () => {
    render(
      <Form>
        <Form.Field label="이메일" required>
          <input aria-label="이메일" />
        </Form.Field>
      </Form>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('error 문자열이 있으면 role="alert" 메시지를 표시한다', () => {
    render(
      <Form>
        <Form.Field label="이름" error="이름을 입력해주세요.">
          <input aria-label="이름" />
        </Form.Field>
      </Form>
    )
    expect(screen.getByRole('alert')).toHaveTextContent('이름을 입력해주세요.')
  })

  it('error 가 없고 help 가 있으면 help 를 표시한다', () => {
    render(
      <Form>
        <Form.Field label="비밀번호" help="8자 이상">
          <input aria-label="비밀번호" />
        </Form.Field>
      </Form>
    )
    expect(screen.getByText('8자 이상')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('disabled 는 fieldset 을 비활성화한다', () => {
    render(
      <Form disabled>
        <Form.Field label="이름">
          <input aria-label="이름" />
        </Form.Field>
      </Form>
    )
    expect(screen.getByLabelText('이름')).toBeDisabled()
  })

  it('ref 가 form 으로 전달된다', () => {
    const ref = createRef<HTMLFormElement>()
    render(
      <Form ref={ref}>
        <div />
      </Form>
    )
    expect(ref.current?.tagName).toBe('FORM')
  })
})
