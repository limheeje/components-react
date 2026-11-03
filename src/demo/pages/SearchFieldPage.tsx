import {useState} from 'react'

import SearchField, {SEARCH_FIELD_SIZE} from '~/components/SearchField'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['기본', 'onSearch', 'size', 'clearable', 'loading', 'disabled', 'classNames']

export function SearchFieldPage() {
  const [q, setQ] = useState('')
  const [last, setLast] = useState('')

  return (
    <>
      <PageHeader
        title="SearchField"
        component="SearchField"
        desc="— 검색 전용 입력. 좌측 돋보기 버튼 + 우측 지우기(X) 내장."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === '기본' && (
              <ComponentSection
                title="value / onChange (제어)"
                preview={
                  <div className="demo-col">
                    <SearchField value={q} onChange={(e) => setQ(e.target.value)} />
                    <span className="demo-hint">입력값: {q || '(빈 값)'}</span>
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import SearchField from 'm2m-uiux-react/SearchField'",
                  '',
                  'export function Example() {',
                  "  const [q, setQ] = useState('')",
                  '  return <SearchField value={q} onChange={(e) => setQ(e.target.value)} />',
                  '}'
                ]}
              />
            )}

            {tab === 'onSearch' && (
              <ComponentSection
                title="onSearch — Enter / 돋보기 버튼"
                preview={
                  <div className="demo-col">
                    <SearchField placeholder="검색 후 Enter" onSearch={(v) => setLast(v)} />
                    <span className="demo-hint">마지막 검색: {last || '(없음)'}</span>
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import SearchField from 'm2m-uiux-react/SearchField'",
                  '',
                  'export function Example() {',
                  "  const [q, setQ] = useState('')",
                  '  return (',
                  '    <SearchField',
                  '      value={q}',
                  '      onChange={(e) => setQ(e.target.value)}',
                  "      onSearch={(value) => console.log('검색:', value)}",
                  '    />',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'size' && (
              <ComponentSection
                title="size"
                preview={
                  <div className="demo-col">
                    <SearchField size={SEARCH_FIELD_SIZE['SM']} placeholder="sm" />
                    <SearchField size={SEARCH_FIELD_SIZE['MD']} placeholder="md" />
                    <SearchField size={SEARCH_FIELD_SIZE['LG']} placeholder="lg" />
                  </div>
                }
                code={[
                  "import SearchField, {SEARCH_FIELD_SIZE} from 'm2m-uiux-react/SearchField'",
                  '',
                  'export function Example() {',
                  "  return <SearchField size={SEARCH_FIELD_SIZE['LG']} />",
                  '}'
                ]}
              />
            )}

            {tab === 'clearable' && (
              <ComponentSection
                title="clearable"
                preview={
                  <div className="demo-col">
                    <SearchField defaultValue="지우기 버튼" />
                    <SearchField defaultValue="clearable=false" clearable={false} />
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import SearchField from 'm2m-uiux-react/SearchField'",
                  '',
                  'export function Example() {',
                  "  const [q, setQ] = useState('검색어')",
                  '  return (',
                  "    <SearchField value={q} onChange={(e) => setQ(e.target.value)} clearable onClear={() => setQ('')} />",
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'loading' && (
              <ComponentSection
                title="loading — 돋보기 자리에 스피너"
                preview={<SearchField loading defaultValue="검색 중…" />}
                code={[
                  "import {useState} from 'react'",
                  "import SearchField from 'm2m-uiux-react/SearchField'",
                  '',
                  'export function Example() {',
                  '  const [isSearching] = useState(true)',
                  '  return <SearchField loading={isSearching} />',
                  '}'
                ]}
              />
            )}

            {tab === 'disabled' && (
              <ComponentSection
                title="disabled"
                preview={<SearchField disabled defaultValue="비활성" />}
                code={[
                  "import SearchField from 'm2m-uiux-react/SearchField'",
                  '',
                  'export function Example() {',
                  '  return <SearchField disabled />',
                  '}'
                ]}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames"
                preview={<SearchField classNames="demo-hint" placeholder="커스텀" />}
                code={[
                  "import SearchField from 'm2m-uiux-react/SearchField'",
                  '',
                  'export function Example() {',
                  '  return <SearchField classNames="w-full" />',
                  '}'
                ]}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
