import React, {useContext} from 'react'

import {DemoNavContext} from '~/demo/components/navContext'
import {NAV_GROUPS} from '~/demo/pages'
import type {NavGroup, PageKey} from '~/demo/pages'

/** 컴포넌트별 한 줄 설명 (기준 앱 HomePage 톤) */
const DESC: Partial<Record<PageKey, string>> = {
  Token: '색상·타이포·간격·반경 토큰 시스템',
  Icon: '빈 <i> + CSS 마스크 기반 아이콘 세트',
  Image: 'fallback · 스켈레톤 · lazy 로드 이미지',
  Grid: 'columns · gap 기반 CSS Grid 레이아웃',
  Header: '페이지 상단 헤더 — back · actions · logo',
  Divider: '수평·수직 구분선 (라벨 정렬 지원)',
  Tabs: 'line · card · pill 탭 네비게이션',
  Breadcrumb: '현재 위치 경로 표시',
  Button: 'primary · secondary · ghost · emphasis 버튼',
  ButtonGroup: '수평·수직 버튼 묶음 레이아웃',
  Input: 'Text · Password · Number · Email · Tel · Search',
  Select: '커스텀 드롭다운 단일·다중 선택 (검색 지원)',
  Checkbox: '단일 선택 체크박스',
  CheckboxGroup: '다중 선택 체크박스 그룹 (min/max)',
  Radio: '라디오 버튼',
  RadioGroup: '라디오 그룹 선택',
  Switch: '토글 온/오프 스위치',
  Textarea: '여러 줄 텍스트 입력 (자동 높이)',
  SearchField: '검색 전용 pill 인풋',
  DatePicker: '커스텀 캘린더 — single · range · 시간 선택',
  TimePicker: '시·분·초 스크롤 컬럼 시간 선택',
  FileUpload: '드래그&드롭 파일 업로드',
  ImageUploadPreview: '이미지 업로드 + 썸네일 미리보기',
  Form: '유효성 검사 포함 폼 래퍼',
  Badge: '상태 표시 배지 — success · error · warning',
  Table: '정렬·선택·페이지네이션 데이터그리드',
  List: '아이템 목록 — 렌더프롭 · 자식 모두 지원',
  Accordion: '접기/펼치기 — single · multiple',
  NoData: '빈 상태(Empty State) 컴포넌트',
  Timeline: '수직·수평 타임라인',
  Swiper: '순수 CSS 캐러셀 — autoplay · loop · pagination',
  ImagePreview: '썸네일 클릭 → 라이트박스',
  Pagination: '페이지 네비게이션 (… 축약)',
  Chart: 'line · bar · area · pie · radar 차트',
  Dialog: '선언형·명령형 모달 — confirm · alert',
  Toast: '알림 토스트 — success · error · warning · info',
  Tooltip: '마우스 오버 도움말 팝업',
  Loading: '스피너 · 오버레이 로딩',
  ProgressBar: '진행률 바 · 스텝 인디케이터'
}

function firstKey(group: NavGroup, item: NavGroup['items'][number]): {key: PageKey; tab?: string} {
  if (item.key) return {key: item.key, tab: item.tab}
  const child = item.children?.[0]
  return {key: child?.key ?? group.items[0].key!, tab: child?.tab}
}

export function HomePage() {
  const navigate = useContext(DemoNavContext)
  const totalComponents = NAV_GROUPS.reduce((acc, g) => acc + g.items.length, 0)

  return (
    <div className="demo-home">
      {/* Hero */}
      <div className="demo-home__hero">
        <div className="demo-home__brandline">
          <div className="demo-home__mark">M2</div>
          <div>
            <h1 className="demo-home__title">m2m-uiux-react</h1>
            <p className="demo-home__subtitle">개발자·퍼블리셔를 위한 공통 컴포넌트 문서</p>
          </div>
        </div>
        <p className="demo-home__lead">
          각 컴포넌트의 Props 정의, 사용 예시, 코드 스니펫을 확인하고 실무 프로젝트에 바로 적용하세요. 모든 예시는{' '}
          <code>m2m-uiux-react</code> 서브패스 export 기준으로 작성되었습니다.
        </p>

        <div className="demo-home__stats">
          {[
            {label: '그룹', value: NAV_GROUPS.length},
            {label: '컴포넌트', value: totalComponents},
            {label: 'npm 서브패스', value: '40+'}
          ].map((s) => (
            <div key={s.label} className="demo-home__stat">
              <div className="demo-home__stat-value">{s.value}</div>
              <div className="demo-home__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <hr className="demo-home__rule" />

      {/* Component Groups */}
      {NAV_GROUPS.map((g) => (
        <section key={g.label} className="demo-home__group">
          <div className="demo-home__group-head">
            <span className="demo-home__group-dot" style={{background: g.color}} />
            <span className="demo-home__group-name">{g.label}</span>
            <span className="demo-home__group-count">{g.items.length}개</span>
          </div>

          <div className="demo-home__cards">
            {g.items.map((item) => {
              const {key, tab} = firstKey(g, item)
              return (
                <button
                  type="button"
                  key={item.label}
                  className="demo-home__card"
                  style={{'--card-accent': g.color} as React.CSSProperties}
                  onClick={() => navigate(key, tab)}
                >
                  <span className="demo-home__card-bar" style={{background: g.color}} />
                  <span className="demo-home__card-body">
                    <span className="demo-home__card-name">{item.label}</span>
                    <span className="demo-home__card-desc">{DESC[key] ?? `${item.label} 컴포넌트`}</span>
                    <span className="demo-home__card-go" style={{color: g.color}}>
                      가이드 보기 →
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>
      ))}

      {/* Quick start */}
      <section className="demo-home__quick">
        <div className="demo-home__quick-label">빠른 시작</div>
        <pre className="demo-home__code">
          <span className="c-comment">{'// 1. 서브패스로 컴포넌트 import'}</span>
          {'\n'}
          <span className="c-kw">import</span> {'{Button}'} <span className="c-kw">from</span>{' '}
          <span className="c-val">'m2m-uiux-react/Button'</span>
          {'\n\n'}
          <span className="c-comment">{'// 2. Props 지정하여 사용'}</span>
          {'\n'}
          {'<'}
          <span className="c-comp">Button</span> <span className="c-attr">variant</span>=
          <span className="c-val">"primary"</span> <span className="c-attr">size</span>=
          <span className="c-val">"md"</span>
          {'>'}버튼 텍스트{'</'}
          <span className="c-comp">Button</span>
          {'>'}
        </pre>
      </section>
    </div>
  )
}
