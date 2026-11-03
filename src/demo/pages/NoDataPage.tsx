import Button from '~/components/Button'
import Icon from '~/components/Icon'
import NoData, {NO_DATA_TYPE} from '~/components/NoData'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['icon', 'title', 'description', 'action', 'type', 'classNames']

export function NoDataPage() {
  return (
    <>
      <PageHeader title="NoData" component="NoData" desc="— 데이터가 없을 때 표시하는 빈 상태 컴포넌트." />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'icon' && (
              <>
                <ComponentSection
                  title="icon — 기본 (Inbox)"
                  preview={<NoData icon={<Icon name="inbox" size={40} />} title="데이터가 없습니다" />}
                  code={[
                    "import NoData from 'm2m-uiux-react/NoData'",
                    "import Icon from 'm2m-uiux-react/Icon'",
                    '',
                    'export function Example() {',
                    '  return <NoData icon={<Icon name="inbox" />} title="데이터가 없습니다" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="icon — 검색 결과 없음"
                  preview={<NoData icon={<Icon name="search" size={40} />} title="검색 결과가 없습니다" />}
                  code={[
                    "import NoData from 'm2m-uiux-react/NoData'",
                    "import Icon from 'm2m-uiux-react/Icon'",
                    '',
                    'export function Example() {',
                    '  return <NoData icon={<Icon name="search" />} title="검색 결과가 없습니다" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="icon — 파일 없음"
                  preview={<NoData icon={<Icon name="file-x" size={40} />} title="파일이 없습니다" />}
                  code={[
                    "import NoData from 'm2m-uiux-react/NoData'",
                    "import Icon from 'm2m-uiux-react/Icon'",
                    '',
                    'export function Example() {',
                    '  return <NoData icon={<Icon name="file-x" />} title="파일이 없습니다" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="icon 없음"
                  preview={<NoData icon={null} title="데이터가 없습니다" />}
                  code={[
                    "import NoData from 'm2m-uiux-react/NoData'",
                    '',
                    'export function Example() {',
                    '  return <NoData icon={null} title="데이터가 없습니다" />',
                    '}'
                  ]}
                  notes={['icon={null} 을 전달하면 프리셋 아이콘도 표시하지 않습니다']}
                />
              </>
            )}

            {tab === 'title' && (
              <ComponentSection
                title="title — 주요 텍스트"
                preview={<NoData icon={<Icon name="inbox" size={40} />} title="등록된 항목이 없습니다" />}
                code={[
                  "import NoData from 'm2m-uiux-react/NoData'",
                  '',
                  'export function Example() {',
                  '  return <NoData title="등록된 항목이 없습니다" />',
                  '}'
                ]}
              />
            )}

            {tab === 'description' && (
              <ComponentSection
                title="description — 부가 설명"
                preview={
                  <NoData
                    icon={<Icon name="inbox" size={40} />}
                    title="등록된 항목이 없습니다"
                    description="새로운 항목을 추가해 시작해보세요."
                  />
                }
                code={[
                  "import NoData from 'm2m-uiux-react/NoData'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <NoData',
                  '      title="등록된 항목이 없습니다"',
                  '      description="새로운 항목을 추가해 시작해보세요."',
                  '    />',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'action' && (
              <ComponentSection
                title="action — 버튼 추가"
                preview={
                  <NoData
                    icon={<Icon name="inbox" size={40} />}
                    title="데이터가 없습니다"
                    description="아래 버튼으로 새 항목을 추가하세요."
                    action={<Button size="sm">+ 새 항목 추가</Button>}
                  />
                }
                code={[
                  "import NoData from 'm2m-uiux-react/NoData'",
                  "import Button from 'm2m-uiux-react/Button'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <NoData',
                  '      title="데이터가 없습니다"',
                  '      description="새 항목을 추가하세요."',
                  '      action={<Button onClick={handleAdd}>+ 새 항목 추가</Button>}',
                  '    />',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'type' && (
              <>
                <ComponentSection
                  title='type="empty" (기본)'
                  preview={<NoData type={NO_DATA_TYPE['EMPTY']} />}
                  code={[
                    "import NoData, {NO_DATA_TYPE} from 'm2m-uiux-react/NoData'",
                    '',
                    'export function Example() {',
                    "  return <NoData type={NO_DATA_TYPE['EMPTY']} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='type="search"'
                  preview={<NoData type={NO_DATA_TYPE['SEARCH']} />}
                  code={[
                    "import NoData, {NO_DATA_TYPE} from 'm2m-uiux-react/NoData'",
                    '',
                    'export function Example() {',
                    "  return <NoData type={NO_DATA_TYPE['SEARCH']} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='type="danger"'
                  preview={<NoData type={NO_DATA_TYPE['DANGER']} onRetry={() => {}} />}
                  code={[
                    "import NoData, {NO_DATA_TYPE} from 'm2m-uiux-react/NoData'",
                    '',
                    'export function Example() {',
                    "  return <NoData type={NO_DATA_TYPE['DANGER']} onRetry={() => location.reload()} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={<NoData classNames="demo-hint" icon={<Icon name="inbox" size={40} />} title="데이터 없음" />}
                code={[
                  "import NoData from 'm2m-uiux-react/NoData'",
                  '',
                  'export function Example() {',
                  '  return <NoData classNames="min-h-[200px]" title="데이터 없음" />',
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
