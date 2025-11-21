import { Input } from '@/components/ui'
import { useDebounce } from '@/hooks/useDebounce'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function CampaignSearch() {
  const { filter, setFilter } = useCampaignStore()

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
      size="sm"
      placeholder="Tìm kiếm theo tên..."
      value={searchValue}
      prefix={<HiOutlineSearch className="text-lg" />}
      onChange={handleSearchChange}
    />
  )
}
