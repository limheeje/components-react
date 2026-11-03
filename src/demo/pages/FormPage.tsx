import {useState} from 'react'
import type {ReactElement} from 'react'

import Button, {BUTTON_VARIANT} from '~/components/Button'
import Form, {FORM_ACTIONS_ALIGN, FORM_LAYOUT} from '~/components/Form'
import Input from '~/components/Input'
import Select from '~/components/Select'
import Textarea from '~/components/Textarea'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = [
  'vertical',
  'horizontal',
  '2column',
  'searchbar',
  'range',
  'inline-multi',
  'multi-button',
  'validation',
  'readonly'
]

const DEPT = [
  {label: '개발팀', value: 'dev'},
  {label: '디자인팀', value: 'design'},
  {label: '기획팀', value: 'plan'},
  {label: '마케팅팀', value: 'mkt'}
]

function VerticalForm() {
  return (
    <Form style={{maxWidth: 400}}>
      <Form.Field label="이름" required>
        <Input.Text placeholder="홍길동" />
      </Form.Field>
      <Form.Field label="이메일" required>
        <Input.Email placeholder="user@example.com" />
      </Form.Field>
      <Form.Field label="전화번호">
        <Input.Tel placeholder="010-0000-0000" />
      </Form.Field>
      <Form.Field label="부서">
        <Select options={DEPT} placeholder="선택하세요" />
      </Form.Field>
      <Form.Actions align={FORM_ACTIONS_ALIGN['BETWEEN']}>
        <Button variant={BUTTON_VARIANT['GHOST']} fullWidth>
          취소
        </Button>
        <Button htmlType="submit" fullWidth>
          저장
        </Button>
      </Form.Actions>
    </Form>
  )
}

function HorizontalForm() {
  return (
    <Form layout={FORM_LAYOUT['HORIZONTAL']} labelWidth={80} style={{maxWidth: 480}}>
      <Form.Field label="이름" required>
        <Input.Text placeholder="홍길동" />
      </Form.Field>
      <Form.Field label="이메일" required>
        <Input.Email placeholder="user@example.com" />
      </Form.Field>
      <Form.Field label="전화번호">
        <Input.Tel placeholder="010-0000-0000" />
      </Form.Field>
      <Form.Field label="부서">
        <Select options={DEPT} placeholder="선택하세요" />
      </Form.Field>
      <Form.Actions>
        <Button variant={BUTTON_VARIANT['GHOST']}>취소</Button>
        <Button htmlType="submit">저장</Button>
      </Form.Actions>
    </Form>
  )
}

function TwoColForm() {
  return (
    <Form style={{maxWidth: 560}}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
        <Form.Field label="성" required>
          <Input.Text placeholder="홍" />
        </Form.Field>
        <Form.Field label="이름" required>
          <Input.Text placeholder="길동" />
        </Form.Field>
        <Form.Field label="이메일" required>
          <Input.Email placeholder="user@example.com" />
        </Form.Field>
        <Form.Field label="전화번호">
          <Input.Tel placeholder="010-0000-0000" />
        </Form.Field>
        <Form.Field label="생년월일">
          <Input.Text placeholder="YYYY-MM-DD" />
        </Form.Field>
        <Form.Field label="부서">
          <Select options={DEPT} placeholder="선택하세요" />
        </Form.Field>
      </div>
      <Form.Field label="주소">
        <Input.Text placeholder="서울특별시 강남구 테헤란로" />
      </Form.Field>
      <Form.Field label="메모">
        <Textarea placeholder="추가 내용을 입력하세요" rows={3} />
      </Form.Field>
      <Form.Actions>
        <Button variant={BUTTON_VARIANT['GHOST']}>초기화</Button>
        <Button htmlType="submit">등록</Button>
      </Form.Actions>
    </Form>
  )
}

function SearchBarForm() {
  return (
    <Form style={{maxWidth: 560}}>
      <Form.Field label="검색어" layout={FORM_LAYOUT['INLINE']}>
        <div className="demo-form-row demo-form-row--search">
          <Input.Search placeholder="검색어를 입력해주세요" />
          <Button htmlType="submit">검색</Button>
        </div>
      </Form.Field>
      <Form.Field label="사번" layout={FORM_LAYOUT['INLINE']}>
        <div className="demo-form-row demo-form-row--id">
          <Input.Text placeholder="EMP-0000" />
          <Button variant={BUTTON_VARIANT['GHOST']}>조회</Button>
          <Button>확인</Button>
        </div>
      </Form.Field>
      <Form.Field label="조건" layout={FORM_LAYOUT['INLINE']}>
        <div className="demo-form-row demo-form-row--condition">
          <Select
            options={[
              {label: '이름', value: 'name'},
              {label: '이메일', value: 'email'}
            ]}
            placeholder="이름"
          />
          <Input.Text placeholder="검색값" />
          <Button>검색</Button>
        </div>
      </Form.Field>
    </Form>
  )
}

