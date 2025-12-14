import { Button, Dialog } from '@/components/ui'
import VirtualEmailTable from '@/views/campaign/components/VirtualEmailTable'
import { useImportEmailToCampaign } from '@/views/campaign/hooks/useCampaign'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'

export default function EmailAssignmentPreviewDialog() {
  const { dialogEmailPreviewOpen, emailAssignments, closeEmailPreviewDialog } = useCampaignStore()

  const importGmailToCampaign = useImportEmailToCampaign()

  const handleSubmit = async () => {
    await importGmailToCampaign.mutateAsync(
      {
        mappings: emailAssignments,
      },
      {
        onSuccess: () => {
          closeEmailPreviewDialog()
        },
      },
    )
  }

  return (
    <Dialog
      isOpen={dialogEmailPreviewOpen}
      width={1400}
      onClose={closeEmailPreviewDialog}
      onRequestClose={closeEmailPreviewDialog}
    >
      <h5 className="mb-4">Đã đọc {emailAssignments.length} email từ file Excel</h5>
      <VirtualEmailTable email={emailAssignments} height={800} />
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" onClick={closeEmailPreviewDialog}>
          Hủy
        </Button>
        <Button variant="solid" type="button" loading={importGmailToCampaign.isPending} onClick={handleSubmit}>
          Lưu
        </Button>
      </div>
    </Dialog>
  )
}
