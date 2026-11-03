import '~/assets/styles/tokens.css'

import {Table} from '~/components/Table/Table'

export {Table}
export default Table
export {
  TABLE_ALIGN,
  TABLE_SORT_DIRECTION,
  TABLE_SIZE,
  TABLE_STATE_CLASS,
  TABLE_DEFAULT
} from '~/components/Table/Table.constant'
export type {
  TableProps,
  TableColumn,
  TableHeadCell,
  TableRow,
  TableSort,
  TableSortDirection,
  TablePagination,
  TableAlign,
  TableSize
} from '~/components/Table/Table.type'
