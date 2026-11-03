# Icon

빈 `<i>` + CSS 마스크로 렌더하는 아이콘 (SVG 는 `src/themes/_theme.scss` `icon-map()`).
`src/pages/SvgIconPage.tsx` 원본 API 를 따릅니다. 색상은 `currentColor` 마스크라 `color` 로 자유롭게 지정.

```tsx
import Icon from 'm2m-uiux-react/Icon';

<Icon name="search" size={16} />
<Icon name="chevron-down" rotate={180} color="var(--m2m-pg-brand)" />
<Icon name="upload" spin />
```

## Props

| Prop         | Type                 | Default          | 설명                                         |
| ------------ | -------------------- | ---------------- | -------------------------------------------- |
| `name`       | `IconName`           | —                | 친숙한 별칭 또는 `icon-map()` 원시 키 (필수) |
| `color`      | `string`             | `'currentColor'` | CSS color                                    |
| `size`       | `number \| string`   | `24`             | width = height (숫자는 px)                   |
| `rotate`     | `number`             | `0`              | 회전 각도(deg), 음수 허용                    |
| `spin`       | `boolean`            | `false`          | 회전 애니메이션                              |
| `onClick`    | `MouseEventHandler`  | —                | 있으면 `cursor: pointer` 자동                |
| `aria-label` | `string`             | —                | 없으면 `aria-hidden` 처리                    |
| `style`      | `CSSProperties`      | —                | 인라인 스타일 오버라이드                     |
| `classNames` | `string \| string[]` | —                | 추가 클래스                                  |

### 사용 가능한 `name` 별칭

`close` · `cancel`/`close-circle` · `check` · `check-circle` · `eye` · `eye-off` ·
`chevron-left/right/up/down` · `chevrons-left/right` · `chevrons-up-down` ·
`arrow-left/right` · `info` · `error`/`alert-circle` · `warning` · `clock` · `calendar` ·
`search` · `search-off` · `inbox` · `upload` · `download` · `file` · `file-x` · `file-text` ·
`folder` · `image` · `plus` · `slash` · `trash` · `zoom-in/out` · `rotate-cw` ·
`refresh` · `paperclip` · `copy` · `edit` · `link` · `filter` · `menu` · `more-horizontal` ·
`user` · `bell` · `home` · `settings` · `star` · `wifi` · `hash` · `shapes` · `panel-top` ·
`tabs` · `breadcrumb` · `button` · `layout-grid` · `text-input` · `check-square` · `radio` ·
`toggle` · `align-left` · `tag` · `table` · `list` · `layers` · `git-commit` · `gallery` ·
`line-chart` · `bar-chart` · `message-circle` · `loader` · `truck` · `package`
(그 외 `icon-map()` 원시 키도 그대로 사용 가능)

## 상수

`Icon.constant.ts` 에서 export: `ICON_NAME`(별칭→키 맵), `ICON_DEFAULT`.
