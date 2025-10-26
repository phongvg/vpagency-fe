import { Dialog } from '@/components/ui'
import { useAdsGroupStore } from '@/views/systems/adsGroups/store/useAdsGroupStore'
import AdsGroupForm from '@/views/systems/adsGroups/components/AdsGroupForm'

export default function AdsGroupEditDialog() {
  const { drawerOpen, setDrawerOpen, selectedAdsGroup } = useAdsGroupStore()

  const onDialogClose = () => {
    setDrawerOpen(false)
  }

  return (
    <Dialog isOpen={drawerOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4">{selectedAdsGroup ? 'Cập nhật nhóm quảng cáo' : 'Thêm nhóm quảng cáo'}</h5>
      <AdsGroupForm onClose={onDialogClose} />
    </Dialog>
  )
}
