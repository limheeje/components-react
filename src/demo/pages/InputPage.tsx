import {useContext, useState} from 'react'
import type {ComponentType} from 'react'

import Input, {INPUT_SIZE, INPUT_TYPE} from '~/components/Input'
import type {InputVariantProps} from '~/components/Input/Input.type'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {DemoTabContext} from '~/demo/components/navContext'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

type Sub = 'text' | 'password' | 'number' | 'email' | 'tel' | 'search'

const META: Record<
  Sub,
  {label: string; placeholder: string; desc: string; notes: string[]; El: ComponentType<InputVariantProps>}
> = {
  text: {
    label: 'Input.Text',
    placeholder: '텍스트 입력',
    desc: '— 가장 기본적인 텍스트 입력 컴포넌트입니다.',
    notes: ['가장 기본적인 입력 유형', 'value 와 onChange 를 함께 쓰는 제어 컴포넌트 패턴 권장'],
    El: Input.Text
  },
  password: {
    label: 'Input.Password',
    placeholder: '비밀번호 입력',
    desc: '— 비밀번호 입력 전용 컴포넌트. 우측 눈 아이콘으로 표시/숨기기를 지원합니다.',
    notes: ['showToggle 시 눈 아이콘 버튼 내장', 'autoComplete="current-password" 권장'],
    El: Input.Password
  },
  number: {
    label: 'Input.Number',
    placeholder: '숫자 입력',
    desc: '— 숫자 전용 입력 컴포넌트. 모바일에서 숫자 키패드가 자동으로 호출됩니다.',
    notes: ['inputMode="numeric" 로 모바일 숫자 키패드 유도', 'min · max · step prop 지원'],
    El: Input.Number
  },
  email: {
    label: 'Input.Email',
    placeholder: '이메일 입력 (예: user@domain.com)',
    desc: '— 이메일 입력 전용 컴포넌트. type="email" 브라우저 유효성 검사를 지원합니다.',
    notes: ['이메일 형식 자동 유효성 검사', '모바일에서 @ 포함 키패드 자동 호출'],
    El: Input.Email
  },
  tel: {
    label: 'Input.Tel',
    placeholder: '전화번호 입력 (예: 010-0000-0000)',
    desc: '— 전화번호 입력 전용 컴포넌트. 모바일에서 전화 키패드가 자동으로 호출됩니다.',
    notes: ['type="tel" — 모바일 전화 키패드', 'onChange 에서 하이픈(-) 포맷 처리 권장'],
    El: Input.Tel
  },
  search: {
    label: 'Input.Search',
    placeholder: '검색어 입력',
    desc: '— 검색 전용 입력 컴포넌트. 우측 돋보기 아이콘 + 지우기(X) 버튼이 기본 내장됩니다.',
    notes: ['Enter 키 또는 돋보기 아이콘 클릭 시 onSearch 호출', '우측 X 버튼 기본 내장'],
    El: Input.Search
  }
}

const BASE_TABS = [
  'variant',
  'size',
  'clearable',
  'value',
  'onChange',
  'placeholder',
  'disabled',
  'readOnly',
  'error',
  'maxLength',
  'showCount',
  'classNames'
]
const PASSWORD_TABS = [
  'variant',
  'size',
  'showToggle',
  'type',
  'onToggle',
  'clearable',
  'value',
  'onChange',
  'placeholder',
  'disabled',
  'readOnly',
  'error',
  'maxLength',
  'showCount',
  'classNames'
]

const wrap = {maxWidth: 320}

/** `<${L} value={value} onChange={...} />` 형태의 복사용 스니펫 */
function snippet(body: string[], imp = "import Input from 'm2m-uiux-react/Input'", state = true): string[] {
  return [
    "import {useState} from 'react'",
    imp,
    '',
    'export function Example() {',
    ...(state ? ["  const [value, setValue] = useState('')"] : []),
    ...body,
    '}'
  ]
}

