import { useState, useCallback, useEffect } from 'react'
import { Input } from '@/components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { useAdsGroupStore } from '@/views/systems/adsGroups/store/useAdsGroupStore'
import { debounce } from 'lodash'

export default function AdsGroupSearch() {
  const { filter, setSearch } = useAdsGroupStore()
  const [searchValue, setSearchValue] = useState(filter.search)

  useEffect(() => {
    setSearchValue(filter.search)
  }, [filter.search])

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value)
    }, 500),
    [setSearch],
  )

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    debouncedSearch(value)
  }

  return (
    <div className="flex items-center space-x-4">
      <Input
        ref={null}
        className="w-72"
        size="sm"
        placeholder="Tìm kiếm theo tên, mô tả..."
        prefix={<HiOutlineSearch className="text-lg" />}
        value={searchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  )
}
