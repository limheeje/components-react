import type {HTMLAttributes} from 'react'

import type {UPLOADED_FILE_STATUS} from './UploadedFileList.constant'

export type UploadedFileStatus = (typeof UPLOADED_FILE_STATUS)[keyof typeof UPLOADED_FILE_STATUS]

export interface UploadedFile {
  id?: string | number
  name: string
  url?: string
  thumbnailUrl?: string
  size?: number
  type?: string
  status?: UploadedFileStatus
  errorMessage?: string
}

export interface UploadedFileListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> {
  value?: UploadedFile[]
  removable?: boolean
  preview?: boolean
  onChange?: (files: UploadedFile[]) => void
  onRemove?: (file: UploadedFile, index: number) => void
  classNames?: string | string[]
}
