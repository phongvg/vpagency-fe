import { Dialog } from '@/components/ui'
import GmailStatusForm from '@/views/masterData/gmailStatus/components/GmailStatusForm'
import { useGmailStatusStore } from '@/views/masterData/gmailStatus/store/useGmailStatusStore'

export default function GmailStatusEditDialog() {
  const { dialogOpen, gmailStatusId, closeDialog } = useGmailStatusStore()

  return (
    <Dialog isOpen={dialogOpen} onClose={closeDialog} onRequestClose={closeDialog}>
      <h5 className="mb-4">{gmailStatusId ? 'Cập nhật trạng thái Gmail' : 'Thêm trạng thái Gmail'}</h5>
      <GmailStatusForm />
    </Dialog>
  )
}
