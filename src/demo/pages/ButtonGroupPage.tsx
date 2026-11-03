import Button, {BUTTON_VARIANT} from '~/components/Button'
import ButtonGroup, {BUTTON_GROUP_DIRECTION, BUTTON_GROUP_SIZE} from '~/components/ButtonGroup'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['direction', 'attached', 'size', 'disabled']

export function ButtonGroupPage() {
  return (
    <>
      <PageHeader
        title="ButtonGroup"
        component="ButtonGroup"
        desc="— 버튼 묶음 컴포넌트. 여러 버튼을 하나의 그룹으로 관리합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'direction' && (
              <>
                <ComponentSection
                  title='direction="row" (기본) — 가로 나열'
                  preview={
                    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['ROW']}>
                      <Button>이전</Button>
                      <Button>현재</Button>
                      <Button>다음</Button>
                    </ButtonGroup>
                  }
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    "import ButtonGroup, {BUTTON_GROUP_DIRECTION} from 'm2m-uiux-react/ButtonGroup'",
                    '',
                    'export function Example() {',
                    '  return (',
                    "    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['ROW']}>",
                    '      <Button>이전</Button>',
                    '      <Button>현재</Button>',
                    '      <Button>다음</Button>',
                    '    </ButtonGroup>',
                    '  )',
                    '}'
                  ]}
                  notes={['direction 기본값은 row (가로 나열)']}
                />
                <ComponentSection
                  title='direction="column" — 세로 쌓기'
                  preview={
                    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['COLUMN']}>
                      <Button>저장</Button>
                      <Button variant={BUTTON_VARIANT['GHOST']}>취소</Button>
                      <Button variant={BUTTON_VARIANT['SECONDARY']}>삭제</Button>
                    </ButtonGroup>
                  }
                  code={[
                    "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
                    "import ButtonGroup, {BUTTON_GROUP_DIRECTION} from 'm2m-uiux-react/ButtonGroup'",
                    '',
                    'export function Example() {',
                    '  return (',
                    "    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['COLUMN']}>",
                    '      <Button>저장</Button>',
                    "      <Button variant={BUTTON_VARIANT['GHOST']}>취소</Button>",
                    "      <Button variant={BUTTON_VARIANT['SECONDARY']}>삭제</Button>",
                    '    </ButtonGroup>',
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'attached' && (
              <>
                <ComponentSection
                  title="attached={true} — 버튼 사이 여백 없이 붙임 (row)"
                  preview={
                    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['ROW']} attached>
                      <Button>1일</Button>
                      <Button>1주</Button>
                      <Button>1달</Button>
                      <Button>3달</Button>
                    </ButtonGroup>
                  }
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    "import ButtonGroup, {BUTTON_GROUP_DIRECTION} from 'm2m-uiux-react/ButtonGroup'",
                    '',
                    'export function Example() {',
                    '  return (',
                    "    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['ROW']} attached>",
                    '      <Button>1일</Button>',
                    '      <Button>1주</Button>',
                    '      <Button>1달</Button>',
                    '      <Button>3달</Button>',
                    '    </ButtonGroup>',
                    '  )',
                    '}'
                  ]}
                  notes={['attached 모드에서는 경계 버튼의 border-radius 가 자동 조정됨']}
                />
                <ComponentSection
                  title="attached={true} — 세로 붙임 (column)"
                  preview={
                    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['COLUMN']} attached>
                      <Button>전체</Button>
                      <Button>진행 중</Button>
                      <Button>완료</Button>
                    </ButtonGroup>
                  }
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    "import ButtonGroup, {BUTTON_GROUP_DIRECTION} from 'm2m-uiux-react/ButtonGroup'",
                    '',
                    'export function Example() {',
                    '  return (',
                    "    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['COLUMN']} attached>",
                    '      <Button>전체</Button>',
                    '      <Button>진행 중</Button>',
                    '      <Button>완료</Button>',
                    '    </ButtonGroup>',
                    '  )',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="attached={false} (기본) — 여백 있음"
                  preview={
                    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['ROW']} attached={false}>
                      <Button>확인</Button>
                      <Button variant={BUTTON_VARIANT['GHOST']}>취소</Button>
                    </ButtonGroup>
                  }
                  code={[
                    "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
                    "import ButtonGroup from 'm2m-uiux-react/ButtonGroup'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <ButtonGroup>',
                    '      <Button>확인</Button>',
                    "      <Button variant={BUTTON_VARIANT['GHOST']}>취소</Button>",
                    '    </ButtonGroup>',
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'size' && (
              <>
                {(
                  [
                    ['LG', ' — 하위 버튼 일괄 크기 적용'],
                    ['MD', ' (기본)'],
                    ['SM', '']
                  ] as const
                ).map(([s, suffix]) => (
                  <ComponentSection
                    key={s}
                    title={`size="${BUTTON_GROUP_SIZE[s]}"${suffix}`}
                    preview={
                      <ButtonGroup size={BUTTON_GROUP_SIZE[s]}>
                        <Button>확인</Button>
                        <Button variant={BUTTON_VARIANT['GHOST']}>취소</Button>
                        <Button variant={BUTTON_VARIANT['SECONDARY']}>삭제</Button>
                      </ButtonGroup>
                    }
                    code={[
                      "import Button from 'm2m-uiux-react/Button'",
                      "import ButtonGroup, {BUTTON_GROUP_SIZE} from 'm2m-uiux-react/ButtonGroup'",
                      '',
                      'export function Example() {',
                      '  return (',
                      `    <ButtonGroup size={BUTTON_GROUP_SIZE['${s}']}>`,
                      '      <Button>확인</Button>',
                      '      <Button>취소</Button>',
                      '    </ButtonGroup>',
                      '  )',
                      '}'
                    ]}
                    notes={
                      s === 'LG' ? ['size 는 그룹 내 모든 버튼에 일괄 적용됨', '개별 버튼의 size 는 무시됨'] : undefined
                    }
                  />
                ))}
                <ComponentSection
                  title="size — attached 와 조합"
                  preview={
                    <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
                      {(['LG', 'MD', 'SM'] as const).map((s) => (
                        <ButtonGroup
                          key={s}
                          direction={BUTTON_GROUP_DIRECTION['ROW']}
                          attached
                          size={BUTTON_GROUP_SIZE[s]}
                        >
                          <Button>{BUTTON_GROUP_SIZE[s]} A</Button>
                          <Button>{BUTTON_GROUP_SIZE[s]} B</Button>
                          <Button>{BUTTON_GROUP_SIZE[s]} C</Button>
                        </ButtonGroup>
                      ))}
                    </div>
                  }
                  code={[
                    "import ButtonGroup, {BUTTON_GROUP_SIZE} from 'm2m-uiux-react/ButtonGroup'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <>',
                    "      <ButtonGroup attached size={BUTTON_GROUP_SIZE['LG']}>…</ButtonGroup>",
                    "      <ButtonGroup attached size={BUTTON_GROUP_SIZE['MD']}>…</ButtonGroup>",
                    "      <ButtonGroup attached size={BUTTON_GROUP_SIZE['SM']}>…</ButtonGroup>",
                    '    </>',
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'disabled' && (
              <>
                <ComponentSection
                  title="disabled={true} — 그룹 전체 비활성화"
                  preview={
                    <ButtonGroup disabled>
                      <Button>저장</Button>
                      <Button variant={BUTTON_VARIANT['GHOST']}>미리보기</Button>
                      <Button variant={BUTTON_VARIANT['SECONDARY']}>삭제</Button>
                    </ButtonGroup>
                  }
                  code={[
                    "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
                    "import ButtonGroup from 'm2m-uiux-react/ButtonGroup'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <ButtonGroup disabled={true}>',
                    '      <Button>저장</Button>',
                    "      <Button variant={BUTTON_VARIANT['GHOST']}>미리보기</Button>",
                    "      <Button variant={BUTTON_VARIANT['SECONDARY']}>삭제</Button>",
                    '    </ButtonGroup>',
                    '  )',
                    '}'
                  ]}
                  notes={['그룹에 disabled 지정 시 하위 버튼 전체에 일괄 적용됨']}
                />
                <ComponentSection
                  title="disabled — 개별 버튼 비활성화"
                  preview={
                    <ButtonGroup>
                      <Button>활성</Button>
                      <Button disabled>비활성</Button>
                      <Button>활성</Button>
                    </ButtonGroup>
                  }
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    "import ButtonGroup from 'm2m-uiux-react/ButtonGroup'",
                    '',
                    'export function Example() {',
                    '  return (',
                    '    <ButtonGroup>',
                    '      <Button>활성</Button>',
                    '      <Button disabled>비활성</Button>',
                    '      <Button>활성</Button>',
                    '    </ButtonGroup>',
                    '  )',
                    '}'
                  ]}
                  notes={['그룹 disabled 가 false 여도 개별 버튼에 disabled 지정 가능']}
                />
                <ComponentSection
                  title="disabled={true} — attached + disabled 조합"
                  preview={
                    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['ROW']} attached disabled>
                      <Button>전체</Button>
                      <Button>진행 중</Button>
                      <Button>완료</Button>
                    </ButtonGroup>
                  }
                  code={[
                    "import Button from 'm2m-uiux-react/Button'",
                    "import ButtonGroup, {BUTTON_GROUP_DIRECTION} from 'm2m-uiux-react/ButtonGroup'",
                    '',
                    'export function Example() {',
                    '  return (',
                    "    <ButtonGroup direction={BUTTON_GROUP_DIRECTION['ROW']} attached disabled>",
                    '      <Button>전체</Button>',
                    '      <Button>진행 중</Button>',
                    '      <Button>완료</Button>',
                    '    </ButtonGroup>',
                    '  )',
                    '}'
                  ]}
                />
              </>
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
