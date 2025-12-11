import { Dialog } from '@/components/ui'
import FinanceReportForm from '@/views/finance/reports/components/FinanceReportForm'

type Props = {
  isOpen: boolean
  onClose: () => void
  projectDailyStatId?: string | null
}

export default function FinanceReportEditDialog({ isOpen, onClose, projectDailyStatId }: Props) {
  return (
    <Dialog isOpen={isOpen} width={900} onClose={onClose} onRequestClose={onClose}>
      <h5 className="mb-4">{projectDailyStatId ? 'Cập nhật báo cáo dự án' : 'Tạo báo cáo dự án theo ngày'}</h5>
      <FinanceReportForm projectDailyStatId={projectDailyStatId} onClose={onClose} />
    </Dialog>
  )
}
