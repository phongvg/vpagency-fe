import { Button, Dialog } from '@/components/ui'
import VirtualAppealAccountTable from '@/views/appealAccount/components/VirtualAppealAccountTable'
import { useCreateAppealAccountMutation } from '@/views/appealAccount/hooks/useAppealAccount'
import { useAppealAccountStore } from '@/views/appealAccount/store/useAppealAccountStore'

export default function AppealAccountPreviewDialog() {
  const { dialogPreviewOpen, appealAccounts, closePreviewDialog } = useAppealAccountStore()

  const createMutation = useCreateAppealAccountMutation()

  const handleSubmit = async () => {
    await createMutation.mutateAsync(appealAccounts)
    closePreviewDialog()
  }

  return (
    <Dialog isOpen={dialogPreviewOpen} width={1400} onClose={closePreviewDialog} onRequestClose={closePreviewDialog}>
      <h5 className="mb-4">Đã đọc {appealAccounts.length} tài khoản Ads từ file Excel</h5>
      <VirtualAppealAccountTable appealAccounts={appealAccounts} height={800} />
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
