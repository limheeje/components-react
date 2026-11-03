# Accordion

접기/펼치기 컴포넌트 (compound). `src/pages/AccordionPage.tsx` 원본 API 를 따릅니다.
`<Accordion>` + `<Accordion.Item>` 조합, `single` / `multiple` 모드.
내부 스타일은 Tailwind 없이 `Accordion.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import Accordion from 'm2m-uiux-react/Accordion';

<Accordion type="single" defaultValue="item-1">
  <Accordion.Item value="item-1" title="항목 1">내부 콘텐츠</Accordion.Item>
  <Accordion.Item value="item-2" title="항목 2" disabled>내부 콘텐츠</Accordion.Item>
</Accordion>

// 제어
<Accordion type="single" value={openItem} onValueChange={(v) => setOpenItem(v)}>
  …
</Accordion>
```

## `Accordion` Props

| Prop            | Type                                  | Default    | 설명                                                     |
| --------------- | ------------------------------------- | ---------- | -------------------------------------------------------- |
| `type`          | `'single' \| 'multiple'`              | `'single'` | single 은 하나만 열림                                    |
| `defaultValue`  | `string \| string[]`                  | —          | 비제어 초기 열림값 (single: string / multiple: string[]) |
| `value`         | `string \| string[]`                  | —          | 제어 열림값                                              |
| `onValueChange` | `(value: string \| string[]) => void` | —          | 변경 콜백 (single: string / multiple: string[])          |
| `classNames`    | `string \| string[]`                  | —          | 추가 클래스                                              |

## `Accordion.Item` Props

| Prop         | Type                 | Default | 설명                  |
| ------------ | -------------------- | ------- | --------------------- |
| `value`      | `string`             | —       | 항목 식별자 (필수)    |
| `title`      | `ReactNode`          | —       | 헤더 제목 (필수)      |
| `disabled`   | `boolean`            | `false` | 비활성                |
| `classNames` | `string \| string[]` | —       | 항목 래퍼 추가 클래스 |

## 상수

`Accordion.constant.ts` 에서 export: `ACCORDION_TYPE`, `ACCORDION_STATE_CLASS`, `ACCORDION_DEFAULT`.
