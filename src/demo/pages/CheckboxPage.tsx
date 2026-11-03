import Checkbox, {CHECKBOX_SIZE} from '~/components/Checkbox'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['checked', 'disabled', 'indeterminate', 'size', 'label', 'onChange', 'classNames']

const AGREE = ['이용약관에 동의합니다', '개인정보 처리방침에 동의합니다', '마케팅 수신에 동의합니다 (선택)']

export function CheckboxPage() {
  return (
    <>
      <PageHeader
        title="Checkbox"
        component="Checkbox"
        desc="— 체크박스 컴포넌트. checked · onChange 를 통해 상태를 제어합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'checked' && (
              <>
                <ComponentSection
                  title="checked={true} — 클릭해서 토글해보세요"
                  preview={<Checkbox label="선택됨" defaultChecked />}
                  code={[
                    "import {useState} from 'react'",
                    "import Checkbox from 'm2m-uiux-react/Checkbox'",
                    '',
                    'export function Example() {',
                    '  const [checked, setChecked] = useState(true)',
                    '  return (',
                    '    <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label="선택됨" />',
                    '  )',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="checked={false} — 클릭해서 토글해보세요"
                  preview={<Checkbox label="선택 안 됨" />}
                  code={[
                    "import {useState} from 'react'",
                    "import Checkbox from 'm2m-uiux-react/Checkbox'",
                    '',
                    'export function Example() {',
                    '  const [checked, setChecked] = useState(false)',
                    '  return <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label="선택 안 됨" />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'disabled' && (
              <>
                <ComponentSection
                  title="disabled={true} — 체크된 상태"
                  preview={<Checkbox label="비활성 체크" disabled defaultChecked />}
                  code={[
                    "import Checkbox from 'm2m-uiux-react/Checkbox'",
                    '',
                    'export function Example() {',
                    '  return <Checkbox checked disabled label="비활성 체크" />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="disabled={true} — 미체크 상태"
                  preview={<Checkbox label="비활성 미체크" disabled />}
                  code={[
                    "import Checkbox from 'm2m-uiux-react/Checkbox'",
                    '',
                    'export function Example() {',
                    '  return <Checkbox disabled label="비활성 미체크" />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'indeterminate' && (
              <ComponentSection
                title="indeterminate={true}"
                preview={<Checkbox indeterminate label="부분 선택" />}
                code={[
                  "import Checkbox from 'm2m-uiux-react/Checkbox'",
                  '',
                  'export function Example() {',
                  '  return <Checkbox indeterminate label="부분 선택" />',
                  '}'
                ]}
                notes={[
                  '전체 선택/해제 중간 상태에 사용 (트리 · 테이블 전체선택 등)',
                  'DOM 프로퍼티로 반영되며 checked 보다 우선하는 시각 표현'
                ]}
              />
            )}

            {tab === 'size' &&
              (['SM', 'MD', 'LG'] as const).map((s) => {
                const label = s === 'SM' ? 'Small' : s === 'MD' ? 'Medium' : 'Large'
                return (
                  <ComponentSection
                    key={s}
                    title={`size="${CHECKBOX_SIZE[s]}"${s === 'MD' ? ' (기본)' : ''}`}
                    preview={<Checkbox size={CHECKBOX_SIZE[s]} defaultChecked label={label} />}
                    code={[
                      "import Checkbox, {CHECKBOX_SIZE} from 'm2m-uiux-react/Checkbox'",
                      '',
                      'export function Example() {',
                      `  return <Checkbox size={CHECKBOX_SIZE['${s}']} checked>${label}</Checkbox>`,
                      '}'
                    ]}
                  />
                )
              })}

            {tab === 'label' && (
              <>
                <ComponentSection
                  title="label — 텍스트 레이블"
                  preview={
                    <div className="demo-col">
                      {AGREE.map((t, i) => (
                        <Checkbox key={t} label={t} defaultChecked={i < 2} />
                      ))}
                    </div>
                  }
                  code={[
                    "import Checkbox from 'm2m-uiux-react/Checkbox'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <>',
                    '      <Checkbox checked label="이용약관에 동의합니다" />',
                    '      <Checkbox label="마케팅 수신에 동의합니다" />',
                    '    </>',
                    '  )',
                    '}'
                  ]}
                  notes={['label 은 문자열 또는 ReactNode 전달 가능']}
                />
                <ComponentSection
                  title="label 없음 — 아이콘 전용"
                  preview={<Checkbox defaultChecked />}
                  code={[
                    "import Checkbox from 'm2m-uiux-react/Checkbox'",
                    '',
                    'export function Example() {',
                    '  return <Checkbox checked />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'onChange' && (
              <ComponentSection
                title="onChange 이벤트 핸들러 — 클릭해보세요"
                preview={<Checkbox label="클릭해보세요" />}
                code={[
                  "import {useState} from 'react'",
                  "import Checkbox from 'm2m-uiux-react/Checkbox'",
                  '',
                  'export function Example() {',
                  '  const [checked, setChecked] = useState(false)',
                  '  return (',
                  '    <Checkbox',
                  '      checked={checked}',
                  '      onChange={(e) => setChecked(e.target.checked)}',
                  '      label="클릭해보세요"',
                  '    />',
                  '  )',
                  '}'
                ]}
                notes={['onChange 파라미터는 React.ChangeEvent<HTMLInputElement>']}
              />
            )}

            {tab === 'classNames' && (
              <ComponentSection
                title="classNames — 추가 스타일"
                preview={<Checkbox classNames="demo-hint" defaultChecked label="커스텀 스타일" />}
                code={[
                  "import Checkbox from 'm2m-uiux-react/Checkbox'",
                  '',
                  'export function Example() {',
                  '  return <Checkbox checked classNames="mt-2" label="커스텀 스타일" />',
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
