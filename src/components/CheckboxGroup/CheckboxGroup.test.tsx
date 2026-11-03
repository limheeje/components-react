import {useState} from 'react'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'

import {CheckboxGroup} from '~/components/CheckboxGroup/CheckboxGroup'
import type {CheckboxGroupOption} from '~/components/CheckboxGroup/CheckboxGroup.type'

const OPTIONS: CheckboxGroupOption[] = [
  {label: 'React', value: 'react'},
  {label: 'Vue', value: 'vue'},
  {label: 'Svelte', value: 'svelte', disabled: true}
]

function Harness(props: Partial<Parameters<typeof CheckboxGroup>[0]>) {
  const [value, setValue] = useState<string[]>(props.value ?? [])
  return (
    <CheckboxGroup
      options={OPTIONS}
      {...props}
      value={value}
      onChange={(v) => {
        setValue(v)
        props.onChange?.(v)
      }}
    />
  )
}

describe('CheckboxGroup', () => {
  it('options 를 체크박스로 렌더한다', () => {
    render(<Harness />)
    expect(screen.getAllByRole('checkbox')).toHaveLength(3)
  })

  it('클릭 시 onChange 로 값 배열이 전달된다', async () => {
    const onChange = vi.fn()
    render(<Harness onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('React'))
    expect(onChange).toHaveBeenLastCalledWith(['react'])
  })

  it('disabled 항목은 토글되지 않는다', async () => {
    const onChange = vi.fn()
    render(<Harness onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('Svelte'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('max 초과 시 미선택 항목이 비활성화된다', () => {
    render(<Harness value={['react']} max={1} />)
    expect(screen.getByLabelText('Vue')).toBeDisabled()
  })

  it('min 미만이 되는 해제를 차단한다', async () => {
    const onChange = vi.fn()
    render(<Harness value={['react']} min={1} onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('React'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
