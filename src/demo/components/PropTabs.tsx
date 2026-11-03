import {useContext, useEffect, useState} from 'react'
import type {ReactNode} from 'react'

import {DemoTabContext} from '~/demo/components/navContext'

interface PropTabsProps {
  tabs: string[]
  children: (activeTab: string) => ReactNode
  defaultTab?: string
}

export function PropTabs({tabs, children, defaultTab}: PropTabsProps) {
  const {tab: forcedTab, seq} = useContext(DemoTabContext)
  const [active, setActive] = useState(forcedTab && tabs.includes(forcedTab) ? forcedTab : (defaultTab ?? tabs[0]))

  // 사이드바 클릭(seq 증가)마다 forcedTab 을 재적용 — 같은 탭을 다시 눌러도 반영
  useEffect(() => {
    if (forcedTab && tabs.includes(forcedTab)) setActive(forcedTab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seq])

  return (
    <div>
      <div className="demo-tabs__bar" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-current={tab === active}
            className="demo-tab"
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="demo-tabs__body">{children(active)}</div>
    </div>
  )
}
