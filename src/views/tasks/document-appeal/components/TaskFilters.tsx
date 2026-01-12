import { Button, DatePicker, Input, Select, UserSelect } from '@/components/ui'
import { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { formatDate } from '@/helpers/formatDate'
import { useDebounce } from '@/hooks/useDebounce'
import { useEffect, useMemo, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDocumentAppealStore } from '../store/useDocumentAppealStore'
import { DocumentAppealStatus } from '../types/documentAppeal.type'

const statusLabels = {
  [DocumentAppealStatus.PENDING]: 'Chờ xử lý',
  [DocumentAppealStatus.IN_PROGRESS]: 'Đang xử lý',
  [DocumentAppealStatus.COMPLETED]: 'Hoàn thành',
  [DocumentAppealStatus.CANCELLED]: 'Đã hủy',
}

const statusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  ...Object.values(DocumentAppealStatus).map((status) => ({
    value: status,
    label: statusLabels[status],
  })),
]

export default function TaskFilters() {
  const { filters, setFilters } = useDocumentAppealStore()

  const [assignedUsers, setAssignedUsers] = useState<UserOption | null>(null)
  const [creators, setCreators] = useState<UserOption | null>(null)
  const [searchValue, setSearchValue] = useState(filters.search || '')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    setFilters({
      ...filters,
      search: debouncedSearchValue,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue])

  const isFiltered = useMemo(() => {
    return (
      !!filters.search ||
      !!(filters as any).status ||
      !!(filters as any).platform ||
      !!(filters as any).assignedUserId ||
      !!(filters as any).creatorId ||
      !!(filters as any).fromDate ||
      !!(filters as any).toDate
    )
  }, [filters])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    })
  }

  const onDateChange = (key: 'fromDate' | 'toDate', date: Date | null) => {
    setFilters({
      ...filters,
      [key]: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
    })
  }

  const handleAssignedUserChange = (option: UserOption | null) => {
    setAssignedUsers(option)
    setFilters({
      ...filters,
      assignedUserId: option ? option.value : undefined,
    })
  }

  const handleCreatorChange = (option: UserOption | null) => {
    setCreators(option)
    setFilters({
      ...filters,
      creatorId: option ? option.value : undefined,
    })
  }

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
    })
    setAssignedUsers(null)
    setCreators(null)
    setSearchValue('')
  }

  return (
    <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <Input
        prefix={<HiOutlineSearch className="w-4 h-4 text-gray-400" />}
        placeholder="Tìm kiếm theo tên..."
        value={searchValue}
        size="sm"
        onChange={handleSearchChange}
      />

      <Select
        value={statusOptions.find((opt) => opt.value === ((filters as any).status || ''))}
        options={statusOptions}
        placeholder="Trạng thái"
        size="sm"
        onChange={(option: any) => handleFilterChange('status', option?.value || '')}
      />

      <Input
        placeholder="Nền tảng..."
        value={(filters as any).platform || ''}
        size="sm"
        onChange={(e) => handleFilterChange('platform', e.target.value)}
      />

      <UserSelect value={assignedUsers} placeholder="Người nhận việc" size="sm" onChange={handleAssignedUserChange} />

      <UserSelect value={creators} placeholder="Người tạo" size="sm" onChange={handleCreatorChange} />

      <DatePicker
        size="sm"
        placeholder="Từ ngày"
        value={(filters as any).fromDate ? new Date((filters as any).fromDate) : null}
        onChange={(date) => onDateChange('fromDate', date)}
      />

      <DatePicker
        size="sm"
        placeholder="Đến ngày"
        value={(filters as any).toDate ? new Date((filters as any).toDate) : null}
        minDate={(filters as any).fromDate ? new Date((filters as any).fromDate) : undefined}
        onChange={(date) => onDateChange('toDate', date)}
      />

      {isFiltered && (
        <div className="flex items-center gap-4">
          <Button size="sm" variant="twoTone" onClick={handleClearFilters}>
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  )
}
