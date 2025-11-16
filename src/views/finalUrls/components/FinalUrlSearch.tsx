import { Input } from '@/components/ui'
import { useDebounce } from '@/hooks/useDebounce'
import { useFinalUrlStore } from '@/views/finalUrls/store/useFinalUrlStore'
import { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function FinalUrlSearch() {
  const { filter, setFilter } = useFinalUrlStore()

  const [searchValue, setSearchValue] = useState(filter.search || '')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    setFilter({
      ...filter,
      search: debouncedSearchValue,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue])

  useEffect(() => {
    setSearchValue(filter.search || '')
  }, [filter.search])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <Input
      placeholder="Tìm kiếm url..."
      size="sm"
      prefix={<HiOutlineSearch className="text-lg" />}
      value={searchValue}
      onChange={handleSearchChange}
    />
  )
}
