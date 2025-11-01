import dayjs from 'dayjs'

type FormatDate =
  | 'DD/MM/YYYY'
  | 'DD/MM/YYYY HH:mm'
  | 'MM/DD/YYYY'
  | 'MM/DD/YYYY HH:mm'
  | 'YYYY-MM-DD'
  | 'YYYY-MM-DD HH:mm'

export function formatDate(date: string | Date | undefined | null, format: FormatDate = 'DD/MM/YYYY HH:mm'): string {
  if (!date) return ''

  try {
    return dayjs(date).format(format)
  } catch {
    return ''
  }
}
