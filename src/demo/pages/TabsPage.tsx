import Icon from '~/components/Icon'
import Tabs, {TABS_SIZE, TABS_TYPE} from '~/components/Tabs'
import type {TabItem} from '~/components/Tabs'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['items', 'type', 'size', 'centered', 'fullWidth', 'icon', 'badge', 'disabled']

const ContentBox = ({text, color = '#FF5A00'}: {text: string; color?: string}) => (
  <div
    style={{
      padding: '12px 16px',
      borderRadius: 8,
      fontSize: 13,
      color: 'var(--m2m-pg-comp-text-sub)',
      background: `${color}0d`,
      border: `1px dashed ${color}44`
    }}
  >
    {text}
  </div>
)

const BASIC: TabItem[] = [
  {key: 'home', label: '홈', content: <ContentBox text="홈 화면 콘텐츠" />},
  {key: 'profile', label: '프로필', content: <ContentBox text="프로필 정보" color="#3B82F6" />},
  {key: 'settings', label: '설정', content: <ContentBox text="설정 화면" color="#8B5CF6" />}
]

const ICON_ITEMS: TabItem[] = [
  {key: 'home', label: '홈', icon: <Icon name="home" size={13} />, content: <ContentBox text="홈 콘텐츠" />},
  {
    key: 'user',
    label: '사용자',
    icon: <Icon name="user" size={13} />,
    content: <ContentBox text="사용자 콘텐츠" color="#3B82F6" />
  },
  {
    key: 'noti',
    label: '알림',
    icon: <Icon name="bell" size={13} />,
    badge: 5,
    content: <ContentBox text="알림 목록" color="#F59E0B" />
  },
  {
    key: 'cfg',
    label: '설정',
    icon: <Icon name="settings" size={13} />,
    content: <ContentBox text="설정 화면" color="#8B5CF6" />
  }
]

const DOC_ITEMS: TabItem[] = [
  {key: 'desc', label: '개요', icon: <Icon name="file-text" size={13} />, content: <ContentBox text="컴포넌트 개요" />},
  {
    key: 'props',
    label: 'Props',
    icon: <Icon name="star" size={13} />,
    content: <ContentBox text="Props 명세" color="#F59E0B" />
  },
  {
    key: 'code',
    label: '예제',
    icon: <Icon name="file-text" size={13} />,
    content: <ContentBox text="코드 예제" color="#22C55E" />
  }
]

const DISABLED: TabItem[] = [
  {key: 'a', label: '활성 탭 1', content: <ContentBox text="첫 번째 탭 내용" />},
  {key: 'b', label: '활성 탭 2', content: <ContentBox text="두 번째 탭 내용" color="#22C55E" />},
  {key: 'c', label: '비활성 탭', disabled: true},
  {key: 'd', label: '활성 탭 3', content: <ContentBox text="네 번째 탭 내용" color="#3B82F6" />}
]

