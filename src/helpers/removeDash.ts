export function removeDash(str: string) {
  try {
    if (!str.includes('-')) return str

    return str.replace(/-/g, '')
  } catch {
    return str || ''
  }
}
