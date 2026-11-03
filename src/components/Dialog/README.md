# Dialog

모달 다이얼로그. **선언형**(`<Dialog open onClose>`) + **명령형**(`openDialog` / `confirmDialog` /
`alertDialog`) 두 방식을 모두 제공합니다. Portal + backdrop + ESC/스크롤 잠금 + 포커스 트랩 내장.
내부 스타일은 Tailwind 없이 `Dialog.module.scss` + `--m2m-*` 토큰.

`variant="drawer"` 로 두면 화면 가장자리(`direction`: top/right/bottom/left)에서 미끄러져 나오는
**드로어**가 됩니다 (nuxt/ui Drawer 참고). 헤더 또는 grab 핸들을 등장 방향의 반대로 스와이프하면
`cubic-bezier(.22,1,.36,1)` 감속으로 자연스럽게 닫히고, 드래그 진행도에 따라 오버레이가 투명해집니다.

### 접근성 · 스크롤

- 열리면 포커스가 패널로 이동하고 `Tab` / `Shift+Tab` 이 패널 안에서 순환(포커스 트랩), 닫히면
  열기 직전 요소로 포커스가 복원됩니다.
- 열려 있는 동안 `body` 스크롤이 잠깁니다(스크롤바 폭만큼 `padding-right` 보정). `lockScroll={false}`
  로 끌 수 있고, 여러 개가 열려도 잠금이 유지됩니다.

## 선언형

```tsx
import Dialog from 'm2m-uiux-react/Dialog'
import Button from 'm2m-uiux-react/Button'

const [open, setOpen] = useState(false)

;<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="회원 삭제"
  description="이 작업은 되돌릴 수 없습니다."
  size="sm"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        취소
      </Button>
      <Button onClick={handleDelete}>삭제</Button>
    </>
  }
>
  정말 삭제하시겠어요?
</Dialog>
```

| Prop              | Type                                     | Default    | 설명                                      |
| ----------------- | ---------------------------------------- | ---------- | ----------------------------------------- |
| `open`            | `boolean`                                | —          | 열림 상태 (제어)                          |
| `onClose`         | `() => void`                             | —          | 닫기 요청 (backdrop·ESC·X)                |
| `title`           | `ReactNode`                              | —          | 헤더 제목                                 |
| `description`     | `ReactNode`                              | —          | 제목 아래 설명                            |
| `children`        | `ReactNode`                              | —          | 본문                                      |
| `footer`          | `ReactNode`                              | —          | 하단 버튼 영역                            |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'full'`         | `'md'`     | 크기 (modal, 또는 drawer left/right 폭)   |
| `variant`         | `'modal' \| 'drawer'`                    | `'modal'`  | 중앙 모달 / 가장자리 드로어               |
| `direction`       | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | 드로어 등장 방향 (drawer)                 |
| `lockScroll`      | `boolean`                                | `true`     | 배경 body 스크롤 잠금                     |
| `handle`          | `boolean`                                | `true`     | 드로어 상단 grab 핸들 (drawer)            |
| `swipeToClose`    | `boolean`                                | `true`     | 헤더/핸들 스와이프로 닫기 (drawer)        |
| `closeThreshold`  | `number`                                 | `0.45`     | 스와이프 닫힘 임계값 (패널 길이 대비 0~1) |
| `closeOnBackdrop` | `boolean`                                | `true`     | 배경 클릭으로 닫기                        |
| `closeOnEsc`      | `boolean`                                | `true`     | ESC 로 닫기                               |
| `hideClose`       | `boolean`                                | `false`    | 우상단 X 숨김                             |
| `classNames`      | `string \| string[]`                     | —          | 추가 클래스                               |

```tsx
// 아래에서 올라오는 드로어
;<Dialog open={open} onClose={close} variant="drawer" direction="bottom" title="필터">
  …
</Dialog>

// 오른쪽에서 나오는 패널, 스와이프 닫기 비활성
;<Dialog open={open} onClose={close} variant="drawer" direction="right" swipeToClose={false}>
  …
</Dialog>
```

## 명령형

앱 최상단에 `<DialogProvider />` 를 1회 배치하면 어디서든 호출할 수 있습니다.

```tsx
import {DialogProvider} from 'm2m-uiux-react/Dialog'
;<DialogProvider>
  <App />
</DialogProvider>
```

```tsx
import {openDialog, confirmDialog, alertDialog, closeDialog} from 'm2m-uiux-react/Dialog'

// 임의 콘텐츠 모달 — id 반환
const id = openDialog({title: '상세', content: <ProfileCard />, size: 'lg'})
closeDialog(id)

// 확인/취소 — Promise<boolean>
if (await confirmDialog({title: '삭제', message: '삭제할까요?', tone: 'danger'})) {
  await remove()
}

// 알림 — Promise<void>
await alertDialog({title: '알림', message: '저장되었습니다.'})
```

| 함수                     | 반환               | 옵션                                                                                                                                              |
| ------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openDialog(options)`    | `number` (id)      | `title` `description` `content` `footer` `size` `variant` `direction` `lockScroll` `handle` `swipeToClose` `closeThreshold` `hideClose` `onClose` |
| `confirmDialog(options)` | `Promise<boolean>` | `title` `message` `confirmText` `cancelText` `tone` `size`                                                                                        |
| `alertDialog(options)`   | `Promise<void>`    | `title` `message` `confirmText` `size`                                                                                                            |
| `closeDialog(id?)`       | `void`             | id 생략 시 가장 위 다이얼로그                                                                                                                     |
| `closeAllDialogs()`      | `void`             | —                                                                                                                                                 |

## 상수

`Dialog.constant.ts`: `DIALOG_SIZE`, `DIALOG_TONE`, `DIALOG_KIND`, `DIALOG_VARIANT`, `DIALOG_DIRECTION`, `DIALOG_DEFAULT`.
