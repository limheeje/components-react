import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

import {bsScopedName} from './vite.shared.ts'

// 데모 앱(`src/demo/*`, `index.html`) 을 일반 SPA 로 빌드해 `build/` 에 넣는다.
// - 라이브러리 빌드(`vite.config.ts` → `dist/`)와 완전히 별개.
// - GitLab CI 의 `vercel-release` 잡이 `npx vercel deploy build` 로 이 폴더를 Vercel 에 정적 업로드한다.
// - 데모 라우팅은 순수 in-memory React state (단일 URL `/`, 딥링크 없음) 이라 Vercel rewrite 불필요.
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: bsScopedName
    }
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1200
  }
})
