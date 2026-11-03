import {forwardRef, useRef, useState} from 'react'
import type {ChangeEvent, DragEvent} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {Lightbox} from '~/components/Lightbox/Lightbox'
import {
  IMAGE_UPLOAD_PREVIEW_DEFAULT,
  IMAGE_UPLOAD_PREVIEW_STATE_CLASS
} from '~/components/ImageUploadPreview/ImageUploadPreview.constant'
import type {
  ImageUploadPreviewItem,
  ImageUploadPreviewProps
} from '~/components/ImageUploadPreview/ImageUploadPreview.type'
import styles from '~/components/ImageUploadPreview/ImageUploadPreview.module.scss'

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export const ImageUploadPreview = forwardRef<HTMLDivElement, ImageUploadPreviewProps>(function ImageUploadPreview(
  {
    maxCount = IMAGE_UPLOAD_PREVIEW_DEFAULT.MAX_COUNT,
    maxSize = IMAGE_UPLOAD_PREVIEW_DEFAULT.MAX_SIZE,
    cols = IMAGE_UPLOAD_PREVIEW_DEFAULT.COLS,
    thumbSize = IMAGE_UPLOAD_PREVIEW_DEFAULT.THUMB_SIZE,
    drag = false,
    listView = false,
    disabled = false,
    showList = true,
    onChange,
    onReject,
    classNames
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const counter = useRef(0)
  const [items, setItems] = useState<ImageUploadPreviewItem[]>([])
  const [over, setOver] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const canAdd = !disabled && (!showList || items.length < maxCount)

  const emitChange = (next: ImageUploadPreviewItem[]) => {
    onChange?.(next.filter((it) => !it.errorMessage).map((it) => it.file))
  }

  const addFiles = (fileList: FileList) => {
    const incoming = Array.from(fileList).filter((file) => file.type.startsWith('image/'))
    if (!showList) {
      const picked = incoming.slice(0, maxCount)
      const rejected = [
        ...picked
          .filter((file) => file.size > maxSize)
          .map((file) => ({file, message: `크기 초과 (최대 ${formatFileSize(maxSize)})`})),
        ...incoming.slice(maxCount).map((file) => ({file, message: `최대 ${maxCount}개까지 선택할 수 있습니다`}))
      ]
      const valid = picked.filter((file) => file.size <= maxSize)
      if (rejected.length) onReject?.(rejected)
      if (valid.length) onChange?.(valid)
      return
    }
    const picked = Array.from(fileList)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, Math.max(0, maxCount - items.length))

    picked.forEach((file) => {
      const id = ++counter.current
      if (file.size > maxSize) {
        setItems((prev) => {
          const next = [
            ...prev,
            {
              id,
              file,
              dataUrl: '',
              errorMessage: `크기 초과 (최대 ${formatFileSize(maxSize)})`
            }
          ]
          emitChange(next)
          return next
        })
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setItems((prev) => {
          const next = [...prev, {id, file, dataUrl: (e.target?.result as string) ?? ''}]
          emitChange(next)
          return next
        })
      }
      reader.readAsDataURL(file)
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
    if (e.target.files) addFiles(e.target.files)
    e.target.value = ''
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOver(false)
    if (!disabled && e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files)
  }

  const validUrls = items.filter((it) => !it.errorMessage).map((it) => it.dataUrl)

  const openLightbox = (item: ImageUploadPreviewItem) => {
    const idx = validUrls.indexOf(item.dataUrl)
    if (idx !== -1) setLightboxIndex(idx)
  }

  const pick = () => inputRef.current?.click()

  return (
    <div
      ref={ref}
      className={cx(
        styles.bsImageUploadPreview,
        disabled && styles[IMAGE_UPLOAD_PREVIEW_STATE_CLASS.IS_DISABLED],
        resolveClassNames(classNames)
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className={styles.bsImageUploadPreviewInput}
        disabled={disabled}
        onChange={handleInput}
      />

      {drag && canAdd && (
        <div
          className={cx(styles.bsImageUploadPreviewDropzone, over && styles[IMAGE_UPLOAD_PREVIEW_STATE_CLASS.IS_OVER])}
          role="button"
          tabIndex={0}
          onClick={pick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              pick()
            }
          }}
          onDragOver={(e) => {
            e.preventDefault()
            if (!disabled) setOver(true)
          }}
          onDragLeave={() => setOver(false)}
          onDrop={handleDrop}
        >
          <Icon name="upload" size={26} classNames={styles.bsImageUploadPreviewDropIcon} />
          <span className={styles.bsImageUploadPreviewDropTitle}>이미지를 드래그하거나 클릭하여 선택</span>
          <span className={styles.bsImageUploadPreviewDropHint}>
            PNG, JPG, WEBP · 최대 {formatFileSize(maxSize)}
            {showList && ` · ${items.length}/${maxCount}`}
          </span>
        </div>
      )}

      {listView ? (
        <div className={styles.bsImageUploadPreviewList}>
          {items.map((item) => (
            <ListRow key={item.id} item={item} onRemove={remove} onOpen={openLightbox} />
          ))}
          {!drag && canAdd && (
            <button type="button" className={styles.bsImageUploadPreviewListAdd} onClick={pick}>
              <Icon name="plus" size={14} />
              이미지 추가 ({items.length}/{maxCount})
            </button>
          )}
        </div>
      ) : (
        <div
          className={styles.bsImageUploadPreviewGrid}
          style={{
            gridTemplateColumns: `repeat(${cols}, ${thumbSize}px)`
          }}
        >
          {items.map((item) => (
            <ThumbCard key={item.id} item={item} size={thumbSize} onRemove={remove} onOpen={openLightbox} />
          ))}
          {!drag && canAdd && (
            <button
              type="button"
              className={styles.bsImageUploadPreviewAddCard}
              style={{width: thumbSize, height: thumbSize}}
              onClick={pick}
            >
              <Icon name="plus" size={18} />
              <span>
                {items.length}/{maxCount}
              </span>
            </button>
          )}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={validUrls}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </div>
  )
})

interface CardProps {
  item: ImageUploadPreviewItem
  size: number
  onRemove: (id: number) => void
  onOpen: (item: ImageUploadPreviewItem) => void
}

function ThumbCard({item, size, onRemove, onOpen}: CardProps) {
  if (item.errorMessage) {
    return (
      <div
        className={cx(styles.bsImageUploadPreviewCard, styles.bsImageUploadPreviewCardError)}
        style={{width: size, height: size}}
      >
        <Icon name="alert-circle" size={18} classNames={styles.bsImageUploadPreviewCardErrorIcon} />
        <span className={styles.bsImageUploadPreviewCardErrorText}>{item.errorMessage}</span>
        <button
          type="button"
          className={styles.bsImageUploadPreviewCardRemove}
          aria-label="삭제"
          onClick={() => onRemove(item.id)}
        >
          <Icon name="close" size={10} />
        </button>
      </div>
    )
  }

  return (
    <div className={styles.bsImageUploadPreviewCard} style={{width: size, height: size}}>
      <img
        src={item.dataUrl}
        alt={item.file.name}
        className={styles.bsImageUploadPreviewCardImage}
        onClick={() => onOpen(item)}
      />
      <div className={styles.bsImageUploadPreviewCardOverlay} onClick={() => onOpen(item)}>
        <Icon name="zoom-in" size={18} />
      </div>
      <button
        type="button"
        className={styles.bsImageUploadPreviewCardRemove}
        aria-label={`${item.file.name} 삭제`}
        onClick={(e) => {
          e.stopPropagation()
          onRemove(item.id)
        }}
      >
        <Icon name="close" size={11} />
      </button>
    </div>
  )
}

function ListRow({item, onRemove, onOpen}: Omit<CardProps, 'size'>) {
  const isError = Boolean(item.errorMessage)
  return (
    <div className={cx(styles.bsImageUploadPreviewRow, isError && styles.bsImageUploadPreviewRowError)}>
      {item.dataUrl ? (
        <img
          src={item.dataUrl}
          alt={item.file.name}
          className={styles.bsImageUploadPreviewRowThumb}
          onClick={() => onOpen(item)}
        />
      ) : (
        <span className={styles.bsImageUploadPreviewRowThumbError}>
          <Icon name="alert-circle" size={18} />
        </span>
      )}

      <span className={styles.bsImageUploadPreviewRowInfo}>
        <span className={styles.bsImageUploadPreviewRowName}>{item.file.name}</span>
        <span className={styles.bsImageUploadPreviewRowMeta}>
          {isError ? item.errorMessage : formatFileSize(item.file.size)}
        </span>
      </span>

      <span className={styles.bsImageUploadPreviewRowActions}>
        {!isError && (
          <button
            type="button"
            className={styles.bsImageUploadPreviewRowButton}
            aria-label="미리보기"
            onClick={() => onOpen(item)}
          >
            <Icon name="zoom-in" size={13} />
          </button>
        )}
        <button
          type="button"
          className={cx(styles.bsImageUploadPreviewRowButton, styles.bsImageUploadPreviewRowButtonDanger)}
          aria-label="삭제"
          onClick={() => onRemove(item.id)}
        >
          <Icon name="trash" size={13} />
        </button>
      </span>
    </div>
  )
}
