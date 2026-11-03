# Lightbox

이미지 확대 미리보기 오버레이. 줌 · 90° 회전 · 다운로드 · 이전/다음 · 하단 썸네일 스트립,
키보드(ESC / ← / →) 지원. 표시 상태(`index`)는 부모가 제어합니다. `ImagePreview` ·
`ImageUploadPreview` 가 내부적으로 사용합니다.

확대된 이미지는 실제 레이아웃 크기로 반영되어 오버레이 안에서 스크롤로 전체 영역을 탐색할 수 있습니다.

```tsx
import Lightbox from 'm2m-uiux-react/Lightbox'

const [index, setIndex] = useState<number | null>(null)

{
  index !== null && <Lightbox images={urls} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
}
```

## Props

| Prop           | Type                      | Default | 설명                                        |
| -------------- | ------------------------- | ------- | ------------------------------------------- |
| `images`       | `string[]`                | —       | 이미지 URL 목록                             |
| `index`        | `number`                  | —       | 현재 인덱스                                 |
| `onClose`      | `() => void`              | —       | 닫기 요청 (ESC · 배경 · 닫기 버튼)          |
| `onChange`     | `(index: number) => void` | —       | 인덱스 변경 요청 (화살표 · 썸네일 · 키보드) |
| `downloadable` | `boolean`                 | `true`  | 다운로드 버튼 노출                          |

## 상수

`Lightbox.constant.ts`: `LIGHTBOX_DEFAULT` (`ZOOM_MIN/MAX/STEP`, `ROTATE_STEP`).
