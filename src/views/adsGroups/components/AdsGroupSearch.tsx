import { useState, useEffect } from 'react'
import { Input } from '@/components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { useAdsGroupStore } from '@/views/adsGroups/store/useAdsGroupStore'
import { useDebounce } from '@/hooks/useDebounce'

export default function AdsGroupSearch() {
  const { filter, setFilter } = useAdsGroupStore()

  const [searchValue, setSearchValue] = useState(filter.search || '')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    setFilter({
      ...filter,
      search: debouncedSearchValue,
    })
  }, [debouncedSearchValue])

  useEffect(() => {
    setSearchValue(filter.search || '')
  }, [filter.search])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <Input
      size="sm"
      placeholder="Tìm kiếm theo tên..."
      prefix={<HiOutlineSearch className="text-lg" />}
      value={searchValue}
      onChange={handleSearchChange}
    />
  )
}
