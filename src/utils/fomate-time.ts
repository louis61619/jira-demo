import dayjs from 'dayjs'

export function foramteDate(str: string) {
  return dayjs(str).format('YYYY-MM-DD HH:mm:ss')
}
