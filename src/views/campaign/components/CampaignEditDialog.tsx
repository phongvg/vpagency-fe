import { Dialog } from '@/components/ui'
import CampaignForm from '@/views/campaign/components/CampaignForm'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'

export default function CampaignEditDialog() {
  const { dialogOpen, closeDialog, campaignId } = useCampaignStore()

  return (
    <Dialog isOpen={dialogOpen} width={1200} onClose={closeDialog} onRequestClose={closeDialog}>
      <h5 className="mb-4">{campaignId ? 'Cập nhật chiến dịch' : 'Thêm chiến dịch mới'}</h5>
      <CampaignForm />
    </Dialog>
  )
}
