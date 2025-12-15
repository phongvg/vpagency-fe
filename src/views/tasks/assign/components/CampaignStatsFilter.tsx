import { DatePicker, Input } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { useDebounce } from '@/hooks/useDebounce'
import { CampaignFilterRequest } from '@/views/campaign/store/useCampaignStore'
import { useEffect, useState } from 'react'

type Props = {
  filter: CampaignFilterRequest
  onFilterChange: (filter: CampaignFilterRequest) => void
}

export default function CampaignStatsFilter({ filter, onFilterChange }: Props) {
  const [uid, setUid] = useState(filter.uid || '')
  const [externalId, setExternalId] = useState(filter.externalId || '')
  const [gmail, setGmail] = useState(filter.gmail || '')

  const debouncedUid = useDebounce(uid, 500)
  const debouncedExternalId = useDebounce(externalId, 500)
  const debouncedGmail = useDebounce(gmail, 500)

  useEffect(() => {
    onFilterChange({
      ...filter,
      uid: debouncedUid || undefined,
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUid])

  useEffect(() => {
    onFilterChange({
      ...filter,
      externalId: debouncedExternalId || undefined,
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedExternalId])

  useEffect(() => {
    onFilterChange({
      ...filter,
      gmail: debouncedGmail || undefined,
      page: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedGmail])

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
    setUid(e.target.value)
  }

  const handleExternalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExternalId(e.target.value)
  }

  const handleGmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGmail(e.target.value)
  }

  return (
    <div className="space-y-3 mb-4 rounded-lg">
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
          <Input size="sm" placeholder="Nhập UID" value={uid} onChange={handleUidChange} />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">ID chiến dịch</label>
          <Input size="sm" placeholder="Nhập ID chiến dịch" value={externalId} onChange={handleExternalIdChange} />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">Gmail</label>
          <Input size="sm" placeholder="Nhập Gmail" value={gmail} onChange={handleGmailChange} />
        </div>
      </div>
    </div>
  )
}
