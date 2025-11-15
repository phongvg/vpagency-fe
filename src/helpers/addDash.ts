export function addDash(str: string | null | undefined): string {
  if (!str) return ''

  const digits = str.replace(/\D/g, '') ?? ''

  return digits.replace(/(\d{3})(?=\d)/g, '$1-')
}