export function TabsPage() {
  return (
    <>
      <PageHeader
        title="Tabs"
        component="Tabs"
        desc="— 콘텐츠 영역을 그룹으로 분리하고 탭으로 전환하는 내비게이션 컴포넌트."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'items' && (
              <ComponentSection
                title="items — 탭 배열"
                preview={<Tabs items={BASIC} />}
                code={[
                  "import Tabs from 'm2m-uiux-react/Tabs'",
                  '',
                  'const items = [',
                  "  { key: 'home',    label: '홈',    content: <HomePanel /> },",
                  "  { key: 'profile', label: '프로필', content: <ProfilePanel /> },",
                  "  { key: 'settings',label: '설정',   content: <SettingsPanel /> },",
                  ']',
                  '',
                  'export function Example() {',
                  '  return <Tabs items={items} />',
                  '}'
                ]}
                notes={['key 는 고유 식별자, content 는 선택 시 표시될 ReactNode']}
              />
            )}

            {tab === 'type' && (
              <>
                <ComponentSection
                  title='type="line" (기본) — 하단 언더라인'
                  preview={<Tabs items={BASIC} type={TABS_TYPE['LINE']} />}
                  code={[
                    "import Tabs, {TABS_TYPE} from 'm2m-uiux-react/Tabs'",
                    '',
                    'export function Example() {',
                    "  return <Tabs type={TABS_TYPE['LINE']} items={items} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='type="card" — 카드 스타일'
                  preview={<Tabs items={BASIC} type={TABS_TYPE['CARD']} />}
                  code={[
                    "import Tabs, {TABS_TYPE} from 'm2m-uiux-react/Tabs'",
                    '',
                    'export function Example() {',
                    "  return <Tabs type={TABS_TYPE['CARD']} items={items} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='type="pill" — 캡슐 스타일'
                  preview={<Tabs items={BASIC} type={TABS_TYPE['PILL']} />}
                  code={[
                    "import Tabs, {TABS_TYPE} from 'm2m-uiux-react/Tabs'",
                    '',
                    'export function Example() {',
                    "  return <Tabs type={TABS_TYPE['PILL']} items={items} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'size' &&
              (['SM', 'MD', 'LG'] as const).map((s) => (
                <ComponentSection
                  key={s}
                  title={`size="${TABS_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''}`}
                  preview={<Tabs items={BASIC} size={TABS_SIZE[s]} />}
                  code={[
                    "import Tabs, {TABS_SIZE} from 'm2m-uiux-react/Tabs'",
                    '',
                    'export function Example() {',
                    `  return <Tabs size={TABS_SIZE['${s}']} items={items} />`,
                    '}'
                  ]}
                />
              ))}

            {tab === 'centered' && (
              <>
                <ComponentSection
                  title="centered={true} — 탭 중앙 정렬"
                  preview={<Tabs items={BASIC} centered />}
                  code={[
                    "import Tabs from 'm2m-uiux-react/Tabs'",
                    '',
                    'export function Example() {',
                    '  return <Tabs centered items={items} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="centered={false} (기본)"
                  preview={<Tabs items={BASIC} centered={false} />}
                  code={[
                    "import Tabs from 'm2m-uiux-react/Tabs'",
                    '',
                    'export function Example() {',
                    '  return <Tabs items={items} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'fullWidth' && (
              <>
                <ComponentSection
                  title="fullWidth={true} — 탭이 전체 너비를 균등 분할"
                  preview={<Tabs items={BASIC} fullWidth />}
                  code={[
                    "import Tabs from 'm2m-uiux-react/Tabs'",
                    '',
                    'export function Example() {',
                    '  return <Tabs fullWidth items={items} />',
                    '}'
                  ]}
                  notes={['각 탭이 동일한 너비로 균등 분할됩니다']}
                />
                <ComponentSection
                  title='type="pill" + fullWidth'
                  preview={<Tabs items={BASIC} type={TABS_TYPE['PILL']} fullWidth />}
                  code={[
                    "import Tabs, {TABS_TYPE} from 'm2m-uiux-react/Tabs'",
                    '',
                    'export function Example() {',
                    "  return <Tabs type={TABS_TYPE['PILL']} fullWidth items={items} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'icon' && (
              <>
                <ComponentSection
                  title="icon — 탭 라벨 앞 아이콘"
                  preview={<Tabs items={ICON_ITEMS} />}
                  code={[
                    "import Tabs from 'm2m-uiux-react/Tabs'",
                    "import Icon from 'm2m-uiux-react/Icon'",
                    '',
                    'const items = [',
                    "  { key: 'home', label: '홈', icon: <Icon name=\"home\" />, content: <HomePanel /> },",
                    "  { key: 'user', label: '사용자', icon: <Icon name=\"user\" />, content: <UserPanel /> },",
                    ']',
                    '',
                    'export function Example() {',
                    '  return <Tabs items={items} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title='type="card" + icon'
                  preview={<Tabs items={DOC_ITEMS} type={TABS_TYPE['CARD']} />}
                  code={[
                    "import Tabs, {TABS_TYPE} from 'm2m-uiux-react/Tabs'",
                    '',
                    'export function Example() {',
                    "  return <Tabs type={TABS_TYPE['CARD']} items={itemsWithIcon} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='type="pill" + icon'
                  preview={<Tabs items={ICON_ITEMS} type={TABS_TYPE['PILL']} />}
                  code={[
                    "import Tabs, {TABS_TYPE} from 'm2m-uiux-react/Tabs'",
                    '',
                    'export function Example() {',
                    "  return <Tabs type={TABS_TYPE['PILL']} items={itemsWithIcon} />",
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'badge' && (
              <ComponentSection
                title="badge — 탭 알림 배지"
                preview={<Tabs items={ICON_ITEMS} />}
                code={[
                  "import Tabs from 'm2m-uiux-react/Tabs'",
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'const items = [',
                  "  { key: 'noti', label: '알림', icon: <Icon name=\"bell\" />, badge: 5, content: <NotiPanel /> },",
                  ']',
                  '',
                  'export function Example() {',
                  '  return <Tabs items={items} />',
                  '}'
                ]}
                notes={['숫자 또는 문자열 모두 허용', "badge: 'N' 처럼 문자열도 가능"]}
              />
            )}

            {tab === 'disabled' && (
              <ComponentSection
                title="disabled — 개별 탭 비활성"
                preview={<Tabs items={DISABLED} />}
                code={[
                  "import Tabs from 'm2m-uiux-react/Tabs'",
                  '',
                  'const items = [',
                  "  { key: 'a', label: '활성 탭', content: <Panel /> },",
                  "  { key: 'c', label: '비활성 탭', disabled: true },",
                  ']',
                  '',
                  'export function Example() {',
                  '  return <Tabs items={items} />',
                  '}'
                ]}
                notes={['disabled 탭은 클릭해도 전환되지 않습니다']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
