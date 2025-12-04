import { Button, Dialog } from '@/components/ui'
import VirtualCampaignTable from '@/views/campaign/components/VirtualCampaignTable'
import { useCreateCampaignMutation } from '@/views/campaign/hooks/useCampaign'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'

export default function CampaignPreviewDialog() {
  const { dialogPreviewOpen, campaigns, openCampaignSummaryDialog, closePreviewDialog } = useCampaignStore()

  const createMutation = useCreateCampaignMutation()

  const handleSubmit = async () => {
    await createMutation.mutateAsync(campaigns, {
      onSuccess: (response) => {
        openCampaignSummaryDialog(response.data.data)
      },
    })
  }

  return (
    <Dialog isOpen={dialogPreviewOpen} width={1400} onClose={closePreviewDialog} onRequestClose={closePreviewDialog}>
      <h5 className="mb-4">Đã đọc {campaigns.length} chiến dịch từ file Excel</h5>
      <VirtualCampaignTable campaigns={campaigns} height={800} />
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" onClick={closePreviewDialog}>
          Hủy
        </Button>
        <Button variant="solid" type="button" loading={createMutation.isPending} onClick={handleSubmit}>
          Lưu
        </Button>
      </div>
    </Dialog>
  )
}
