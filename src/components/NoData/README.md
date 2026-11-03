# NoData

빈 상태(empty state) 블록. `src/pages/NoDataPage.tsx` 원본 API 를 따릅니다.
내부 스타일은 Tailwind 없이 `NoData.module.scss` + `--m2m-*` 토큰으로만 구성됩니다.

```tsx
import NoData from 'm2m-uiux-react/NoData';

<NoData type="search" />
<NoData type="danger" onRetry={handleRetry} />
<NoData icon={<Icon name="inbox" size={40} />} title="항목 없음" description="추가해보세요." />
```

## Props

| Prop          | Type                              | Default   | 설명                                            |
| ------------- | --------------------------------- | --------- | ----------------------------------------------- | ------------------------------------------------ |
| `type`        | `'empty' \| 'search' \| 'danger'` | `'empty'` | 프리셋 (기본 아이콘/제목/설명 제공)             |
| `icon`        | `ReactNode                        | null`     | 프리셋                                          | 아이콘 (지정 시 프리셋 대체, `null` 이면 미표시) |
| `title`       | `ReactNode`                       | 프리셋    | 제목                                            |
| `description` | `ReactNode`                       | 프리셋    | 설명                                            |
| `action`      | `ReactNode`                       | —         | 하단 액션 영역                                  |
| `onRetry`     | `() => void`                      | —         | 있으면 "다시 시도" 버튼 표시 (`action` 이 우선) |
| `classNames`  | `string \| string[]`              | —         | 추가 클래스                                     |

`ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`NoData.constant.ts` 에서 export: `NO_DATA_TYPE`, `NO_DATA_STATE_CLASS`, `NO_DATA_PRESET`(타입별 기본값), `NO_DATA_DEFAULT`.
