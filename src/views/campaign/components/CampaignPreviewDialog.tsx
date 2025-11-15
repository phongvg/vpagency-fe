import { Button, Dialog } from '@/components/ui'
import VirtualCampaignTable from '@/views/campaign/components/VirtualCampaignTable'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'

export default function CampaignPreviewDialog() {
  const { dialogOpen, campaigns, closeDialog } = useCampaignStore()

  const handleSubmit = () => {
    console.log(campaigns)
  }

  return (
    <Dialog isOpen={dialogOpen} width={1400} onClose={closeDialog} onRequestClose={closeDialog}>
      <h5 className="mb-4">Đã nhập {campaigns.length} chiến dịch</h5>
      <VirtualCampaignTable campaigns={campaigns} height={800} />
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" onClick={closeDialog}>
          Hủy
        </Button>
        <Button variant="solid" type="button" onClick={handleSubmit}>
          Xác nhận
        </Button>
      </div>
    </Dialog>
  )
}
