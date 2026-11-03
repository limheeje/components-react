# Tooltip

마우스 오버/클릭 시 대상 옆에 뜨는 도움말. `src/pages/TooltipPage.tsx` 원본 API 를 따릅니다.
내부 스타일은 Tailwind 없이 `Tooltip.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Tooltip from 'm2m-uiux-react/Tooltip'
;<Tooltip content="도움말 텍스트" placement="top">
  <button>?</button>
</Tooltip>
```

CSS 기반 상대 위치 배치입니다 (외부 popper 의존 없음). 대상은 **단일 자식 엘리먼트**여야 합니다.

## Props

| Prop         | Type                                     | Default   | 설명                                 |
| ------------ | ---------------------------------------- | --------- | ------------------------------------ |
| `content`    | `ReactNode`                              | —         | 툴팁 내용 (필수)                     |
| `children`   | `ReactElement`                           | —         | 대상 엘리먼트 (필수, 단일)           |
| `placement`  | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`   | 표시 방향                            |
| `trigger`    | `'hover' \| 'click'`                     | `'hover'` | 트리거 방식 (hover 는 focus 도 포함) |
| `arrow`      | `boolean`                                | `true`    | 화살표 표시                          |
| `delay`      | `number`                                 | `0`       | 표시 지연(ms)                        |
| `disabled`   | `boolean`                                | `false`   | 비활성 (툴팁 안 뜸)                  |
| `classNames` | `string \| string[]`                     | —         | 툴팁 박스에 적용할 추가 클래스       |

## 상수

`Tooltip.constant.ts` 에서 export: `TOOLTIP_PLACEMENT`, `TOOLTIP_TRIGGER`, `TOOLTIP_STATE_CLASS`, `TOOLTIP_DEFAULT`.
