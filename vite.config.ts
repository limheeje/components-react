/// <reference types="vitest/config" />
import {existsSync} from 'node:fs'
import {cp, readdir, readFile, rm, writeFile} from 'node:fs/promises'
import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

import {bsScopedName} from './vite.shared.ts'

// 소스는 형제/타 컴포넌트도 `~/components/<X>/...` 절대경로로 import 한다. vite-plugin-dts 가
// 방출한 .d.ts 는 이를 `../../../components/<X>/...` 로 남겨 flatten 후 깨지므로:
//  - 현재 컴포넌트(<name>) 참조  → `./`      (같은 폴더)
//  - 다른 컴포넌트(<X>) 참조     → `../<X>/`  (flatten 후 형제 디렉터리)
async function rewriteDtsImports(dir: string, name: string) {
  const re = /(from\s+['"]|import\(['"])(?:~\/|(?:\.\.\/)+)components\/([A-Za-z0-9_-]+)\//g
  for (const file of await readdir(dir)) {
    if (!file.endsWith('.d.ts')) continue
    const path = `${dir}/${file}`
    const src = await readFile(path, 'utf8')
    const out = src.replace(re, (_m, prefix: string, comp: string) =>
      comp === name ? `${prefix}./` : `${prefix}../${comp}/`
    )
    if (out !== src) await writeFile(path, out)
  }
}

// vite-plugin-dts 는 선언 파일을 dist/src/components/<Name>/ 에 방출한다.
// package.json exports 의 types 경로(dist/<Name>/index.d.ts)에 맞게 한 단계 끌어올린다.
async function flattenDts() {
  const nested = fileURLToPath(new URL('./dist/src/components', import.meta.url))
  if (!existsSync(nested)) return
  for (const name of await readdir(nested)) {
    const dest = fileURLToPath(new URL(`./dist/${name}`, import.meta.url))
    await cp(`${nested}/${name}`, dest, {recursive: true})
    await rewriteDtsImports(dest, name)
  }
  await rm(fileURLToPath(new URL('./dist/src', import.meta.url)), {recursive: true, force: true})
}

// 라이브러리 진입점: 여기에 한 줄 추가하면 새 컴포넌트가 서브패스로 노출됩니다.
// key = 서브패스(m2m-uiux-react/<key>) = dist 파일명. 접두어 없이 선언한다.
const entries = {
  Button: fileURLToPath(new URL('./src/components/Button/index.ts', import.meta.url)),
  Input: fileURLToPath(new URL('./src/components/Input/index.ts', import.meta.url)),
  Select: fileURLToPath(new URL('./src/components/Select/index.ts', import.meta.url)),
  Cascader: fileURLToPath(new URL('./src/components/Cascader/index.ts', import.meta.url)),
  Checkbox: fileURLToPath(new URL('./src/components/Checkbox/index.ts', import.meta.url)),
  Radio: fileURLToPath(new URL('./src/components/Radio/index.ts', import.meta.url)),
  Switch: fileURLToPath(new URL('./src/components/Switch/index.ts', import.meta.url)),
  Textarea: fileURLToPath(new URL('./src/components/Textarea/index.ts', import.meta.url)),
  Divider: fileURLToPath(new URL('./src/components/Divider/index.ts', import.meta.url)),
  Badge: fileURLToPath(new URL('./src/components/Badge/index.ts', import.meta.url)),
  Tooltip: fileURLToPath(new URL('./src/components/Tooltip/index.ts', import.meta.url)),
  Loading: fileURLToPath(new URL('./src/components/Loading/index.ts', import.meta.url)),
  ProgressBar: fileURLToPath(new URL('./src/components/ProgressBar/index.ts', import.meta.url)),
  Icon: fileURLToPath(new URL('./src/components/Icon/index.ts', import.meta.url)),
  NoData: fileURLToPath(new URL('./src/components/NoData/index.ts', import.meta.url)),
  Breadcrumb: fileURLToPath(new URL('./src/components/Breadcrumb/index.ts', import.meta.url)),
  Tabs: fileURLToPath(new URL('./src/components/Tabs/index.ts', import.meta.url)),
  Segmented: fileURLToPath(new URL('./src/components/Segmented/index.ts', import.meta.url)),
  Accordion: fileURLToPath(new URL('./src/components/Accordion/index.ts', import.meta.url)),
  Toast: fileURLToPath(new URL('./src/components/Toast/index.ts', import.meta.url)),
  List: fileURLToPath(new URL('./src/components/List/index.ts', import.meta.url)),
  ListItem: fileURLToPath(new URL('./src/components/ListItem/index.ts', import.meta.url)),
  Steps: fileURLToPath(new URL('./src/components/Steps/index.ts', import.meta.url)),
  SearchField: fileURLToPath(new URL('./src/components/SearchField/index.ts', import.meta.url)),
  Pagination: fileURLToPath(new URL('./src/components/Pagination/index.ts', import.meta.url)),
  TimePicker: fileURLToPath(new URL('./src/components/TimePicker/index.ts', import.meta.url)),
  DatePicker: fileURLToPath(new URL('./src/components/DatePicker/index.ts', import.meta.url)),
  ButtonGroup: fileURLToPath(new URL('./src/components/ButtonGroup/index.ts', import.meta.url)),
  CheckboxGroup: fileURLToPath(new URL('./src/components/CheckboxGroup/index.ts', import.meta.url)),
  RadioGroup: fileURLToPath(new URL('./src/components/RadioGroup/index.ts', import.meta.url)),
  FileUpload: fileURLToPath(new URL('./src/components/FileUpload/index.ts', import.meta.url)),
  UploadedFileList: fileURLToPath(new URL('./src/components/UploadedFileList/index.ts', import.meta.url)),
  ImageUploadPreview: fileURLToPath(new URL('./src/components/ImageUploadPreview/index.ts', import.meta.url)),
  Image: fileURLToPath(new URL('./src/components/Image/index.ts', import.meta.url)),
  Header: fileURLToPath(new URL('./src/components/Header/index.ts', import.meta.url)),
  Grid: fileURLToPath(new URL('./src/components/Grid/index.ts', import.meta.url)),
  Lightbox: fileURLToPath(new URL('./src/components/Lightbox/index.ts', import.meta.url)),
  Timeline: fileURLToPath(new URL('./src/components/Timeline/index.ts', import.meta.url)),
  ImagePreview: fileURLToPath(new URL('./src/components/ImagePreview/index.ts', import.meta.url)),
  Table: fileURLToPath(new URL('./src/components/Table/index.ts', import.meta.url)),
  Swiper: fileURLToPath(new URL('./src/components/Swiper/index.ts', import.meta.url)),
  Chart: fileURLToPath(new URL('./src/components/Chart/index.ts', import.meta.url)),
  Form: fileURLToPath(new URL('./src/components/Form/index.ts', import.meta.url)),
  Dialog: fileURLToPath(new URL('./src/components/Dialog/index.ts', import.meta.url)),
  ShareSheet: fileURLToPath(new URL('./src/components/ShareSheet/index.ts', import.meta.url)),
  RegionPicker: fileURLToPath(new URL('./src/components/RegionPicker/index.ts', import.meta.url)),
  Filter: fileURLToPath(new URL('./src/components/Filter/index.ts', import.meta.url))
}

// https://vite.dev/config/
export default defineConfig({
  css: {
    modules: {
      generateScopedName: bsScopedName
    }
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      // 배포 대상은 각 컴포넌트 폴더뿐. 데모 프리뷰(src/demo)는 제외.
      include: [
        'src/components/Button/**',
        'src/components/Input/**',
        'src/components/Select/**',
        'src/components/Cascader/**',
        'src/components/Checkbox/**',
        'src/components/Radio/**',
        'src/components/Switch/**',
        'src/components/Textarea/**',
        'src/components/Divider/**',
        'src/components/Badge/**',
        'src/components/Tooltip/**',
        'src/components/Loading/**',
        'src/components/ProgressBar/**',
        'src/components/Icon/**',
        'src/components/NoData/**',
        'src/components/Breadcrumb/**',
        'src/components/Tabs/**',
        'src/components/Segmented/**',
        'src/components/Accordion/**',
        'src/components/Toast/**',
        'src/components/List/**',
        'src/components/ListItem/**',
        'src/components/Steps/**',
        'src/components/SearchField/**',
        'src/components/Pagination/**',
        'src/components/TimePicker/**',
        'src/components/DatePicker/**',
        'src/components/ButtonGroup/**',
        'src/components/CheckboxGroup/**',
        'src/components/RadioGroup/**',
        'src/components/FileUpload/**',
        'src/components/UploadedFileList/**',
        'src/components/ImageUploadPreview/**',
        'src/components/Image/**',
        'src/components/Header/**',
        'src/components/Grid/**',
        'src/components/Lightbox/**',
        'src/components/Timeline/**',
        'src/components/ImagePreview/**',
        'src/components/Table/**',
        'src/components/Swiper/**',
        'src/components/Chart/**',
        'src/components/Form/**',
        'src/components/Dialog/**',
        'src/components/ShareSheet/**',
        'src/components/RegionPicker/**',
        'src/components/Filter/**',
        'src/scss-modules.d.ts'
      ],
      exclude: ['src/**/*.test.*', 'src/test/**', 'src/demo/**'],
      outDir: 'dist',
      entryRoot: 'src',
      afterBuild: flattenDts
    })
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    copyPublicDir: false,
    cssCodeSplit: false,
    lib: {
      entry: entries,
      formats: ['es', 'cjs'],
      // 컴포넌트 스타일 + 디자인 토큰(:root) 전부 dist/style.css 하나로 방출.
      // 소비 측에서 `import 'm2m-uiux-react/style.css'` 한 번만 하면 된다.
      cssFileName: 'style',
      fileName: (format, entryName) => (format === 'es' ? `${entryName}.js` : `${entryName}.cjs`)
    },
    rollupOptions: {
      output: {exports: 'named'},
      external: (id) => {
        if (/\.css$/.test(id)) return false
        // react* 는 peer, recharts 는 package.json "dependencies" 로 소비자에게 전이 설치된다.
        const pkgs = ['react', 'react-dom', 'react/jsx-runtime', 'recharts']
        return pkgs.some((p) => id === p || id.startsWith(`${p}/`))
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/components/**/*.test.{ts,tsx}']
  }
})
