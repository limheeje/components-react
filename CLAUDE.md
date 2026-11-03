# m2m-uiux-react — 작업 규칙

React 컴포넌트 npm 패키지. 배포는 서브패스 export (`m2m-uiux-react/Button` 등). **배포 준비 완료 상태.**
Figma 원본 앱(`src/pages`, `src/components/ui`, `src/icons` 등)과 테스트 인프라는 **전부 삭제됨**
(2026-09-02). 저장소 = `src/components/*` + `src/demo/*` + `src/lib` + `src/styles` + `src/themes`.

---

## 1. 폴더 구조 (컴포넌트당)

```
src/components/<Name>/
  <Name>.tsx            # 본문 (forwardRef)
  <Name>.type.ts        # 모든 타입/인터페이스
  <Name>.constant.ts    # 상태·사이즈·기본값 상수 (Object.freeze)
  <Name>.module.scss    # 스타일 — `.bs<Name>*` 리터럴 클래스 + 상단 SCSS 변수 (Tailwind 절대 금지) · §4
  <Name>.test.tsx       # vitest + @testing-library/react
  index.ts              # 진입점 (`import '~/assets/styles/tokens.css'` 로 시작)
  README.md             # prop 표 + 상수 목록
```

`<Name>` = PascalCase. 컴파운드/스토어가 필요하면 `<Name>.context.ts` / `<Name>.store.ts` 추가.
**테스트 파일 없음** (`*.test.tsx` 삭제, vitest 미설치). 검증은 `type-check` + `build` + `dev`.

---

## 2. import — 무조건 절대경로 `~/`

`~` = `src/` (vite alias + tsconfig paths).

- **폴더 내 형제 파일도 `~/components/<Name>/<Name>.type` 로 쓴다. `./` `../` 절대 금지.**
- 크로스컷 유틸: `~/lib/cx`, 토큰 side-effect: `~/assets/styles/tokens.css`.
- 빌드된 `.d.ts` 는 `vite.config.ts` 의 `rewriteDtsImports()` 가 형제참조를 `./` 로 되돌려
  배포 정합성을 맞춘다 (소스는 100% 절대, 산출물만 상대). 신경 안 써도 됨.

---

## 3. 디자인 토큰 — `src/assets/styles/tokens.css` 가 단일 소스

- **모든 `--m2m-*` 기본값은 손으로 쓴 순수 CSS `src/assets/styles/tokens.css`** 소유.
  `:root { --m2m-* }` + `[data-theme='dark']` + `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) }`.
  파싱/생성 스크립트 없음(`scripts/gen-tokens.mjs` 삭제). → `dist/style.css` 포함.
  각 컴포넌트 `index.ts` 첫 줄 `import '~/assets/styles/tokens.css'` 로 side-effect 등록.
- SCSS 유틸은 `src/assets/styles/` 에 성격별 분리: `_function.scss`(`rem`, `str-replace`) ·
  `_typography.scss`(`$font-family`, `$typo-map`) · `_icons.scss`(`icon-map()`) · `_mixin.scss`
  (`get-background-svg`, `typo`, `hidden`, `text-ellipsis`). `theme.scss` 가 전부 `@forward`.
