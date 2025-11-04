export const setDeadlineTo1800 = (date: Date | null): Date | null => {
  if (!date) return null
  const newDate = new Date(date)
  newDate.setHours(18, 0, 0, 0)
  return newDate
}
