# Image

단순 `<img>` 를 넘어 Fallback · Skeleton · Fade-in · Lazy loading · `alt` 강제를 내장한 이미지
컴포넌트. 내부 스타일은 Tailwind 없이 `Image.module.scss` + `--m2m-*` 토큰.

```tsx
import Image from 'm2m-uiux-react/Image'
;<Image
  src="/photo.jpg"
  alt="설명 텍스트"
  width={260}
  height={180}
  objectFit="cover"
  rounded={12}
  fallbackSrc="/default.png"
/>
```

## Props

| Prop          | Type                         | Default   | 설명                                           |
| ------------- | ---------------------------- | --------- | ---------------------------------------------- |
| `src`         | `string`                     | —         | 이미지 URL (필수)                              |
| `alt`         | `string`                     | —         | 대체 텍스트 (필수 — 접근성)                    |
| `fallbackSrc` | `string`                     | —         | src 실패 시 대체 URL. 없으면 오류 플레이스홀더 |
| `width`       | `number \| string`           | `'100%'`  | 컨테이너 너비 (숫자 → px)                      |
| `height`      | `number \| string`           | `'auto'`  | 컨테이너 높이                                  |
| `objectFit`   | `CSSProperties['objectFit']` | `'cover'` | 이미지 크기 조정 방식                          |
| `rounded`     | `number \| string`           | `0`       | border-radius (숫자 → px)                      |
| `skeleton`    | `boolean`                    | `true`    | 로딩 중 shimmer 스켈레톤                       |
| `fadeIn`      | `boolean`                    | `true`    | 로드 완료 시 페이드인                          |
| `loading`     | `'lazy' \| 'eager'`          | `'lazy'`  | 브라우저 로딩 전략                             |
| `imgStyle`    | `CSSProperties`              | —         | 내부 `<img>` 스타일                            |
| `onLoad`      | `() => void`                 | —         | 로드 완료 콜백                                 |
| `onError`     | `() => void`                 | —         | 로드 실패 콜백 (fallback 도 실패 시)           |
| `classNames`  | `string \| string[]`         | —         | 추가 클래스                                    |

`ref` 는 컨테이너 `<div>` 로 전달됩니다.

## 상수

`Image.constant.ts`: `IMAGE_LOADING`, `IMAGE_STATUS`, `IMAGE_STATE_CLASS`, `IMAGE_DEFAULT`.
