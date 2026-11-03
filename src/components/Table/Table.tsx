import {useMemo, useState} from 'react'
import type {CSSProperties} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {TABLE_DEFAULT, TABLE_SORT_DIRECTION, TABLE_STATE_CLASS} from '~/components/Table/Table.constant'
import type {TableProps, TableRow, TableSort} from '~/components/Table/Table.type'
import styles from '~/components/Table/Table.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

function compare(a: unknown, b: unknown): number {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a ?? '').localeCompare(String(b ?? ''), 'ko')
}

/** 연속 동일 값 → 첫 행에 span, 이후 행에 0 */
function buildRowSpanMap(rows: TableRow[], field: string): Map<number, number> {
  const map = new Map<number, number>()
  if (rows.length === 0) return map
  let start = 0
  for (let i = 1; i <= rows.length; i++) {
    if (i === rows.length || rows[i][field] !== rows[start][field]) {
      map.set(start, i - start)
      for (let j = start + 1; j < i; j++) map.set(j, 0)
      start = i
    }
  }
  return map
}

export function Table<T extends object = TableRow>({
  columns = [],
  headGroups,
  data,
  rowKey = TABLE_DEFAULT.ROW_KEY,
  renderRow,
  striped = false,
  hover = false,
  size = TABLE_DEFAULT.SIZE,
  loading = false,
  emptyText = TABLE_DEFAULT.EMPTY_TEXT,
  emptyContent,
  selectable = false,
  selectedRowKeys,
  onSelectionChange,
  sort,
  onSortChange,
  pagination,
  classNames
}: TableProps<T>) {
  const keyOf = (row: T, index: number): string | number =>
    typeof rowKey === 'function' ? rowKey(row, index) : (((row as TableRow)[rowKey] as string | number) ?? index)

  // ── 정렬 (제어 or 내부) ──
  const [innerSort, setInnerSort] = useState<TableSort | null>(null)
  const activeSort = sort !== undefined ? sort : innerSort

  const sortedData = useMemo(() => {
    if (!activeSort) return data
    const arr = [...data]
    arr.sort((a, b) => {
      const r = compare((a as TableRow)[activeSort.key], (b as TableRow)[activeSort.key])
      return activeSort.direction === TABLE_SORT_DIRECTION.ASC ? r : -r
    })
    return arr
  }, [data, activeSort])

  const cycleSort = (key: string) => {
    let next: TableSort | null
    if (!activeSort || activeSort.key !== key) {
      next = {key, direction: TABLE_SORT_DIRECTION.ASC}
    } else if (activeSort.direction === TABLE_SORT_DIRECTION.ASC) {
      next = {key, direction: TABLE_SORT_DIRECTION.DESC}
    } else {
      next = null
    }
    if (sort === undefined) setInnerSort(next)
    onSortChange?.(next)
  }

  // ── 페이지네이션 슬라이스 ──
  const total = pagination?.total ?? sortedData.length
  const totalPages = pagination ? Math.max(1, Math.ceil(total / pagination.pageSize)) : 1
  const viewData = pagination
    ? sortedData.slice((pagination.page - 1) * pagination.pageSize, pagination.page * pagination.pageSize)
    : sortedData

  // ── 선택 (제어 or 내부) ──
  const [innerSelected, setInnerSelected] = useState<(string | number)[]>([])
  const selected = selectedRowKeys ?? innerSelected
  const selectedSet = new Set(selected)

  const emitSelection = (keys: (string | number)[]) => {
    if (selectedRowKeys === undefined) setInnerSelected(keys)
    const rows = viewData.filter((r, i) => keys.includes(keyOf(r, i)))
    onSelectionChange?.(keys, rows as T[])
  }

  const viewKeys = viewData.map((r, i) => keyOf(r, i))
  const allSelected = viewKeys.length > 0 && viewKeys.every((k) => selectedSet.has(k))

  const toggleAll = () => emitSelection(allSelected ? [] : viewKeys)
  const toggleRow = (key: string | number) =>
    emitSelection(selectedSet.has(key) ? selected.filter((k) => k !== key) : [...selected, key])

  // ── rowspan 맵 ──
  const rowSpanMaps = useMemo(() => {
    const maps: Record<string, Map<number, number>> = {}
    for (const col of columns) {
      if (col.rowSpanKey) maps[col.key] = buildRowSpanMap(viewData as TableRow[], col.rowSpanKey)
    }
    return maps
  }, [columns, viewData])

  const colCount = (headGroups?.[0]?.length ?? columns.length) + (selectable ? 1 : 0)

  const alignStyle = (a?: string): CSSProperties => (a ? {textAlign: a as CSSProperties['textAlign']} : {})

  return (
    <div
      className={cx(
        styles.bsTable,
        styles[`bsTableSize${cap(size)}`],
        striped && styles[TABLE_STATE_CLASS.IS_STRIPED],
        hover && styles[TABLE_STATE_CLASS.IS_HOVER],
        loading && styles[TABLE_STATE_CLASS.IS_LOADING],
        resolveClassNames(classNames)
      )}
    >
      <div className={styles.bsTableScroll}>
        <table className={styles.bsTableMain}>
          <thead>
            {headGroups && headGroups.length > 0 ? (
              headGroups.map((group, gi) => (
                <tr key={gi}>
                  {gi === 0 && selectable && (
                    <th className={styles.bsTableTh} rowSpan={headGroups.length}>
                      <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="전체 선택" />
                    </th>
                  )}
                  {group.map((cell, ci) => (
                    <th
                      key={ci}
                      className={styles.bsTableTh}
                      colSpan={cell.colSpan}
                      rowSpan={cell.rowSpan}
                      style={{
                        width: cell.width,
                        ...alignStyle(cell.align ?? 'center'),
                        ...cell.style
                      }}
                    >
                      {cell.label}
                    </th>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                {selectable && (
                  <th className={styles.bsTableTh}>
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="전체 선택" />
                  </th>
                )}
                {columns.map((col) => {
                  const isSorted = activeSort?.key === col.key
                  return (
                    <th
                      key={col.key}
                      className={cx(styles.bsTableTh, col.sortable && styles.bsTableSortable)}
                      style={{width: col.width, ...alignStyle(col.align)}}
                      onClick={col.sortable ? () => cycleSort(col.key) : undefined}
                      aria-sort={isSorted ? (activeSort?.direction === 'asc' ? 'ascending' : 'descending') : undefined}
                    >
                      <span className={styles.bsTableThInner}>
                        {col.label}
                        {col.sortable && (
                          <Icon
                            classNames={styles.bsTableSortIcon}
                            size={13}
                            name={
                              !isSorted
                                ? 'chevrons-left'
                                : activeSort?.direction === 'asc'
                                  ? 'chevron-up'
                                  : 'chevron-down'
                            }
                            rotate={!isSorted ? 90 : 0}
                          />
                        )}
                      </span>
                    </th>
                  )
                })}
              </tr>
            )}
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className={styles.bsTableMessageCell} colSpan={colCount || 1}>
                  로딩 중...
                </td>
              </tr>
            ) : viewData.length === 0 ? (
              <tr>
                <td className={styles.bsTableMessageCell} colSpan={colCount || 1}>
                  {emptyContent ?? emptyText}
                </td>
              </tr>
            ) : (
              viewData.map((row, rowIdx) => {
                const custom = renderRow?.(row, rowIdx)
                if (custom !== undefined && custom !== null) return custom

                const key = keyOf(row, rowIdx)
                const isSel = selectedSet.has(key)
                return (
                  <tr
                    key={key}
                    className={cx(styles.bsTableTr, isSel && styles.bsTableSelected)}
                    onClick={selectable ? () => toggleRow(key) : undefined}
                  >
                    {selectable && (
                      <td className={styles.bsTableTd}>
                        <input
                          type="checkbox"
                          checked={isSel}
                          onChange={() => toggleRow(key)}
                          onClick={(e) => e.stopPropagation()}
                          aria-label="행 선택"
                        />
                      </td>
                    )}
                    {columns.map((col) => {
                      const value = (row as TableRow)[col.key]
                      const spanMap = rowSpanMaps[col.key]
                      if (spanMap) {
                        const span = spanMap.get(rowIdx)
                        if (span === 0) return null
                        return (
                          <td
                            key={col.key}
                            className={cx(styles.bsTableTd, styles.bsTableSpanCell)}
                            rowSpan={span && span > 1 ? span : undefined}
                            style={{
                              ...alignStyle(col.align),
                              ...col.cellStyle?.(value, row, rowIdx)
                            }}
                          >
                            {col.render ? col.render(value, row, rowIdx) : String(value ?? '')}
                          </td>
                        )
                      }
                      return (
                        <td
                          key={col.key}
                          className={styles.bsTableTd}
                          style={{
                            ...alignStyle(col.align),
                            ...col.cellStyle?.(value, row, rowIdx)
                          }}
                        >
                          {col.render ? col.render(value, row, rowIdx) : String(value ?? '')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className={styles.bsTablePagination}>
          <span className={styles.bsTableTotal}>총 {total}개</span>
          <div className={cx(styles.bsTablePager, styles[`bsTablePagerAlign${cap(pagination.align ?? 'right')}`])}>
            <button
              type="button"
              className={styles.bsTablePageButton}
              disabled={pagination.page <= 1}
              onClick={() => pagination.onChange(pagination.page - 1)}
              aria-label="이전 페이지"
            >
              <Icon name="chevron-left" size={13} />
            </button>
            {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                className={cx(styles.bsTablePageButton, p === pagination.page && styles.bsTablePageActive)}
                aria-current={p === pagination.page}
                onClick={() => pagination.onChange(p)}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              className={styles.bsTablePageButton}
              disabled={pagination.page >= totalPages}
              onClick={() => pagination.onChange(pagination.page + 1)}
              aria-label="다음 페이지"
            >
              <Icon name="chevron-right" size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
