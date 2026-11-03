import {useState} from 'react'

import Pagination, {PAGINATION_SIZE} from '~/components/Pagination'
import type {PaginationProps} from '~/components/Pagination'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['기본', 'total', 'siblingCount', 'showTotal', 'size', 'disabled', 'classNames']

function Live(props: Omit<PaginationProps, 'page' | 'onChange'>) {
  const [page, setPage] = useState(1)
  return <Pagination {...props} page={page} onChange={setPage} />
}

export function PaginationPage() {
  const [page, setPage] = useState(5)

  return (
    <>
      <PageHeader title="Pagination" component="Pagination" desc="— 페이지 이동. 페이지가 많으면 … 로 축약합니다." />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === '기본' && (
              <ComponentSection
                title="page / onChange"
                preview={
                  <div className="demo-col">
                    <Pagination page={page} totalPages={7} onChange={setPage} />
                    <span className="demo-hint">현재 페이지: {page}</span>
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import Pagination from 'm2m-uiux-react/Pagination'",
                  '',
                  'export function Example() {',
                  '  const [page, setPage] = useState(1)',
                  '  return <Pagination page={page} totalPages={7} onChange={setPage} />',
                  '}'
                ]}
              />
            )}

            {tab === 'total' && (
              <ComponentSection
                title="total / pageSize — 페이지 수 계산"
                preview={<Live totalPages={13} />}
                code={[
                  "import {useState} from 'react'",
                  "import Pagination from 'm2m-uiux-react/Pagination'",
                  '',
                  'export function Example() {',
                  '  const [page, setPage] = useState(1)',
                  '  return <Pagination page={page} total={128} pageSize={10} onChange={setPage} />',
                  '}'
                ]}
                notes={['13페이지 → 앞뒤 + 현재 주변만 표시, 나머지는 …']}
              />
            )}

            {tab === 'siblingCount' && (
              <ComponentSection
                title="siblingCount — 현재 좌우 페이지 수"
                preview={
                  <div className="demo-col">
                    <Live totalPages={20} siblingCount={0} />
                    <Live totalPages={20} siblingCount={2} />
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import Pagination from 'm2m-uiux-react/Pagination'",
                  '',
                  'export function Example() {',
                  '  const [page, setPage] = useState(1)',
                  '  return <Pagination page={page} totalPages={20} siblingCount={2} onChange={setPage} />',
                  '}'
                ]}
              />
            )}

            {tab === 'showTotal' && (
              <ComponentSection
                title="showTotal"
                preview={
                  <div className="demo-col">
                    <Pagination page={1} total={128} pageSize={10} onChange={() => {}} showTotal />
                    <Pagination
                      page={1}
                      total={128}
                      pageSize={10}
                      onChange={() => {}}
                      showTotal={(t) => `${t}건 중 1–10`}
                    />
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import Pagination from 'm2m-uiux-react/Pagination'",
                  '',
                  'export function Example() {',
                  '  const [page, setPage] = useState(1)',
                  '  return (',
                  '    <>',
                  '      <Pagination page={page} total={128} pageSize={10} onChange={setPage} showTotal />',
                  '      <Pagination page={page} total={128} pageSize={10} onChange={setPage} showTotal={(t) => `${t}건`} />',
                  '    </>',
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
                    <Live totalPages={5} size={PAGINATION_SIZE['SM']} />
                    <Live totalPages={5} size={PAGINATION_SIZE['MD']} />
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import Pagination, {PAGINATION_SIZE} from 'm2m-uiux-react/Pagination'",
                  '',
                  'export function Example() {',
                  '  const [page, setPage] = useState(1)',
                  "  return <Pagination page={page} totalPages={5} size={PAGINATION_SIZE['SM']} onChange={setPage} />",
                  '}'
                ]}
              />
            )}

            {tab === 'disabled' && (
              <ComponentSection
                title="disabled"
                preview={<Pagination page={2} totalPages={5} onChange={() => {}} disabled />}
                code={[
                  "import Pagination from 'm2m-uiux-react/Pagination'",
                  '',
                  'export function Example() {',
                  '  return <Pagination page={2} totalPages={5} onChange={() => {}} disabled />',
                  '}'
                ]}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames"
                preview={<Pagination page={1} totalPages={3} onChange={() => {}} classNames="demo-hint" />}
                code={[
                  "import Pagination from 'm2m-uiux-react/Pagination'",
                  '',
                  'export function Example() {',
                  '  return <Pagination page={1} totalPages={3} onChange={() => {}} classNames="justify-center" />',
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
