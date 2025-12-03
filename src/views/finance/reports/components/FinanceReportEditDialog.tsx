import { Dialog } from '@/components/ui'
import FinanceReportForm from '@/views/finance/reports/components/FinanceReportForm'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function FinanceReportEditDialog({ isOpen, onClose }: Props) {
  return (
    <Dialog isOpen={isOpen} width={900} onClose={onClose} onRequestClose={onClose}>
      <h5 className="mb-4">Tạo báo cáo dự án theo ngày</h5>
      <FinanceReportForm onClose={onClose} />
    </Dialog>
  )
}