function RangeForm() {
  return (
    <Form style={{maxWidth: 560}}>
      <Form.Field label="기간" required layout={FORM_LAYOUT['INLINE']}>
        <div className="demo-form-row demo-form-row--range">
          <Input.Text placeholder="YYYY-MM-DD" />
          <span className="demo-form-sep">~</span>
          <Input.Text placeholder="YYYY-MM-DD" />
          <span className="demo-form-tail">
            <Button variant={BUTTON_VARIANT['GHOST']}>오늘</Button>
            <Button variant={BUTTON_VARIANT['GHOST']}>이번 달</Button>
          </span>
        </div>
      </Form.Field>
      <Form.Field label="금액" layout={FORM_LAYOUT['INLINE']}>
        <div className="demo-form-row demo-form-row--range">
          <Input.Number placeholder="최소 금액" />
          <span className="demo-form-sep">~</span>
          <Input.Number placeholder="최대 금액" />
          <span className="demo-form-tail demo-form-unit">원</span>
        </div>
      </Form.Field>
      <Form.Field label="시간" layout={FORM_LAYOUT['INLINE']}>
        <div className="demo-form-row demo-form-row--range">
          <Input.Text placeholder="HH:mm" defaultValue="09:00" />
          <span className="demo-form-sep">~</span>
          <Input.Text placeholder="HH:mm" defaultValue="18:00" />
          <span className="demo-form-tail" />
        </div>
      </Form.Field>
    </Form>
  )
}

function InlineMultiForm() {
  return (
    <Form style={{maxWidth: 600}}>
      <Form.Field label="성명" required layout={FORM_LAYOUT['INLINE']}>
        <div className="demo-form-row demo-form-row--name">
          <Input.Text placeholder="성" />
          <Input.Text placeholder="이름" />
        </div>
      </Form.Field>
      <Form.Field label="주소" required layout={FORM_LAYOUT['INLINE']}>
        <div className="demo-form-stack">
          <div className="demo-form-row demo-form-row--zip">
            <Input.Text placeholder="우편번호" />
            <Button variant={BUTTON_VARIANT['GHOST']}>주소 검색</Button>
          </div>
          <Input.Text placeholder="기본 주소" />
          <Input.Text placeholder="상세 주소 (동/호수)" />
        </div>
      </Form.Field>
      <Form.Field label="전화번호" layout={FORM_LAYOUT['INLINE']}>
        <div className="demo-form-row demo-form-row--phone">
          <Input.Text defaultValue="010" />
          <span className="demo-form-sep">-</span>
          <Input.Text placeholder="0000" />
          <span className="demo-form-sep">-</span>
          <Input.Text placeholder="0000" />
        </div>
      </Form.Field>
      <Form.Field label="수량" layout={FORM_LAYOUT['INLINE']}>
        <div className="demo-form-row demo-form-row--qty">
          <Input.Number placeholder="0" />
          <Select
            options={[
              {label: '개', value: 'ea'},
              {label: '박스', value: 'box'},
              {label: 'kg', value: 'kg'},
              {label: 'm', value: 'm'},
              {label: 'L', value: 'l'}
            ]}
            placeholder="개"
          />
          <span className="demo-form-unit">재고: 50개</span>
        </div>
      </Form.Field>
    </Form>
  )
}

