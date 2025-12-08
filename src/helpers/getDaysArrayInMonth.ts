export const getDaysArrayInMonth = (month: number | undefined) => {
  if (!month) return []

  const year = new Date().getFullYear()
  const daysInMonth = new Date(year, month, 0).getDate()
  const pad = (n: number) => String(n).padStart(2, '0')

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    return `${pad(day)}`
  })
}

export const getDaysInMonth = (month: number | undefined) => {
  if (!month) return 0

  const year = new Date().getFullYear()
  return new Date(year, month, 0).getDate()
}
