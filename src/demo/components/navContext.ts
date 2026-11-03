import {createContext} from 'react'

/**
 * 사이드바 항목/하위항목 클릭 시 열 페이지의 PropTabs 초기 탭을 지정한다.
 * seq 는 클릭마다 증가 — 같은 tab 을 다시 눌러도(Input › Password 등) 반영되도록.
 */
export interface DemoTabState {
  tab: string | null
  seq: number
}

export const DemoTabContext = createContext<DemoTabState>({tab: null, seq: 0})

/** 페이지 본문(예: HomePage 카드)에서 다른 페이지로 이동할 때 사용. */
export const DemoNavContext = createContext<(key: string, tab?: string) => void>(() => {})