function MultiButtonForm() {
  const [status, setStatus] = useState('')
  return (
    <Form style={{maxWidth: 480}}>
      <Form.Field label="제목" required>
        <Input.Text placeholder="제목을 입력해주세요" />
      </Form.Field>
      <Form.Field label="내용">
        <Textarea rows={4} />
      </Form.Field>
      <Form.Field label="카테고리">
        <Select
          options={[
            {label: '공지사항', value: 'notice'},
            {label: '이벤트', value: 'event'},
            {label: '업데이트', value: 'update'},
            {label: '기타', value: 'etc'}
          ]}
          placeholder="선택하세요"
        />
      </Form.Field>
      <Form.Actions align={FORM_ACTIONS_ALIGN['BETWEEN']}>
        <Button variant={BUTTON_VARIANT['GHOST']} onClick={() => setStatus('임시저장')}>
          임시저장
        </Button>
        <Button onClick={() => setStatus('등록완료')}>등록</Button>
        <Button variant={BUTTON_VARIANT['SECONDARY']} onClick={() => setStatus('삭제')}>
          삭제
        </Button>
      </Form.Actions>
      {status && <span className="demo-hint">→ {status}</span>}
    </Form>
  )
}

function ValidationForm() {
  const [form, setForm] = useState({name: '', email: '', pw: ''})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [ok, setOk] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = '이름을 입력해주세요.'
    if (!form.email.includes('@')) e.email = '올바른 이메일 형식이 아닙니다.'
    if (form.pw.length < 8) e.pw = '비밀번호는 8자 이상이어야 합니다.'
    setErrors(e)
    if (Object.keys(e).length === 0) {
      setOk(true)
      setTimeout(() => setOk(false), 2000)
    }
  }

  return (
    <Form
      style={{maxWidth: 400}}
      onSubmit={(e) => {
        e.preventDefault()
        validate()
      }}
      noValidate
    >
      <Form.Field label="이름" required error={errors.name}>
        <Input.Text
          value={form.name}
          error={Boolean(errors.name)}
          onChange={(e) => setForm({...form, name: e.target.value})}
          placeholder="홍길동"
        />
      </Form.Field>
      <Form.Field label="이메일" required error={errors.email}>
        <Input.Email
          value={form.email}
          error={Boolean(errors.email)}
          onChange={(e) => setForm({...form, email: e.target.value})}
          placeholder="user@example.com"
        />
      </Form.Field>
      <Form.Field label="비밀번호" required error={errors.pw} help="8자 이상">
        <Input.Password
          value={form.pw}
          error={Boolean(errors.pw)}
          onChange={(e) => setForm({...form, pw: e.target.value})}
          placeholder="8자 이상"
        />
      </Form.Field>
      <Form.Actions>
        <Button htmlType="submit" variant={ok ? BUTTON_VARIANT['EMPHASIS'] : BUTTON_VARIANT['PRIMARY']}>
          {ok ? '✓ 검증 통과!' : '검증하기'}
        </Button>
      </Form.Actions>
    </Form>
  )
}

function ReadOnlyForm() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 400}}>
      <div
        style={{
          padding: '8px 14px',
          borderRadius: 8,
          fontSize: 13,
          background: 'var(--m2m-pg-info-bg)',
          border: '1px solid var(--m2m-pg-info-border)',
          color: 'var(--m2m-pg-info-dark)'
        }}
      >
        ℹ 조회 모드: 수정 불가 상태입니다.
      </div>
      <Form layout={FORM_LAYOUT['HORIZONTAL']} labelWidth={72} disabled>
        <Form.Field label="이름">
          <Input.Text defaultValue="홍길동" />
        </Form.Field>
        <Form.Field label="이메일">
          <Input.Email defaultValue="hong@example.com" />
        </Form.Field>
        <Form.Field label="부서">
          <Input.Text defaultValue="개발팀" />
        </Form.Field>
        <Form.Field label="입사일">
          <Input.Text defaultValue="2024-03-01" />
        </Form.Field>
      </Form>
      <Form.Actions align={FORM_ACTIONS_ALIGN['BETWEEN']}>
        <Button variant={BUTTON_VARIANT['GHOST']} fullWidth>
          목록으로
        </Button>
        <Button fullWidth>수정 모드로 전환</Button>
      </Form.Actions>
    </div>
  )
}

