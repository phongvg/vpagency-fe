import { Input } from '@/components/ui'
import { useDebounce } from '@/hooks/useDebounce'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function ProjectSearch() {
  const { filter, setFilter } = useProjectStore()

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
      placeholder="Tìm kiếm dự án..."
      size="sm"
      prefix={<HiOutlineSearch className="text-lg" />}
      value={searchValue}
      onChange={handleSearchChange}
    />
  )
}
