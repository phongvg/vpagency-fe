import { Dialog } from '@/components/ui'
import GmailAccountForm from '@/views/gmailAccounts/components/GmailAccountForm'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'

export default function GmailAccountEditDialog() {
  const { dialogOpen, setDialogOpen, selectedGmailAccount } = useGmailAccountStore()

  const onDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <Dialog isOpen={dialogOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4">{selectedGmailAccount ? 'Cập nhật tài khoản gmail' : 'Thêm tài khoản gmail'}</h5>
      <GmailAccountForm onClose={onDialogClose} />
    </Dialog>
  )
}
