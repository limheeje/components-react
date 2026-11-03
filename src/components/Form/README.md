# Form

폼 레이아웃 컨테이너 — `Form` + `Form.Field` + `Form.Actions` 컴파운드. `layout`(vertical/
horizontal/inline)·`labelWidth`·`disabled` 를 컨텍스트로 하위 필드에 전파합니다. 컨트롤 자체는
`Input`·`Select`·`Textarea` 등을 그대로 넣습니다. 내부 스타일은 Tailwind 없이 `Form.module.scss`

- `--m2m-*` 토큰.

```tsx
import Form from 'm2m-uiux-react/Form'
import Input from 'm2m-uiux-react/Input'
import Button from 'm2m-uiux-react/Button'
;<Form layout="horizontal" labelWidth={80} onSubmit={handleSubmit}>
  <Form.Field name="name" label="이름" required error={errors.name}>
    <Input.Text />
  </Form.Field>
  <Form.Field name="email" label="이메일" required help="회사 이메일">
    <Input.Email />
  </Form.Field>
  <Form.Actions align="end">
    <Button variant="ghost">취소</Button>
    <Button htmlType="submit">저장</Button>
  </Form.Actions>
</Form>
```

## Form Props

| Prop         | Type                                     | Default      | 설명                             |
| ------------ | ---------------------------------------- | ------------ | -------------------------------- |
| `layout`     | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` | 필드 배치                        |
| `labelWidth` | `number \| string`                       | `96`         | horizontal 라벨 너비 (숫자 → px) |
| `disabled`   | `boolean`                                | `false`      | `<fieldset disabled>` 전체 잠금  |
| `classNames` | `string \| string[]`                     | —            | 추가 클래스                      |

그 외 `<form>` 표준 속성(`onSubmit`, `noValidate` …)을 전달할 수 있습니다.

## Form.Field Props

| Prop         | Type                 | 설명                                |
| ------------ | -------------------- | ----------------------------------- |
| `label`      | `ReactNode`          | 라벨                                |
| `name`       | `string`             | 필드 이름 (`data-field`)            |
| `required`   | `boolean`            | 필수 표시 `*`                       |
| `error`      | `string`             | 에러 메시지 (`role="alert"` + 상태) |
| `help`       | `ReactNode`          | 도움말 (error 없을 때)              |
| `htmlFor`    | `string`             | 라벨 `for` 대상 id                  |
| `layout`     | `FormLayout`         | 이 필드만 레이아웃 오버라이드       |
| `classNames` | `string \| string[]` | 추가 클래스                         |

## Form.Actions Props

| Prop    | Type                                        | Default | 설명      |
| ------- | ------------------------------------------- | ------- | --------- |
| `align` | `'start' \| 'center' \| 'end' \| 'between'` | `'end'` | 버튼 정렬 |

`Form` / `Form.Field` / `Form.Actions` 모두 `ref` 를 각 루트 요소로 전달합니다.
`FormField` · `FormActions` 는 이름으로도 단독 export 됩니다.

## 상수

`Form.constant.ts`: `FORM_LAYOUT`, `FORM_ACTIONS_ALIGN`, `FORM_STATE_CLASS`, `FORM_DEFAULT`.
