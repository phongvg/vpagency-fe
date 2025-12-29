import { Button, DatePicker, Dialog } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'

interface DateSelectDialogProps {
  isOpen: boolean
  selectedDate: string | null
  onSelectDate: (date: string) => void
  onSubmit: () => void
  onClose: () => void
}

export default function DateSelectDialog({
  isOpen,
  selectedDate,
  onSelectDate,
  onSubmit,
  onClose,
}: DateSelectDialogProps) {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dateString = formatDate(date, 'YYYY-MM-DD')
      onSelectDate(dateString)
    }
  }

  const selectedDateObj = selectedDate ? new Date(selectedDate) : null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} width={500}>
      <h5 className="mb-4">Chọn ngày kéo dữ liệu</h5>

      <div className="mb-4">
        <p className="mb-2 text-gray-600 text-sm">Vui lòng chọn ngày dữ liệu bạn muốn import (Date Pulled):</p>
        <DatePicker
          inputFormat="DD/MM/YYYY"
          placeholder="Chọn ngày..."
          value={selectedDateObj}
          onChange={handleDateChange}
        />
      </div>

      <div className="mt-6 text-right">
        <Button size="sm" className="mr-2" onClick={onClose}>
          Hủy
        </Button>
        <Button size="sm" variant="solid" onClick={onSubmit} disabled={!selectedDate}>
          Tiếp tục
        </Button>
      </div>
    </Dialog>
  )
}
