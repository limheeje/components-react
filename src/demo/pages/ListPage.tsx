import Icon from '~/components/Icon'
import List from '~/components/List'
import ListItem from '~/components/ListItem'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['divided', 'clickable', 'avatar', 'extra', 'loading', 'classNames']

const ITEMS = [
  {id: 1, title: '첫 번째 항목', desc: '설명 텍스트입니다'},
  {id: 2, title: '두 번째 항목', desc: '설명 텍스트입니다'},
  {id: 3, title: '세 번째 항목', desc: '설명 텍스트입니다'}
]

const Avatar = () => (
  <span
    style={{
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--m2m-pg-comp-bg-hover)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Icon name="inbox" size={18} color="var(--m2m-pg-comp-text-disabled)" />
  </span>
)

export function ListPage() {
  return (
    <>
      <PageHeader title="List" component="List" desc="— 아이템 목록 컴포넌트." />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'divided' && (
              <>
                <ComponentSection
                  title="divided={true} (기본) — 구분선 있음"
                  preview={
                    <div style={{width: 360}}>
                      <List divided>
                        {ITEMS.map((it) => (
                          <ListItem key={it.id} title={it.title} description={it.desc} />
                        ))}
                      </List>
                    </div>
                  }
                  code={[
                    "import List from 'm2m-uiux-react/List'",
                    "import ListItem from 'm2m-uiux-react/ListItem'",
                    '',
                    "const items = [{ title: '첫 번째 항목', desc: '설명' }]",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <List divided items={items} renderItem={(item) => (',
                    '      <ListItem title={item.title} description={item.desc} />',
                    '    )} />',
                    '  )',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="divided={false} — 구분선 없음"
                  preview={
                    <div style={{width: 360}}>
                      <List divided={false}>
                        {ITEMS.map((it) => (
                          <ListItem key={it.id} title={it.title} description={it.desc} />
                        ))}
                      </List>
                    </div>
                  }
                  code={[
                    "import List from 'm2m-uiux-react/List'",
                    "import ListItem from 'm2m-uiux-react/ListItem'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <List divided={false}>',
                    '      <ListItem title="항목" />',
                    '    </List>',
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'clickable' && (
              <ComponentSection
                title="clickable — 클릭 가능 행 (hover + chevron 자동)"
                preview={
                  <div style={{width: 360}}>
                    <List
                      clickable
                      items={ITEMS}
                      onItemClick={(it) => alert(it.title)}
                      renderItem={(it) => <ListItem title={it.title} description={it.desc} />}
                    />
                  </div>
                }
                code={[
                  "import List from 'm2m-uiux-react/List'",
                  "import ListItem from 'm2m-uiux-react/ListItem'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <List',
                  '      clickable={true}',
                  '      items={items}',
                  '      onItemClick={(item) => handleClick(item)}',
                  '      renderItem={(item) => <ListItem title={item.title} description={item.desc} />}',
                  '    />',
                  '  )',
                  '}'
                ]}
                notes={['hover 배경 + chevron 자동 추가']}
              />
            )}

            {tab === 'avatar' && (
              <ComponentSection
                title="avatar — 좌측 아바타"
                preview={
                  <div style={{width: 360}}>
                    <List clickable>
                      {ITEMS.map((it) => (
                        <ListItem key={it.id} avatar={<Avatar />} title={it.title} description={it.desc} />
                      ))}
                    </List>
                  </div>
                }
                code={[
                  "import List from 'm2m-uiux-react/List'",
                  "import ListItem from 'm2m-uiux-react/ListItem'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <List>',
                  '      <ListItem avatar={<Avatar />} title={name} description={email} />',
                  '    </List>',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'extra' && (
              <ComponentSection
                title="extra — 우측 추가 요소"
                preview={
                  <div style={{width: 360}}>
                    <List>
                      {ITEMS.map((it) => (
                        <ListItem
                          key={it.id}
                          title={it.title}
                          extra={<Icon name="check-circle" size={16} color="var(--m2m-pg-success)" />}
                        />
                      ))}
                    </List>
                  </div>
                }
                code={[
                  "import List from 'm2m-uiux-react/List'",
                  "import ListItem from 'm2m-uiux-react/ListItem'",
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <List>',
                  '      <ListItem title={title} extra={<Icon name="check-circle" />} />',
                  '    </List>',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'loading' && (
              <ComponentSection
                title="loading — 스켈레톤"
                preview={
                  <div style={{width: 360}}>
                    <List loading />
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import List from 'm2m-uiux-react/List'",
                  '',
                  'export function Example() {',
                  '  const [isLoading] = useState(true)',
                  '  return <List loading={isLoading} items={items} renderItem={(item) => item.title} />',
                  '}'
                ]}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames"
                preview={
                  <div style={{width: 360}}>
                    <List classNames="demo-hint">
                      <ListItem title="커스텀" />
                    </List>
                  </div>
                }
                code={[
                  "import List from 'm2m-uiux-react/List'",
                  "import ListItem from 'm2m-uiux-react/ListItem'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <List classNames="shadow-sm">',
                  '      <ListItem title="항목" />',
                  '    </List>',
                  '  )',
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
