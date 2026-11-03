import {forwardRef, useRef, useState} from 'react'
import type {ChangeEvent, DragEvent} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {
  FILE_UPLOAD_DEFAULT,
  FILE_UPLOAD_FILE_STATUS,
  FILE_UPLOAD_LIST_TYPE,
  FILE_UPLOAD_STATE_CLASS
} from '~/components/FileUpload/FileUpload.constant'
import type {FileUploadItem, FileUploadProps} from '~/components/FileUpload/FileUpload.type'
import styles from '~/components/FileUpload/FileUpload.module.scss'

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(function FileUpload(
  {
    accept = FILE_UPLOAD_DEFAULT.ACCEPT,
    multiple = false,
    maxSize = FILE_UPLOAD_DEFAULT.MAX_SIZE,
    maxCount = FILE_UPLOAD_DEFAULT.MAX_COUNT,
    disabled = false,
    drag = false,
    listType = FILE_UPLOAD_DEFAULT.LIST_TYPE,
    showList = true,
    onChange,
    onUpload,
    onReject,
    classNames
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const counter = useRef(0)
  const [items, setItems] = useState<FileUploadItem[]>([])
  const [over, setOver] = useState(false)

  const isPicture = listType === FILE_UPLOAD_LIST_TYPE.PICTURE
  const canAdd = !disabled && (!showList || items.length < maxCount)

  const emitChange = (next: FileUploadItem[]) => {
    onChange?.(next.filter((it) => it.status === FILE_UPLOAD_FILE_STATUS.DONE).map((it) => it.file))
  }

  const addFiles = (fileList: FileList) => {
    const incoming = Array.from(fileList)
    onUpload?.(incoming)

    if (!showList) {
      const room = multiple ? maxCount : 1
      const picked = incoming.slice(0, room)
      const rejected = [
        ...picked
          .filter((file) => file.size > maxSize)
          .map((file) => ({file, message: `파일 크기 초과 (최대 ${formatFileSize(maxSize)})`})),
        ...incoming.slice(room).map((file) => ({file, message: `최대 ${room}개까지 선택할 수 있습니다`}))
      ]
      const valid = picked.filter((file) => file.size <= maxSize)
      if (rejected.length) onReject?.(rejected)
      if (valid.length) onChange?.(valid)
      return
    }

    const room = multiple ? maxCount - items.length : 1
    const picked = incoming.slice(0, Math.max(0, room))

    picked.forEach((file) => {
      const id = ++counter.current
      const tooLarge = file.size > maxSize
      const isImage = file.type.startsWith('image/')

      if (isPicture && isImage && !tooLarge) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setItems((prev) => {
            const next: FileUploadItem[] = [
              ...prev,
              {
                id,
                file,
                status: FILE_UPLOAD_FILE_STATUS.DONE,
                preview: e.target?.result as string
              }
            ]
            emitChange(next)
            return next
          })
        }
        reader.readAsDataURL(file)
        return
      }

      setItems((prev) => {
        const next: FileUploadItem[] = [
          ...prev,
          {
            id,
            file,
            status: tooLarge ? FILE_UPLOAD_FILE_STATUS.ERROR : FILE_UPLOAD_FILE_STATUS.DONE,
            errorMessage: tooLarge ? `파일 크기 초과 (최대 ${formatFileSize(maxSize)})` : undefined
          }
        ]
        emitChange(next)
        return next
      })
    })
  }

  const remove = (id: number) => {
    setItems((prev) => {
      const next = prev.filter((it) => it.id !== id)
      emitChange(next)
      return next
    })
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (!multiple) setItems([])
      addFiles(e.target.files)
    }
    e.target.value = ''
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOver(false)
    if (!disabled && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files)
    }
  }

  return (
    <div
      ref={ref}
      className={cx(
        styles.bsFileUpload,
        disabled && styles[FILE_UPLOAD_STATE_CLASS.IS_DISABLED],
        resolveClassNames(classNames)
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept === '*' ? undefined : accept}
        multiple={multiple}
        className={styles.bsFileUploadInput}
        disabled={disabled}
        onChange={handleInput}
      />

      {drag ? (
        <div
          className={cx(styles.bsFileUploadDropzone, over && styles[FILE_UPLOAD_STATE_CLASS.IS_OVER])}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={() => canAdd && inputRef.current?.click()}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && canAdd) {
              e.preventDefault()
              inputRef.current?.click()
            }
          }}
          onDragOver={(e) => {
            e.preventDefault()
            if (!disabled) setOver(true)
          }}
          onDragLeave={() => setOver(false)}
          onDrop={handleDrop}
        >
          <Icon name="upload" size={28} classNames={styles.bsFileUploadDropIcon} />
          <span className={styles.bsFileUploadDropTitle}>파일을 드래그하거나 클릭하여 선택</span>
          <span className={styles.bsFileUploadDropHint}>
            최대 {formatFileSize(maxSize)} · {accept === '*' ? '모든 파일' : accept}
          </span>
        </div>
      ) : (
        <button
          type="button"
          className={styles.bsFileUploadTrigger}
          disabled={!canAdd}
          onClick={() => canAdd && inputRef.current?.click()}
        >
          <Icon name="upload" size={15} />
          파일 선택
          {showList && maxCount > 1 && (
            <span className={styles.bsFileUploadCount}>
              ({items.length}/{maxCount})
            </span>
          )}
        </button>
      )}

      {showList && items.length > 0 && (
        <ul className={cx(styles.bsFileUploadList, isPicture && styles.bsFileUploadListPicture)}>
          {items.map((it) => {
            const isError = it.status === FILE_UPLOAD_FILE_STATUS.ERROR
            return (
              <li
                key={it.id}
                className={cx(styles.bsFileUploadItem, isError && styles[FILE_UPLOAD_STATE_CLASS.IS_ERROR])}
              >
                {isPicture && it.preview ? (
                  <img src={it.preview} alt={it.file.name} className={styles.bsFileUploadThumb} />
                ) : (
                  <Icon
                    name={drag ? 'paperclip' : it.file.type.startsWith('image/') ? 'image' : 'file'}
                    size={18}
                    classNames={styles.bsFileUploadFileIcon}
                  />
                )}

                <span className={styles.bsFileUploadInfo}>
                  <span className={styles.bsFileUploadName}>{it.file.name}</span>
                  <span className={styles.bsFileUploadMeta}>
                    {isError ? it.errorMessage : formatFileSize(it.file.size)}
                  </span>
                </span>

                <Icon
                  name={isError ? 'alert-circle' : 'check-circle'}
                  size={15}
                  classNames={isError ? styles.bsFileUploadStatusError : styles.bsFileUploadStatusDone}
                />

                <button
                  type="button"
                  className={styles.bsFileUploadRemoveButton}
                  aria-label={`${it.file.name} 삭제`}
                  onClick={() => remove(it.id)}
                >
                  <Icon name="close" size={14} />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
})
