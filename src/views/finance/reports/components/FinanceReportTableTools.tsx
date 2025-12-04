import { Button, DatePicker } from '@/components/ui'
import { useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import { useProjectDailyStatStore } from '@/views/finance/reports/store/useProjectDailyStatStore'
import { formatDate } from '@/helpers/formatDate'
import FinanceReportEditDialog from '@/views/finance/reports/components/FinanceReportEditDialog'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrAccounting } from '@/utils/checkRole'

export default function FinanceReportTableTools() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { filters, setFilters } = useProjectDailyStatStore()

  const { user } = useAuthStore()

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

  return (
    <>
      <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 mb-4">
        <div className="items-center gap-4 grid grid-cols-3">
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

        {isAdminOrAccounting(user?.roles) && (
          <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={() => setIsModalOpen(true)}>
            Tạo báo cáo
          </Button>
        )}
      </div>

      <FinanceReportEditDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
