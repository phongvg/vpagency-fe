import { DatePicker } from '@/components/ui'
import { useProjectDailyReportStore } from '@/views/projects/pages/projectDetail/store/useProjectDailyReportStore'
import dayjs from 'dayjs'

export default function ProjectDailyReportTableTools() {
  const { filter, setFilter } = useProjectDailyReportStore()

  const handleFromDateChange = (date: Date | null) => {
    setFilter({
      ...filter,
      dateFrom: date ? dayjs(date).format('YYYY-MM-DD') : undefined,
    })
  }

  const handleToDateChange = (date: Date | null) => {
    setFilter({
      ...filter,
      dateTo: date ? dayjs(date).format('YYYY-MM-DD') : undefined,
    })
  }

  return (
    <div className="flex sm:flex-row flex-col justify-between items-center gap-4 mb-4">
      <div className="flex sm:flex-row flex-col items-center gap-2">
        <span className="font-medium text-sm">Lọc theo ngày:</span>
        <div className="flex items-center gap-2">
          <DatePicker
            value={filter.dateFrom ? new Date(filter.dateFrom) : null}
            placeholder="Từ ngày"
            inputFormat="DD/MM/YYYY"
            className="w-[150px]"
            onChange={handleFromDateChange}
          />
          <span>-</span>
          <DatePicker
            value={filter.dateTo ? new Date(filter.dateTo) : null}
            placeholder="Đến ngày"
            inputFormat="DD/MM/YYYY"
            minDate={filter.dateFrom ? new Date(filter.dateFrom) : undefined}
            className="w-[150px]"
            onChange={handleToDateChange}
          />
        </div>
      </div>
    </div>
  )
}
