import {forwardRef} from 'react'
import type {CSSProperties} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {GRID_DEFAULT} from '~/components/Grid/Grid.constant'
import type {GridItemProps, GridProps} from '~/components/Grid/Grid.type'
import styles from '~/components/Grid/Grid.module.scss'

const px = (v: number | string) => (typeof v === 'number' ? `${v}px` : v)
const track = (v: number | string) => (typeof v === 'number' ? `repeat(${v}, minmax(0, 1fr))` : v)

const GridRoot = forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    columns = GRID_DEFAULT.COLUMNS,
    rows,
    gap = GRID_DEFAULT.GAP,
    rowGap,
    columnGap,
    justifyItems,
    alignItems,
    autoRows,
    inline = false,
    style,
    classNames,
    children
  },
  ref
) {
  const gridStyle: CSSProperties = {
    display: inline ? 'inline-grid' : 'grid',
    gridTemplateColumns: track(columns),
    gridTemplateRows: rows != null ? track(rows) : undefined,
    gap: rowGap == null && columnGap == null ? px(gap) : undefined,
    rowGap: rowGap != null ? px(rowGap) : undefined,
    columnGap: columnGap != null ? px(columnGap) : undefined,
    justifyItems,
    alignItems,
    gridAutoRows: autoRows != null ? px(autoRows) : undefined,
    ...style
  }

  return (
    <div ref={ref} className={cx(styles.bsGrid, resolveClassNames(classNames))} style={gridStyle}>
      {children}
    </div>
  )
})

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
  {colSpan, rowSpan, justifySelf, alignSelf, style, classNames, children},
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(styles.bsGridItem, resolveClassNames(classNames))}
      style={{
        gridColumn: colSpan != null ? `span ${colSpan}` : undefined,
        gridRow: rowSpan != null ? `span ${rowSpan}` : undefined,
        justifySelf,
        alignSelf,
        ...style
      }}
    >
      {children}
    </div>
  )
})

export const Grid = Object.assign(GridRoot, {Item: GridItem})
