export function removeDash(str: string) {
  if (!str.includes('-')) return str

  return str.replace(/-/g, '')
}
