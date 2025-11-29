import { Button, DatePicker, Input } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { useState } from 'react'
import { HiOutlineFilter, HiOutlineX } from 'react-icons/hi'

export function CampaignFilterPanel() {
  const { filter, setFilter } = useCampaignStore()

  const handleImportAtFromChange = (date: Date | null) => {
    setFilter({
      ...filter,
      importAtFrom: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
      page: 1,
    })
  }

  const handleImportAtToChange = (date: Date | null) => {
    setFilter({
      ...filter,
      importAtTo: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
      page: 1,
    })
  }

  const handleDateFromChange = (date: Date | null) => {
    setFilter({
      ...filter,
      dateFrom: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
      page: 1,
    })
  }

  const handleDateToChange = (date: Date | null) => {
    setFilter({
      ...filter,
      dateTo: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
      page: 1,
    })
  }

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      uid: e.target.value || undefined,
      page: 1,
    })
  }

  const handleExternalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      externalId: e.target.value || undefined,
      page: 1,
    })
  }

  return (
    <div className="space-y-3 py-4 rounded-lg">
      <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="block mb-1 font-medium text-sm">Ngày nhập từ</label>
          <DatePicker
            size="sm"
            placeholder="Chọn ngày"
            inputFormat="DD/MM/YYYY"
            value={filter.importAtFrom ? new Date(filter.importAtFrom) : null}
            onChange={handleImportAtFromChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Ngày nhập đến</label>
          <DatePicker
            size="sm"
            placeholder="Chọn ngày"
            inputFormat="DD/MM/YYYY"
            value={filter.importAtTo ? new Date(filter.importAtTo) : null}
            onChange={handleImportAtToChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">Dữ liệu từ ngày</label>
          <DatePicker
            size="sm"
            placeholder="Chọn ngày"
            inputFormat="DD/MM/YYYY"
            value={filter.dateFrom ? new Date(filter.dateFrom) : null}
            onChange={handleDateFromChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Dữ liệu đến ngày</label>
          <DatePicker
            size="sm"
            placeholder="Chọn ngày"
            inputFormat="DD/MM/YYYY"
            value={filter.dateTo ? new Date(filter.dateTo) : null}
            onChange={handleDateToChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">UID</label>
          <Input size="sm" placeholder="Nhập UID..." value={filter.uid || ''} onChange={handleUidChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">ID chiến dịch</label>
          <Input
            size="sm"
            placeholder="Nhập ID chiến dịch..."
            value={filter.externalId || ''}
            onChange={handleExternalIdChange}
          />
        </div>
      </div>
    </div>
  )
}

export default function CampaignFilter() {
  const { filter, setFilter } = useCampaignStore()
  const [showFilters, setShowFilters] = useState(true)

  const handleClearFilters = () => {
    setFilter({
      ...filter,
      importAtFrom: undefined,
      importAtTo: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      uid: undefined,
      externalId: undefined,
      page: 1,
    })
  }

  const hasActiveFilters =
    filter.importAtFrom || filter.importAtTo || filter.dateFrom || filter.dateTo || filter.uid || filter.externalId

  return {
    showFilters,
    setShowFilters,
    hasActiveFilters,
    filterButton: (
      <>
        <Button
          size="sm"
          variant={showFilters ? 'solid' : 'twoTone'}
          icon={<HiOutlineFilter />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Bộ lọc{' '}
          {hasActiveFilters &&
            `(${Object.values(filter).filter((v) => v && typeof v === 'string' && v !== filter.search).length})`}
        </Button>
        {hasActiveFilters && (
          <Button size="sm" icon={<HiOutlineX />} onClick={handleClearFilters}>
            Xóa bộ lọc
          </Button>
        )}
      </>
    ),
  }
}
