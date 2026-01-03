import { DatePicker, Input } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { useDebounce } from '@/hooks/useDebounce'
import { useDashboardStore } from '@/views/dashboard/store/useDashboardStore'
import { useEffect, useState } from 'react'

export default function ProjectDailyReportsFilter() {
  const [projectName, setProjectName] = useState('')

  const debouncedProjectName = useDebounce(projectName, 500)
  const { filters, setFilters } = useDashboardStore()

  useEffect(() => {
    setFilters({
      ...filters,
      projectName: debouncedProjectName || undefined,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedProjectName])

  const handleFromDateChange = (date: Date | null) => {
    setFilters({
      ...filters,
      fromDate: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
    })
  }

  const handleToDateChange = (date: Date | null) => {
    setFilters({
      ...filters,
      toDate: date ? formatDate(date, 'YYYY-MM-DD') : undefined,
    })
  }

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }

  return (
    <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 mb-4">
      <div className="items-center gap-4 grid grid-cols-3">
        <Input
          size="sm"
          placeholder="Tìm kiếm theo tên dự án..."
          value={projectName}
          onChange={handleProjectNameChange}
        />
        <DatePicker
          size="sm"
          placeholder="Từ ngày"
          inputFormat="DD/MM/YYYY"
          value={filters.fromDate ? new Date(filters.fromDate) : null}
          onChange={handleFromDateChange}
        />
        <DatePicker
          size="sm"
          placeholder="Đến ngày"
          inputFormat="DD/MM/YYYY"
          value={filters.toDate ? new Date(filters.toDate) : null}
          onChange={handleToDateChange}
        />
      </div>
    </div>
  )
}
