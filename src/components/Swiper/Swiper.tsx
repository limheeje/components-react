import {Children, forwardRef, useEffect, useState} from 'react'
import type {ReactNode} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {SWIPER_DEFAULT, SWIPER_PAGINATION} from '~/components/Swiper/Swiper.constant'
import type {SwiperProps} from '~/components/Swiper/Swiper.type'
import styles from '~/components/Swiper/Swiper.module.scss'

export const Swiper = forwardRef<HTMLDivElement, SwiperProps>(function Swiper(
  {
    items,
    children,
    autoplay = false,
    loop = false,
    navigation = true,
    pagination = SWIPER_DEFAULT.PAGINATION,
    slidesPerView = SWIPER_DEFAULT.SLIDES_PER_VIEW,
    spaceBetween = SWIPER_DEFAULT.SPACE_BETWEEN,
    onChange,
    classNames
  },
  ref
) {
  const slides: ReactNode[] = items ?? Children.toArray(children)
  const total = slides.length

  const spv = Math.max(0.5, slidesPerView)
  const floorSpv = Math.floor(spv)
  const maxIdx = Math.max(0, total - floorSpv)
  const gap = spaceBetween

  const [current, setCurrent] = useState(0)

  const move = (next: number) => {
    setCurrent(next)
    onChange?.(next)
  }

  useEffect(() => {
    if (!autoplay) return
    const delay = typeof autoplay === 'number' ? autoplay : SWIPER_DEFAULT.AUTOPLAY_DELAY
    const id = setInterval(() => {
      setCurrent((c) => {
        const next = c + 1
        const resolved = next > maxIdx ? (loop ? 0 : c) : next
        if (resolved !== c) onChange?.(resolved)
        return resolved
      })
    }, delay)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, loop, maxIdx])

  const goPrev = () => move(current === 0 ? (loop ? maxIdx : 0) : current - 1)
  const goNext = () => move(current >= maxIdx ? (loop ? 0 : current) : current + 1)

  const canPrev = current > 0 || loop
  const canNext = current < maxIdx || loop

  const slideWidth = gap > 0 ? `calc((100% - ${gap * Math.max(0, floorSpv - 1)}px) / ${spv})` : `calc(100% / ${spv})`
  const translate = `calc(-${current} * (100% + ${gap}px) / ${spv})`
  const progress = maxIdx === 0 ? 1 : current / maxIdx

  return (
    <div ref={ref} className={cx(styles.bsSwiper, resolveClassNames(classNames))}>
      <div className={styles.bsSwiperViewport}>
        <div className={styles.bsSwiperTrackClip}>
          <div
            className={styles.bsSwiperTrack}
            style={{
              gap: gap || undefined,
              transform: `translateX(${translate})`
            }}
          >
            {slides.map((slide, i) => (
              <div key={i} className={styles.bsSwiperSlide} style={{width: slideWidth}}>
                {slide}
              </div>
            ))}
          </div>
        </div>

        {navigation && total > 0 && (
          <>
            <button
              type="button"
              className={cx(styles.bsSwiperArrow, styles.bsSwiperArrowPrev)}
              disabled={!canPrev}
              aria-label="이전 슬라이드"
              onClick={goPrev}
            >
              <Icon name="chevron-left" size={17} />
            </button>
            <button
              type="button"
              className={cx(styles.bsSwiperArrow, styles.bsSwiperArrowNext)}
              disabled={!canNext}
              aria-label="다음 슬라이드"
              onClick={goNext}
            >
              <Icon name="chevron-right" size={17} />
            </button>
          </>
        )}
      </div>

      {pagination === SWIPER_PAGINATION.BULLETS && (
        <div className={styles.bsSwiperBullets}>
          {Array.from({length: maxIdx + 1}, (_, i) => (
            <button
              key={i}
              type="button"
              className={cx(styles.bsSwiperBullet, i === current && styles.bsSwiperBulletActive)}
              aria-label={`${i + 1}번 슬라이드로 이동`}
              aria-current={i === current}
              onClick={() => move(i)}
            />
          ))}
        </div>
      )}

      {pagination === SWIPER_PAGINATION.FRACTION && (
        <div className={styles.bsSwiperFraction}>
          <span className={styles.bsSwiperFractionCurrent}>{current + 1}</span>
          <span> / </span>
          <span>{maxIdx + 1}</span>
        </div>
      )}

      {pagination === SWIPER_PAGINATION.PROGRESSBAR && (
        <div className={styles.bsSwiperProgress}>
          <div className={styles.bsSwiperProgressBar} style={{width: `${progress * 100}%`}} />
        </div>
      )}
    </div>
  )
})
