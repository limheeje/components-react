/** 공유 채널 키 → CSS Module 클래스 키(`bsShareSheetChannel*`) */
export const SHARE_CHANNEL = Object.freeze({
  KAKAO: 'kakao',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  WHATSAPP: 'whatsapp'
} as const)

/** 채널 라벨 (한글) */
export const SHARE_CHANNEL_LABEL = Object.freeze({
  [SHARE_CHANNEL.KAKAO]: '카카오톡',
  [SHARE_CHANNEL.FACEBOOK]: '페이스북',
  [SHARE_CHANNEL.TWITTER]: '트위터',
  [SHARE_CHANNEL.WHATSAPP]: 'whatsApp'
} as const)

/** 상태 modifier 클래스명 (CSS Module 키) */
export const SHARE_SHEET_STATE_CLASS = Object.freeze({
  IS_COPIED: 'is-copied'
} as const)

export const SHARE_SHEET_DEFAULT = Object.freeze({
  TITLE: '공유하기',
  CHANNELS: [SHARE_CHANNEL.KAKAO, SHARE_CHANNEL.FACEBOOK, SHARE_CHANNEL.TWITTER, SHARE_CHANNEL.WHATSAPP],
  /** 복사 완료 표시 지속 시간(ms) */
  COPIED_DURATION: 1500
} as const)