export function InputPage() {
  const {tab: forced} = useContext(DemoTabContext)
  const sub = ((forced ?? 'Text').toLowerCase() as Sub) in META ? ((forced ?? 'Text').toLowerCase() as Sub) : 'text'
  const meta = META[sub]
  const El = meta.El
  const L = meta.label
  const tabs = sub === 'password' ? PASSWORD_TABS : BASE_TABS

  const [pwVisible, setPwVisible] = useState(false)

  return (
    <>
      <PageHeader title={L} component={L} desc={meta.desc} />
      <PropTabs tabs={tabs} key={sub}>
        {(tab) => (
          <>
            {tab === 'variant' && (
              <>
                <ComponentSection
                  title={`${L} — 기본`}
                  preview={
                    <div className="demo-col" style={wrap}>
                      <El placeholder={meta.placeholder} />
                    </div>
                  }
                  code={snippet(
                    [
                      '  return (',
                      `    <${L}`,
                      '      value={value}',
                      '      onChange={(e) => setValue(e.target.value)}',
                      `      placeholder="${meta.placeholder}"`,
                      '    />',
                      '  )'
                    ],
                    "import Input, {INPUT_TYPE} from 'm2m-uiux-react/Input'"
                  )}
                  notes={meta.notes}
                />

                {sub === 'number' && (
                  <ComponentSection
                    title={`${L} — min / max / step`}
                    preview={
                      <div className="demo-col" style={wrap}>
                        <Input.Number placeholder="0 ~ 100" defaultValue="50" min={0} max={100} step={1} />
                      </div>
                    }
                    code={snippet([
                      '  return <Input.Number min={0} max={100} step={1} value={value} onChange={(e) => setValue(e.target.value)} />'
                    ])}
                    notes={['min · max · step prop 으로 입력 범위 제어']}
                  />
                )}
                {sub === 'email' && (
                  <ComponentSection
                    title={`${L} — 유효성 실패 예시`}
                    preview={
                      <div className="demo-col" style={wrap}>
                        <Input.Email error="이메일 형식이 올바르지 않습니다." defaultValue="invalid-email" />
                      </div>
                    }
                    code={snippet([
                      '  return <Input.Email error="이메일 형식이 올바르지 않습니다." value={value} onChange={(e) => setValue(e.target.value)} />'
                    ])}
                  />
                )}
                {sub === 'tel' && (
                  <ComponentSection
                    title={`${L} — 전화번호 포맷`}
                    preview={
                      <div className="demo-col" style={wrap}>
                        <Input.Tel placeholder="010-0000-0000" defaultValue="010-1234-5678" />
                      </div>
                    }
                    code={snippet([
                      '  return <Input.Tel value={value} onChange={(e) => setValue(formatTel(e.target.value))} />'
                    ])}
                    notes={['onChange 에서 하이픈(-) 자동 삽입 포맷 처리 권장']}
                  />
                )}
                {sub === 'search' && (
                  <ComponentSection
                    title={`${L} — onSearch 이벤트`}
                    preview={
                      <div className="demo-col" style={wrap}>
                        <Input.Search placeholder="검색어를 입력하세요" onSearch={(v) => alert(`검색: ${v}`)} />
                      </div>
                    }
                    code={snippet([
                      '  return (',
                      '    <Input.Search',
                      '      value={value}',
                      '      onChange={(e) => setValue(e.target.value)}',
                      '      onSearch={(val) => console.log(val)}',
                      '    />',
                      '  )'
                    ])}
                    notes={['Enter 키 또는 돋보기 아이콘 클릭 시 onSearch 호출']}
                  />
                )}
              </>
            )}

            {tab === 'size' && (
              <>
                {(
                  [
                    ['SM', ''],
                    ['MD', ' (기본)'],
                    ['LG', '']
                  ] as const
                ).map(([s, suffix]) => (
                  <ComponentSection
                    key={s}
                    title={`size="${INPUT_SIZE[s]}"${suffix}`}
                    preview={
                      <div className="demo-col" style={wrap}>
                        <El
                          size={INPUT_SIZE[s]}
                          placeholder={meta.placeholder}
                          defaultValue="입력 예시"
                          showToggle={sub === 'password'}
                        />
                      </div>
                    }
                    code={snippet(
                      [
                        `  return <${L} size={INPUT_SIZE['${s}']} value={value} onChange={(e) => setValue(e.target.value)} />`
                      ],
                      "import Input, {INPUT_SIZE} from 'm2m-uiux-react/Input'"
                    )}
                    notes={s === 'MD' ? ['size 기본값은 md'] : undefined}
                  />
                ))}
                <ComponentSection
                  title="size — 한눈에 비교"
                  preview={
                    <div className="demo-col" style={wrap}>
                      {(['SM', 'MD', 'LG'] as const).map((s) => (
                        <El key={s} size={INPUT_SIZE[s]} placeholder={`${INPUT_SIZE[s]} — ${meta.placeholder}`} />
                      ))}
                    </div>
                  }
                  code={snippet(
                    [
                      '  return (',
                      '    <>',
                      `      <${L} size={INPUT_SIZE['SM']} value={value} onChange={(e) => setValue(e.target.value)} />`,
                      `      <${L} size={INPUT_SIZE['MD']} value={value} onChange={(e) => setValue(e.target.value)} />`,
                      `      <${L} size={INPUT_SIZE['LG']} value={value} onChange={(e) => setValue(e.target.value)} />`,
                      '    </>',
                      '  )'
                    ],
                    "import Input, {INPUT_SIZE} from 'm2m-uiux-react/Input'"
                  )}
                />
              </>
            )}

            {tab === 'showToggle' && sub === 'password' && (
              <>
                <ComponentSection
                  title="showToggle={true} — 눈 아이콘 활성화"
                  preview={
                    <div className="demo-col" style={wrap}>
                      <Input.Password showToggle defaultValue="mySecretPw123" placeholder="비밀번호 입력" />
                    </div>
                  }
                  code={snippet([
                    '  return (',
                    '    <Input.Password',
                    '      showToggle',
                    '      value={value}',
                    '      onChange={(e) => setValue(e.target.value)}',
                    '    />',
                    '  )'
                  ])}
                  notes={['우측 눈 아이콘 버튼 자동 삽입', '클릭 시 password ↔ text 전환']}
                />
                <ComponentSection
                  title="showToggle 생략 (기본) — 아이콘 없음"
                  preview={
                    <div className="demo-col" style={wrap}>
                      <Input.Password placeholder="비밀번호 입력" defaultValue="mySecretPw123" />
                    </div>
                  }
                  code={snippet([
                    '  return <Input.Password value={value} onChange={(e) => setValue(e.target.value)} />'
                  ])}
                  notes={['showToggle 을 생략하면 아이콘 없이 순수 마스킹만 적용']}
                />
              </>
            )}

            {tab === 'type' && sub === 'password' && (
              <>
                <ComponentSection
                  title='type="password" (기본) — 마스킹'
                  preview={
                    <div className="demo-col" style={wrap}>
                      <Input type={INPUT_TYPE['PASSWORD']} defaultValue="mySecretPw123" placeholder="비밀번호 입력" />
                    </div>
                  }
                  code={snippet(
                    [
                      '  // 동등: <Input.Password ... />',
                      "  return <Input type={INPUT_TYPE['PASSWORD']} value={value} onChange={(e) => setValue(e.target.value)} />"
                    ],
                    "import Input, {INPUT_TYPE} from 'm2m-uiux-react/Input'"
                  )}
                  notes={["type 기본값은 INPUT_TYPE['PASSWORD'] (마스킹 상태)"]}
                />
                <ComponentSection
                  title="type — showToggle + onToggle 로 제어"
                  preview={
                    <div className="demo-col" style={wrap}>
                      <Input
                        type={pwVisible ? INPUT_TYPE['TEXT'] : INPUT_TYPE['PASSWORD']}
                        showToggle
                        onToggle={(v) => setPwVisible(v)}
                        defaultValue="mySecretPw123"
                      />
                      <span className="demo-hint">현재: {pwVisible ? 'text (평문)' : 'password (마스킹)'}</span>
                    </div>
                  }
                  code={[
                    "import {useState} from 'react'",
                    "import Input, {INPUT_TYPE} from 'm2m-uiux-react/Input'",
                    '',
                    'export function Example() {',
                    "  const [value, setValue] = useState('')",
                    '  const [show, setShow] = useState(false)',
                    '  return (',
                    '    <Input',
                    "      type={show ? INPUT_TYPE['TEXT'] : INPUT_TYPE['PASSWORD']}",
                    '      showToggle',
                    '      onToggle={(v) => setShow(v)}',
                    '      value={value}',
                    '      onChange={(e) => setValue(e.target.value)}',
                    '    />',
                    '  )',
                    '}'
                  ]}
                  notes={['showToggle 만 쓰면 내부 상태로 자동 처리', 'type + onToggle 조합은 외부 상태 연동 시']}
                />
              </>
            )}

            {tab === 'onToggle' && sub === 'password' && (
              <ComponentSection
                title="onToggle — 토글 콜백"
                preview={
                  <div className="demo-col" style={wrap}>
                    <Input.Password
                      showToggle
                      defaultValue="mySecretPw123"
                      onToggle={(v) => console.log('visible:', v)}
                    />
                  </div>
                }
                code={snippet([
                  '  return (',
                  '    <Input.Password',
                  '      showToggle',
                  "      onToggle={(visible) => console.log('visible:', visible)}",
                  '      value={value}',
                  '      onChange={(e) => setValue(e.target.value)}',
                  '    />',
                  '  )'
                ])}
                notes={[
                  'onToggle 은 눈 아이콘 클릭 시 호출되는 콜백 (visible: boolean)',
                  '로깅 · GA 이벤트 등 부수 효과 처리 가능'
                ]}
              />
            )}

            {tab === 'clearable' && (
              <>
                <ComponentSection
                  title="clearable={true} (기본) — 입력 시 X 버튼 표시"
                  preview={
                    <div className="demo-col" style={wrap}>
                      <El defaultValue="입력 예시" placeholder={meta.placeholder} />
                    </div>
                  }
                  code={snippet([
                    `  return <${L} clearable value={value} onChange={(e) => setValue(e.target.value)} />`
                  ])}
                  notes={['입력값이 1자 이상이면 우측에 ✕ 버튼 자동 노출', 'clearable 기본값은 true']}
                />
                <ComponentSection
                  title="clearable={false} — X 버튼 숨김"
                  preview={
                    <div className="demo-col" style={wrap}>
                      <El defaultValue="입력 예시" clearable={false} placeholder={meta.placeholder} />
                    </div>
                  }
                  code={snippet([
                    `  return <${L} clearable={false} value={value} onChange={(e) => setValue(e.target.value)} />`
                  ])}
                  notes={['readOnly · disabled 상태에서는 clearable 여부와 무관하게 X 버튼 숨김']}
                />
                <ComponentSection
                  title="onClear — 삭제 콜백"
                  preview={
                    <div className="demo-col" style={wrap}>
                      <El defaultValue="입력 예시" placeholder={meta.placeholder} />
                    </div>
                  }
                  code={snippet([
                    '  return (',
                    `    <${L}`,
                    '      clearable',
                    "      onClear={() => setValue('')}",
                    '      value={value}',
                    '      onChange={(e) => setValue(e.target.value)}',
                    '    />',
                    '  )'
                  ])}
                  notes={['onClear 는 X 버튼 클릭 시 실행되는 콜백', '값 초기화 + 포커스 복귀 패턴에 유용']}
                />
              </>
            )}

            {tab === 'value' && (
              <>
                <ComponentSection
                  title="value — 제어 컴포넌트"
                  preview={<ControlledDemo El={El} />}
                  code={[
                    "import {useState} from 'react'",
                    "import Input from 'm2m-uiux-react/Input'",
                    '',
                    'export function Example() {',
                    "  const [value, setValue] = useState('입력된 값')",
                    `  return <${L} value={value} onChange={(e) => setValue(e.target.value)} />`,
                    '}'
                  ]}
                />
                <ComponentSection
                  title="value — 초기 빈 값"
                  preview={
                    <div className="demo-col" style={wrap}>
                      <El value="" onChange={() => {}} placeholder="아직 입력 없음" />
                    </div>
                  }
                  code={snippet([`  return <${L} value={value} onChange={(e) => setValue(e.target.value)} />`])}
                />
              </>
            )}

            {tab === 'onChange' && (
              <ComponentSection
                title="onChange — 이벤트 핸들러"
                preview={
                  <div className="demo-col" style={wrap}>
                    <El placeholder="타이핑해보세요" />
                  </div>
                }
                code={snippet([`  return <${L} value={value} onChange={(e) => setValue(e.target.value)} />`])}
                notes={['onChange 파라미터는 React.ChangeEvent<HTMLInputElement>']}
              />
            )}

            {tab === 'placeholder' && (
              <ComponentSection
                title="placeholder — 입력 전 안내 텍스트"
                preview={
                  <div className="demo-col" style={wrap}>
                    <El placeholder={meta.placeholder} />
                  </div>
                }
                code={snippet([
                  `  return <${L} placeholder="${meta.placeholder}" value={value} onChange={(e) => setValue(e.target.value)} />`
                ])}
                notes={['placeholder 는 value 가 비었을 때만 표시']}
              />
            )}

            {tab === 'disabled' && (
              <>
                <ComponentSection
                  title="disabled={true} — 완전 비활성"
                  preview={
                    <div className="demo-col" style={wrap}>
                      <El disabled placeholder="비활성 입력" />
                    </div>
                  }
                  code={[
                    "import Input from 'm2m-uiux-react/Input'",
                    '',
                    'export function Example() {',
                    `  return <${L} disabled placeholder="비활성 입력" />`,
                    '}'
                  ]}
                  notes={['포커스 및 클릭 완전 불가, 배경이 회색으로 변함']}
                />
                <ComponentSection
                  title="disabled — 값이 있는 경우"
                  preview={
                    <div className="demo-col" style={wrap}>
                      <El disabled defaultValue="수정 불가 값" />
                    </div>
                  }
                  code={[
                    "import Input from 'm2m-uiux-react/Input'",
                    '',
                    'export function Example() {',
                    `  return <${L} disabled value="수정 불가 값" readOnly />`,
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'readOnly' && (
              <ComponentSection
                title="readOnly={true} — 읽기 전용"
                preview={
                  <div className="demo-col" style={wrap}>
                    <El readOnly defaultValue="복사는 가능, 수정 불가" />
                  </div>
                }
                code={[
                  "import Input from 'm2m-uiux-react/Input'",
                  '',
                  'export function Example() {',
                  `  return <${L} readOnly value="복사는 가능, 수정 불가" />`,
                  '}'
                ]}
                notes={['복사는 가능하지만 수정은 불가', 'disabled 와 달리 포커스 가능']}
              />
            )}

            {tab === 'error' && (
              <ComponentSection
                title="error / helperText"
                preview={
                  <div className="demo-col" style={wrap}>
                    <El error="필수 입력 항목입니다." defaultValue="잘못된 값" />
                    <El helperText="영문/숫자 4자 이상" placeholder="아이디" />
                  </div>
                }
                code={[
                  "import Input from 'm2m-uiux-react/Input'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {/* error 에 문자열 전달 시 하단 메시지 자동 표시 */}',
                  `      <${L} error="필수 입력 항목입니다." />`,
                  `      <${L} helperText="영문/숫자 4자 이상" placeholder="아이디" />`,
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={['error 에 boolean 또는 string 전달 가능', 'error 가 없을 때만 helperText 가 표시됨']}
              />
            )}

            {tab === 'maxLength' && (
              <ComponentSection
                title="maxLength — 최대 글자 수 제한"
                preview={
                  <div className="demo-col" style={wrap}>
                    <El placeholder="최대 20자 입력" maxLength={20} showCount />
                  </div>
                }
                code={snippet([
                  `  return <${L} maxLength={20} showCount value={value} onChange={(e) => setValue(e.target.value)} />`
                ])}
                notes={['maxLength 초과 입력 자동 차단', 'showCount 와 함께 사용 권장']}
              />
            )}

            {tab === 'showCount' && (
              <ComponentSection
                title="showCount={true} — 글자 수 카운터"
                preview={
                  <div className="demo-col" style={wrap}>
                    <El placeholder="입력해주세요" maxLength={20} showCount defaultValue="테스트 입력" />
                  </div>
                }
                code={snippet([
                  `  return <${L} showCount maxLength={20} value={value} onChange={(e) => setValue(e.target.value)} />`
                ])}
                notes={[
                  "우측 하단에 '현재 입력 수 / maxLength' 형식으로 표시",
                  'maxLength 와 함께 사용해야 정확한 카운터 표시'
                ]}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={
                  <div className="demo-col" style={wrap}>
                    <El classNames="demo-hint" placeholder="커스텀 스타일 적용" />
                  </div>
                }
                code={snippet([
                  `  return <${L} classNames="w-full mt-2" value={value} onChange={(e) => setValue(e.target.value)} />`
                ])}
                notes={['classNames prop 은 문자열 또는 배열 허용']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}

function ControlledDemo({El}: {El: ComponentType<InputVariantProps>}) {
  const [value, setValue] = useState('입력된 값')
  return (
    <div className="demo-col" style={wrap}>
      <El value={value} onChange={(e) => setValue(e.target.value)} />
      <span className="demo-hint">입력값: {value || '(빈 값)'}</span>
    </div>
  )
}
