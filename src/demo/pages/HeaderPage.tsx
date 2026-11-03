import Header, {HEADER_TYPE} from '~/components/Header'
import Icon from '~/components/Icon'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['type', 'title', 'back', 'actions', 'logo', 'sticky', 'classNames']

const wrap = {maxWidth: 480, width: '100%'}

const ACTIONS = [
  {icon: <Icon name="search" size={18} />, label: '검색'},
  {icon: <Icon name="bell" size={18} />, label: '알림', badge: 3},
  {icon: <Icon name="user" size={18} />, label: '프로필'}
]

function Logo() {
  return (
    <span style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          background: 'var(--m2m-pg-brand)',
          color: '#fff',
          fontSize: 12,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        M2
      </span>
      <span style={{fontSize: 15, fontWeight: 700}}>M2M UIUX</span>
    </span>
  )
}

export function HeaderPage() {
  return (
    <>
      <PageHeader title="Header" component="Header" desc="— 페이지 상단 헤더 컴포넌트." />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'type' && (
              <>
                <ComponentSection
                  title='type="default" (기본) — 흰 배경'
                  preview={
                    <div style={wrap}>
                      <Header type={HEADER_TYPE['DEFAULT']} title="페이지 제목" actions={ACTIONS} />
                    </div>
                  }
                  code={[
                    "import Header, {HEADER_TYPE} from 'm2m-uiux-react/Header'",
                    '',
                    'export function Example() {',
                    '  return <Header type={HEADER_TYPE[\'DEFAULT\']} title="페이지 제목" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title='type="primary" — 브랜드 컬러'
                  preview={
                    <div style={wrap}>
                      <Header type={HEADER_TYPE['PRIMARY']} title="페이지 제목" actions={ACTIONS} />
                    </div>
                  }
                  code={[
                    "import Header, {HEADER_TYPE} from 'm2m-uiux-react/Header'",
                    '',
                    'export function Example() {',
                    '  return <Header type={HEADER_TYPE[\'PRIMARY\']} title="페이지 제목" />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'title' && (
              <>
                <ComponentSection
                  title="title — 페이지 제목"
                  preview={
                    <div style={wrap}>
                      <Header title="회원 목록" actions={ACTIONS} />
                    </div>
                  }
                  code={[
                    "import Header from 'm2m-uiux-react/Header'",
                    '',
                    'export function Example() {',
                    '  return <Header title="회원 목록" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="title — 긴 텍스트 처리 (말줄임)"
                  preview={
                    <div style={wrap}>
                      <Header title="매우 긴 페이지 제목이 들어올 경우 말줄임 처리됩니다" actions={ACTIONS} />
                    </div>
                  }
                  code={[
                    "import Header from 'm2m-uiux-react/Header'",
                    '',
                    'export function Example() {',
                    '  return <Header title="매우 긴 페이지 제목이 들어올 경우 처리" />',
                    '}'
                  ]}
                  notes={['overflow ellipsis 자동 처리']}
                />
              </>
            )}

            {tab === 'back' && (
              <>
                <ComponentSection
                  title="back={true} — 뒤로 가기 버튼"
                  preview={
                    <div style={wrap}>
                      <Header title="상세 페이지" back onBack={() => alert('back')} />
                    </div>
                  }
                  code={[
                    "import Header from 'm2m-uiux-react/Header'",
                    '',
                    'export function Example() {',
                    '  return <Header title="상세 페이지" back={true} onBack={() => history.back()} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="back={false} (기본)"
                  preview={
                    <div style={wrap}>
                      <Header title="페이지 제목" actions={ACTIONS} />
                    </div>
                  }
                  code={[
                    "import Header from 'm2m-uiux-react/Header'",
                    '',
                    'export function Example() {',
                    '  return <Header title="페이지 제목" back={false} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'actions' && (
              <>
                <ComponentSection
                  title="actions — 우측 액션 영역 (아이콘 + badge)"
                  preview={
                    <div style={wrap}>
                      <Header title="페이지 제목" actions={ACTIONS} />
                    </div>
                  }
                  code={[
                    "import Header from 'm2m-uiux-react/Header'",
                    "import Icon from 'm2m-uiux-react/Icon'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <Header',
                    '      title="페이지 제목"',
                    '      actions={[',
                    '        { icon: <Icon name="search" />, onClick: handleSearch, label: "검색" },',
                    '        { icon: <Icon name="bell" />, onClick: handleAlerts, badge: 3, label: "알림" },',
                    '        { icon: <Icon name="user" />, onClick: handleProfile, label: "프로필" },',
                    '      ]}',
                    '    />',
                    '  )',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="actions 없음"
                  preview={
                    <div style={wrap}>
                      <Header title="페이지 제목" />
                    </div>
                  }
                  code={[
                    "import Header from 'm2m-uiux-react/Header'",
                    '',
                    'export function Example() {',
                    '  return <Header title="페이지 제목" />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'logo' && (
              <ComponentSection
                title="logo — 좌측 로고 표시"
                preview={
                  <div style={wrap}>
                    <Header logo={<Logo />} actions={ACTIONS.slice(1)} />
                  </div>
                }
                code={[
                  "import Header from 'm2m-uiux-react/Header'",
                  "import Icon from 'm2m-uiux-react/Icon'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <Header',
                  '      logo={<Logo />}',
                  '      actions={[',
                  '        { icon: <Icon name="bell" /> },',
                  '        { icon: <Icon name="user" /> },',
                  '      ]}',
                  '    />',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'sticky' && (
              <ComponentSection
                title="sticky={true} — 스크롤 시 상단 고정 + 그림자"
                preview={
                  <div
                    style={{
                      ...wrap,
                      height: 160,
                      overflowY: 'auto',
                      border: '1px solid var(--m2m-pg-comp-border)',
                      borderRadius: 8
                    }}
                  >
                    <Header title="고정 헤더" sticky actions={ACTIONS} />
                    <div style={{padding: 16, fontSize: 12, lineHeight: 2}}>
                      {Array.from({length: 12}, (_, i) => (
                        <p key={i} style={{margin: 0}}>
                          스크롤 콘텐츠 {i + 1}
                        </p>
                      ))}
                    </div>
                  </div>
                }
                code={[
                  "import Header from 'm2m-uiux-react/Header'",
                  '',
                  'export function Example() {',
                  '  // position: sticky; top: 0; z-index: 100; 이 자동 적용',
                  '  return <Header title="페이지 제목" sticky={true} />',
                  '}'
                ]}
                notes={['sticky 시 그림자 자동 적용']}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={
                  <div style={wrap}>
                    <Header title="커스텀" classNames="my-header" actions={ACTIONS} />
                  </div>
                }
                code={[
                  "import Header from 'm2m-uiux-react/Header'",
                  '',
                  'export function Example() {',
                  '  return <Header title="페이지" classNames="shadow-md px-6" />',
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
