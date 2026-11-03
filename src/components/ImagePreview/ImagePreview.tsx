import {forwardRef, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {Lightbox} from '~/components/Lightbox/Lightbox'
import {IMAGE_PREVIEW_DEFAULT, IMAGE_PREVIEW_STATE_CLASS} from '~/components/ImagePreview/ImagePreview.constant'
import type {ImagePreviewProps} from '~/components/ImagePreview/ImagePreview.type'
import styles from '~/components/ImagePreview/ImagePreview.module.scss'

const toSize = (v: number | string) => (typeof v === 'number' ? `${v}px` : v)

export const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(function ImagePreview(
  {
    src,
    alt = '',
    width = IMAGE_PREVIEW_DEFAULT.WIDTH,
    height = IMAGE_PREVIEW_DEFAULT.HEIGHT,
    preview = IMAGE_PREVIEW_DEFAULT.PREVIEW,
    group,
    radius = IMAGE_PREVIEW_DEFAULT.RADIUS,
    fit = IMAGE_PREVIEW_DEFAULT.FIT,
    fallback,
    classNames
  },
  ref
) {
  const [errored, setErrored] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const images = group ?? [src]
  const ownIndex = Math.max(0, group ? group.indexOf(src) : 0)

  const open = () => {
    if (preview) setLightboxIndex(ownIndex)
  }

  return (
    <>
      <div
        ref={ref}
        className={cx(
          styles.bsImagePreview,
          preview && styles[IMAGE_PREVIEW_STATE_CLASS.IS_PREVIEWABLE],
          resolveClassNames(classNames)
        )}
        style={{
          width: toSize(width),
          height: toSize(height),
          borderRadius: toSize(radius)
        }}
        role={preview ? 'button' : undefined}
        tabIndex={preview ? 0 : undefined}
        onClick={open}
        onKeyDown={(e) => {
          if (preview && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            open()
          }
        }}
      >
        <img
          className={styles.bsImagePreviewImg}
          src={errored && fallback ? fallback : src}
          alt={alt}
          style={{objectFit: fit}}
          onError={() => setErrored(true)}
        />
        {preview && (
          <span className={styles.bsImagePreviewOverlay} aria-hidden="true">
            <Icon name="zoom-in" size={22} />
          </span>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </>
  )
})
