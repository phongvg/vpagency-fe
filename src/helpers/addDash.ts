export function addDash(str: number | null | undefined): string {
  const digits = str?.toString().replace(/\D/g, '') ?? ''

  return digits.replace(/(\d{3})(?=\d)/g, '$1-')
}
