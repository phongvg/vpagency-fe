import { Input } from '@/components/ui'
import { useDebounce } from '@/hooks/useDebounce'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'
import { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function GmailAccountSearch() {
  const { filter, setFilter } = useGmailAccountStore()

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
      placeholder="Tìm kiếm theo gmail..."
      prefix={<HiOutlineSearch className="text-lg" />}
      value={searchValue}
      onChange={handleSearchChange}
    />
  )
}
