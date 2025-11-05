import { DatePicker } from '@/components/ui'
import { useProjectDailyReportStore } from '@/views/projects/pages/projectDetail/store/useProjectDailyReportStore'
import dayjs from 'dayjs'

export default function ProjectDailyReportTableTools() {
  const { filter, setFilter, setDialogOpen, setSelectedReport } = useProjectDailyReportStore()

  const handleAddNew = () => {
    setSelectedReport(null)
    setDialogOpen(true)
  }

  const handleFromDateChange = (date: Date | null) => {
    setFilter({
      ...filter,
      fromDate: date ? dayjs(date).format('YYYY-MM-DD') : undefined,
      page: 1,
    })
  }

  const handleToDateChange = (date: Date | null) => {
    setFilter({
      ...filter,
      toDate: date ? dayjs(date).format('YYYY-MM-DD') : undefined,
      page: 1,
    })
  }

  return (
    <div className="flex sm:flex-row flex-col justify-between items-center gap-4 mb-4">
      <div className="flex sm:flex-row flex-col items-center gap-2">
        <span className="font-medium text-sm">Lọc theo ngày:</span>
        <div className="flex items-center gap-2">
          <DatePicker
            value={filter.fromDate ? new Date(filter.fromDate) : null}
            onChange={handleFromDateChange}
            placeholder="Từ ngày"
            inputFormat="DD/MM/YYYY"
            className="w-[150px]"
          />
          <span>-</span>
          <DatePicker
            value={filter.toDate ? new Date(filter.toDate) : null}
            onChange={handleToDateChange}
            placeholder="Đến ngày"
            inputFormat="DD/MM/YYYY"
            minDate={filter.fromDate ? new Date(filter.fromDate) : undefined}
            className="w-[150px]"
          />
        </div>
      </div>
    </div>
  )
}
