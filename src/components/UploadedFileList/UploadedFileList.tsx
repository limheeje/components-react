import {forwardRef, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'
import {formatFileSize} from '~/components/FileUpload/FileUpload'
import {Icon} from '~/components/Icon/Icon'
import {Lightbox} from '~/components/Lightbox/Lightbox'

import {
  UPLOADED_FILE_LIST_DEFAULT,
  UPLOADED_FILE_LIST_STATE_CLASS,
  UPLOADED_FILE_STATUS
} from './UploadedFileList.constant'
import type {UploadedFile, UploadedFileListProps} from './UploadedFileList.type'
import {isImageFile, thumbnailOf} from './UploadedFileList.util'
import styles from './UploadedFileList.module.scss'

export const UploadedFileList = forwardRef<HTMLUListElement, UploadedFileListProps>(function UploadedFileList(
  {value = [], removable = true, preview = true, onChange, onRemove, classNames, className, ...rest},
  ref
) {
  const [broken, setBroken] = useState(() => new Set<string>())
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const keyOf = (file: UploadedFile, index: number) => String(file.id ?? file.url ?? `${file.name}#${index}`)
  const brokenKey = (file: UploadedFile, index: number) => `${keyOf(file, index)}|${thumbnailOf(file) ?? ''}`
  const thumbOf = (file: UploadedFile, index: number) =>
    broken.has(brokenKey(file, index)) ? undefined : thumbnailOf(file)
  const statusOf = (file: UploadedFile) => file.status ?? UPLOADED_FILE_STATUS.DONE
  const previewSources = value.flatMap((file, index) =>
    preview && statusOf(file) === 'done' && thumbOf(file, index) && (file.url ?? file.thumbnailUrl)
      ? [{key: keyOf(file, index), src: (file.url ?? file.thumbnailUrl)!}]
      : []
  )
  if (!value.length) return null
  return (
    <>
      <ul {...rest} ref={ref} className={cx(styles.bsUploadedFileList, className, resolveClassNames(classNames))}>
        {value.map((file, index) => {
          const status = statusOf(file)
          const thumb = thumbOf(file, index)
          const canPreview = preview && status === 'done' && Boolean(thumb) && Boolean(file.url ?? file.thumbnailUrl)
          const meta =
            status === 'error'
              ? (file.errorMessage ?? UPLOADED_FILE_LIST_DEFAULT.FAILED_TEXT)
              : status === 'uploading'
                ? UPLOADED_FILE_LIST_DEFAULT.UPLOADING_TEXT
                : file.size != null
                  ? formatFileSize(file.size)
                  : ''
          return (
            <li
              key={keyOf(file, index)}
              className={cx(
                styles.bsUploadedFileItem,
                status === 'error' && styles[UPLOADED_FILE_LIST_STATE_CLASS.IS_ERROR]
              )}
            >
              {thumb ? (
                <img
                  src={thumb}
                  alt={file.name}
                  className={cx(
                    styles.bsUploadedFileThumb,
                    canPreview && styles[UPLOADED_FILE_LIST_STATE_CLASS.IS_PREVIEWABLE]
                  )}
                  onError={() => setBroken((old) => new Set(old).add(brokenKey(file, index)))}
                  onClick={() => {
                    if (canPreview) {
                      const next = previewSources.findIndex((item) => item.key === keyOf(file, index))
                      if (next >= 0) setLightboxIndex(next)
                    }
                  }}
                />
              ) : (
                <Icon name={isImageFile(file) ? 'image' : 'file'} size={18} classNames={styles.bsUploadedFileIcon} />
              )}
              <span className={styles.bsUploadedFileInfo}>
                <span className={styles.bsUploadedFileName}>{file.name}</span>
                <span className={styles.bsUploadedFileMeta}>{meta}</span>
              </span>
              <Icon
                name={status === 'uploading' ? 'refresh' : status === 'error' ? 'alert-circle' : 'check-circle'}
                spin={status === 'uploading'}
                size={15}
                classNames={
                  status === 'uploading'
                    ? styles.bsUploadedFileStatusUploading
                    : status === 'error'
                      ? styles.bsUploadedFileStatusError
                      : styles.bsUploadedFileStatusDone
                }
              />
              {removable && (
                <button
                  type="button"
                  className={styles.bsUploadedFileRemove}
                  aria-label={`${file.name} 삭제`}
                  onClick={() => {
                    onChange?.(value.filter((_, i) => i !== index))
                    onRemove?.(file, index)
                  }}
                >
                  <Icon name="close" size={14} />
                </button>
              )}
            </li>
          )
        })}
      </ul>
      {lightboxIndex !== null && (
        <Lightbox
          images={previewSources.map((item) => item.src)}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </>
  )
})
