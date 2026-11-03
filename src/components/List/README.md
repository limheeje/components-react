# List

아이템 목록 컨테이너. `src/pages/ListPage.tsx` 의 `CommonList` API 를 따릅니다.
`items` + `renderItem` 렌더프롭 방식과 `<ListItem>` 직접 자식 방식 모두 지원합니다.
내부 스타일은 Tailwind 없이 `List.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import List from 'm2m-uiux-react/List';
import ListItem from 'm2m-uiux-react/ListItem';

// 렌더프롭
<List
  items={users}
  clickable
  onItemClick={(user) => open(user)}
  renderItem={(user) => (
    <ListItem avatar={<Avatar src={user.avatar} />} title={user.name} description={user.email} />
  )}
/>

// 직접 자식
<List divided>
  <ListItem title="첫 번째 항목" description="설명" />
  <ListItem title="두 번째 항목" description="설명" />
</List>
```

## Props

| Prop          | Type                                       | Default | 설명                                          |
| ------------- | ------------------------------------------ | ------- | --------------------------------------------- |
| `items`       | `T[]`                                      | —       | 데이터 배열 (`renderItem` 과 함께)            |
| `renderItem`  | `(item: T, index: number) => ReactElement` | —       | 항목 렌더러 (`<ListItem>` 반환 권장)          |
| `onItemClick` | `(item: T, index: number) => void`         | —       | items 항목 클릭 콜백                          |
| `divided`     | `boolean`                                  | `true`  | 항목 간 구분선                                |
| `clickable`   | `boolean`                                  | `false` | 모든 항목 클릭 가능 (자식 `ListItem` 에 전파) |
| `loading`     | `boolean`                                  | `false` | 스켈레톤 로딩 표시                            |
| `children`    | `ReactNode`                                | —       | 직접 자식 `<ListItem>`                        |
| `classNames`  | `string \| string[]`                       | —       | 추가 클래스                                   |

`role="list"` 로 노출됩니다.

## 상수

`List.constant.ts` 에서 export: `LIST_STATE_CLASS`(`{ IS_DIVIDED }`), `LIST_DEFAULT`.
