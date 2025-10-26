import { useLocation } from 'react-router-dom'

export const useQueryParam = (key: string) => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  return params.get(key)
}
