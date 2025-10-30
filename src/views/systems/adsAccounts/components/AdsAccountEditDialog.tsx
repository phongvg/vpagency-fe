import { Dialog } from '@/components/ui'
import { useAdsAccountStore } from '@/views/systems/adsAccounts/store/useAdsAccountStore'
import AdsAccountForm from '@/views/systems/adsAccounts/components/AdsAccountForm'

export default function AdsAccountEditDialog() {
  const { dialogOpen, setDialogOpen, selectedAdsAccount } = useAdsAccountStore()

  const onDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <Dialog isOpen={dialogOpen} width={900} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4">{selectedAdsAccount ? 'Cập nhật tài khoản quảng cáo' : 'Thêm tài khoản quảng cáo'}</h5>
      <AdsAccountForm onClose={onDialogClose} />
    </Dialog>
  )
}
