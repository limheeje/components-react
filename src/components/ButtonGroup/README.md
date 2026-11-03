# ButtonGroup

여러 `Button` 을 하나의 묶음으로 관리하는 컴포지트. `size` / `disabled` 를 그룹에서 일괄 제어하고,
`attached` 로 버튼을 이음새 없이 붙일 수 있습니다. 내부 스타일은 Tailwind 없이
`ButtonGroup.module.scss` + `--m2m-*` 토큰.

```tsx
import ButtonGroup from 'm2m-uiux-react/ButtonGroup'
import Button from 'm2m-uiux-react/Button'
;<ButtonGroup direction="row" attached size="md">
  <Button>1일</Button>
  <Button>1주</Button>
  <Button>1달</Button>
</ButtonGroup>
```

## Props

| Prop         | Type                   | Default | 설명                                                |
| ------------ | ---------------------- | ------- | --------------------------------------------------- |
| `direction`  | `'row' \| 'column'`    | `'row'` | 나열 방향                                           |
| `attached`   | `boolean`              | `false` | 버튼 사이 여백 제거 + 경계 모서리 자동 조정         |
| `size`       | `'sm' \| 'md' \| 'lg'` | `'md'`  | 하위 Button 전체에 일괄 주입                        |
| `disabled`   | `boolean`              | `false` | 그룹 전체 비활성화 (개별 버튼의 `disabled` 는 유지) |
| `classNames` | `string \| string[]`   | —       | 추가 클래스                                         |

그 외 `<div>` 표준 속성을 전달할 수 있습니다. `ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`ButtonGroup.constant.ts` 에서 export: `BUTTON_GROUP_DIRECTION`, `BUTTON_GROUP_SIZE`,
`BUTTON_GROUP_STATE_CLASS`, `BUTTON_GROUP_DEFAULT`.
