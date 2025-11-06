import { Dialog } from '@/components/ui'
import { useDailyMetricStore } from '@/views/adsAccounts/pages/adsAccountDetail/store/useDailyMetricStore'
import DailyMetricForm from '@/views/adsAccounts/pages/adsAccountDetail/components/DailyMetricForm'

type DailyMetricFormDialogProps = {
  adsAccountId: string
}

export default function DailyMetricFormDialog({ adsAccountId }: DailyMetricFormDialogProps) {
  const { dialogOpen, setDialogOpen, setSelectedMetric } = useDailyMetricStore()

  const onDialogClose = () => {
    setDialogOpen(false)
    setSelectedMetric(null)
  }

  return (
    <Dialog isOpen={dialogOpen} width={600} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4">Cập nhật chỉ số hàng ngày</h5>
      <DailyMetricForm adsAccountId={adsAccountId} onClose={onDialogClose} />
    </Dialog>
  )
}
