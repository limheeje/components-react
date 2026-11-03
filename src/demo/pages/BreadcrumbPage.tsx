import Breadcrumb, {BREADCRUMB_SIZE} from '~/components/Breadcrumb'
import {Icon} from '~/components/Icon'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['items', 'separator', 'maxItems', 'size', 'icon']

const SHOP = [
  {label: '홈', href: '/'},
  {label: '카테고리', href: '/category'},
  {label: '전자제품', href: '/category/electronics'},
  {label: '스마트폰', href: '/category/electronics/phone'},
  {label: 'iPhone 15 Pro'}
]

const ADMIN = [{label: '대시보드', href: '/'}, {label: '회원 관리', href: '/members'}, {label: '회원 상세'}]

const ICON_ITEMS = [
  {label: '홈', href: '/', icon: <Icon name="home" size={13} />},
  {label: '프로젝트', href: '/projects', icon: <Icon name="folder" size={13} />},
  {label: '컴포넌트', href: '/components', icon: <Icon name="folder" size={13} />},
  {label: 'Button.tsx', icon: <Icon name="file" size={13} />}
]

const dim = {color: 'var(--m2m-pg-comp-text-disabled)'}

export function BreadcrumbPage() {
  return (
    <>
      <PageHeader
        title="Breadcrumb"
        component="Breadcrumb"
        desc="— 현재 페이지의 경로를 계층적으로 보여주는 내비게이션 컴포넌트."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'items' && (
              <>
                <ComponentSection
                  title="items — 경로 배열"
                  preview={<Breadcrumb items={SHOP} />}
                  code={[
                    "import Breadcrumb from 'm2m-uiux-react/Breadcrumb'",
                    '',
                    'export function Example() {',
                    '  const items = [',
                    "    { label: '홈', href: '/' },",
                    "    { label: '카테고리', href: '/category' },",
                    "    { label: '전자제품', href: '/category/electronics' },",
                    "    { label: 'iPhone 15 Pro' }, // 마지막 항목: href 없음",
                    '  ]',
                    '  return <Breadcrumb items={items} />',
                    '}'
                  ]}
                  notes={['마지막 항목은 현재 페이지, href 없이 굵게 표시됩니다']}
                />
                <ComponentSection
                  title="관리자 2단계 경로"
                  preview={<Breadcrumb items={ADMIN} />}
                  code={[
                    "import Breadcrumb from 'm2m-uiux-react/Breadcrumb'",
                    '',
                    'export function Example() {',
                    '  const items = [',
                    "    { label: '대시보드', href: '/' },",
                    "    { label: '회원 관리', href: '/members' },",
                    "    { label: '회원 상세' },",
                    '  ]',
                    '  return <Breadcrumb items={items} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'separator' && (
              <>
                <ComponentSection
                  title="separator (기본) — chevron 아이콘"
                  preview={<Breadcrumb items={ADMIN} />}
                  code={[
                    "import Breadcrumb from 'm2m-uiux-react/Breadcrumb'",
                    '',
                    'export function Example() {',
                    "  const items = [{ label: '대시보드', href: '/' }, { label: '회원 상세' }]",
                    '  return <Breadcrumb items={items} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title='separator="/" — Slash 문자'
                  preview={<Breadcrumb items={ADMIN} separator="/" />}
                  code={[
                    "import Breadcrumb from 'm2m-uiux-react/Breadcrumb'",
                    '',
                    'export function Example() {',
                    "  const items = [{ label: '대시보드', href: '/' }, { label: '회원 상세' }]",
                    '  return <Breadcrumb items={items} separator="/" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="separator — Slash 아이콘"
                  preview={<Breadcrumb items={ADMIN} separator={<Icon name="slash" size={12} style={dim} />} />}
                  code={[
                    "import Breadcrumb from 'm2m-uiux-react/Breadcrumb'",
                    "import Icon from 'm2m-uiux-react/Icon'",
                    '',
                    'export function Example() {',
                    "  const items = [{ label: '대시보드', href: '/' }, { label: '회원 상세' }]",
                    '  return <Breadcrumb items={items} separator={<Icon name="slash" size={12} />} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title='separator="›" — 화살표 문자'
                  preview={<Breadcrumb items={ADMIN} separator="›" />}
                  code={[
                    "import Breadcrumb from 'm2m-uiux-react/Breadcrumb'",
                    '',
                    'export function Example() {',
                    "  const items = [{ label: '대시보드', href: '/' }, { label: '회원 상세' }]",
                    '  return <Breadcrumb items={items} separator="›" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title='separator="·" — 점'
                  preview={<Breadcrumb items={ADMIN} separator="·" />}
                  code={[
                    "import Breadcrumb from 'm2m-uiux-react/Breadcrumb'",
                    '',
                    'export function Example() {',
                    "  const items = [{ label: '대시보드', href: '/' }, { label: '회원 상세' }]",
                    '  return <Breadcrumb items={items} separator="·" />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'maxItems' && (
              <>
                <ComponentSection
                  title="maxItems={3} — 중간 항목 자동 축약 (··· 버튼 클릭 시 펼침)"
                  preview={<Breadcrumb items={SHOP} maxItems={3} />}
                  code={[
                    "import Breadcrumb from 'm2m-uiux-react/Breadcrumb'",
                    '',
                    'export function Example() {',
                    '  const items = [',
                    "    { label: '홈', href: '/' },",
                    "    { label: '카테고리', href: '/category' },",
                    "    { label: '전자제품', href: '/category/electronics' },",
                    "    { label: '스마트폰', href: '/category/electronics/phone' },",
                    "    { label: 'iPhone 15 Pro' },",
                    '  ]',
                    '  return <Breadcrumb items={items} maxItems={3} />',
                    '}'
                  ]}
                  notes={[
                    '항목이 maxItems 를 초과하면 중간을 ··· 버튼으로 축약합니다',
                    '··· 클릭 시 전체 경로가 펼쳐집니다',
                    '첫 항목과 마지막 2개는 항상 노출'
                  ]}
                />
                <ComponentSection
                  title="maxItems 없음 (기본) — 전체 표시"
                  preview={<Breadcrumb items={SHOP} />}
                  code={[
                    "import Breadcrumb from 'm2m-uiux-react/Breadcrumb'",
                    '',
                    'export function Example() {',
                    '  const items = [/* ... 5개 항목 ... */]',
                    '  return <Breadcrumb items={items} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'size' &&
              (['SM', 'MD', 'LG'] as const).map((s) => (
                <ComponentSection
                  key={s}
                  title={`size="${BREADCRUMB_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''}`}
                  preview={<Breadcrumb items={ADMIN} size={BREADCRUMB_SIZE[s]} />}
                  code={[
                    "import Breadcrumb, {BREADCRUMB_SIZE} from 'm2m-uiux-react/Breadcrumb'",
                    '',
                    'export function Example() {',
                    "  const items = [{ label: '대시보드', href: '/' }, { label: '회원 상세' }]",
                    `  return <Breadcrumb size={BREADCRUMB_SIZE['${s}']} items={items} />`,
                    '}'
                  ]}
                />
              ))}

            {tab === 'icon' && (
              <ComponentSection
                title="icon — 항목별 아이콘"
                preview={<Breadcrumb items={ICON_ITEMS} />}
                code={[
                  "import Breadcrumb from 'm2m-uiux-react/Breadcrumb'",
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'export function Example() {',
                  '  const items = [',
                  "    { label: '홈', href: '/', icon: <Icon name=\"home\" /> },",
                  "    { label: '프로젝트', href: '/projects', icon: <Icon name=\"folder\" /> },",
                  '    { label: \'Button.tsx\', icon: <Icon name="file" /> },',
                  '  ]',
                  '  return <Breadcrumb items={items} />',
                  '}'
                ]}
                notes={['icon 에 ReactNode 를 전달합니다 (14×14 이하 권장)']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
