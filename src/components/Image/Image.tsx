import {forwardRef, useEffect, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {IMAGE_DEFAULT, IMAGE_STATE_CLASS, IMAGE_STATUS} from '~/components/Image/Image.constant'
import type {ImageProps} from '~/components/Image/Image.type'
import styles from '~/components/Image/Image.module.scss'

const toSize = (v: number | string) => (typeof v === 'number' ? `${v}px` : v)

export const Image = forwardRef<HTMLDivElement, ImageProps>(function Image(
  {
    src,
    alt,
    fallbackSrc,
    width = IMAGE_DEFAULT.WIDTH,
    height = IMAGE_DEFAULT.HEIGHT,
    objectFit = IMAGE_DEFAULT.OBJECT_FIT,
    rounded = IMAGE_DEFAULT.ROUNDED,
    skeleton = IMAGE_DEFAULT.SKELETON,
    fadeIn = IMAGE_DEFAULT.FADE_IN,
    loading = IMAGE_DEFAULT.LOADING,
    imgStyle,
    style,
    onLoad,
    onError,
    classNames
  },
  ref
) {
  const [status, setStatus] = useState<string>(IMAGE_STATUS.LOADING)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [triedFallback, setTriedFallback] = useState(false)

  // src 가 바뀌면 상태 초기화
  useEffect(() => {
    setStatus(IMAGE_STATUS.LOADING)
    setCurrentSrc(src)
    setTriedFallback(false)
  }, [src])

  const handleLoad = () => {
    setStatus(IMAGE_STATUS.LOADED)
    onLoad?.()
  }

  const handleError = () => {
    if (fallbackSrc && !triedFallback) {
      setTriedFallback(true)
      setCurrentSrc(fallbackSrc)
      return
    }
    setStatus(IMAGE_STATUS.ERROR)
    onError?.()
  }

  const isLoading = status === IMAGE_STATUS.LOADING
  const isError = status === IMAGE_STATUS.ERROR
  const isLoaded = status === IMAGE_STATUS.LOADED

  return (
    <div
      ref={ref}
      className={cx(
        styles.bsImage,
        isLoading && styles[IMAGE_STATE_CLASS.IS_LOADING],
        isLoaded && styles[IMAGE_STATE_CLASS.IS_LOADED],
        isError && styles[IMAGE_STATE_CLASS.IS_ERROR],
        fadeIn && styles[IMAGE_STATE_CLASS.IS_FADE],
        resolveClassNames(classNames)
      )}
      style={{
        width: toSize(width),
        height: toSize(height),
        borderRadius: toSize(rounded),
        ...style
      }}
    >
      {isLoading && skeleton && <span className={styles.bsImageSkeleton} aria-hidden="true" />}

      {isError ? (
        <span className={styles.bsImageError} role="img" aria-label={alt || '이미지 오류'}>
          <Icon name="image" size={28} />
          <span className={styles.bsImageErrorText}>이미지를 불러올 수 없습니다</span>
        </span>
      ) : (
        <img
          className={styles.bsImageImg}
          src={currentSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{objectFit, ...imgStyle}}
        />
      )}
    </div>
  )
})
