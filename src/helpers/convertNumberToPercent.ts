export const convertNumberToPercent = (value: number | null, decimalPlaces: number = 2): string => {
  if (value === null) return ''
  return `${(value * 100).toFixed(decimalPlaces)}%`
}