const SECTIONS: Record<string, {title: string; el: ReactElement; code: string[]; notes?: string[]}> = {
  vertical: {
    title: 'vertical — 세로 단일 컬럼 (기본 패턴)',
    el: <VerticalForm />,
    code: [
      "import Form, {FORM_LAYOUT, FORM_ACTIONS_ALIGN} from 'm2m-uiux-react/Form'",
      "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
      "import Input from 'm2m-uiux-react/Input'",
      "import Select from 'm2m-uiux-react/Select'",
      '',
      'export function Example() {',
      '  return (',
      "    <Form layout={FORM_LAYOUT['VERTICAL']} onSubmit={(e) => e.preventDefault()}>",
      '      <Form.Field name="name" label="이름" required>',
      '        <Input.Text placeholder="홍길동" />',
      '      </Form.Field>',
      '      <Form.Field name="email" label="이메일" required>',
      '        <Input.Email />',
      '      </Form.Field>',
      '      <Form.Field name="dept" label="부서">',
      '        <Select options={deptOptions} />',
      '      </Form.Field>',
      "      <Form.Actions align={FORM_ACTIONS_ALIGN['BETWEEN']}>",
      "        <Button variant={BUTTON_VARIANT['GHOST']} fullWidth>취소</Button>",
      '        <Button htmlType="submit" fullWidth>저장</Button>',
      '      </Form.Actions>',
      '    </Form>',
      '  )',
      '}'
    ],
    notes: ['레이블이 인풋 위에 위치합니다 (기본값)', '모바일 친화적 레이아웃']
  },
  horizontal: {
    title: 'horizontal — 가로 배치, 라벨 우측 정렬',
    el: <HorizontalForm />,
    code: [
      "import Form, {FORM_LAYOUT} from 'm2m-uiux-react/Form'",
      "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
      "import Input from 'm2m-uiux-react/Input'",
      '',
      'export function Example() {',
      '  return (',
      "    <Form layout={FORM_LAYOUT['HORIZONTAL']} labelWidth={80} onSubmit={(e) => e.preventDefault()}>",
      '      <Form.Field name="name" label="이름" required>',
      '        <Input.Text />',
      '      </Form.Field>',
      '      <Form.Actions style={{ justifyContent: "flex-end" }}>',
      "        <Button variant={BUTTON_VARIANT['GHOST']}>취소</Button>",
      '        <Button htmlType="submit">저장</Button>',
      '      </Form.Actions>',
      '    </Form>',
      '  )',
      '}'
    ],
    notes: ['라벨이 인풋 왼쪽에 위치합니다', 'labelWidth prop 으로 라벨 너비 지정']
  },
  '2column': {
    title: '2-column grid — 한 줄에 [라벨+인풋] [라벨+인풋]',
    el: <TwoColForm />,
    code: [
      "import Form from 'm2m-uiux-react/Form'",
      "import Input from 'm2m-uiux-react/Input'",
      '',
      'export function Example() {',
      '  return (',
      '    <Form>',
      '      {/* 2컬럼 그리드 내부에 폼 필드 배치 */}',
      '      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>',
      '        <Form.Field label="성" required><Input.Text placeholder="홍" /></Form.Field>',
      '        <Form.Field label="이름" required><Input.Text placeholder="길동" /></Form.Field>',
      '      </div>',
      '      {/* 풀너비 필드 */}',
      '      <Form.Field label="주소"><Input.Text /></Form.Field>',
      '    </Form>',
      '  )',
      '}'
    ],
    notes: ['CSS grid 로 2컬럼 구성', '풀너비가 필요한 필드는 grid 바깥에 배치']
  },
  searchbar: {
    title: '검색 바 — 라벨 + 인풋 + 버튼(들)',
    el: <SearchBarForm />,
    code: [
      "import Form, {FORM_LAYOUT} from 'm2m-uiux-react/Form'",
      "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
      "import Input from 'm2m-uiux-react/Input'",
      "import Select from 'm2m-uiux-react/Select'",
      '',
      'export function Example() {',
      '  return (',
      '    <Form>',
      '      {/* inline 필드는 같은 폼 안에서 가장 긴 라벨 기준으로 컨트롤 정렬 */}',
      '      <Form.Field label="검색어" layout={FORM_LAYOUT[\'INLINE\']}>',
      '        <div className="row row--search"> {/* grid: 1fr auto */}',
      '          <Input.Search placeholder="검색어를 입력해주세요" />',
      '          <Button htmlType="submit">검색</Button>',
      '        </div>',
      '      </Form.Field>',
      '      <Form.Field label="사번" layout={FORM_LAYOUT[\'INLINE\']}>',
      '        <div className="row row--id"> {/* grid: 1fr auto auto */}',
      '          <Input.Text placeholder="EMP-0000" />',
      "          <Button variant={BUTTON_VARIANT['GHOST']}>조회</Button>",
      '          <Button>확인</Button>',
      '        </div>',
      '      </Form.Field>',
      '      <Form.Field label="조건" layout={FORM_LAYOUT[\'INLINE\']}>',
      '        <div className="row row--condition"> {/* grid: 120px 1fr auto */}',
      '          <Select options={options} />',
      '          <Input.Text placeholder="검색값" />',
      '          <Button>검색</Button>',
      '        </div>',
      '      </Form.Field>',
      '    </Form>',
      '  )',
      '}'
    ],
    notes: [
      '라벨 + 인풋 + 버튼을 한 줄에 배치하는 패턴',
      'inline 필드는 같은 폼 안에서 라벨 열을 공유 — 가장 긴 라벨 너비에 맞춰 모든 행의 컨트롤 좌우 끝이 정렬됩니다',
      '라벨은 줄바꿈되지 않습니다 (줄바꿈이 필요하면 라벨에 <br> 사용)'
    ]
  },
  range: {
    title: '범위 입력 — [라벨] [시작값] ~ [종료값]',
    el: <RangeForm />,
    code: [
      "import Form, {FORM_LAYOUT} from 'm2m-uiux-react/Form'",
      "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
      "import Input from 'm2m-uiux-react/Input'",
      '',
      'export function Example() {',
      '  return (',
      '    <Form>',
      '      {/* 공통 4열 grid: 시작 | ~ | 종료 | 부가 */}',
      '      <Form.Field label="기간" required layout={FORM_LAYOUT[\'INLINE\']}>',
      '        <div className="row row--range">',
      '          <Input.Text placeholder="YYYY-MM-DD" />',
      '          <span>~</span>',
      '          <Input.Text placeholder="YYYY-MM-DD" />',
      '          <span>',
      "            <Button variant={BUTTON_VARIANT['GHOST']}>오늘</Button>",
      "            <Button variant={BUTTON_VARIANT['GHOST']}>이번 달</Button>",
      '          </span>',
      '        </div>',
      '      </Form.Field>',
      '      <Form.Field label="금액" layout={FORM_LAYOUT[\'INLINE\']}>',
      '        <div className="row row--range">',
      '          <Input.Number placeholder="최소 금액" /> <span>~</span>',
      '          <Input.Number placeholder="최대 금액" /> <span>원</span>',
      '        </div>',
      '      </Form.Field>',
      '    </Form>',
      '  )',
      '}'
    ],
    notes: [
      '날짜·금액·시간 범위 모두 동일한 4열 그리드(시작 | ~ | 종료 | 부가)로 구성해 행마다 입력 칸 너비가 같고, 버튼은 인풋(40px) 높이에 맞춰 늘어납니다'
    ]
  },
  'inline-multi': {
    title: '인라인 복합 — 한 줄에 여러 인풋 조합',
    el: <InlineMultiForm />,
    code: [
      "import Form, {FORM_LAYOUT} from 'm2m-uiux-react/Form'",
      "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
      "import Input from 'm2m-uiux-react/Input'",
      "import Select from 'm2m-uiux-react/Select'",
      '',
      'export function Example() {',
      '  return (',
      '    <Form>',
      '      {/* 전화번호 3분할: grid 1fr auto 1fr auto 1fr */}',
      '      <Form.Field label="전화번호" layout={FORM_LAYOUT[\'INLINE\']}>',
      '        <div className="row row--phone">',
      '          <Input.Text defaultValue="010" /> <span>-</span>',
      '          <Input.Text /> <span>-</span> <Input.Text />',
      '        </div>',
      '      </Form.Field>',
      '      {/* 주소: 우편번호 + 검색 버튼, 아래 입력은 전체 폭 */}',
      '      <Form.Field label="주소" required layout={FORM_LAYOUT[\'INLINE\']}>',
      '        <div className="stack">',
      '          <div className="row row--zip">',
      '            <Input.Text placeholder="우편번호" />',
      "            <Button variant={BUTTON_VARIANT['GHOST']}>주소 검색</Button>",
      '          </div>',
      '          <Input.Text placeholder="기본 주소" />',
      '          <Input.Text placeholder="상세 주소 (동/호수)" />',
      '        </div>',
      '      </Form.Field>',
      '    </Form>',
      '  )',
      '}'
    ],
    notes: [
      '전화번호 분할, 주소 검색, 수량+단위 등 실무 패턴',
      '행마다 grid-template-columns 로 비율을 지정해 컨트롤 영역 전체 폭을 채웁니다'
    ]
  },
  'multi-button': {
    title: '버튼 3개 — 임시저장 / 등록 / 삭제',
    el: <MultiButtonForm />,
    code: [
      "import Form, {FORM_ACTIONS_ALIGN} from 'm2m-uiux-react/Form'",
      "import Button, {BUTTON_VARIANT} from 'm2m-uiux-react/Button'",
      '',
      'export function Example() {',
      '  return (',
      '    <Form>',
      "      <Form.Actions align={FORM_ACTIONS_ALIGN['BETWEEN']}>",
      '        {/* 임시저장 — 보조 */}',
      "        <Button variant={BUTTON_VARIANT['GHOST']}>임시저장</Button>",
      '        {/* 등록 — 주 액션 */}',
      '        <Button htmlType="submit">등록</Button>',
      '        {/* 삭제 — 위험 액션 */}',
      "        <Button variant={BUTTON_VARIANT['SECONDARY']}>삭제</Button>",
      '      </Form.Actions>',
      '    </Form>',
      '  )',
      '}'
    ],
    notes: ['주 액션 버튼을 크게 강조', '위험 액션(삭제)은 색상으로 구분']
  },
  validation: {
    title: '유효성 검사 — 에러 메시지 인라인 표시',
    el: <ValidationForm />,
    code: [
      "import {useForm} from 'react-hook-form'",
      "import Form from 'm2m-uiux-react/Form'",
      "import Input from 'm2m-uiux-react/Input'",
      "import Button from 'm2m-uiux-react/Button'",
      '',
      'export function Example() {',
      '  const {register, handleSubmit, formState: {errors}} = useForm()',
      '  return (',
      '    <Form onSubmit={handleSubmit((data) => console.log(data))}>',
      '      <Form.Field label="이름" required error={errors.name?.message as string}>',
      '        <Input.Text',
      '          {...register("name", { required: "이름을 입력해주세요." })}',
      '          error={!!errors.name}',
      '        />',
      '      </Form.Field>',
      '      <Form.Field label="이메일" required error={errors.email?.message as string}>',
      '        <Input.Email',
      '          {...register("email", { pattern: { value: /^[^@]+@[^@]+$/, message: "이메일 형식 오류" } })}',
      '          error={!!errors.email}',
      '        />',
      '      </Form.Field>',
      '      <Form.Actions>',
      '        <Button htmlType="submit">검증하기</Button>',
      '      </Form.Actions>',
      '    </Form>',
      '  )',
      '}'
    ],
    notes: [
      '버튼 클릭 시 유효성 검사가 실행됩니다',
      '에러 필드는 빨간 테두리 + 메시지로 표시',
      'react-hook-form 과 연동 권장'
    ]
  },
  readonly: {
    title: '조회 모드 — readOnly / disabled 상태',
    el: <ReadOnlyForm />,
    code: [
      "import {useState} from 'react'",
      "import Form from 'm2m-uiux-react/Form'",
      "import Input from 'm2m-uiux-react/Input'",
      '',
      'export function Example() {',
      '  const [mode, setMode] = useState<"view" | "edit">("view")',
      '  const data = { name: "홍길동", dept: "개발팀" }',
      '  return (',
      '    <Form>',
      '      {/* readOnly — 복사 가능, 수정 불가 */}',
      '      <Input.Text readOnly value={data.name} />',
      '      {/* disabled — 포커스 불가, 완전 잠금 */}',
      '      <Input.Text disabled value={data.dept} />',
      '      {/* 모드 전환 패턴 */}',
      '      <Input.Text readOnly={mode === "view"} value={data.name} />',
      '    </Form>',
      '  )',
      '}'
    ],
    notes: ['readOnly 는 포커스 가능, disabled 는 포커스 불가', '조회 모드는 readOnly, 완전 잠금은 disabled 사용']
  }
}

export function FormPage() {
  return (
    <>
      <PageHeader
        title="Form"
        component="Form"
        desc="— Form + Form.Field + Form.Actions 컴파운드. 세로·가로·2컬럼·범위·인라인 복합·유효성 검사·읽기전용 패턴을 제공합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => {
          const s = SECTIONS[tab]
          return <ComponentSection title={s.title} preview={s.el} code={s.code} notes={s.notes} />
        }}
      </PropTabs>
    </>
  )
}
