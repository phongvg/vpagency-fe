import { useState, useEffect } from 'react'
import { Input } from '@/components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { useAdsAccountStore } from '@/views/adsAccounts/store/useAdsAccountStore'
import { useDebounce } from '@/hooks/useDebounce'

export default function AdsAccountSearch() {
  const { filter, setFilter } = useAdsAccountStore()

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
      placeholder="Tìm kiếm theo UUID, gmail..."
      prefix={<HiOutlineSearch className="text-lg" />}
      value={searchValue}
      onChange={handleSearchChange}
    />
  )
}
