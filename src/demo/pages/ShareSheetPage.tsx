import {useState} from 'react'

import Button from '~/components/Button'
import ShareSheet, {SHARE_CHANNEL} from '~/components/ShareSheet'
import type {ShareChannel} from '~/components/ShareSheet'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['default', 'channels', 'events']

function DefaultDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>공유하기</Button>
      <ShareSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Share Listing"
        url="https://m2m-uiux.example.com/listing/1024"
      />
    </>
  )
}

function ChannelsDemo() {
  const [open, setOpen] = useState(false)
  const channels: ShareChannel[] = [SHARE_CHANNEL['FACEBOOK'], SHARE_CHANNEL['TWITTER']]
  return (
    <>
      <Button onClick={() => setOpen(true)}>공유하기 (2개 채널만)</Button>
      <ShareSheet
        open={open}
        onClose={() => setOpen(false)}
        url="https://m2m-uiux.example.com/listing/1024"
        channels={channels}
      />
    </>
  )
}

function EventsDemo() {
  const [open, setOpen] = useState(false)
  const [log, setLog] = useState('(없음)')
  return (
    <>
      <Button onClick={() => setOpen(true)}>공유하기</Button>
      <span className="demo-hint" style={{marginLeft: 8}}>
        이벤트: {log}
      </span>
      <ShareSheet
        open={open}
        onClose={() => setOpen(false)}
        url="https://m2m-uiux.example.com/listing/1024"
        onCopy={(url) => setLog(`copy → ${url}`)}
        onShare={({channel}) => setLog(`share → ${channel}`)}
      />
    </>
  )
}

export function ShareSheetPage() {
  return (
    <div>
      <PageHeader
        title="ShareSheet"
        component="ShareSheet"
        desc="— URL 공유 모달. 링크 복사 + 카카오톡/페이스북/트위터/whatsApp 공유."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'default' && (
              <ComponentSection
                title="기본 사용"
                preview={<DefaultDemo />}
                code={[
                  "import {useState} from 'react'",
                  "import ShareSheet from 'm2m-uiux-react/ShareSheet'",
                  '',
                  'export function Example() {',
                  '  const [open, setOpen] = useState(false)',
                  '  return (',
                  '    <>',
                  '      <Button onClick={() => setOpen(true)}>공유하기</Button>',
                  '      <ShareSheet',
                  '        open={open}',
                  '        onClose={() => setOpen(false)}',
                  '        title="Share Listing"',
                  '        url="https://m2m-uiux.example.com/listing/1024"',
                  '      />',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['링크 복사 버튼 클릭 시 1.5초간 체크 아이콘으로 전환', '배경 클릭 · ESC · X 버튼으로 onClose']}
              />
            )}

            {tab === 'channels' && (
              <ComponentSection
                title="channels — 노출할 채널 + 순서 제한"
                preview={<ChannelsDemo />}
                code={[
                  "import ShareSheet, {SHARE_CHANNEL} from 'm2m-uiux-react/ShareSheet'",
                  '',
                  '<ShareSheet',
                  '  open={open}',
                  '  onClose={() => setOpen(false)}',
                  '  url="https://m2m-uiux.example.com/listing/1024"',
                  "  channels={[SHARE_CHANNEL['FACEBOOK'], SHARE_CHANNEL['TWITTER']]}",
                  '/>'
                ]}
              />
            )}

            {tab === 'events' && (
              <ComponentSection
                title="onCopy / onShare 콜백"
                preview={<EventsDemo />}
                code={[
                  '<ShareSheet',
                  '  open={open}',
                  '  onClose={() => setOpen(false)}',
                  '  url="..."',
                  '  onCopy={(url) => console.log("copy", url)}',
                  '  onShare={({ channel, url }) => console.log("share", channel, url)}',
                  '/>'
                ]}
                notes={[
                  'kakao 는 웹 공유 URL 이 없어 onShare 콜백으로만 전달 — Kakao SDK 연동은 소비 앱이 처리',
                  '실제 공유 동작(SDK 호출, URL 오픈 등)은 컴포넌트가 하지 않음 — onShare 를 받아 직접 구현'
                ]}
              />
            )}
          </>
        )}
      </PropTabs>
    </div>
  )
}
