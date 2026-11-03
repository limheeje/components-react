import {forwardRef} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {
  PAGINATION_DEFAULT,
  PAGINATION_ELLIPSIS,
  PAGINATION_STATE_CLASS
} from '~/components/Pagination/Pagination.constant'
import type {PaginationProps} from '~/components/Pagination/Pagination.type'
import styles from '~/components/Pagination/Pagination.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

/** 표시할 페이지 목록 계산 (Vue BsPagination 방식 — 양끝 + 현재 주변 + 생략) */
function getPageList(
  current: number,
  totalPages: number,
  siblingCount: number
): (number | typeof PAGINATION_ELLIPSIS)[] {
  const totalNumbers = siblingCount * 2 + 5 // first,last,current,2*ellipsis
  if (totalPages <= totalNumbers) {
    return Array.from({length: totalPages}, (_, i) => i + 1)
  }

  const left = Math.max(current - siblingCount, 1)
  const right = Math.min(current + siblingCount, totalPages)
  const showLeftDots = left > 2
  const showRightDots = right < totalPages - 1

  const list: (number | typeof PAGINATION_ELLIPSIS)[] = [1]
  if (showLeftDots) list.push(PAGINATION_ELLIPSIS)
  for (let p = showLeftDots ? left : 2; p <= (showRightDots ? right : totalPages - 1); p++) {
    list.push(p)
  }
  if (showRightDots) list.push(PAGINATION_ELLIPSIS)
  list.push(totalPages)
  return list
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page,
    onChange,
    total,
    pageSize = PAGINATION_DEFAULT.PAGE_SIZE,
    totalPages: totalPagesProp,
    siblingCount = PAGINATION_DEFAULT.SIBLING_COUNT,
    showTotal = false,
    size = PAGINATION_DEFAULT.SIZE,
    disabled = false,
    classNames,
    ...rest
  },
  ref
) {
  const totalPages = Math.max(1, totalPagesProp ?? (total != null ? Math.ceil(total / pageSize) : 1))
  const current = Math.min(Math.max(1, page), totalPages)

  const go = (p: number) => {
    if (disabled || p === current || p < 1 || p > totalPages) return
    onChange(p)
  }

  const pages = getPageList(current, totalPages, siblingCount)

  const totalNode =
    showTotal === false
      ? null
      : typeof showTotal === 'function'
        ? showTotal(total ?? totalPages)
        : `총 ${total ?? totalPages}개`

  return (
    <nav
      {...rest}
      ref={ref}
      aria-label="pagination"
      className={cx(
        styles.bsPagination,
        styles[`bsPaginationSize${cap(size)}`],
        disabled && styles[PAGINATION_STATE_CLASS.IS_DISABLED],
        resolveClassNames(classNames)
      )}
    >
      {totalNode != null && <span className={styles.bsPaginationTotal}>{totalNode}</span>}

      <ul className={styles.bsPaginationList}>
        <li>
          <button
            type="button"
            className={styles.bsPaginationArrow}
            aria-label="이전 페이지"
            disabled={disabled || current === 1}
            onClick={() => go(current - 1)}
          >
            <Icon name="chevron-left" size="1em" />
          </button>
        </li>

        {pages.map((p, i) =>
          p === PAGINATION_ELLIPSIS ? (
            <li key={`e-${i}`} className={styles.bsPaginationEllipsis} aria-hidden="true">
              {PAGINATION_ELLIPSIS}
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={cx(styles.bsPaginationPage, p === current && styles[PAGINATION_STATE_CLASS.IS_ACTIVE])}
                aria-current={p === current ? 'page' : undefined}
                disabled={disabled}
                onClick={() => go(p)}
              >
                {p}
              </button>
            </li>
          )
        )}

        <li>
          <button
            type="button"
            className={styles.bsPaginationArrow}
            aria-label="다음 페이지"
            disabled={disabled || current === totalPages}
            onClick={() => go(current + 1)}
          >
            <Icon name="chevron-right" size="1em" />
          </button>
        </li>
      </ul>
    </nav>
  )
})
