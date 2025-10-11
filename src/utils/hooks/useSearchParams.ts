import { useCallback, useMemo } from 'react'

function useSearchParams() {
  const params = useMemo(() => new URLSearchParams(window.location.search), [])

  const get = (key: string) => params.get(key)
  const getAll = () => Object.fromEntries(params.entries())

  const set = useCallback((key: string, value: string) => {
    const newParams = new URLSearchParams(window.location.search)
    newParams.set(key, value)
    const newUrl = `${window.location.pathname}?${newParams.toString()}`
    window.history.pushState({}, '', newUrl)
  }, [])

  const remove = useCallback((key: string) => {
    const newParams = new URLSearchParams(window.location.search)
    newParams.delete(key)
    const newUrl = `${window.location.pathname}?${newParams.toString()}`
    window.history.pushState({}, '', newUrl)
  }, [])

  return { get, getAll, set, remove }
}

export default useSearchParams
