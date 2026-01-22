import { Dialog } from '@/components/ui'
import AppealAccountForm from '@/views/appealAccount/components/AppealAccountForm'
import { useAppealAccountStore } from '@/views/appealAccount/store/useAppealAccountStore'

export default function AppealAccountEditDialog() {
  const { dialogOpen, appealAccountId, closeDialog } = useAppealAccountStore()

  return (
    <Dialog
      isOpen={dialogOpen}
      width={900}
      onClose={closeDialog}
      onRequestClose={closeDialog}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <h5 className="mb-4">{appealAccountId ? 'Cập nhật tài khoản Ads' : 'Thêm mới tài khoản Ads'}</h5>
      <AppealAccountForm />
    </Dialog>
  )
}