- `src/styles/`, `src/themes/` 폴더는 삭제됨.
- 새 토큰은 `tokens.css` 의 `:root`(+필요 시 dark 블록)에 `--m2m-<key>` 직접 추가.
- 컴포넌트 스타일은 **`var(--m2m-pg-*)` 직접 참조**. 주요 계열:
  - 브랜드(딥 네이비 #023894): `--m2m-pg-brand` / `-hover` / `-active` / `-light` / `-sub` / `-border`
  - 컴포넌트 표면: `--m2m-pg-comp-bg` / `-bg-subtle` / `-bg-disabled` / `-bg-hover`
  - 컴포넌트 테두리: `--m2m-pg-comp-border` / `-border-sub`
  - 컴포넌트 텍스트: `--m2m-pg-comp-text` / `-text-sub` / `-text-muted` / `-text-disabled`
  - 상태: `--m2m-pg-success` / `-warning` / `-error` / `-info` (+ `-bg` / `-border` / `-dark`)
  - secondary 버튼: `--m2m-pg-secondary-bg` / `-secondary-text` · 스켈레톤: `--m2m-pg-skeleton-base` / `-shine`
  - 데모/레이아웃 전용: `--m2m-pg-bg-page` / `-bg-card` / `-text-primary` / `-sidebar-shadow` 등
- `color()` SCSS 함수 / `$palette` / `$semantic` 은 **제거됨**. `rem()` `typo()` `get-background-svg()` +
  `hidden` `text-ellipsis` 믹스인만 남음.

---

## 4. SCSS — `rem()` + `typo()` 필수

각 `*.module.scss` 최상단:

```scss
@use '~/assets/styles/theme' as *;
```

- **모든 px 는 `rem(16px)` 로 감싼다** (테두리 `rem(1.5px)` 포함). 하드코딩 px 금지.
  - `rem($px)` → `calc(var(--m2m-font-size, 16px) / 16 * $px)`.
    `:root` 의 `--m2m-font-size` 를 바꾸면 UI 전체가 비례 스케일된다.
- **폰트는 `@include typo('<Scale>/<Weight>')`**. `src/assets/styles/_typography.scss` `$typo-map`:
  - Title1/Title2/Title3, Head, Body, Sub, Caption, Micro
  - Weight: Bold(700) / Semibold(600) / Medium(500) / Regular(400)
  - 관례 매핑: 컨트롤 sm→`Sub/Regular`, md→`Head/Regular`, lg→`Title3/Regular`
    (버튼 등 강조는 `*/Semibold`)
  - 없는 스케일이 필요하면 `$typo-map` 에 항목 추가 OK.
- sr-only 숨김: `@include hidden`. 말줄임: `@include text-ellipsis($lines)`.

### 클래스명 — `.bs<컴포넌트><클래스>` 리터럴 (CSS Module 유지, 난수 해시 없음) — **41개 전 컴포넌트 완료**

- `<Name>.module.scss` **그대로 유지** (`import styles from` + `styles.bsX` 접근). 클래스를 **처음부터
  최종 이름으로** 작성: `.bsButton`, `.bsButtonLabel`, `.bsSelectOptionCheckbox` …
  - 최상위(루트) 클래스 = `.bs<Name>` (접미어 없음). 하위 요소 = `.bs<Name><Element>` (PascalCase).
  - **가변(modifier/state) 클래스는 파일 상단에 SCSS 변수로 단일 소스화**:
    `$SIZE_MD: 'bsButtonSizeMd'`, `$VARIANT_PRIMARY: 'bsButtonVariantPrimary'`, `$IS_LOADING: 'is-loading'`,
    `$IS_MULTIPLE: 'isMultiple'`, JS 토글 요소-상태 `$OPTION_SELECTED: 'bsSelectOptionSelected'` 까지.
    선택자는 `.#{$SIZE_MD} { … }` / `.bsButton.#{$IS_ROUND} { … }` interpolation.
    루트·안 바뀌는 순수 요소 클래스는 변수화 안 하고 리터럴.
  - **상태값은 그대로**: `is-` / `has-` / `use-` 접두(kebab `is-open` · camel `isMultiple`)는 `bs` 접두·해시
    없이 전역 유지. `@keyframes` 는 `bs<Name><Anim>` 직접 명명. 아이콘 마스크는 `.i-<key>` 리터럴 유지.
- TSX: `styles.bsButton`, `styles[\`bsButtonVariant${cap(v)}\`]`(`cap`= 첫글자·하이픈뒤 대문자 →`primary-light`=`PrimaryLight`), 상태는 `styles[BUTTON_STATE_CLASS.IS_LOADING]`(값 `'is-loading'`) 또는 `styles.isMultiple`.
- `.constant.ts` `*_STATE_CLASS` 값: `is-`/`has-`/`use-` 는 그대로, 그 외 modifier 값(`LABEL_LEFT`,
  `STATUS_ERROR` 등)은 `bs<Name><Pascal>` 로 (scss 변수값과 1:1).
- `vite.config.ts` `bsScopedName`(`css.modules.generateScopedName`): `is-`/`has-`/`use-` · `bs*` · `i-` 를
  그대로 통과, 나머지(미전환분 대비 fallback)만 `bs<Name><Pascal>` 치환 + 해시 제거.
- 브라우저: `class="bsButton bsButtonVariantPrimary bsButtonSizeMd is-loading"`. 클래스명 안정 = 소비자
  오버라이드 계약. vitest 클래스 단언은 `.toMatch(/bsButtonSizeLg/)` 리터럴 부분매칭.

---

## 5. 아이콘 — 빈 `<i>` + 마스크

React SVG 컴포넌트 안 만든다. `src/assets/styles/_icons.scss` `icon-map()` 의 SVG 를 CSS 마스크로:

```scss
.icon {
  display: inline-block;
  width: rem(16px);
  height: rem(16px);
  flex-shrink: 0;
}
.iconSearch {
  @include get-background-svg('icon_search_line', currentColor);
}
```

```tsx
<i className={cx(styles.icon, styles.iconSearch)} aria-hidden="true" />
```

주요 키: `icon_search_line`, `icon_cancel_fill`, `icon_close`, `icon_eye_fill`,
`icon_eye_off_fill`, `icon_check_line`, `icon_arrow_down_line`, `icon_arrow_up_line`,
`icon_error_line`, `icon_info_line`, `icon_clock_line`, `icon_calendar_month_fill`.
`<i>` 는 마스크라서 크기(`width`/`height`)를 반드시 명시.

---

## 6. 컴포넌트 API 는 `src/pages/*` 원본이 기준

`src/pages/<Name>Page.tsx` (Figma 가 만든 문서 앱)의 **`Common<Name>` prop 명세가 정답**이다.
새로 만들 때 임의로 prop 을 짓지 말고 그 페이지의 `TABS` 배열 + preview 컴포넌트 시그니처를 따른다.

- 공통 prop: **`classNames?: string | string[]`** (native `className` 아님 — 둘 다 지원하되 문서상은 `classNames`).
- `error` 는 `boolean | string` 허용 (문자열이면 컨트롤 하단 메시지).
- 원본과 다르면 안 됨: Divider 는 `direction`(orientation 아님) / `color` / `thickness` / `labelAlign`;
  Badge 는 `type`(variant 아님, 값에 `error`·`ghost`·`*-light` 포함) + `dot` 은 "점+평문" 모드;
  Textarea 는 `size` 없음 · `resize` 는 boolean(기본 true); Select 는 **네이티브 아님 —
  커스텀 드롭다운 레이어**(`searchable` 지원, 선택 항목 brand-light 배경 + 체크 아이콘);
  **Input 은 compound** — `Input.Text` / `.Password` / `.Number` / `.Email` / `.Tel` / `.Search`
  (`Object.assign(InputBase, {...})`), `type` prop 사용도 유효. `Input.Search` 는 `onSearch`.
- **데모 페이지 탭 구성은 `src/pages/<Name>Page.tsx` 의 `TABS` 배열과 동일하게** 맞춘다
  (예: Button = variant·size·round·disabled·loading·fullWidth·icon·onClick·classNames).
- **데모 CodeBlock 은 원본 `src/components/CodeBlock.tsx` 이식판**: 헤더바(JSX 칩·N lines·복사 버튼)
  - 줄번호 + `highlightCode()` 구문 강조(`.c-comp`/`.c-attr`/`.c-val`/`.c-bool`/`.c-tag`/`.c-kw`/
    `.c-comment`, demo.css 에 light + `[data-theme=dark]` 정의). lucide 대신 인라인 SVG.

---

## 7. 데모 앱 (`src/demo/`) — 완성 시 반드시 갱신

`index.html` → `/src/demo/main.tsx`. 의존성 없음(`useState` 라우팅). 색은 `--m2m-pg-*`.
데모는 배포물 아님(`files: ["dist"]`), 개발/QA 확인용.

- 공용: `src/demo/components/{PageHeader,PropTabs,ComponentSection,CodeBlock,Sidebar,navContext}.tsx`
- `main.tsx` 가 `~/assets/styles/tokens.css` + `~/demo/demo.css`(fonts.css 만 import) 로드.
- **새 컴포넌트 완성 = `src/demo/pages/<Name>Page.tsx` + `src/demo/pages/index.ts` 의 `PAGES` + `NAV_GROUPS`**.
  `NAV_GROUPS` 는 명시적 트리(그룹/순서/라벨/중첩). `PropTabs` 는 `DemoTabContext` 로 하위항목 탭 지정.
- 데모 사이드바 = (구) 원본 `Sidebar.tsx` `<nav>` 구성과 동일하게 유지 (원본은 삭제됨, CLAUDE §10 참고).

---

## 8. 등록 체크리스트 (새 컴포넌트)

1. `src/components/<Name>/` 파일들 (§1)
2. `vite.config.ts` → `entries` 에 한 줄 + `dts` `include` 에 `'src/components/<Name>/**'`
3. `package.json` → `exports` 에 `./<Name>` 블록 (types/import/require)
4. `src/demo/pages/<Name>Page.tsx` + `src/demo/pages/index.ts` `PAGES` + `NAV_GROUPS`
5. `README.md` + `<Name>.test.tsx`
6. 외부 라이브러리 쓰면: `vite.config.ts` `external` 목록 + `package.json` `dependencies` 둘 다.

---

## 9. 검증 명령

```bash
npm run lint         # eslint --fix (prettier 포함: semi 없음, singleQuote, bracketSpacing 없음)
npm run type-check   # tsc --noEmit (전체 src)
npm run test         # vitest run (컴포넌트별 <Name>.test.tsx, jsdom, src/test/setup.ts)
npm run build        # vite build (lib) → dist/<Name>.{js,cjs} + dist/style.css + d.ts
npm run dev          # 데모 앱 localhost:5173
```

- CI(`test` stage) = `lint` → `type-check` → `npx vitest run` → `build`. (`release` stage = `main` 에서 semantic-release)
- 컴포넌트마다 `src/components/<Name>/<Name>.test.tsx` 필수. Chart 테스트는 `ResizeObserver` 폴리필 포함.
- standalone `sass` CLI 는 `~` alias 를 못 푼다 → SCSS 검증은 `build`/`dev` 로만.
- 빌드 후 `dist/**/*.d.ts` 에 `components/<X>` 형태의 안 풀린 크로스레퍼런스가 없는지 확인.
- 코드 스타일은 `npm run lint` 가 강제(prettier). 세미콜론·bracket spacing 없이 작성됨.

---

## 10. 완료 현황

Button · Input · Select · Checkbox · Radio · Switch · Textarea · Divider · Badge ·
Tooltip · Loading · ProgressBar · Icon · NoData · Breadcrumb · Tabs · Accordion · Toast ·
List · ListItem · Steps · SearchField · Pagination · TimePicker · DatePicker

**옛 원자 컴포넌트 목록 전부 완료 (26개).**

Composite/기타: **ButtonGroup · CheckboxGroup · RadioGroup** (11차) · **FileUpload · ImageUploadPreview** (12차).

**19차 — 파이프라인/스타일 정리 (2026-09-02).**

- **CI stage `verify` → `test` 개명.** `test` = lint → type-check → `npx vitest run` → build.
- **vitest 복구**: 18차에 지운 테스트 되살림. 컴포넌트별 `src/components/<Name>/<Name>.test.tsx`
  (41개, 188 케이스 통과). `src/test/setup.ts` + `vite.config.ts` `test:` 블록 복구.
  devDeps: vitest^4, @testing-library/{react,user-event,jest-dom}, jsdom^25, @vitest/eslint-plugin.
- **스타일 폴더 통합**: `src/styles` + `src/themes` → **`src/assets/styles/`**.
  `_function`(rem, str-replace) · `_typography`($font-family, $typo-map) · `_icons`(icon-map) ·
  `_mixin`(get-background-svg, typo, hidden, text-ellipsis) · `theme.scss`(@forward 진입점) ·
  `tokens.css`(손으로 쓴 순수 CSS — `--m2m-*` :root + dark) · `fonts.css`. `_theme.scss` SCSS-맵
  토큰 방식 폐기 → 순수 CSS 로. (§3)
- **데모 사이드바 하위메뉴 수정**: nav state 에 `seq` 카운터 → 같은 페이지키 재클릭 시에도 리렌더/탭 전환.
  `DemoTabContext`(navContext.ts) + `PropTabs` 가 `[seq]` 에 강제탭 재적용. InputPage/SelectPage 를
  타입별(Text/Password/…) 탭으로 분리해 하위메뉴별 콘텐츠 구분.

**18차 — 배포 정리 (2026-09-02).**

- **Figma 잔재 전부 삭제**: `src/pages`, `src/App.tsx`, `src/main.tsx`, `src/routes.tsx`,
  `src/components/ui`, `src/components/figma`, `src/components/*.tsx`(CommonX·Sidebar 등), `src/icons`,
  `src/styles/{theme.css,tailwind.css,globals.css,index.css}`, `scripts/`.
- **토큰 파이프라인 교체**: gen-tokens.mjs + theme.css + tokens.css(구) 제거.
  (19차에서 최종적으로 `src/assets/styles/tokens.css` 손CSS 로 정착 — §3)
- **Chart → recharts 라이브러리로 회귀** (순수 SVG 폐기). `recharts` externalize + `dependencies` 유지.
  `ChartProps` API 는 그대로(type/data/xKey/series/stacked/showGrid/…). 계열 `type` override → composed.
- **Dialog 신규**: `src/components/Dialog/`. 선언형 `<Dialog open onClose title description footer size
closeOnBackdrop closeOnEsc hideClose>` + 명령형 `openDialog()`(id) / `confirmDialog()`(Promise<boolean>) /
  `alertDialog()`(Promise<void>) / `closeDialog(id?)` / `closeAllDialogs()`. `<DialogProvider>` 앱 1회.
  `Dialog.store.ts` = useSyncExternalStore. Toast 패턴 동일. `tone` default/danger.
- **package.json**: `dependencies` 는 `recharts` 만. radix/mui/embla/router 등 전부 제거.
  (19차에서 vitest/@testing-library/jsdom + `test` script 재추가)
- **README.md 전면 재작성**: 사용자 가이드(import/상수/타입/토큰 선언/`--m2m-font-size`/SSR) +
  컨트리뷰터(추가·수정 주의) + Git 파이프라인.
- npm 서브패스: 43개 (`Dialog` 추가, `Token` 은 데모 전용).

**17차 — 원본 `<nav>` 파리티 완성.** **Form**(`Object.assign(FormRoot,{Field,Actions})` + 단독 `FormField`/
`FormActions` export. `Form.context.ts` = layout/labelWidth/disabled 컨텍스트. `layout` vertical/horizontal/
inline · `labelWidth` · `disabled`(fieldset). `Form.Field` = label/name/required/error(string→role=alert)/
help/htmlFor/layout override. `Form.Actions` = align start/center/end/between. 컨트롤은 Input/Select 등 그대로 slot).
**Token** = 데모 전용 페이지(비-npm) — `--m2m-pg-*` 색·`typo()` 스케일·`rem()` 스페이싱·`--m2m-font-size` 슬라이더.
`_placeholder.tsx` 삭제 — 데모 nav 의 모든 항목이 실제 페이지. **원본 Sidebar `<nav>` 와 그룹/순서/라벨/중첩 완전 일치.**

**16차**: **Swiper**(순수 CSS calc() 캐러셀 — `items`/`children`·`autoplay`(bool|ms)·`loop`·`navigation`·
`pagination` bullets/fraction/progressbar/false·`slidesPerView`(소수 OK)·`spaceBetween`·`onChange`, forwardRef<div>) ·
**Chart**(recharts 래퍼(18차에 SVG→lib 회귀) — `type` line/bar/area/pie/donut/radar/scatter, `data`+`xKey`+
`series`((string|{key,label,color,type,dashed})[]) → 계열별 `type` 으로 composed, `stacked`·`showGrid/Axis/
Legend/Tooltip`(네이티브 `<title>`)·`colors`(팔레트 prop, 하드코딩 hex 허용 — 데이터색은 예외)·`maxValue`·
`valueFormatter`, forwardRef<div>. `CHART_PALETTE` export). 데모 placeholder 2개 교체.

**15차**: **Lightbox**(공유 오버레이 — 줌/회전/다운로드/←→/썸네일/ESC. `images`+`index`+`onClose`+`onChange`
제어) · **Timeline**(`items[{title,description,date,status,icon}]`, `direction` v/h, `align` left/right/alternate,
`pending` bool|node, `color` primary/success/gray, forwardRef<div>) · **ImagePreview**(썸네일 클릭 →
Lightbox; `preview`/`group`/`radius`/`fit`/`fallback`, forwardRef<div>) · **Table**(`Table<T>` 제네릭 함수형;
`columns[{key,label,width,align,sortable,render,cellStyle,rowSpanKey}]`·`headGroups`·`data`·`rowKey`·
`renderRow`·`striped`/`hover`·`size`·`loading`·`empty*`·`selectable`+`selectedRowKeys`+`onSelectionChange`·
`sort`+`onSortChange`(제어 없으면 클라 정렬)·`pagination{page,pageSize,total?,onChange}`(data 슬라이스)).
기존 `ImageUploadPreview/Lightbox` 는 `~/components/Lightbox/` 로 이동(공유). 데모 placeholder 3개 교체.

**14차**: **Image**(fallbackSrc/skeleton/fadeIn/lazy/objectFit, forwardRef<div>) ·
**Header**(type default/primary · back/onBack · actions[{icon,onClick,badge,label}] · logo · sticky · children,
forwardRef<header>) · **Grid**(+`Grid.Item`, `columns`(num→repeat) `gap` `justifyItems`/`alignItems`
`autoRows` `inline`; Item `colSpan`/`rowSpan`/`justifySelf`/`alignSelf`. 레이아웃 값은 인라인 스타일).
데모 placeholder 3개 실제 페이지로 교체.

**13차**: 데모 사이드바를 원본 `<nav>` 구조로 재구축 — `NAV_GROUPS` 트리(그룹순서/라벨/중첩),
검색창, 접기 토글, Input/Select/Progress 하위항목. `PropTabs` 는 `DemoTabContext` 로 하위항목
클릭 시 탭 선택. 미구현 컴포넌트는 `_placeholder.tsx` 임시 페이지로 nav 자리 채움(14~17차 교체).
IconPage → 원본 `SvgIconPage` TABS(gallery/playground/named/color/size/rotate/register/props)로 재작성,
데모 라벨 `SvgIcon`.

### 원본 데모 앱(`src/components/Sidebar.tsx`)의 `<nav>` 구성 = 최종 목표

데모 사이드바(`nav.demo-sidebar__nav`)는 아래 원본 nav 와 **그룹/순서/라벨/중첩까지 동일**해야 함:

- **Foundation**(#FF5A00): Token · SvgIcon · Image
- **Layout**(#6366F1): Grid · Header · Divider · Tab · Breadcrumb
- **Action**(#3B82F6): Button · ButtonGroup
- **Form**(#8B5CF6): Input(Text/Password/Number/Email/Tel/Search) · Select(Default/Multi) ·
  Checkbox · CheckboxGroup · Radio · Switch · Textarea · DatePicker · TimePicker ·
  FileUpload · ImageUploadPreview · Form
- **Data Display**(#059669): Badge · Table · List · Accordion · NoData · Timeline · Swiper ·
  ImagePreview · Chart
- **Feedback**(#EF4444): Toast · Tooltip · Loading · Progress(Bar/Steps)

**전부 구현 완료 (17차).** npm 서브패스: Token 제외 전부. Token 은 데모 전용 문서 페이지.
추가 커스텀(원본에 없음, 유지): RadioGroup, SearchField, Pagination.
데모 라벨 정합: `Tabs`→`Tab`, `Icon`→`SvgIcon`, `ProgressBar`+`Steps`→`Progress`(Bar/Steps 하위),
Input/Select 하위 항목화. 사이드바에 검색창·접기 토글 포함.

- **ButtonGroup**: `<Button>` 자식을 `cloneElement` 로 감싸 `size`/`disabled` 일괄 주입.
  `direction` row/column · `attached`(경계 모서리 CSS 자동 조정, `:not(:first-child)` 이음선) · `size` · `disabled`.
  개별 버튼 `disabled` 는 유지. `role="group"`, forwardRef<div>.
- **CheckboxGroup**: 제어 전용(`options`+`value: string[]`+`onChange` 필수). `Checkbox` 원자 렌더.
  `direction` horizontal/vertical · `size` · `disabled` · `min`/`max`(초과 시 미선택 항목 비활성, min 미만 해제 차단) · `name`.
- **RadioGroup**: 제어(`value`)/비제어(`defaultValue`) 모두. `onChange(value: string)`. `Radio` 원자 렌더.
  `name` 생략 시 `useId` 자동 생성. `direction` · `size` · `disabled`. `role="radiogroup"`.

- **Icon**: 빈 `<i>` + `src/assets/styles/_icons.scss` `icon-map()` 마스크. SCSS 가 `@each ... in icon-map()` 로
  `.i-<key>` 클래스 전부 생성. `Icon.constant.ts` `ICON_NAME` 이 친숙한 별칭→키 매핑.
- 타 컴포넌트를 import 하면(NoData→Icon, Breadcrumb→Icon) 빌드 시 `rewriteDtsImports()` 가
  `.d.ts` 의 타 컴포넌트 참조를 `../<X>/` 로 변환(flatten 후 형제 디렉터리).

- **Tabs**: `items` 배열 (`{key,label,icon?,badge?,disabled?,content?}`), `type` line/card/pill,
  `defaultKey`/`activeKey`+`onChange`, `centered`/`fullWidth`.
- **Accordion**: compound `<Accordion>`+`<Accordion.Item>`, `type` single/multiple,
  `defaultValue`/`value`+`onValueChange` (single=string, multiple=string[]).
- **Toast**: imperative. `<ToastProvider position maxCount>` 앱 1회 + `showToast({type,message,
duration,position,action,variant,dismissible})` 전역. `Toast.store.ts` = `useSyncExternalStore`
  외부 스토어. `dismissToast(id)`/`clearToasts()`. `ToastContainer` = `ToastProvider` 별칭.

- **List / ListItem**: `<List>` 는 `items`+`renderItem`(렌더프롭) 또는 `<ListItem>` 직접 자식 모두
  지원. `divided`(기본 true)/`clickable`(자식에 cloneElement 로 전파)/`loading`(스켈레톤)/`onItemClick`.
  `ListItem`: `title`/`description`/`avatar`/`extra`/`clickable`(→hover+chevron).
- **Steps**: `steps[{title,description?}]` · `current`(0-base) · `direction` h/v · `status`
  wait/process/finish/error(current 노드에만). 노드 색은 `--step-node-*` CSS 변수 + `.node-done/
current/upcoming` + `.root.status-*`.

- **SearchField**: 검색 전용 인풋. 좌측 돋보기 버튼(`onSearch`) + 우측 X. `size`/`clearable`/
  `loading`(스피너)/`onSearch`(Enter·버튼). pill 모양.
- **Pagination**: `page`(1-base)+`onChange` 필수, `total`+`pageSize` 또는 `totalPages`,
  `siblingCount`(기본 1), `showTotal`(bool|fn), `size` sm/md. 페이지 많으면 `…` 축약
  (getPageList: 양끝 + 현재±sibling). `< 1 2 3 >` 스타일, 활성=브랜드.

- **TimePicker**: 팝업 시/분/초 스크롤 컬럼(`TimeColumn.tsx`). `value`/`defaultValue`/`onChange`
  (**'확인' 시에만**)/`format`(HH:mm|HH:mm:ss)/`step`(분)/`clearable`/`size`. draft→commit.
- **DatePicker**: 순수 커스텀 캘린더(`Calendar.tsx` + `dateUtils.ts`). `mode` single/range,
  `value`(Date|null | [Date|null,Date|null])/`defaultValue`/`defaultRange`/`onChange`,
  days·months·years 3뷰(헤더 클릭 전환), `minDate`/`maxDate`/`format`/`showTime`(하단 시간 스테퍼+확인)/
  `showTodayDot`/`showWeekend`/`showMonthPicker`/`showYearPicker`/`clearable`/`error`. range 는 두 달
  나란히 + hover 미리보기.
