import '~/assets/styles/tokens.css'

import {FileUpload, formatFileSize} from '~/components/FileUpload/FileUpload'

export {FileUpload, formatFileSize}
export default FileUpload
export {
  FILE_UPLOAD_LIST_TYPE,
  FILE_UPLOAD_FILE_STATUS,
  FILE_UPLOAD_STATE_CLASS,
  FILE_UPLOAD_DEFAULT
} from '~/components/FileUpload/FileUpload.constant'
export type {
  FileUploadProps,
  FileUploadItem,
  FileUploadListType,
  FileUploadFileStatus
} from '~/components/FileUpload/FileUpload.type'
