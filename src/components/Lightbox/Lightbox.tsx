import {useCallback, useEffect, useMemo, useState} from 'react'

import {cx} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {LIGHTBOX_DEFAULT} from '~/components/Lightbox/Lightbox.constant'
import type {LightboxProps} from '~/components/Lightbox/Lightbox.type'
import styles from '~/components/Lightbox/Lightbox.module.scss'

const {ZOOM_MIN, ZOOM_MAX, ZOOM_STEP, ROTATE_STEP} = LIGHTBOX_DEFAULT

export function Lightbox({images, index, onClose, onChange, downloadable = true}: LightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [natural, setNatural] = useState<{width: number; height: number} | null>(null)
  const [viewport, setViewport] = useState(() => ({width: window.innerWidth, height: window.innerHeight}))

  const go = useCallback(
    (next: number) => {
      onChange(Math.max(0, Math.min(images.length - 1, next)))
    },
    [images.length, onChange]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') go(index - 1)
      if (e.key === 'ArrowRight') go(index + 1)
    }
    const handleResize = () => setViewport({width: window.innerWidth, height: window.innerHeight})
    window.addEventListener('keydown', handler)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('resize', handleResize)
    }
  }, [index, go, onClose])

  useEffect(() => {
    setZoom(1)
    setRotate(0)
    setNatural(null)
  }, [index])

  const src = images[index]

  /** zoom=1 기준 표시 크기: 뷰포트 80% 안에 contain하며 원본보다 확대하지 않는다. */
  const baseSize = useMemo(() => {
    if (!natural?.width || !natural.height) return null
    const fit = Math.min(1, (viewport.width * 0.8) / natural.width, (viewport.height * 0.8) / natural.height)
    return {width: natural.width * fit, height: natural.height * fit}
  }, [natural, viewport])

  const sideways = Math.abs(rotate / 90) % 2 === 1
  const canvasStyle = baseSize
    ? {
        width: (sideways ? baseSize.height : baseSize.width) * zoom,
        height: (sideways ? baseSize.width : baseSize.height) * zoom
      }
    : undefined
  const imageStyle = baseSize
    ? {
        width: baseSize.width * zoom,
        height: baseSize.height * zoom,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`
      }
    : undefined

  const download = () => {
    const a = document.createElement('a')
    a.href = src
    a.download = 'image'
    a.click()
  }

  return (
    <div
      className={styles.bsLightboxOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="이미지 미리보기"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.bsLightboxToolbar}>
        <button
          type="button"
          className={styles.bsLightboxToolButton}
          aria-label="확대"
          onClick={() => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
        >
          <Icon name="zoom-in" size={18} />
        </button>
        <button
          type="button"
          className={styles.bsLightboxToolButton}
          aria-label="축소"
          onClick={() => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
        >
          <Icon name="zoom-out" size={18} />
        </button>
        <button
          type="button"
          className={styles.bsLightboxToolButton}
          aria-label="회전"
          onClick={() => setRotate((r) => r + ROTATE_STEP)}
        >
          <Icon name="rotate-cw" size={18} />
        </button>
        {downloadable && (
          <button type="button" className={styles.bsLightboxToolButton} aria-label="다운로드" onClick={download}>
            <Icon name="download" size={18} />
          </button>
        )}
        <button type="button" className={styles.bsLightboxToolButton} aria-label="닫기" onClick={onClose}>
          <Icon name="close" size={18} />
        </button>
      </div>

      {images.length > 1 && (
        <div className={styles.bsLightboxCounter}>
          {index + 1} / {images.length}
        </div>
      )}

      {images.length > 1 && index > 0 && (
        <button
          type="button"
          className={cx(styles.bsLightboxNav, styles.bsLightboxNavPrev)}
          aria-label="이전"
          onClick={() => go(index - 1)}
        >
          <Icon name="chevron-left" size={22} />
        </button>
      )}
      {images.length > 1 && index < images.length - 1 && (
        <button
          type="button"
          className={cx(styles.bsLightboxNav, styles.bsLightboxNavNext)}
          aria-label="다음"
          onClick={() => go(index + 1)}
        >
          <Icon name="chevron-right" size={22} />
        </button>
      )}

      <div className={styles.bsLightboxStage} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className={styles.bsLightboxCanvas} style={canvasStyle}>
          <img
            src={src}
            alt=""
            className={cx(styles.bsLightboxImage, baseSize && styles.bsLightboxImageSized)}
            style={imageStyle}
            onLoad={(e) => setNatural({width: e.currentTarget.naturalWidth, height: e.currentTarget.naturalHeight})}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className={styles.bsLightboxThumbs}>
          {images.map((img, i) => (
            <img
              key={img + i}
              src={img}
              alt=""
              className={cx(styles.bsLightboxThumb, i === index && styles.bsLightboxThumbActive)}
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
