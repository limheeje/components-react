import {useEffect, useMemo, useState} from 'react'

import {Sidebar} from '~/demo/components/Sidebar'
import {DemoNavContext, DemoTabContext} from '~/demo/components/navContext'
import {NAV_GROUPS, PAGES, groupOf} from '~/demo/pages'
import type {PageKey} from '~/demo/pages'

/** PageKey ↔ 해시 슬러그 (`ProgressBar` ↔ `progress-bar`) */
const slugOf = (key: PageKey) => key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
const KEY_BY_SLUG = new Map<string, PageKey>(PAGES.map((p) => [slugOf(p.key), p.key]))

const hashOf = (key: PageKey, tab: string | null) =>
  `#/${key === 'Home' ? '' : slugOf(key)}${tab ? `/${tab.toLowerCase()}` : ''}`

function parseHash(): {key: PageKey; tab: string | null} {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (!raw) return {key: 'Home', tab: null}
  const [slug, tab] = raw.split('/')
  const key = KEY_BY_SLUG.get(slug)
  if (!key) return {key: 'Home', tab: null}
  return {key, tab: tab ? tab.charAt(0).toUpperCase() + tab.slice(1) : null}
}

export function App() {
  const [nav, setNav] = useState<{key: PageKey; tab: string | null; seq: number}>(() => ({
    ...parseHash(),
    seq: 0
  }))
  const [dark, setDark] = useState(false)

  const meta = useMemo(() => PAGES.find((p) => p.key === nav.key) ?? PAGES[0], [nav.key])
  const group = useMemo(() => groupOf(nav.key), [nav.key])

  useEffect(() => {
    const apply = () => setNav((prev) => ({...parseHash(), seq: prev.seq + 1}))
    window.addEventListener('hashchange', apply)
    if (!window.location.hash) window.history.replaceState(null, '', hashOf(nav.key, nav.tab))
    return () => window.removeEventListener('hashchange', apply)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const select = (key: PageKey, tab?: string) => {
    const next = hashOf(key, tab ?? null)
    if (window.location.hash === next || (next === '#/' && !window.location.hash)) {
      setNav((prev) => ({key, tab: tab ?? null, seq: prev.seq + 1}))
    } else {
      window.location.hash = next
    }
  }

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
  }

  const Page = meta.Page
  const isHome = nav.key === 'Home'

  return (
    <div className="demo-shell">
      <Sidebar groups={NAV_GROUPS} current={nav.key} onSelect={select} onHome={() => select('Home')} />

      <div className="demo-main">
        <div className="demo-topbar">
          <div className="demo-topbar__crumbs">
            {isHome ? (
              <span className="demo-topbar__current">Home</span>
            ) : (
              <>
                <span
                  className="demo-topbar__group"
                  style={{
                    color: group.color,
                    background: `${group.color}22`,
                    border: `1px solid ${group.color}44`
                  }}
                >
                  {group.label}
                </span>
                <span className="demo-topbar__sep">/</span>
                <span className="demo-topbar__current">{meta.key}</span>
              </>
            )}
          </div>

          <div className="demo-topbar__actions">
            <a
              href="https://www.npmjs.com/package/m2m-uiux-react"
              target="_blank"
              className="demo-topbar__btn2"
              style={{
                textDecoration: 'none'
              }}
            >
              M2M 컴포넌트 패키지 다운로드
            </a>
            <button type="button" className="demo-topbar__btn" onClick={toggleTheme}>
              {dark ? '☀ 라이트' : '☾ 다크'}
            </button>
            <span className="demo-topbar__badge">m2m-uiux v0.0.1</span>
          </div>
        </div>

        <div className="demo-content">
          <DemoNavContext.Provider value={select as (key: string, tab?: string) => void}>
            <DemoTabContext.Provider value={{tab: nav.tab, seq: nav.seq}}>
              <Page key={nav.key} />
            </DemoTabContext.Provider>
          </DemoNavContext.Provider>
        </div>
      </div>
    </div>
  )
}
