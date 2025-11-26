export function addDash(str: string | null | undefined): string {
  if (!str) return ''

  try {
    const digits = str.replace(/\D/g, '')

    const limited = digits.slice(0, 10)

    return limited.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3')
  } catch {
    return str || ''
  }
}
