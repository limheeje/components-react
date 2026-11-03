import {useEffect, useRef, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Dialog} from '~/components/Dialog/Dialog'
import {DIALOG_SIZE} from '~/components/Dialog/Dialog.constant'
import {Icon} from '~/components/Icon/Icon'
import {SHARE_CHANNEL, SHARE_CHANNEL_LABEL, SHARE_SHEET_DEFAULT} from '~/components/ShareSheet/ShareSheet.constant'
import type {ShareChannel, ShareSheetProps} from '~/components/ShareSheet/ShareSheet.type'
import styles from '~/components/ShareSheet/ShareSheet.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export function ShareSheet({
  open,
  onClose,
  url,
  title = SHARE_SHEET_DEFAULT.TITLE,
  channels = [...SHARE_SHEET_DEFAULT.CHANNELS] as ShareChannel[],
  closeOnBackdrop = true,
  onCopy,
  onShare,
  classNames
}: ShareSheetProps) {
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(copiedTimer.current), [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      /* clipboard 권한이 없는 환경은 무시 — 텍스트는 그대로 노출되어 수동 복사 가능 */
    }
    onCopy?.(url)
    setCopied(true)
    clearTimeout(copiedTimer.current)
    copiedTimer.current = setTimeout(() => setCopied(false), SHARE_SHEET_DEFAULT.COPIED_DURATION)
  }

  // 채널 버튼은 템플릿(모양)만 제공 — 실제 공유 동작(SDK 호출·공유 URL 오픈 등)은
  // 이 이벤트를 받는 소비 앱이 연결한다.
  function handleShare(channel: ShareChannel) {
    onShare?.({channel, url})
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      size={DIALOG_SIZE.SM}
      closeOnBackdrop={closeOnBackdrop}
      classNames={cx(styles.bsShareSheet, resolveClassNames(classNames))}
    >
      <div className={styles.bsShareSheetUrlRow}>
        <span className={styles.bsShareSheetUrl}>{url}</span>
        <button
          type="button"
          className={styles.bsShareSheetCopyButton}
          aria-label={copied ? '복사됨' : '링크 복사'}
          onClick={handleCopy}
        >
          <Icon name={copied ? 'check' : 'link'} size={16} />
        </button>
      </div>

      <div className={styles.bsShareSheetGrid}>
        {channels.map((channel) => (
          <button
            key={channel}
            type="button"
            className={styles.bsShareSheetChannel}
            onClick={() => handleShare(channel)}
          >
            <span className={cx(styles.bsShareSheetChannelIcon, styles[`bsShareSheetChannel${cap(channel)}`])}>
              {channel === SHARE_CHANNEL.KAKAO && (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#391B1B"
                    d="M12 3C6.48 3 2 6.58 2 11c0 2.8 1.83 5.26 4.6 6.68-.2.73-.72 2.63-.83 3.04-.13.5.18.5.39.36.16-.11 2.6-1.76 3.65-2.48.7.1 1.43.15 2.19.15 5.52 0 10-3.58 10-8s-4.48-8-10-8z"
                  />
                </svg>
              )}
              {channel === SHARE_CHANNEL.FACEBOOK && (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#fff"
                    d="M13.5 21v-7.75h2.6l.39-3.02h-3v-1.93c0-.87.24-1.47 1.5-1.47h1.6V4.14C15.94 4.06 15.02 4 13.94 4c-2.24 0-3.77 1.37-3.77 3.88v2.35H7.55v3.02h2.62V21h3.33z"
                  />
                </svg>
              )}
              {channel === SHARE_CHANNEL.TWITTER && (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#fff"
                    d="M22 5.92c-.66.3-1.36.5-2.1.59a3.66 3.66 0 0 0 1.6-2.02c-.71.42-1.49.72-2.32.89a3.65 3.65 0 0 0-6.22 3.33A10.36 10.36 0 0 1 5.4 4.7a3.65 3.65 0 0 0 1.13 4.87c-.6-.02-1.16-.18-1.65-.46v.05c0 1.77 1.26 3.25 2.93 3.59-.31.08-.63.13-.96.13-.24 0-.46-.02-.69-.06.47 1.46 1.83 2.52 3.44 2.55A7.33 7.33 0 0 1 2 17.54a10.34 10.34 0 0 0 5.6 1.64c6.72 0 10.4-5.57 10.4-10.4l-.01-.47c.72-.51 1.34-1.16 1.83-1.9-.66.29-1.36.49-2.09.58z"
                  />
                </svg>
              )}
              {channel === SHARE_CHANNEL.WHATSAPP && (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#fff"
                    d="M12.02 2C6.5 2 2 6.48 2 12c0 1.88.52 3.63 1.42 5.13L2 22l4.99-1.31A9.96 9.96 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2zm0 18.06c-1.68 0-3.24-.5-4.55-1.36l-.33-.2-3.03.8.81-2.95-.21-.34a8.06 8.06 0 0 1-1.24-4.31c0-4.46 3.63-8.09 8.1-8.09 4.46 0 8.08 3.63 8.08 8.09 0 4.47-3.62 8.36-7.63 8.36z"
                  />
                  <path
                    fill="#fff"
                    d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49h-.55c-.19 0-.51.07-.77.36-.26.29-1.01.99-1.01 2.41s1.03 2.8 1.18 2.99c.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.81.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z"
                  />
                </svg>
              )}
            </span>
            <span className={styles.bsShareSheetChannelLabel}>{SHARE_CHANNEL_LABEL[channel]}</span>
          </button>
        ))}
      </div>
    </Dialog>
  )
}
