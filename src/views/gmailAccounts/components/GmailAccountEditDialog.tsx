import { Dialog } from '@/components/ui'
import GmailAccountForm from '@/views/gmailAccounts/components/GmailAccountForm'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'

export default function GmailAccountEditDialog() {
  const { dialogOpen, gmailAccountId, closeDialog } = useGmailAccountStore()
  const isEdit = !!gmailAccountId

  return (
    <Dialog isOpen={dialogOpen} width={1200} onClose={closeDialog}>
      <h5 className="mb-4">{isEdit ? 'Cập nhật tài khoản Gmail' : 'Thêm tài khoản Gmail'}</h5>
      <GmailAccountForm />
    </Dialog>
  )
}
