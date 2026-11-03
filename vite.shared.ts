// 라이브러리 빌드(vite.config.ts)와 데모 빌드(vite.demo.config.ts)가 공유하는 설정.

// CSS Module 클래스명을 난수 해시 대신 `bs{컴포넌트}{클래스}` 로 고정한다.
//  - `.module.scss` 안에 이미 `.bsXxx` 리터럴로 작성 → 그대로 통과
//  - 상태 클래스(`is-` / `has-` / `use-` 접두)  → 그대로 전역 유지
//  - 아이콘 마스크 `.i-<key>` → 그대로
//  - 나머지(미전환분 대비 fallback)만 `bs<Comp><Pascal>` 로 치환
export function bsScopedName(name: string, filename: string): string {
  if (/^(is|has|use)([-A-Z]|$)/.test(name)) return name
  if (/^bs[A-Z]/.test(name)) return name
  if (/^i-/.test(name)) return name
  const comp = /([^/\\]+)\.module\.scss$/.exec(filename)?.[1] ?? 'X'
  if (name === 'root' || name.toLowerCase() === comp.toLowerCase()) return `bs${comp}`
  const pascal = name.replace(/(^|[-_])([a-z0-9])/g, (_m, _sep, ch: string) => ch.toUpperCase())
  return `bs${comp}${pascal}`
}
