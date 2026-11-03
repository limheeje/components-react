# Timeline

시간 흐름(주문 배송, 승인 절차, 연혁 등)을 시각화. 수직/수평, 정렬 방향(left/right/alternate),
항목별 상태 색, 진행 중(`pending`) 노드를 지원합니다. 내부 스타일은 Tailwind 없이
`Timeline.module.scss` + `--m2m-*` 토큰.

```tsx
import Timeline from 'm2m-uiux-react/Timeline'
import Icon from 'm2m-uiux-react/Icon'
;<Timeline
  items={[
    {
      title: '주문 완료',
      description: '정상 접수',
      date: '04.01',
      status: 'success',
      icon: <Icon name="check" size={9} />
    },
    {title: '배송 중', status: 'processing'},
    {title: '배송 완료', status: 'gray'}
  ]}
  align="alternate"
  pending="배송 정보를 조회 중입니다..."
/>
```

## Props

| Prop         | Type                               | Default      | 설명                                             |
| ------------ | ---------------------------------- | ------------ | ------------------------------------------------ |
| `items`      | `TimelineItem[]`                   | —            | `{ title, description?, date?, status?, icon? }` |
| `direction`  | `'vertical' \| 'horizontal'`       | `'vertical'` | 배치 방향                                        |
| `align`      | `'left' \| 'right' \| 'alternate'` | `'left'`     | 세로 모드 정렬 (alternate = 지그재그)            |
| `pending`    | `boolean \| ReactNode`             | `false`      | 마지막에 진행 중 노드 (true → 기본 문구)         |
| `color`      | `'primary' \| 'success' \| 'gray'` | `'primary'`  | 전체 테마 색 (항목 `status` 우선)                |
| `classNames` | `string \| string[]`               | —            | 추가 클래스                                      |

`status`: `'default' \| 'success' \| 'warning' \| 'error' \| 'processing' \| 'gray'`

`ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`Timeline.constant.ts`: `TIMELINE_DIRECTION`, `TIMELINE_ALIGN`, `TIMELINE_STATUS`,
`TIMELINE_COLOR`, `TIMELINE_DEFAULT`.
