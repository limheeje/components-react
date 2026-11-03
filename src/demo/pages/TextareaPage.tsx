import {useState} from 'react'

import Textarea from '~/components/Textarea'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['rows', 'disabled', 'error', 'resize', 'maxLength', 'placeholder', 'onChange', 'classNames']

const wrap = {maxWidth: 320}

export function TextareaPage() {
  const [value, setValue] = useState('')

  return (
    <>
      <PageHeader title="Textarea" component="Textarea" desc="— 여러 줄 텍스트 입력 컴포넌트." />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'rows' &&
              [3, 5, 10].map((r) => (
                <ComponentSection
                  key={r}
                  title={`rows={${r}}${r === 3 ? ' (기본)' : ''}`}
                  preview={
                    <div style={wrap}>
                      <Textarea rows={r} placeholder="내용을 입력해주세요" />
                    </div>
                  }
                  code={[
                    "import Textarea from 'm2m-uiux-react/Textarea'",
                    '',
                    'export function Example() {',
                    `  return <Textarea rows={${r}} placeholder="내용을 입력해주세요" />`,
                    '}'
                  ]}
                />
              ))}

            {tab === 'disabled' && (
              <>
                <ComponentSection
                  title="disabled={true}"
                  preview={
                    <div style={wrap}>
                      <Textarea disabled rows={3} placeholder="비활성 상태" />
                    </div>
                  }
                  code={[
                    "import Textarea from 'm2m-uiux-react/Textarea'",
                    '',
                    'export function Example() {',
                    '  return <Textarea disabled placeholder="비활성 상태" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="disabled — 값이 있는 경우"
                  preview={
                    <div style={wrap}>
                      <Textarea disabled rows={3} defaultValue={'읽기 전용 텍스트\n수정할 수 없습니다.'} />
                    </div>
                  }
                  code={[
                    "import Textarea from 'm2m-uiux-react/Textarea'",
                    '',
                    'export function Example() {',
                    '  return <Textarea disabled value="읽기 전용 텍스트" />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'error' && (
              <ComponentSection
                title="error / helperText"
                preview={
                  <div className="demo-col" style={wrap}>
                    <Textarea error="내용을 입력해주세요." rows={3} />
                    <Textarea helperText="최대 200자" rows={3} placeholder="소개" />
                  </div>
                }
                code={[
                  "import Textarea from 'm2m-uiux-react/Textarea'",
                  '',
                  'export function Example() {',
                  '  return <Textarea error="내용을 입력해주세요." />',
                  '}'
                ]}
                notes={['error 에 문자열을 주면 컨트롤 하단에 메시지 표시', 'error 가 없을 때만 helperText 표시']}
              />
            )}

            {tab === 'resize' && (
              <>
                <ComponentSection
                  title="resize={true} (기본)"
                  preview={
                    <div style={wrap}>
                      <Textarea resize rows={3} placeholder="드래그로 높이 조절 가능" />
                    </div>
                  }
                  code={[
                    "import Textarea from 'm2m-uiux-react/Textarea'",
                    '',
                    'export function Example() {',
                    '  return <Textarea resize={true} />',
                    '}'
                  ]}
                  notes={['사용자가 우하단 핸들을 드래그해 높이 조절 가능']}
                />
                <ComponentSection
                  title="resize={false}"
                  preview={
                    <div style={wrap}>
                      <Textarea resize={false} rows={3} placeholder="높이 고정" />
                    </div>
                  }
                  code={[
                    "import Textarea from 'm2m-uiux-react/Textarea'",
                    '',
                    'export function Example() {',
                    '  return <Textarea resize={false} />',
                    '}'
                  ]}
                  notes={['높이 고정, 사용자 리사이즈 불가']}
                />
              </>
            )}

            {tab === 'maxLength' && (
              <ComponentSection
                title="maxLength — 글자 수 제한 + 카운터 (타이핑해보세요)"
                preview={
                  <div style={wrap}>
                    <Textarea rows={4} maxLength={200} showCount />
                  </div>
                }
                code={[
                  "import Textarea from 'm2m-uiux-react/Textarea'",
                  '',
                  'export function Example() {',
                  '  return <Textarea maxLength={200} showCount rows={4} />',
                  '}'
                ]}
                notes={['showCount prop 으로 우하단 카운터 표시', 'maxLength 도달 시 카운터가 빨간색으로 변경']}
              />
            )}

            {tab === 'placeholder' && (
              <ComponentSection
                title="placeholder — 입력 안내 텍스트"
                preview={
                  <div style={wrap}>
                    <Textarea rows={3} placeholder="문의 내용을 상세히 입력해주세요." />
                  </div>
                }
                code={[
                  "import Textarea from 'm2m-uiux-react/Textarea'",
                  '',
                  'export function Example() {',
                  '  return <Textarea placeholder="문의 내용을 상세히 입력해주세요." />',
                  '}'
                ]}
              />
            )}

            {tab === 'onChange' && (
              <ComponentSection
                title="onChange 이벤트"
                preview={
                  <div className="demo-col" style={wrap}>
                    <Textarea
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      rows={3}
                      placeholder="타이핑해보세요"
                    />
                    <span className="demo-hint">{value.length}자</span>
                  </div>
                }
                code={[
                  "import {useState} from 'react'",
                  "import Textarea from 'm2m-uiux-react/Textarea'",
                  '',
                  'export function Example() {',
                  '  const [value, setValue] = useState("")',
                  '  return <Textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="타이핑해보세요" />',
                  '}'
                ]}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={
                  <div style={wrap}>
                    <Textarea classNames="demo-hint" rows={3} placeholder="custom" />
                  </div>
                }
                code={[
                  "import Textarea from 'm2m-uiux-react/Textarea'",
                  '',
                  'export function Example() {',
                  '  return <Textarea classNames="w-full min-h-[120px]" />',
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
