import { Button, Dialog, Select } from '@/components/ui'

interface DateSelectDialogProps {
  isOpen: boolean
  availableDates: string[]
  selectedDate: string | null
  onSelectDate: (date: string) => void
  onSubmit: () => void
  onClose: () => void
}

export default function DateSelectDialog({
  isOpen,
  availableDates,
  selectedDate,
  onSelectDate,
  onSubmit,
  onClose,
}: DateSelectDialogProps) {
  const dateOptions = availableDates.map((date) => ({
    value: date,
    label: date,
  }))

  return (
    <Dialog isOpen={isOpen} onClose={onClose} width={400}>
      <h5 className="mb-4">Chọn ngày dữ liệu</h5>

      <div className="mb-4">
        <p className="mb-2 text-gray-600 text-sm">Vui lòng chọn ngày dữ liệu bạn muốn import:</p>
        <Select
          placeholder="Chọn ngày..."
          options={dateOptions}
          value={dateOptions.find((opt) => opt.value === selectedDate)}
          onChange={(option) => option && onSelectDate(option.value)}
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
