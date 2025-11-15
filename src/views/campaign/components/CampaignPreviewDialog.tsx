import { Dialog } from '@/components/ui'
import CampaignTable from '@/views/campaign/components/CampaignTable'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'

export default function CampaignPreviewDialog() {
  const { dialogOpen, closeDialog } = useCampaignStore()

  return (
    <Dialog isOpen={dialogOpen} width={1200} onClose={closeDialog} onRequestClose={closeDialog}>
      <h5 className="mb-4">Xem trước</h5>
      <CampaignTable />
    </Dialog>
  )
}
