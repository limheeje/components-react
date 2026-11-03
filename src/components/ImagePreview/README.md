# ImagePreview

클릭 시 라이트박스(`Lightbox`)로 확대 미리보기하는 이미지 썸네일. `group` 으로 갤러리를 묶어
라이트박스 내에서 이동할 수 있습니다. 내부 스타일은 Tailwind 없이 `ImagePreview.module.scss`

- `--m2m-*` 토큰.

```tsx
import ImagePreview from 'm2m-uiux-react/ImagePreview'

const images = [url1, url2, url3]

;<div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8}}>
  {images.map((src) => (
    <ImagePreview key={src} src={src} group={images} width="100%" height={100} />
  ))}
</div>
```

## Props

| Prop         | Type                             | Default   | 설명                             |
| ------------ | -------------------------------- | --------- | -------------------------------- |
| `src`        | `string`                         | —         | 썸네일 이미지 URL                |
| `alt`        | `string`                         | `''`      | 대체 텍스트                      |
| `width`      | `number \| string`               | `120`     | 썸네일 너비 (숫자 → px)          |
| `height`     | `number \| string`               | `120`     | 썸네일 높이                      |
| `preview`    | `boolean`                        | `true`    | 클릭 시 라이트박스 열기          |
| `group`      | `string[]`                       | —         | 갤러리 묶음 (라이트박스 내 이동) |
| `radius`     | `number`                         | `8`       | 모서리 둥글기 px (999 → 원형)    |
| `fit`        | `'cover' \| 'contain' \| 'fill'` | `'cover'` | object-fit                       |
| `fallback`   | `string`                         | —         | 로드 실패 시 대체 이미지 URL     |
| `classNames` | `string \| string[]`             | —         | 추가 클래스                      |

`ref` 는 루트 `<div>` 로 전달됩니다. `Lightbox` 도 재-export 합니다.

## 상수

`ImagePreview.constant.ts`: `IMAGE_PREVIEW_FIT`, `IMAGE_PREVIEW_STATE_CLASS`,
`IMAGE_PREVIEW_DEFAULT`.
