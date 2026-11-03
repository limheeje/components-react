# m2m-uiux-react

React 컴포넌트 라이브러리. 컴포넌트마다 **서브패스로 개별 import** 하고, 스타일은 Tailwind 없이
SCSS 모듈 + `--m2m-*` CSS 변수로 구성됩니다. `--m2m-font-size` 하나로 UI 전체가 비례 스케일됩니다.
동일 API 의 Vue 판(`m2m-uiux-vue`)이 함께 배포되며 props · 상수명 · 디자인 토큰이 100% 동일합니다.

```tsx
import Button, {BUTTON_VARIANT, type ButtonProps} from 'm2m-uiux-react/Button'
```

- 데모: <https://www.npmjs.com/package/m2m-uiux-react> 의 링크된 배포 사이트 (Vercel)
- 목차: [1. 패키지 사용자 가이드](#1-패키지-사용자-가이드) · [2. 컴포넌트 추가 (컴포넌트 작업자(UX팀))](#2-컴포넌트-추가-컴포넌트-작업자ux팀) · [컴포넌트 목록](#컴포넌트-목록-45)

---

## 1. 패키지 사용자 가이드

### 1.1 설치 & 다운로드 후 필수 작업

```bash
npm install m2m-uiux-react
```

| 구분                    | 패키지                            | 설명                                                        |
| ----------------------- | --------------------------------- | ----------------------------------------------------------- |
| **peerDependencies**    | `react`, `react-dom` (18 또는 19) | 직접 설치. 앱과 **같은 React 인스턴스**를 써야 하므로 peer. |
| **dependencies (자동)** | `recharts`                        | `Chart` 컴포넌트용. `npm install` 시 자동으로 함께 설치됨.  |

번들러는 서브패스 `exports` + CSS `sideEffects` 를 이해하는 환경(Vite / webpack / Next.js 등)이면 됩니다.
설치 후 **반드시 두 가지**를 해야 합니다.

```tsx
// (1) 앱 엔트리 (main.tsx / app/layout.tsx) — 스타일시트를 앱 전체에서 딱 한 번 import
import 'm2m-uiux-react/style.css'
```

```css
/* (2) 앱 전역 CSS(예: globals.css) — 디자인 토큰 :root 선언 (아래 1.3 블록 전체를 복사) */
:root {
  --m2m-font-size: 16px;
  --m2m-pg-brand: #023894;
  /* … 1.3 의 전체 블록 … */
}
```

> **`style.css` 안에도 기본 `:root` 가 들어 있어** 아무것도 안 해도 브랜드(딥 네이비) 테마로 바로
> 동작합니다. (2) 는 프로젝트 색으로 **덮어쓰고 싶을 때** 필요합니다. 컴포넌트는 언제나
> `var(--m2m-pg-*)` 만 참조하므로, 같은 이름의 변수를 재선언하면 전체 테마가 바뀝니다.

**(선택) 폰트** — 라이브러리는 `Pretendard` 를 1순위 폰트 스택으로 씁니다. 프로젝트에서 Pretendard 를
로드하지 않으면 시스템 폰트로 폴백됩니다. (폰트 파일은 포함하지 않음)

### 1.2 컴포넌트 불러오기

컴포넌트 · 상수 · 타입 모두 **같은 서브패스**에서 가져옵니다. 컴포넌트는 `default` export 입니다.

```tsx
import {useState} from 'react'

// 컴포넌트 (default) + 값 상수 + 타입을 한 줄에
import Button, {BUTTON_VARIANT, BUTTON_SIZE, type ButtonProps} from 'm2m-uiux-react/Button'
import Input from 'm2m-uiux-react/Input'

export function SaveForm() {
  const [name, setName] = useState('')
  return (
    <>
      <Input.Text value={name} onChange={(e) => setName(e.target.value)} label="이름" placeholder="입력하세요" />
      <Button variant={BUTTON_VARIANT['PRIMARY']} size={BUTTON_SIZE['MD']} onClick={() => console.log(name)}>
        저장
      </Button>
    </>
  )
}
```

- `import {Button} from 'm2m-uiux-react/Button'` (named) 도 동일하게 동작합니다. 두 방식 다 지원.
- 상수는 `Object.freeze` 된 값 상수입니다. `BUTTON_VARIANT['PRIMARY']` → `'primary'`.
- 입력 계열 컴포넌트는 제어 컴포넌트 패턴 — `value` + `onChange` 를 함께 씁니다.
- 컴파운드 컴포넌트는 멤버로 접근합니다: `<Input.Text>`, `<Form.Field>`, `<Accordion.Item>`, `<Grid.Item>`.
- `ref` 는 대부분 `forwardRef` 로 내부 핵심 엘리먼트(`input` / `button` / 루트 `div`)에 전달됩니다.

### 1.3 디자인 토큰 — 앱 전역 CSS 에 복사해서 선언

아래 블록을 **그대로 복사**해 프로젝트 전역 CSS(`:root`)에 붙여넣으면 됩니다. 이후 원하는 변수만
프로젝트 색으로 바꾸세요. `rem()` 스케일 기준값 `--m2m-font-size` 를 바꾸면 그 스코프의 UI 전체가
비례 확대/축소됩니다.

```css
:root {
  /* rem() 스케일 기준 — 이 값을 바꾸면 rem() 으로 감싼 모든 치수가 비례 스케일된다 */
  --m2m-font-size: 16px;

  /* 브랜드(딥 네이비 #023894) */
  --m2m-pg-brand: #023894;
  --m2m-pg-brand-hover: #0a47ad;
  --m2m-pg-brand-active: #01285f;
  --m2m-pg-brand-light: #eef3fb;
  --m2m-pg-brand-sub: #d9e4f5;
  --m2m-pg-brand-border: #a8c0e6;

  /* 페이지/표면 (데모·레이아웃용) */
  --m2m-pg-bg-page: #f6f8fb;
  --m2m-pg-bg-card: #ffffff;
  --m2m-pg-bg-subtle: #eef1f6;
  --m2m-pg-bg-header: #eef1f6;
  --m2m-pg-bg-code: #eef1f6;
  --m2m-pg-border: #dde2ec;
  --m2m-pg-border-sub: #c3cbdb;
  --m2m-pg-text-primary: #14213d;
  --m2m-pg-text-sub: #414a63;
  --m2m-pg-text-muted: #667089;
  --m2m-pg-text-placeholder: #99a2ba;
  --m2m-pg-text-code: #0272ab;
  --m2m-pg-sidebar-shadow: 2px 0 12px rgba(2, 22, 59, 0.06);
  --m2m-pg-badge-bg: #eef3fb;
  --m2m-pg-badge-color: #023894;
  --m2m-pg-badge-border: #a8c0e6;

  /* 상태 — 각 상태는 -bg / -border / -dark 변형이 있다 (info 는 세컨더리 스카이톤) */
  --m2m-pg-success: #16a34a;
  --m2m-pg-success-dark: #15803d;
  --m2m-pg-success-bg: #f0fdf4;
  --m2m-pg-success-border: #86efac;
  --m2m-pg-error: #ef4444;
  --m2m-pg-error-dark: #dc2626;
  --m2m-pg-error-bg: #fef2f2;
  --m2m-pg-error-border: #fca5a5;
  --m2m-pg-warning: #f59e0b;
  --m2m-pg-warning-dark: #d97706;
  --m2m-pg-warning-bg: #fffbeb;
  --m2m-pg-warning-border: #fde68a;
  --m2m-pg-info: #008cd6;
  --m2m-pg-info-dark: #0272ab;
  --m2m-pg-info-bg: #e7f5fc;
  --m2m-pg-info-border: #a9dcf3;

  /* 컴포넌트 표면·테두리·텍스트 (컴포넌트가 참조하는 핵심 계열) */
  --m2m-pg-comp-bg: #ffffff;
  --m2m-pg-comp-bg-subtle: #f7f9fc;
  --m2m-pg-comp-bg-disabled: #f2f4f8;
  --m2m-pg-comp-bg-hover: #eef1f7;
  --m2m-pg-comp-border: #dde2ec;
  --m2m-pg-comp-border-sub: #c6cddc;
  --m2m-pg-comp-text: #17203a;
  --m2m-pg-comp-text-sub: #4a5266;
  --m2m-pg-comp-text-muted: #6b7280;
  --m2m-pg-comp-text-disabled: #a6acbd;

  /* secondary 버튼 (스카이 블루 #008cd6) / 스켈레톤 */
  --m2m-pg-secondary-bg: #008cd6;
  --m2m-pg-secondary-text: #ffffff;
  --m2m-pg-skeleton-base: #eef1f6;
  --m2m-pg-skeleton-shine: #e0e5ee;
}

/* ── 다크 — 명시적 data-theme="dark" ────────────────────────────────────────── */
[data-theme='dark'] {
  --m2m-pg-brand: #4b8fe0;
  --m2m-pg-brand-hover: #6ba3e8;
  --m2m-pg-brand-active: #3a7fd4;
  --m2m-pg-brand-light: #0c1c33;
  --m2m-pg-brand-sub: #13294a;
  --m2m-pg-brand-border: #2b4c7e;

  --m2m-pg-bg-page: #0d1119;
  --m2m-pg-bg-card: #161b28;
  --m2m-pg-bg-subtle: #1c2438;
  --m2m-pg-bg-header: #1c2438;
  --m2m-pg-bg-code: #182034;
  --m2m-pg-border: #2b345a;
  --m2m-pg-border-sub: #3c4880;
  --m2m-pg-text-primary: #e6ebf8;
  --m2m-pg-text-sub: #bcc7e6;
  --m2m-pg-text-muted: #97a2c6;
  --m2m-pg-text-placeholder: #858ec0;
  --m2m-pg-text-code: #6ba3e8;
  --m2m-pg-sidebar-shadow: 2px 0 16px rgba(0, 0, 0, 0.4);
  --m2m-pg-badge-bg: #0c1c33;
  --m2m-pg-badge-color: #4b8fe0;
  --m2m-pg-badge-border: #2b4c7e;

  --m2m-pg-success: #22c55e;
  --m2m-pg-success-dark: #16a34a;
  --m2m-pg-success-bg: #052e16;
  --m2m-pg-success-border: #166534;
  --m2m-pg-error: #f87171;
  --m2m-pg-error-dark: #ef4444;
  --m2m-pg-error-bg: #2d0707;
  --m2m-pg-error-border: #7f1d1d;
  --m2m-pg-warning: #fcd34d;
  --m2m-pg-warning-dark: #f59e0b;
  --m2m-pg-warning-bg: #2d1700;
  --m2m-pg-warning-border: #92400e;
  --m2m-pg-info: #38bdf8;
  --m2m-pg-info-dark: #0ea5e9;
  --m2m-pg-info-bg: #082f42;
  --m2m-pg-info-border: #075985;

  --m2m-pg-comp-bg: #1e2338;
  --m2m-pg-comp-bg-subtle: #262c42;
  --m2m-pg-comp-bg-disabled: #151a2b;
  --m2m-pg-comp-bg-hover: #2a3048;
  --m2m-pg-comp-border: #545c8c;
  --m2m-pg-comp-border-sub: #646ca6;
  --m2m-pg-comp-text: #e6ebf8;
  --m2m-pg-comp-text-sub: #bcc6e6;
  --m2m-pg-comp-text-muted: #8f97c0;
  --m2m-pg-comp-text-disabled: #5c6490;

  --m2m-pg-secondary-bg: #0b9ee0;
  --m2m-pg-secondary-text: #ffffff;
  --m2m-pg-skeleton-base: #262a44;
  --m2m-pg-skeleton-shine: #31365c;
}

/* ── 다크 — OS 설정 (단, data-theme="light" 로 강제 라이트 시 제외) ─────────── */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --m2m-pg-brand: #4b8fe0;
    --m2m-pg-brand-hover: #6ba3e8;
    --m2m-pg-brand-active: #3a7fd4;
    --m2m-pg-brand-light: #0c1c33;
    --m2m-pg-brand-sub: #13294a;
    --m2m-pg-brand-border: #2b4c7e;

    --m2m-pg-bg-page: #0d1119;
    --m2m-pg-bg-card: #161b28;
    --m2m-pg-bg-subtle: #1c2438;
    --m2m-pg-bg-header: #1c2438;
    --m2m-pg-bg-code: #182034;
    --m2m-pg-border: #2b345a;
    --m2m-pg-border-sub: #3c4880;
    --m2m-pg-text-primary: #e6ebf8;
    --m2m-pg-text-sub: #bcc7e6;
    --m2m-pg-text-muted: #97a2c6;
    --m2m-pg-text-placeholder: #858ec0;
    --m2m-pg-text-code: #6ba3e8;
    --m2m-pg-sidebar-shadow: 2px 0 16px rgba(0, 0, 0, 0.4);
    --m2m-pg-badge-bg: #0c1c33;
    --m2m-pg-badge-color: #4b8fe0;
    --m2m-pg-badge-border: #2b4c7e;

    --m2m-pg-success: #22c55e;
    --m2m-pg-success-dark: #16a34a;
    --m2m-pg-success-bg: #052e16;
    --m2m-pg-success-border: #166534;
    --m2m-pg-error: #f87171;
    --m2m-pg-error-dark: #ef4444;
    --m2m-pg-error-bg: #2d0707;
    --m2m-pg-error-border: #7f1d1d;
    --m2m-pg-warning: #fcd34d;
    --m2m-pg-warning-dark: #f59e0b;
    --m2m-pg-warning-bg: #2d1700;
    --m2m-pg-warning-border: #92400e;
    --m2m-pg-info: #38bdf8;
    --m2m-pg-info-dark: #0ea5e9;
    --m2m-pg-info-bg: #082f42;
    --m2m-pg-info-border: #075985;

    --m2m-pg-comp-bg: #1e2338;
    --m2m-pg-comp-bg-subtle: #262c42;
    --m2m-pg-comp-bg-disabled: #151a2b;
    --m2m-pg-comp-bg-hover: #2a3048;
    --m2m-pg-comp-border: #545c8c;
    --m2m-pg-comp-border-sub: #646ca6;
    --m2m-pg-comp-text: #e6ebf8;
    --m2m-pg-comp-text-sub: #bcc6e6;
    --m2m-pg-comp-text-muted: #8f97c0;
    --m2m-pg-comp-text-disabled: #5c6490;

    --m2m-pg-secondary-bg: #0b9ee0;
    --m2m-pg-secondary-text: #ffffff;
    --m2m-pg-skeleton-base: #262a44;
    --m2m-pg-skeleton-shine: #31365c;
  }
}
```

**커스터마이즈** — 위 블록을 전부 넣을 필요는 없고, **바꿀 변수만** 재선언하면 됩니다.

```css
:root {
  --m2m-pg-brand: #ff5a00; /* 브랜드만 오렌지로 */
  --m2m-font-size: 15px; /* 전역 약간 축소 */
}
.compact-panel {
  --m2m-font-size: 13px; /* 특정 영역만 더 작게 */
}
```

> `<html data-theme="dark">` / `data-theme="light"` 로 강제 전환, 아무것도 없으면
> `prefers-color-scheme` 로 자동. SCSS `$map` → `:root { … }` 로 emit 하는 자체 패턴을 써도 됩니다.
> 라이브러리는 SCSS API 를 노출하지 않고 오직 `--m2m-*` **CSS 변수 계약**만 공개합니다.

### 1.4 Dialog / Toast — 명령형 호출

두 컴포넌트는 앱 최상단에 **Provider 를 한 번** 배치한 뒤, 어디서든 함수로 호출합니다.
`Toast` 의 default export 는 `ToastProvider` 입니다.

```tsx
// App.tsx — Provider 배치 (앱에서 딱 한 번)
import ToastProvider from 'm2m-uiux-react/Toast'
import {DialogProvider} from 'm2m-uiux-react/Dialog'

export function Root() {
  return (
    <ToastProvider position="top-right" maxCount={5}>
      <DialogProvider>
        <App />
      </DialogProvider>
    </ToastProvider>
  )
}
```

```ts
// 어디서든 — Toast
import {showToast, dismissToast, TOAST_TYPE} from 'm2m-uiux-react/Toast'

async function save() {
  try {
    await api.save()
    showToast({type: TOAST_TYPE['SUCCESS'], message: '저장되었습니다.', duration: 3000})
  } catch {
    showToast({type: TOAST_TYPE['ERROR'], message: '저장에 실패했습니다.'})
  }
}
```

```tsx
// 어디서든 — Dialog
import {openDialog, closeDialog, confirmDialog, alertDialog, DIALOG_TONE} from 'm2m-uiux-react/Dialog'

// 1) 임의 콘텐츠 모달 — id 를 반환. content 는 ReactNode.
//    - 단순 텍스트면 문자열 그대로:            content: '내용'  (텍스트로 렌더, 이스케이프됨)
//    - 마크업이 필요하면 JSX 또는 컴포넌트:     content: <p>내용</p>  /  content: <DetailCard userId={3} />
//    - HTML 문자열('<b>제목</b>')은 파싱 안 됨 (dangerouslySetInnerHTML 미사용, XSS 방지). 반드시 JSX/컴포넌트로.
const id = openDialog({title: '상세', content: '내용', size: 'lg'})
closeDialog(id)

// 2) 확인 — Promise<boolean>
if (
  await confirmDialog({
    title: '삭제 확인',
    message: '3개 항목을 삭제할까요?',
    tone: DIALOG_TONE['DANGER'],
    confirmText: '삭제'
  })
) {
  await api.remove()
}

// 3) 알림 — Promise<void>
await alertDialog({message: '저장되었습니다.'})
```

- 명령형 export: **Toast** = `showToast` · `dismissToast` · `clearToasts`,
  **Dialog** = `openDialog` · `closeDialog` · `closeAllDialogs` · `confirmDialog` · `alertDialog`.
- 선언형도 지원: `<Dialog open={open} onClose={…}>` (Provider 불필요).

### 1.5 SSR (Next.js App Router / Remix 등)

CSR(Vite) 기준으로 만들었지만 SSR 에서도 동작합니다. 주의점:

- **`style.css` 는 서버/클라 공통으로 1회 import** — Next.js `app/layout.tsx` 최상단에서
  `import 'm2m-uiux-react/style.css'`. 토큰(`:root`)이 first paint 에 포함되어 FOUC 가 없습니다.
- **`'use client'`** — 상태/이펙트/포탈을 쓰는 컴포넌트(대부분)는 클라이언트 컴포넌트입니다.
  래핑 파일에 `'use client'` 를 선언하거나, `Button` 처럼 순수 표현 컴포넌트만 서버에서 렌더하세요.
- **Provider 는 클라이언트 경계 안에서** — `ToastProvider` / `DialogProvider` 는 `createPortal` +
  `useSyncExternalStore` 를 쓰므로 `'use client'` 파일에 둡니다. 서버 스냅샷은 빈 배열을 반환해
  하이드레이션 불일치가 없습니다.
- **`document` 접근** — 포탈 컴포넌트는 마운트 후에만 `document.body` 에 렌더하므로 서버에서
  `document is not defined` 가 나지 않습니다.
- **다크 모드 FOUC 방지** — `data-theme` 를 서버에서 `<html>` 에 심거나 `<head>` 인라인 스크립트로
  하이드레이션 전에 설정하세요. 미설정 시 `prefers-color-scheme` 로 동작합니다.

### 1.6 주의사항

```tsx
// ✅ style.css 는 앱 엔트리에서 딱 한 번
import 'm2m-uiux-react/style.css'
// ❌ 컴포넌트마다 import 하지 말 것 (중복 주입)
```

- **`:root` 토큰을 앱에서 재선언하지 않아도** `style.css` 의 기본값(딥 네이비)으로 동작합니다.
  프로젝트 색으로 바꾸려면 1.3 블록을 앱 CSS 에 넣고 원하는 변수만 수정하세요.
- **`Chart`** 는 `recharts` 를 external dependency 로 씁니다 — `npm install` 시 자동 설치되며
  별도 CSS import 불필요.
- 입력 계열은 제어 컴포넌트 — `value` 를 주면 `onChange` 도 함께 줘야 합니다.
- 클래스 추가는 네이티브 `className` 대신 **`classNames?: string | string[]`** prop 을 씁니다.
- **`error?: boolean | string`** — 입력 계열은 `boolean`(상태) 또는 `string`(하단 메시지) 모두 허용.
- `TestComponent` 서브패스는 내부 테스트용이므로 사용하지 마세요.

---

## 2. 컴포넌트 추가 (컴포넌트 작업자(UX팀))

새 컴포넌트 1개 = `src/components/<Name>/` 폴더 + 아래 파일. `<Name>` 은 PascalCase.
**시각 디자인·props·상수명은 `m2m-uiux-vue` 와 픽셀·1:1** 이어야 합니다 (확장자만 `.tsx`).

### 2.1 컴포넌트 디렉토리 — 파일명 규칙

```
src/components/<Name>/
  <Name>.tsx           # 본문 컴포넌트. forwardRef + 컴파운드는 Object.assign(Root, { Item }).
  <Name>.type.ts       # 모든 타입/인터페이스. import 는 ~/ 절대경로.
  <Name>.constant.ts   # 값 상수 (Object.freeze) — <NAME>_VARIANT, <NAME>_SIZE, <NAME>_DEFAULT …
  <Name>.module.scss   # 스타일. 루트 .bs<Name>, 하위 .bs<Name><Element>. Tailwind 금지, rem()/typo() 사용.
  index.ts             # 진입점 (아래). 첫 줄 import '~/assets/styles/tokens.css'.
  README.md            # 사용 예시.
  <Name>.test.tsx      # @testing-library/react 테스트.
```

- 스토어형(Toast/Dialog): `<Name>.store.ts`(`useSyncExternalStore`) + `<Name>Provider` 추가.
- `index.ts` 템플릿 — `export {X}` (기존 `import {X} from` 서비스 호환) 와 `export default X` 를 **둘 다** 둡니다.

  ```ts
  import '~/assets/styles/tokens.css'
  import {Xxx} from '~/components/Xxx/Xxx'

  export {Xxx}
  export default Xxx
  export {XXX_VARIANT, XXX_SIZE, XXX_DEFAULT} from '~/components/Xxx/Xxx.constant'
  export type {XxxProps} from '~/components/Xxx/Xxx.type'
  ```

  예외 — `Toast` 의 default 는 `ToastProvider`, `Dialog` 의 default 는 `Dialog`(named 로 `DialogProvider`).

### 2.2 3군데 등록 (필수)

| #   | 파일                  | 무엇을                                                                                    |
| --- | --------------------- | ----------------------------------------------------------------------------------------- |
| 1   | `vite.config.ts`      | `entries` 객체에 한 줄 + `vite-plugin-dts` 의 `include` 배열에 `src/components/<Name>/**` |
| 2   | `package.json`        | `exports` 에 `"./<Name>"` 블록 추가 (types / import / require)                            |
| 3   | `tsconfig.build.json` | 자동 — `include: ["src"]`, `exclude` 에 test/demo 뿐이라 개별 등재 불필요                 |

```ts
// 1a) vite.config.ts — entries 객체 (라이브러리 진입점 = 서브패스 = dist 파일명)
const entries = {
  Button: fileURLToPath(new URL('./src/components/Button/index.ts', import.meta.url)),
  // …
  MyNewComponent: fileURLToPath(new URL('./src/components/MyNewComponent/index.ts', import.meta.url)) // ← 추가
}

// 1b) vite.config.ts — dts({ include: [ … ] }) 에도 추가
include: [
  'src/components/Button/**',
  // …
  'src/components/MyNewComponent/**', // ← 추가
  'src/scss-modules.d.ts'
]
```

```jsonc
// 2) package.json — exports (기존 블록과 동일 형태로 한 덩어리 추가)
"./MyNewComponent": {
  "types": "./dist/MyNewComponent/index.d.ts",
  "import": "./dist/MyNewComponent.js",
  "require": "./dist/MyNewComponent.cjs"
}
```

- 외부 라이브러리를 새로 쓰면: `vite.config.ts` 의 `rollupOptions.external` pkgs 배열 + `package.json` 의 `dependencies` **둘 다** 등록.
- 데모 페이지도 추가: `src/demo/pages/<Name>Page.tsx` + `src/demo/pages/index.ts` 의 `PAGES` · `NAV_GROUPS`.

### 2.3 배포 — 커밋명 & 파이프라인 가이드

**커밋 규칙 (Conventional Commits → semantic-release)**

| 커밋 접두                                     | 버전 bump             | 예                                    |
| --------------------------------------------- | --------------------- | ------------------------------------- |
| `fix: …`                                      | **patch** (0.0.**x**) | `fix(Dialog): 스크롤바 gap 보정 제거` |
| `feat: …`                                     | **minor** (0.**x**.0) | `feat(Chart): radar 차트 추가`        |
| `feat!: …` 또는 본문 `BREAKING CHANGE:`       | **major** (**x**.0.0) | props 시그니처 변경 등                |
| `docs:` `chore:` `refactor:` `test:` `style:` | 릴리스 없음           | README·설정·리팩터                    |

**`main` 에 push(또는 MR merge)하면** GitLab CI 가 순서대로 실행됩니다.

```yaml
stages:
  - test # npm run lint · npm run type-check · npx vitest run · npm run build
  - publish # npm run build → npx semantic-release (npm publish + GitLab Release + 태그)
  - vercel-release # npx vercel deploy --prod (데모 사이트, needs: test)
```

- `test` 스테이지가 깨지면 배포되지 않으므로, **커밋 트리에 깨지는 테스트/타입 에러가 없어야** 합니다.
- 로컬 사전 검증: `npm run lint && npm run type-check && npx vitest run && npm run build`.

**결과 확인**

| 대상        | 위치                                                              |
| ----------- | ----------------------------------------------------------------- |
| npm         | <https://www.npmjs.com/package/m2m-uiux-react>                    |
| GitLab      | Deploy → Releases                                                 |
| 파이프라인  | Build → Pipelines 의 `release` job 로그 (`semantic-release` 출력) |
| 데모 사이트 | `vercel-release` job 로그의 Production URL                        |

---

## 컴포넌트 목록 (45)

`m2m-uiux-vue` 와 동일. 각 서브패스에서 컴포넌트(default/named) + 값 상수 + 타입을 가져옵니다.

| 그룹     | 컴포넌트                                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 입력     | `Input`(compound) · `Textarea` · `SearchField` · `Select` · `Cascader` · `Checkbox` · `CheckboxGroup` · `Radio` · `RadioGroup` · `Switch` · `Segmented` · `DatePicker` · `TimePicker` |
| 폼       | `Form`(+ `Form.Field` / `Form.Actions`) · `Button` · `ButtonGroup` · `FileUpload` · `ImageUploadPreview` · `RegionPicker` · `Filter`                                                  |
| 데이터   | `Table` · `List` · `ListItem` · `Accordion`(+ `Accordion.Item`) · `Pagination` · `Chart` · `Badge` · `NoData` · `Timeline`                                                            |
| 피드백   | `Dialog` · `ShareSheet` · `Toast` · `Tooltip` · `Loading` · `ProgressBar` · `Steps`                                                                                                   |
| 미디어   | `Image` · `ImagePreview` · `Lightbox` · `Swiper`                                                                                                                                      |
| 레이아웃 | `Grid`(+ `Grid.Item`) · `Header` · `Divider` · `Tabs` · `Breadcrumb` · `Icon`                                                                                                         |

---

## 로컬 개발

```bash
npm run dev          # 데모 SPA (localhost) — Vue 데모와 나란히 비교
npm run build        # vite build(lib) + vite-plugin-dts → dist/
npm run build:demo   # 데모 SPA → build/ (Vercel 배포용)
npm run type-check   # tsc --noEmit
npx vitest run       # 전체 테스트
npx prettier --write "src/**/*.{ts,tsx,scss}"
```
