# FileUpload

파일을 버튼 클릭 또는 드래그 & 드롭으로 선택하고, 확장자·크기·개수 제한과 함께 목록을 관리하는
컴포넌트. 내부 스타일은 Tailwind 없이 `FileUpload.module.scss` + `--m2m-*` 토큰, 아이콘은 `Icon`.

```tsx
import FileUpload from 'm2m-uiux-react/FileUpload'
;<FileUpload
  multiple
  maxCount={5}
  maxSize={10 * 1024 * 1024}
  accept="image/*"
  listType="picture"
  onChange={(files) => setFiles(files)}
/>
```

## Props

| Prop         | Type                      | Default  | 설명                                                 |
| ------------ | ------------------------- | -------- | ---------------------------------------------------- |
| `accept`     | `string`                  | `'*'`    | `<input accept>` 값                                  |
| `multiple`   | `boolean`                 | `false`  | 다중 선택 (false 면 새 파일이 이전 파일 교체)        |
| `maxSize`    | `number` (byte)           | `5MB`    | 파일당 최대 크기 — 초과 시 목록에 에러 항목으로 표시 |
| `maxCount`   | `number`                  | `10`     | 최대 개수 — 도달 시 버튼 비활성화                    |
| `disabled`   | `boolean`                 | `false`  | 전체 비활성화                                        |
| `drag`       | `boolean`                 | `false`  | 드래그 & 드롭 영역 모드 (기본은 버튼 모드)           |
| `listType`   | `'text' \| 'picture'`     | `'text'` | `picture` 는 이미지 파일을 36×36 썸네일로 표시       |
| `onChange`   | `(files: File[]) => void` | —        | 유효한 파일 목록이 바뀔 때                           |
| `onUpload`   | `(files: File[]) => void` | —        | 파일이 새로 선택될 때 원본 목록                      |
| `classNames` | `string \| string[]`      | —        | 추가 클래스                                          |

`ref` 는 루트 `<div>` 로 전달됩니다. `formatFileSize(bytes)` 헬퍼도 export 합니다.

## 상수

`FileUpload.constant.ts`: `FILE_UPLOAD_LIST_TYPE`, `FILE_UPLOAD_FILE_STATUS`,
`FILE_UPLOAD_STATE_CLASS`, `FILE_UPLOAD_DEFAULT`.

`showList={false}`를 사용하면 내부 목록을 관리하지 않고 이번에 선택한 유효 파일만 `onChange`로 전달합니다.
서버 업로드 후 받은 URL 목록은 `UploadedFileList`의 제어형 `value/onChange`로 표시합니다.
