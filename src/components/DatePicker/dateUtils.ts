export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const
export const MONTHS_KR = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월'
] as const

export const pad2 = (n: number) => String(n).padStart(2, '0')

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export function dayOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return dayOnly(a).getTime() < dayOnly(b).getTime()
}

export function isAfterDay(a: Date, b: Date): boolean {
  return dayOnly(a).getTime() > dayOnly(b).getTime()
}

export function isBetweenDay(d: Date, start: Date, end: Date): boolean {
  const t = dayOnly(d).getTime()
  return t > dayOnly(start).getTime() && t < dayOnly(end).getTime()
}

/** format 토큰: YYYY MM DD HH mm */
export function formatDate(d: Date | null, format: string, hour = 0, minute = 0): string {
  if (!d) return ''
  return format
    .replace('YYYY', String(d.getFullYear()))
    .replace('MM', pad2(d.getMonth() + 1))
    .replace('DD', pad2(d.getDate()))
    .replace('HH', pad2(hour))
    .replace('mm', pad2(minute))
}
