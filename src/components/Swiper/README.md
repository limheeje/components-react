# Swiper

이미지 배너·카드를 좌우로 넘기는 캐러셀. 순수 CSS `calc()` 기반(측정 JS 없음), 외부 라이브러리
의존 없음. 자동재생·무한루프·다중 슬라이드(`slidesPerView`, 소수 허용)·3종 페이지네이션 지원.
내부 스타일은 Tailwind 없이 `Swiper.module.scss` + `--m2m-*` 토큰.

```tsx
import Swiper from 'm2m-uiux-react/Swiper'
;<Swiper
  items={[<Slide1 />, <Slide2 />, <Slide3 />]}
  autoplay={2500}
  loop
  slidesPerView={1.3}
  spaceBetween={12}
  pagination="bullets"
/>

// children 으로도 가능
;<Swiper autoplay loop>
  <img src={a} />
  <img src={b} />
</Swiper>
```

## Props

| Prop            | Type                                                | Default     | 설명                                       |
| --------------- | --------------------------------------------------- | ----------- | ------------------------------------------ |
| `items`         | `ReactNode[]`                                       | —           | 슬라이드 배열 (children 대신)              |
| `children`      | `ReactNode`                                         | —           | 슬라이드                                   |
| `autoplay`      | `boolean \| number`                                 | `false`     | true → 2800ms, 숫자 → 해당 ms              |
| `loop`          | `boolean`                                           | `false`     | 무한 반복                                  |
| `navigation`    | `boolean`                                           | `true`      | 좌우 화살표                                |
| `pagination`    | `'bullets' \| 'fraction' \| 'progressbar' \| false` | `'bullets'` | 페이지 인디케이터                          |
| `slidesPerView` | `number`                                            | `1`         | 한 화면 슬라이드 수 (1.3 → 다음 살짝 노출) |
| `spaceBetween`  | `number`                                            | `0`         | 슬라이드 간격 px                           |
| `onChange`      | `(index: number) => void`                           | —           | 슬라이드 변경                              |
| `classNames`    | `string \| string[]`                                | —           | 추가 클래스                                |

`ref` 는 루트 `<div>` 로 전달됩니다.

## 상수

`Swiper.constant.ts`: `SWIPER_PAGINATION`, `SWIPER_STATE_CLASS`, `SWIPER_DEFAULT`.
