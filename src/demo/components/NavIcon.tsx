/**
 * 데모 사이드바 전용 아이콘 (배포물 아님).
 * lucide 스타일 인라인 SVG — 기준 데모 앱의 아이콘 세트를 이식.
 */

const S = 'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"'

const PATHS: Record<string, string> = {
  hash: `<line x1="4" y1="9" x2="20" y2="9" ${S}/><line x1="4" y1="15" x2="20" y2="15" ${S}/><line x1="10" y1="3" x2="8" y2="21" ${S}/><line x1="16" y1="3" x2="14" y2="21" ${S}/>`,
  shapes: `<polygon points="12 2 20 7 20 17 12 22 4 17 4 7" ${S}/>`,
  image: `<rect x="3" y="3" width="18" height="18" rx="2" ry="2" ${S}/><circle cx="8.5" cy="8.5" r="1.5" ${S}/><polyline points="21 15 16 10 5 21" ${S}/>`,
  'layout-grid': `<rect x="3" y="3" width="7" height="7" rx="1" ${S}/><rect x="14" y="3" width="7" height="7" rx="1" ${S}/><rect x="3" y="14" width="7" height="7" rx="1" ${S}/><rect x="14" y="14" width="7" height="7" rx="1" ${S}/>`,
  'panel-top': `<rect x="2" y="3" width="20" height="18" rx="2" ${S}/><line x1="2" y1="9" x2="22" y2="9" ${S}/>`,
  minus: `<line x1="5" y1="12" x2="19" y2="12" ${S}/>`,
  tabs: `<rect x="2" y="11" width="20" height="10" rx="2" ${S}/><path d="M2 11V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" ${S}/><path d="M10 11V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" ${S}/>`,
  breadcrumb: `<line x1="2" y1="12" x2="5" y2="12" ${S}/><polyline points="5 9 8 12 5 15" ${S}/><line x1="8" y1="12" x2="13" y2="12" ${S}/><polyline points="13 9 16 12 13 15" ${S}/><line x1="16" y1="12" x2="22" y2="12" ${S}/>`,
  button: `<rect x="3" y="8" width="18" height="8" rx="3" ${S}/>`,
  'text-input': `<rect x="2" y="6" width="20" height="12" rx="2" ${S}/><line x1="7" y1="10" x2="7" y2="14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  'chevron-down': `<polyline points="6 9 12 15 18 9" ${S}/>`,
  'check-square': `<polyline points="9 11 12 14 22 4" ${S}/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" ${S}/>`,
  radio: `<circle cx="12" cy="12" r="9" ${S}/><circle cx="12" cy="12" r="3" ${S}/>`,
  toggle: `<rect x="2" y="7" width="20" height="10" rx="5" ${S}/><circle cx="16" cy="12" r="3.5" fill="currentColor" stroke="none"/>`,
  'align-left': `<line x1="21" y1="6" x2="3" y2="6" ${S}/><line x1="17" y1="10" x2="3" y2="10" ${S}/><line x1="21" y1="14" x2="3" y2="14" ${S}/><line x1="13" y1="18" x2="3" y2="18" ${S}/>`,
  search: `<circle cx="11" cy="11" r="8" ${S}/><line x1="21" y1="21" x2="16.65" y2="16.65" ${S}/>`,
  calendar: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2" ${S}/><line x1="16" y1="2" x2="16" y2="6" ${S}/><line x1="8" y1="2" x2="8" y2="6" ${S}/><line x1="3" y1="10" x2="21" y2="10" ${S}/>`,
  clock: `<circle cx="12" cy="12" r="10" ${S}/><polyline points="12 6 12 12 16 14" ${S}/>`,
  upload: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" ${S}/><polyline points="17 8 12 3 7 8" ${S}/><line x1="12" y1="3" x2="12" y2="15" ${S}/>`,
  'file-text': `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" ${S}/><polyline points="14 2 14 8 20 8" ${S}/><line x1="16" y1="13" x2="8" y2="13" ${S}/><line x1="16" y1="17" x2="8" y2="17" ${S}/>`,
  tag: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" ${S}/><line x1="7" y1="7" x2="7.01" y2="7" ${S}/>`,
  table: `<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" ${S}/>`,
  list: `<line x1="8" y1="6" x2="21" y2="6" ${S}/><line x1="8" y1="12" x2="21" y2="12" ${S}/><line x1="8" y1="18" x2="21" y2="18" ${S}/><line x1="3" y1="6" x2="3.01" y2="6" ${S}/><line x1="3" y1="12" x2="3.01" y2="12" ${S}/><line x1="3" y1="18" x2="3.01" y2="18" ${S}/>`,
  layers: `<polygon points="12 2 2 7 12 12 22 7 12 2" ${S}/><polyline points="2 17 12 22 22 17" ${S}/><polyline points="2 12 12 17 22 12" ${S}/>`,
  inbox: `<polyline points="22 12 16 12 14 15 10 15 8 12 2 12" ${S}/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" ${S}/>`,
  'git-commit': `<circle cx="12" cy="12" r="4" ${S}/><line x1="1.05" y1="12" x2="7" y2="12" ${S}/><line x1="17.01" y1="12" x2="22.96" y2="12" ${S}/>`,
  gallery: `<rect x="3" y="5" width="18" height="13" rx="2" ${S}/><circle cx="8" cy="20" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="20" r="1.5" fill="currentColor" stroke="none"/><circle cx="16" cy="20" r="1" fill="currentColor" stroke="none"/>`,
  'line-chart': `<polyline points="4 19 9 14 13 17 18 10 20 12" ${S}/><line x1="2" y1="21" x2="22" y2="21" ${S}/>`,
  'message-circle': `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" ${S}/>`,
  bell: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" ${S}/><path d="M13.73 21a2 2 0 0 1-3.46 0" ${S}/>`,
  loader: `<line x1="12" y1="2" x2="12" y2="6" ${S}/><line x1="12" y1="18" x2="12" y2="22" ${S}/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" ${S}/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" ${S}/><line x1="2" y1="12" x2="6" y2="12" ${S}/><line x1="18" y1="12" x2="22" y2="12" ${S}/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" ${S}/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" ${S}/>`,
  'bar-chart': `<line x1="18" y1="20" x2="18" y2="10" ${S}/><line x1="12" y1="20" x2="12" y2="4" ${S}/><line x1="6" y1="20" x2="6" y2="14" ${S}/><line x1="3" y1="20" x2="21" y2="20" ${S}/>`,
  'panel-left-close': `<rect x="3" y="3" width="18" height="18" rx="2" ${S}/><line x1="9" y1="3" x2="9" y2="21" ${S}/><polyline points="13 8 17 12 13 16" ${S}/>`,
  'panel-left-open': `<rect x="3" y="3" width="18" height="18" rx="2" ${S}/><line x1="9" y1="3" x2="9" y2="21" ${S}/><polyline points="15 8 11 12 15 16" ${S}/>`,
  'map-pin': `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" ${S}/><circle cx="12" cy="10" r="3" ${S}/>`,
  'share-2': `<circle cx="18" cy="5" r="3" ${S}/><circle cx="6" cy="12" r="3" ${S}/><circle cx="18" cy="19" r="3" ${S}/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" ${S}/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" ${S}/>`,
  filter: `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" ${S}/>`
}

export type NavIconName = keyof typeof PATHS

interface NavIconProps {
  name: string
  size?: number
}

export function NavIcon({name, size = 15}: NavIconProps) {
  const inner = PATHS[name]
  if (!inner) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{display: 'block', flexShrink: 0}}
      dangerouslySetInnerHTML={{__html: inner}}
    />
  )
}
