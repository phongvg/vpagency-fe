import { Button, Dialog } from '@/components/ui'
import VirtualGmailAccountTable from '@/views/gmailAccounts/components/VirtualGmailAccountTable'
import { useCreateGmailAccountMutation } from '@/views/gmailAccounts/hooks/useGmailAccount'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'

export default function GmailAccountPreviewDialog() {
  const { dialogPreviewOpen, gmailAccounts, closePreviewDialog } = useGmailAccountStore()

  const createMutation = useCreateGmailAccountMutation()

  const handleSubmit = async () => {
    await createMutation.mutateAsync(gmailAccounts)
    closePreviewDialog()
  }

  return (
    <Dialog isOpen={dialogPreviewOpen} width={1400} onClose={closePreviewDialog} onRequestClose={closePreviewDialog}>
      <h5 className="mb-4">Đã đọc {gmailAccounts.length} tài khoản Gmail từ file Excel</h5>
      <VirtualGmailAccountTable gmailAccounts={gmailAccounts} height={800} />
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
