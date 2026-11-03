/** 정렬 값 (justify-items / align-items / *-self) */
export const GRID_ALIGN = Object.freeze({
  START: 'start',
  CENTER: 'center',
  END: 'end',
  STRETCH: 'stretch'
} as const)

export const GRID_DEFAULT = Object.freeze({
  COLUMNS: 12,
  GAP: 16
} as const)
