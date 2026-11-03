# ListItem

목록 한 줄. `src/pages/ListPage.tsx` 의 `CommonListItem` API 를 따릅니다.
보통 `<List>` 안에서 사용하지만 단독으로도 쓸 수 있습니다.
내부 스타일은 Tailwind 없이 `ListItem.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import ListItem from 'm2m-uiux-react/ListItem'
;<ListItem
  avatar={<Avatar />}
  title="홍길동"
  description="hong@example.com"
  extra={<Icon name="check-circle" />}
  clickable
  onClick={handleClick}
/>
```

## Props

| Prop          | Type                 | Default | 설명                                                             |
| ------------- | -------------------- | ------- | ---------------------------------------------------------------- |
| `title`       | `ReactNode`          | —       | 주 텍스트 (필수)                                                 |
| `description` | `ReactNode`          | —       | 보조 설명                                                        |
| `avatar`      | `ReactNode`          | —       | 좌측 아바타/아이콘                                               |
| `extra`       | `ReactNode`          | —       | 우측 추가 요소                                                   |
| `clickable`   | `boolean`            | `false` | hover 배경 + 우측 chevron 자동 (미지정 시 `<List clickable>` 값) |
| `onClick`     | `MouseEventHandler`  | —       | 클릭 핸들러                                                      |
| `classNames`  | `string \| string[]` | —       | 추가 클래스                                                      |

`ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`ListItem.constant.ts` 에서 export: `LIST_ITEM_STATE_CLASS`(`{ IS_CLICKABLE }`).
