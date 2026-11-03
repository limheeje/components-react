import {useMemo, useState} from 'react'

import {Icon} from '~/components/Icon'

import {NavIcon} from '~/demo/components/NavIcon'
import type {NavGroup, PageKey} from '~/demo/pages'

interface SidebarProps {
  groups: NavGroup[]
  current: PageKey
  onSelect: (key: PageKey, tab?: string) => void
  onHome: () => void
}

export function Sidebar({groups, current, onSelect, onHome}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<string[]>([])

  const q = query.trim().toLowerCase()

  const toggleExpand = (label: string) =>
    setExpanded((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]))

  const filtered = useMemo(() => {
    if (!q) return groups
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (it) => it.label.toLowerCase().includes(q) || it.children?.some((c) => c.label.toLowerCase().includes(q))
        )
      }))
      .filter((g) => g.items.length > 0)
  }, [groups, q])

  return (
    <aside className="demo-sidebar" data-collapsed={collapsed || undefined}>
      <div className="demo-sidebar__brand">
        <button
          type="button"
          className="demo-sidebar__brand-btn"
          aria-current={current === 'Home'}
          aria-label="홈으로"
          onClick={onHome}
        >
          <span className="demo-sidebar__logo">M2</span>
          {!collapsed && (
            <span>
              <span className="demo-sidebar__title">m2m-uiux-react</span>
              <br />
              <span className="demo-sidebar__subtitle">Component Docs</span>
            </span>
          )}
        </button>
        {!collapsed && (
          <button
            type="button"
            className="demo-sidebar__collapse"
            aria-label="사이드바 접기"
            title="사이드바 접기"
            onClick={() => setCollapsed(true)}
          >
            <NavIcon name="panel-left-close" size={16} />
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="demo-sidebar__search">
          <Icon name="search" size={13} />
          <input type="text" value={query} placeholder="컴포넌트 검색..." onChange={(e) => setQuery(e.target.value)} />
        </div>
      )}

      <nav className="demo-sidebar__nav">
        {filtered.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="demo-sidebar__group-label">
                <span className="demo-sidebar__dot" style={{background: group.color}} />
                {group.label}
              </div>
            )}
            {collapsed && <div className="demo-sidebar__group-rule" />}

            {group.items.map((item) => {
              if (item.children && !collapsed) {
                const open = expanded.includes(item.label) || Boolean(q) || item.children.some((c) => c.key === current)
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      className="demo-sidebar__link demo-sidebar__link--parent"
                      aria-current={item.key === current}
                      onClick={() => toggleExpand(item.label)}
                    >
                      <span className="demo-sidebar__link-icon">
                        <NavIcon name={item.icon ?? ''} />
                      </span>
                      <span className="demo-sidebar__link-label">{item.label}</span>
                      <Icon name="chevron-down" size={12} rotate={open ? 0 : -90} />
                    </button>
                    {open && (
                      <div className="demo-sidebar__sub">
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            type="button"
                            className="demo-sidebar__sublink"
                            onClick={() => onSelect(child.key, child.tab)}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              const key = item.key ?? item.children?.[0]?.key
              if (!key) return null
              return (
                <button
                  key={item.label}
                  type="button"
                  className="demo-sidebar__link"
                  aria-current={key === current}
                  title={collapsed ? item.label : undefined}
                  onClick={() => onSelect(key, item.tab)}
                >
                  <span className="demo-sidebar__link-icon">
                    <NavIcon name={item.icon ?? ''} />
                  </span>
                  {!collapsed && <span className="demo-sidebar__link-label">{item.label}</span>}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="demo-sidebar__foot">
        {!collapsed && <span className="demo-sidebar__foot-label">v0.0.1 · 13차 배치</span>}
        <button
          type="button"
          className="demo-sidebar__foot-toggle"
          aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
          title={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
          onClick={() => setCollapsed((v) => !v)}
        >
          <NavIcon name={collapsed ? 'panel-left-open' : 'panel-left-close'} size={16} />
        </button>
      </div>
    </aside>
  )
}
