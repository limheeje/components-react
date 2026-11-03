# Button

공통 버튼 컴포넌트. `variant` 로 시각 스타일, `size` 로 크기를 지정합니다.
내부 스타일은 Tailwind 없이 `Button.module.scss` + `--m2m-*` 디자인 토큰으로만 구성됩니다.

```tsx
import Button from 'm2m-uiux-react/Button'
;<Button variant="primary" size="md" onClick={handleClick}>
  저장
</Button>
```

## Props

| Prop        | Type                                                                        | Default     | 설명                                                   |
| ----------- | --------------------------------------------------------------------------- | ----------- | ------------------------------------------------------ |
| `variant`   | `'primary' \| 'secondary' \| 'ghost' \| 'emphasis' \| 'inactive' \| 'none'` | `'primary'` | 시각 스타일. `inactive` 는 클릭 차단되는 시각적 비활성 |
| `size`      | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`      | 크기                                                   |
| `round`     | `boolean`                                                                   | `false`     | 캡슐형(pill) 모서리                                    |
| `loading`   | `boolean`                                                                   | `false`     | 스피너 표시 + `onClick` 차단                           |
| `fullWidth` | `boolean`                                                                   | `false`     | 부모 너비 100% 확장                                    |
| `htmlType`  | `'button' \| 'submit' \| 'reset'`                                           | `'button'`  | 네이티브 `type` 속성                                   |
| `disabled`  | `boolean`                                                                   | `false`     | 비활성                                                 |
| `className` | `string`                                                                    | —           | 추가 클래스                                            |

그 외 `<button>` 의 표준 속성을 그대로 전달할 수 있습니다. `ref` 는 `<button>` 엘리먼트로 전달됩니다.

## 상수

`Button.constant.ts` 에서 export:

- `BUTTON_VARIANT` — `{ PRIMARY, SECONDARY, GHOST, EMPHASIS, INACTIVE, NONE }`
- `BUTTON_SIZE` — `{ SM, MD, LG }`
- `BUTTON_STATE_CLASS` — `{ IS_LOADING, IS_ROUND, IS_FULL_WIDTH }`
- `BUTTON_DEFAULT` — `{ VARIANT, SIZE }`
