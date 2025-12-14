import { DatePicker, Input } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { CampaignFilterRequest } from '@/views/campaign/store/useCampaignStore'

type Props = {
  filter: CampaignFilterRequest
  onFilterChange: (filter: CampaignFilterRequest) => void
}

export default function CampaignStatsFilter({ filter, onFilterChange }: Props) {
  const handleImportAtFromChange = (date: Date | null) => {
    onFilterChange({
      ...filter,
      importAtFrom: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
      page: 1,
    })
  }

  const handleImportAtToChange = (date: Date | null) => {
    onFilterChange({
      ...filter,
      importAtTo: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
      page: 1,
    })
  }

  const handleDateFromChange = (date: Date | null) => {
    onFilterChange({
      ...filter,
      dateFrom: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
      page: 1,
    })
  }

  const handleDateToChange = (date: Date | null) => {
    onFilterChange({
      ...filter,
      dateTo: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
      page: 1,
    })
  }

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      uid: e.target.value || undefined,
      page: 1,
    })
  }

  const handleExternalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      externalId: e.target.value || undefined,
      page: 1,
    })
  }

  return (
    <div className="space-y-3 mb-4 rounded-lg">
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
        <div>
          <label className="block mb-1 font-semibold text-sm">Ngày nhập từ</label>
          <DatePicker
            size="sm"
            placeholder="Chọn ngày"
            inputFormat="DD/MM/YYYY"
            value={filter.importAtFrom ? new Date(filter.importAtFrom) : null}
            onChange={handleImportAtFromChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">Ngày nhập đến</label>
          <DatePicker
            size="sm"
            placeholder="Chọn ngày"
            inputFormat="DD/MM/YYYY"
            value={filter.importAtTo ? new Date(filter.importAtTo) : null}
            onChange={handleImportAtToChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">Dữ liệu từ ngày</label>
          <DatePicker
            size="sm"
            placeholder="Chọn ngày"
            inputFormat="DD/MM/YYYY"
            value={filter.dateFrom ? new Date(filter.dateFrom) : null}
            onChange={handleDateFromChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">Dữ liệu đến ngày</label>
          <DatePicker
            size="sm"
            placeholder="Chọn ngày"
            inputFormat="DD/MM/YYYY"
            value={filter.dateTo ? new Date(filter.dateTo) : null}
            onChange={handleDateToChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">UID</label>
          <Input size="sm" placeholder="Nhập UID" value={filter.uid || ''} onChange={handleUidChange} />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">ID chiến dịch</label>
          <Input
            size="sm"
            placeholder="Nhập ID chiến dịch"
            value={filter.externalId || ''}
            onChange={handleExternalIdChange}
          />
        </div>
      </div>
    </div>
  )
}
