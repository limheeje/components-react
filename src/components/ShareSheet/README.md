# ShareSheet

URL 공유 모달 **템플릿**. 링크 복사 UI + SNS 채널(카카오톡/페이스북/트위터/whatsApp) 버튼 UI 를 제공하고,
채널 버튼 클릭 시 `onShare` 콜백만 호출합니다. 실제 공유 동작(각 SDK 호출, 공유 URL 오픈 등)은
컴포넌트를 사용하는 쪽에서 이 콜백을 받아 직접 연결합니다. 내부적으로 `Dialog`(variant="modal")를
사용하며, 스타일은 Tailwind 없이 `ShareSheet.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import {useState} from 'react'
import ShareSheet, {type ShareChannel} from 'm2m-uiux-react/ShareSheet'

function Example() {
  const [open, setOpen] = useState(false)

  function handleShare({channel, url}: {channel: ShareChannel; url: string}) {
    // 채널별 실제 공유 동작은 여기서 직접 연결 (예: Kakao SDK, 각 서비스 공유 URL 오픈 등)
    if (channel === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>공유하기</button>
      <ShareSheet
        open={open}
        onClose={() => setOpen(false)}
        url="https://example.com/listing/123"
        title="Share Listing"
        onShare={handleShare}
      />
    </>
  )
}
```

## Props

| Prop              | Type                                                      | Default      | 설명                                                                                              |
| ----------------- | --------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `open`            | `boolean`                                                 | —            | 열림 상태 (제어)                                                                                  |
| `onClose`         | `() => void`                                              | —            | 닫기 요청 (X 버튼 · 배경 클릭 · ESC)                                                              |
| `url`             | `string`                                                  | —            | 공유할 URL (URL 표시 영역에 노출)                                                                 |
| `title`           | `string`                                                  | `'공유하기'` | 헤더 제목                                                                                         |
| `channels`        | `ShareChannel[]`                                          | 전체 4개     | 노출할 채널 + 순서 (`kakao`/`facebook`/`twitter`/`whatsapp`)                                      |
| `closeOnBackdrop` | `boolean`                                                 | `true`       | 배경 클릭으로 닫기                                                                                |
| `onCopy`          | `(url: string) => void`                                   | —            | 링크 복사 버튼 클릭 시 (복사 자체는 컴포넌트가 `navigator.clipboard.writeText` 로 수행)           |
| `onShare`         | `(payload: {channel: ShareChannel; url: string}) => void` | —            | 채널 버튼 클릭 시. **실제 공유 동작은 컴포넌트가 하지 않음** — 이 콜백을 받아 소비 앱이 직접 처리 |
| `classNames`      | `string \| string[]`                                      | —            | 추가 클래스                                                                                       |

- 채널 버튼(카카오톡/페이스북/트위터/whatsApp)은 브랜드 컬러 아이콘 + 라벨만 제공하는 **UI 템플릿**입니다.
  클릭 시 `onShare` 콜백만 호출하고, 그 외 스크립트 동작(SDK 초기화, 공유 URL 생성/오픈 등)은
  포함하지 않습니다 — 서비스마다 요구되는 연동 방식이 다르므로 소비 앱에서 직접 구현하세요.
- 링크 복사만은 예외로, 범용 기능이라 컴포넌트가 `navigator.clipboard.writeText` 로 직접 처리하고
  성공 시 아이콘이 1.5초간 체크 표시로 바뀝니다.

## 상수

`ShareSheet.constant.ts` 에서 export: `SHARE_CHANNEL`, `SHARE_CHANNEL_LABEL`, `SHARE_SHEET_STATE_CLASS`, `SHARE_SHEET_DEFAULT`.
