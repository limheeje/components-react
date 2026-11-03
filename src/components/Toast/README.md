# Toast

사용자 알림 토스트 팝업 (imperative). `src/pages/ToastPage.tsx` 원본 API 를 따릅니다.
`ToastProvider` 를 앱 최상단에 1회 배치하고, 어디서든 `showToast()` 를 호출합니다.
내부 스타일은 Tailwind 없이 `Toast.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
// App.tsx
import ToastProvider from 'm2m-uiux-react/Toast'
;<ToastProvider position="top-right" maxCount={5}>
  <App />
</ToastProvider>

// 어디서든
import {showToast} from 'm2m-uiux-react/Toast'

showToast({type: 'success', message: '저장되었습니다.'})
showToast({
  type: 'info',
  message: '파일이 삭제되었습니다.',
  action: {label: '실행 취소', onClick: () => restore()}
})
```

## `showToast(options)` → `id: number`

| Option        | Type                                                                                              | Default     | 설명                                              |
| ------------- | ------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------- |
| `message`     | `ReactNode`                                                                                       | —           | 메시지 (필수)                                     |
| `type`        | `'success' \| 'error' \| 'warning' \| 'info'`                                                     | `'info'`    | 타입 (색상 + 아이콘)                              |
| `duration`    | `number`                                                                                          | `3000`      | 자동 닫힘(ms). `Infinity` 면 자동 안 닫힘         |
| `position`    | `'top-right' \| 'top-center' \| 'top-left' \| 'bottom-right' \| 'bottom-center' \| 'bottom-left'` | Provider 값 | 화면 위치                                         |
| `action`      | `{ label: string; onClick: () => void }`                                                          | —           | 액션 버튼 (클릭 후 자동 닫힘)                     |
| `variant`     | `'filled' \| 'light'`                                                                             | `'filled'`  | filled = 배경색 채움, light = 흰 배경 + 컬러 보더 |
| `dismissible` | `boolean`                                                                                         | `true`      | 우측 X 닫기 버튼                                  |

- `dismissToast(id)` — 특정 토스트 즉시 닫기
- `clearToasts()` — 전체 닫기

## `<ToastProvider>` Props

| Prop       | Type            | Default       | 설명                  |
| ---------- | --------------- | ------------- | --------------------- |
| `position` | `ToastPosition` | `'top-right'` | 기본 위치             |
| `maxCount` | `number`        | `5`           | 위치별 최대 표시 개수 |

`ToastContainer` 는 `ToastProvider` 의 별칭입니다.

## 상수

`Toast.constant.ts` 에서 export: `TOAST_TYPE`, `TOAST_POSITION`, `TOAST_VARIANT`, `TOAST_ICON`, `TOAST_DEFAULT`.
