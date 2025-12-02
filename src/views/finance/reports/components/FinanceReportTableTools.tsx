import SelectCustom from '@/components/shared/SelectCustom'
import { Button, DatePicker } from '@/components/ui'
import { useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import FinanceReportFormModal from './FinanceReportFormModal'

export default function FinanceReportTableTools() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmitReport = (data: any) => {
    console.log('Report data:', data)
    // TODO: Handle submit report data
  }

  return (
    <>
      <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 mb-4">
        <div className="gap-2 grid grid-cols-4 mb-4">
          <DatePicker placeholder="Chọn ngày" />
          <SelectCustom placeholder="Chọn dự án" />
          <SelectCustom placeholder="Chọn URL cuối" />
          <SelectCustom placeholder="Chọn người chạy" />
        </div>

        <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={() => setIsModalOpen(true)}>
          Thêm mới
        </Button>
      </div>

      <FinanceReportFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReport}
      />
    </>
  )
}
